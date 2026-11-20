import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== "POST") {
    response.setHeader("Allow", ["POST"]);
    return response.status(405).json({ error: `Method ${request.method} not allowed` });
  }

  const apiKey = process.env.MOVIE_API_KEY;
  if (!apiKey) {
    return response.status(500).json({ error: "MOVIE_API_KEY is not set. Add it to .env.local (see README)." });
  }

  const { year, page = 1, genre } = request.body ?? {};
  const params = new URLSearchParams({
    year: String(year || new Date().getFullYear()),
    sort: "year.decr",
    limit: "12",
    page: String(page),
  });
  if (genre) params.set("genre", genre);

  try {
    const resp = await fetch(`https://moviesdatabase.p.rapidapi.com/titles?${params}`, {
      headers: {
        "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    });
    if (!resp.ok) {
      return response.status(502).json({ error: `Movie API responded with ${resp.status}` });
    }
    const data = await resp.json();
    const movies: MoviesProps[] = data.results ?? [];
    return response.status(200).json({ movies, hasNext: Boolean(data.next) });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return response.status(502).json({ error: "Could not reach the movie API" });
  }
}
