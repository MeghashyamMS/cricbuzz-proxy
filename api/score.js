export default async function handler(req, res) {
  const { id } = req.query;
  const url = id
    ? `https://www.cricbuzz.com/api/cricket-match/${id}/full-commentary/0`
    : `https://www.cricbuzz.com/api/cricket-match/commentary/0`;
  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const data = await r.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
