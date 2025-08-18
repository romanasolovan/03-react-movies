import axios from "axios";
import type { Movie } from "../types/movie";

const API_KEY = import.meta.env.VITE_API_KEY; 
const BASE_URL = 'https://api.themoviedb.org/3';

interface TMDBResponse {
    results: Movie[];
};

export const getMovies = async (query: string): Promise<Movie[]> => {
    const response = await axios.get<TMDBResponse>(`${BASE_URL}/search/movie`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      params: {
        query,
        language: 'en-US',
        page: 1,
      },
    });
  
    return response.data.results;
  };
  
  