import React, { useState, useEffect } from 'react';
import M from './M'; 
import { useParams } from 'react-router-dom';
import Navbar from './Navbar'; 
import '../styles/likedsong.css'
const LikedSongs = () => {
  const { user_id } = useParams();
  const [likedSongs, setLikedSongs] = useState([]);
  const [selectedMp3Index, setSelectedMp3Index] = useState(null);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const response = await fetch(`/api/v1/${user_id}/likedSongs`);
        if (!response.ok) {
          throw new Error('Failed to fetch liked songs');
        }
        const data = await response.json();
        setLikedSongs(data.likedSongs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLikedSongs();
  }, [user_id]);

  const handleNext = () => {
    if (selectedMp3Index < likedSongs.length - 1) {
      setSelectedMp3Index(selectedMp3Index + 1);
    }
  };

  const handlePrevious = () => {
    if (selectedMp3Index > 0) {
      setSelectedMp3Index(selectedMp3Index - 1);
    }
  };

  return (
    <div className="liked-songs-container">
      <div className="left-panel-liked">
        <Navbar user_id={user_id} />
        {/* You can add additional content to the left panel here */}
      </div>
      <div className="song-list-container-liked">
        <ul className="song-buttons-liked" type="none">
          {likedSongs.map((likedSong, index) => (
            <li key={index}>
              <div className="song-container-liked">
                <button
                  className="song-button-liked"
                  onClick={() => setSelectedMp3Index(index)}
                >
                  {likedSong}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="selected-component-container-liked">
        {selectedMp3Index !== null && (
          <div className="selected-component-liked">
            <M
              mp3Ul={likedSongs[selectedMp3Index]}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedSongs;
