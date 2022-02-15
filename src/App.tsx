import { useCallback, useEffect, useState } from 'react';

import './styles/global.scss';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { api } from './services/api';

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>();

  const handleGenreId = useCallback((genre: GenreResponseProps) => {
    setSelectedGenre(genre)
  }, [selectedGenre])
  
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
      setSelectedGenre(response.data[0]);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenre?.id}`).then(response => {
      setMovies(response.data);
    });

  }, [selectedGenre]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar handleGenre={handleGenreId} genres={genres} />
      <Content genre={selectedGenre} movies={movies} />
    </div>
  )
}