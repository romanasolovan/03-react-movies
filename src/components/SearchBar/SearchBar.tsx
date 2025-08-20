import { useState } from 'react';
import toast from 'react-hot-toast';
import styles from "./SearchBar.module.css";

interface SearchBarProps {
    onSubmit: (query: string) => void;
}
function SearchBar({ onSubmit }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
      };
    
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim() === '') {
          toast.error('Please enter your search query.');
          return;
        }
        onSubmit(query); 
        setQuery('');
      };
    
      return (
        <header className={styles.header}>
          <div className={styles.container}>
            <a
              className={styles.link}
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by TMDB
            </a>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                className={styles.input}
                type="text"
                name="query"
                autoComplete="off"
                placeholder="Search movies..."
                autoFocus
                value={query}
                onChange={handleChange}
              />
              <button className={styles.button} type="submit">Search</button>
            </form>
          </div>
        </header>
      );
}
    
export default SearchBar;