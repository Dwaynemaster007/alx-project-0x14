import Button from "@/components/commons/Button";
import Loading from "@/components/commons/Loading";
import MovieCard from "@/components/commons/MovieCard";
import { MoviesProps } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";

const GENRES = ["All", "Animation", "Comedy", "Fantasy"];
const THIS_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 8 }, (_, i) => THIS_YEAR - i);

const Movies: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [year, setYear] = useState<number | null>(null);
  const [genre, setGenre] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const [movies, setMovies] = useState<MoviesProps[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/fetch-movies", {
        method: "POST",
        body: JSON.stringify({ page, year, genre: genre === "All" ? "" : genre }),
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");
      setMovies(data.movies);
      setHasNext(data.hasNext);
    } catch (err) {
      setMovies([]);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [page, year, genre]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // The API has no text search, so filter the current page by title
  const visible = movies.filter((movie) =>
    movie.titleText.text.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#110F17] text-white px-4 md:px-10 lg:px-44">
      <div className="py-16">
        <div className="flex flex-col md:flex-row justify-between mb-4 items-center gap-4">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search this page by title..."
            aria-label="Search movies"
            className="border-2 w-full md:w-96 border-[#E2D609] outline-none bg-transparent px-4 py-2 rounded-full text-white placeholder-gray-400"
          />

          <select
            value={year ?? ""}
            aria-label="Release year"
            onChange={(event) => {
              setYear(event.target.value ? Number(event.target.value) : null);
              setPage(1);
            }}
            className="border-2 border-[#E2D609] outline-none bg-[#110F17] px-4 md:px-8 py-2 rounded-full w-full md:w-auto"
          >
            <option value="">This year</option>
            {YEARS.map((y) => (
              <option value={y} key={y}>{y}</option>
            ))}
          </select>
        </div>

        <p className="text-[#E2D609] text-xl mb-6 mt-6">Online streaming</p>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl md:text-6xl font-bold">
            {year ?? THIS_YEAR} {genre === "All" ? "" : genre} Movie List
          </h1>
          <div className="flex flex-wrap gap-2 md:gap-4">
            {GENRES.map((g) => (
              <Button
                title={g}
                key={g}
                active={g === genre}
                onClick={() => {
                  setGenre(g);
                  setPage(1);
                }}
              />
            ))}
          </div>
        </div>

        {error && <p role="alert" className="mt-10 text-center text-red-400">{error}</p>}
        {!error && !loading && visible.length === 0 && (
          <p className="mt-10 text-center text-gray-400">No movies found.</p>
        )}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-10">
          {visible.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.titleText.text}
              posterImage={movie.primaryImage?.url}
              releaseYear={movie.releaseYear?.year}
            />
          ))}
        </div>

        <div className="flex justify-end items-center gap-4 mt-6">
          <span className="text-gray-400">Page {page}</span>
          <Button title="Previous" onClick={() => setPage((prev) => Math.max(1, prev - 1))} />
          <Button title="Next" onClick={() => hasNext && setPage((prev) => prev + 1)} />
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default Movies;
