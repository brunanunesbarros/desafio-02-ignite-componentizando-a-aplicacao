import { useState } from 'react';

import './styles/global.scss';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  function handleGenreId(id: number) {
    setSelectedGenreId(id)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar handleGenre={handleGenreId} />
      <Content  genreId={selectedGenreId} />
    </div>
  )
}