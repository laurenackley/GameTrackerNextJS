import { query } from "../../lib/db";

export default async function handler(req, res) {
  const id = req.body.id;

  try {
    const querySQL = "select * from game where id = ?";
    const valuesParams = [id];
    const data = await query({query: querySQL, values: valuesParams});

    res.status(200).json({ games: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
