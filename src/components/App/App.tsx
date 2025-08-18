import { useState } from "react";
import css from "../App/App.module.css";
import type { Movie } from "../../types/movie";
import { getMovies } from "../../services/movieService";
import  toast from "react-hot-toast";
import SearchBar from "../SearchBar/SeacrhBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import MovieModal from "../MovieModal/MovieModal.tsx";

function App() {
    // const [query, setQuery] = useState("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedMovies, setSelectedMovies] = useState<Movie | null>(null);


    const handleSearch = async (searchTerm: string) => {
        if (!searchTerm.trim()) {
            toast.error("Please enter a movie name");
            return;
        }
        try {
            setLoading(true);
            setError("");

            const fetchedMovies = await getMovies(searchTerm);

            if (fetchedMovies.length === 0) {
                toast("No movies found for your request.");
            }

            // setQuery(searchTerm);
            setMovies(fetchedMovies);
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const openModal = (movie: Movie) => {
        setSelectedMovies(movie);
    }

    const closeModal = () => {
        setSelectedMovies(null);
    };

    return (
      <div className={css.app}>
        <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={openModal} />
      )}
      {selectedMovies && (
        <MovieModal movie={selectedMovies} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;


