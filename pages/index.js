'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const dummySongs = [
  { id: 1, title: 'Song One', artist: 'Artist A', src: '/song1.mp3' },
  { id: 2, title: 'Song Two', artist: 'Artist B', src: '/song2.mp3' },
  { id: 3, title: 'Song Three', artist: 'Artist C', src: '/song3.mp3' },
];

export default function index() {
  const [songs, setSongs] = useState(dummySongs);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSong = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const nextSong = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const deleteSong = (id) => {
    const newList = songs.filter((s) => s.id !== id);
    setSongs(newList);
    if (currentIndex >= newList.length) {
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentIndex]);

  const currentSong = songs[currentIndex];

  return (
    <div className="max-w-md mx-auto mt-10 p-4 rounded-xl shadow-xl bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">🎵 Song Playlist</h1>

      {songs.length === 0 ? (
        <p className="text-center">No songs left in playlist.</p>
      ) : (
        <>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{currentSong.title}</h2>
            <p className="text-gray-600">{currentSong.artist}</p>
          </div>

          <audio ref={audioRef} src={currentSong.src} />

          <div className="flex justify-between gap-2 mb-4">
            <Button onClick={prevSong}>⏮ Prev</Button>
            <Button onClick={isPlaying ? pauseSong : playSong}>
              {isPlaying ? '⏸ Pause' : '▶️ Play'}
            </Button>
            <Button onClick={nextSong}>⏭ Next</Button>
          </div>

          <ul className="divide-y">
            {songs.map((song, index) => (
              <li key={song.id} className="flex items-center justify-between py-2">
                <span className={index === currentIndex ? 'font-semibold text-blue-600' : ''}>
                  {song.title}
                </span>
                <Button variant="destructive" onClick={() => deleteSong(song.id)}>🗑</Button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
