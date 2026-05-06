const OVERPASS_MIRRORS = [
  'https://overpass.kumi.systems/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
  'https://overpass.openstreetmap.ru/api/interpreter',
];

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  try {
    const { searchParams } = new URL(req.url, 'https://placeholder.com');
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const radius = searchParams.get('radius') || 5000;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'lat and lon are required' });
    }

    console.log(`Pharmacy search: lat=${lat}, lon=${lon}, radius=${radius}`);

    const query = `[out:json][timeout:20];(node["amenity"="pharmacy"](around:${radius},${lat},${lon});way["amenity"="pharmacy"](around:${radius},${lat},${lon}););out center;`;

    let lastError = null;

    for (const mirrorUrl of OVERPASS_MIRRORS) {
      try {
        console.log(`Trying mirror: ${mirrorUrl}`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const overpassRes = await fetch(mirrorUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: 'data=' + encodeURIComponent(query),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!overpassRes.ok) {
          console.log(`Mirror ${mirrorUrl} returned ${overpassRes.status}, trying next...`);
          continue;
        }

        const data = await overpassRes.json();
        console.log(`Success from ${mirrorUrl}: ${data.elements?.length || 0} results`);
        return res.status(200).json(data);

      } catch (err) {
        console.log(`Mirror ${mirrorUrl} failed: ${err.message}`);
        lastError = err;
        continue;
      }
    }

    return res.status(502).json({
      error: `All Overpass mirrors failed. Last error: ${lastError?.message}`,
    });

  } catch (error) {
    console.error('Handler error:', error.name, error.message);
    return res.status(500).json({ error: error.message });
  }
};
