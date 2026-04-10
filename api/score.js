export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { id } = req.query;

  try {
    // Get live matches list
    if (!id) {
      const r = await fetch(
        'https://www.cricbuzz.com/api/cricket-match/live',
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36',
            'Accept': 'application/json',
            'Referer': 'https://www.cricbuzz.com'
          }
        }
      );
      const text = await r.text();
      res.status(200).json({ raw: text.slice(0, 2000) });
      return;
    }

    // Get specific match score
    const r = await fetch(
      `https://www.cricbuzz.com/scorecard-comment/${id}/cricket`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36',
          'Accept': 'application/json, text/html',
          'Referer': 'https://www.cricbuzz.com/live-cricket-scores'
        }
      }
    );
    const text = await r.text();
    res.status(200).json({ raw: text.slice(0, 3000) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
