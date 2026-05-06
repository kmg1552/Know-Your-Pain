export default async function handler(req, res) {
  const { lat, lon, radius = 5000 } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'lat and lon are required' });
  }

  const query = `[out:json][timeout:25];
(node["amenity"="pharmacy"](around:${radius},${lat},${lon});
 way["amenity"="pharmacy"](around:${radius},${lat},${lon});
);
out center;`;

  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query,
    });

    if (!response.ok) {
      throw new Error(`Overpass API responded with ${response.status}`);
    }

    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(data);
  } catch (err) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(500).json({ error: err.message || 'Failed to fetch pharmacy data' });
  }
}
