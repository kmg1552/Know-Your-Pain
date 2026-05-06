module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  try {
    const { searchParams } = new URL(req.url, 'http://localhost');
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const radius = searchParams.get('radius') || 5000;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'lat and lon required' });
    }

    const query = `[out:json][timeout:8];(node["amenity"="pharmacy"](around:${radius},${lat},${lon});way["amenity"="pharmacy"](around:${radius},${lat},${lon}););out center;`;

    const MIRRORS = [
      'https://overpass.kumi.systems/api/interpreter',
      'https://overpass.openstreetmap.ru/api/interpreter',
      'https://maps.mail.ru/osm/tools/overpass/api/interpreter'
    ];

    const fetchMirror = (url) => {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 8000);
      return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'data=' + encodeURIComponent(query),
        signal: controller.signal
      }).then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      });
    };

    try {
      const data = await Promise.any(MIRRORS.map(fetchMirror));
      return res.status(200).json(data);
    } catch (err) {
      return res.status(502).json({ error: 'All mirrors failed: ' + err.message });
    }

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
