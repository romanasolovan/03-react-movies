import axios from "axios";
import type { Movie } from "../types/movie";


const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export async function getMovies(query: string): Promise<Movie[]> {
  try {
    const response = await api.get<{ results: Movie[] }>("search/movie", {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
}