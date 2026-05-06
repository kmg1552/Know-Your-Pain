export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  try {
    const { searchParams } = new URL(req.url, 'https://placeholder.com');
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const radius = searchParams.get('radius') || 5000;

    // Validate params
    if (!lat || !lon) {
      return res.status(400).json({ error: 'lat and lon are required' });
    }

    console.log(`Pharmacy search: lat=${lat}, lon=${lon}, radius=${radius}`);

    const query = `[out:json][timeout:20];(node["amenity"="pharmacy"](around:${radius},${lat},${lon});way["amenity"="pharmacy"](around:${radius},${lat},${lon}););out center;`;

    console.log('Calling Overpass API...');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const overpassRes = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'data=' + encodeURIComponent(query),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    console.log('Overpass response status:', overpassRes.status);

    if (!overpassRes.ok) {
      const text = await overpassRes.text();
      console.error('Overpass error body:', text);
      return res.status(502).json({ error: `Overpass API error: ${overpassRes.status}` });
    }

    const data = await overpassRes.json();
    console.log(`Found ${data.elements?.length || 0} pharmacies`);

    return res.status(200).json(data);

  } catch (error) {
    console.error('Handler error:', error.name, error.message);
    if (error.name === 'AbortError') {
      return res.status(504).json({ error: 'Overpass API timed out. Please try again.' });
    }
    return res.status(500).json({ error: error.message });
  }
}
