import React, { useState, useEffect } from 'react';
import M from './M'; 
import { useParams } from 'react-router-dom';
import Navbar from './Navbar'; 
import '../styles/playlist.css';

const Playlists = () => {
  const { user_id } = useParams();
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState(null);
  const [selectedSongIndex, setSelectedSongIndex] = useState(null);

  useEffect(() => {
  const fetchPlaylists = async () => {
    try {
      const response = await fetch(`/api/v1/${user_id}/playlists`);
      if (!response.ok) {
        throw new Error('Failed to fetch playlists');
      }
      const data = await response.json();
      setPlaylists(data.playlists);
      console.log(data.playlists); // Log fetched playlists
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  fetchPlaylists();
}, [user_id]);


  const handlePlaylistClick = (index) => {
    setSelectedPlaylistIndex(index);
    setSelectedSongIndex(null); // Reset selected song index when a new playlist is clicked
  };

  const handleSongClick = (index) => {
    setSelectedSongIndex(index);
  };

  const handleNext = () => {
    if (selectedSongIndex < playlists[selectedPlaylistIndex]?.songs.length - 1) {
      setSelectedSongIndex(selectedSongIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (selectedSongIndex > 0) {
      setSelectedSongIndex(selectedSongIndex - 1);
    }
  };

  return (
    <div className="playlist-container">
      <div className="left-panel-playlist">
        <Navbar user_id={user_id} />
      </div>
      <div className="playlist-list-container">
        <ul className="playlist-buttons" type="none">
        {playlists.map((playlist, index) => (
  <li key={index}>
    <div className="playlist-container">
      <div className="playlist-name-container">
        
      </div>
      <button
        className="playlist-button"
        onClick={() => handlePlaylistClick(index)}
      >
        {playlist.playlist_name}
      </button>
    </div>
  </li>
))}


        </ul>
      </div>
      <div className="song-list-container">
        {selectedPlaylistIndex !== null && (
          <ul className="song-buttons" type="none">
            {playlists[selectedPlaylistIndex]?.songs.map((song, index) => (
              <li key={index}>
                <div className="song-container">
                  <button
                    className="song-button"
                    onClick={() => handleSongClick(index)}
                  >
                    {song}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="selected-component-container">
        {selectedSongIndex !== null && (
          <div className="selected-component">
            <M
              mp3Ul={playlists[selectedPlaylistIndex]?.songs[selectedSongIndex]}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Playlists;
