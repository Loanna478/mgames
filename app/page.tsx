"use client"
import { useState } from 'react';
import Image from 'next/image';
import { games } from '../lib/data';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<'all' | 'solo' | 'multi'>('all');
  const gamesPerPage = 60;

  // Logic for determining if a game is solo or multi
  const processedGames = games.map(game => ({
    ...game,
    type: game.multiImage === "https://i.imgur.com/QqcacDN.png" || game.multiImage === "https://i.imgur.com/4gWV1BJ.png" ? 'multi' : 'solo'
  }));

  // Logic for filtering games
  const filteredGames = processedGames.filter(game => {
    if (filter === 'solo') {
      return game.type === 'solo';
    } else if (filter === 'multi') {
      return game.type === 'multi';
    } else {
      return true; // Return all games if no filter is applied
    }
  });

  // Logic for displaying current games
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredGames.length / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleFilterChange = (filter: 'all' | 'solo' | 'multi') => {
    setFilter(filter);
    setCurrentPage(1);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-slate-900">
      <nav className="fixed top-3 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-md text-white z-50 py-4 px-6 md:px-12 flex justify-between items-center rounded-xl w-full md:w-3/4 max-w-5xl">
        <a href="/" className="text-xl font-bold">M-GAMES</a>
        <div className="hidden md:flex space-x-6 items-center">
          <button onClick={() => handleFilterChange('solo')} className="hover:text-blue-400">Jeux Solo</button>
          <button onClick={() => handleFilterChange('multi')} className="hover:text-blue-400">Jeux Multijoueur</button>
          <button onClick={() => handleFilterChange('all')} className="hover:text-blue-400">Tous les Jeux</button>
        </div>
      </nav>

      <header className="w-full py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            MGames
          </h1>
          <p className="mt-2 text-lg">Discover and download your favorite games</p>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {currentGames.map((game, index) => (
            <a
              key={index}
              href={game.downloadLink}
              target="_blank" // Ouvrir dans une nouvelle page
              className="relative flex items-center group cursor-pointer overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 bg-slate-800"
            >
              <Image
                src={game.image}
                alt={game.name}
                width={120}  // Ajuste la largeur
                height={80} // Ajuste la hauteur
                className="object-cover rounded-lg custom-image"
                quality={100} // Réduit la qualité de l'image pour améliorer les performances
              />
              <div className="ml-4 flex-grow">
                <h2 className="text-lg font-semibold text-white">{game.name}</h2>
              </div>
              <div className="absolute bottom-0 left-0 mb-2 ml-2">
                <Image
                  src={game.type === 'solo' ? '/solo.svg' : '/multi.svg'}
                  alt={game.type === 'solo' ? 'Jeu Solo' : 'Jeu Multijoueur'}
                  width={30}  // Ajuste la taille du logo
                  height={30} // Ajuste la taille du logo
                  className='bg-slate-700 rounded-lg'
                />
              </div>
              <div className="absolute bottom-0 right-0 mb-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-2 py-1 bg-black text-white text-xs rounded">
                  {game.type === 'solo' ? 'Jeu Solo' : 'Jeu Multijoueur'}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <footer className="w-full bg-slate-900 py-6">
        <div className="container mx-auto flex justify-center space-x-4">
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded-lg transition-colors duration-300 ${number === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300 hover:bg-blue-400'}`}
            >
              {number}
            </button>
          ))}
        </div>
      </footer>
    </main>
  );
}
