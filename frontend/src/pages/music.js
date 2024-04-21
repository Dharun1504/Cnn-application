import React, { useState, useEffect } from 'react';
import M from './M'; 
import '../styles/music.css'; 
import { useParams } from 'react-router-dom';
import Navbar from './Navbar'; 

const AudioPlayer = () => {
  const { user_id } = useParams();
  const [mp3Files, setMp3Files] = useState([]);
  const [selectedMp3Index, setSelectedMp3Index] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const [likedSongs, setLikedSongs] = useState([]); 
  const songsPerPage = 10;
  const pageRangeDisplayed = 5;

  useEffect(() => {
    const fetchMp3Files = async () => {
      try {
        const response = await fetch('/api/mp3Files'); 
        if (!response.ok) {
          throw new Error('Failed to fetch MP3 files');
        }
        const data = await response.json();
        setMp3Files(data);
        setSelectedMp3Index(null); // Select the first song by default
      } catch (error) {
        console.error(error);
      }
    };

    fetchMp3Files();

    // Fetch user's liked songs from the database
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
  }, []);
  const handleMp3Click = (index) => {
    setSelectedMp3Index(index);
  };

  const handleLikeClick = async (mp3Url) => {
    try {
      const isLiked = likedSongs.includes(mp3Url);
      if (isLiked) {
        
        const response = await fetch(`/api/v1/${user_id}/likedSongs`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            songTitle: mp3Url,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to unlike the song');
        }
        console.log('Song removed from liked songs');
      } else {
       
        const response = await fetch(`/api/v1/${user_id}/likedSongs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            songTitle: mp3Url,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to like the song');
        }
        console.log('Song added to liked songs');
      }
  
      
      setLikedSongs((prevLikedSongs) => {
        if (isLiked) {
          return prevLikedSongs.filter((url) => url !== mp3Url);
        } else {
          return [...prevLikedSongs, mp3Url];
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleNext = () => {
    if (selectedMp3Index < mp3Files.length - 1) {
      setSelectedMp3Index(selectedMp3Index + 1);  
      if ((selectedMp3Index + 1) % songsPerPage === 0) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (selectedMp3Index > 0) {
      setSelectedMp3Index(selectedMp3Index - 1);
      if (selectedMp3Index % songsPerPage === 0) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(mp3Files.length / songsPerPage);

  const getPageNumbers = () => {
    let pageNumbers = [];
    if (totalPages <= pageRangeDisplayed) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const halfPageRange = Math.floor(pageRangeDisplayed / 2);
      let startPage = Math.max(1, currentPage - halfPageRange);
      let endPage = Math.min(totalPages, currentPage + halfPageRange);

      if (currentPage - startPage < halfPageRange) {
        endPage = Math.min(
          totalPages,
          startPage + pageRangeDisplayed - 1
        );
      } else if (endPage - currentPage < halfPageRange) {
        startPage = Math.max(
          1,
          endPage - pageRangeDisplayed + 1
        );
      }

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push('...');
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push('...');
        }
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  
  const startIndex = (currentPage - 1) * songsPerPage;
  const endIndex = Math.min(startIndex + songsPerPage, mp3Files.length);

  return (
    <div className="audio-player-container">
      <Navbar user_id={user_id}/> {/* Include the Navbar component */}
      <div className="song-list-container">
      <ul className="song-buttons" type="none">
  {mp3Files.slice(startIndex, endIndex).map((mp3File, index) => (
    <li key={index}>
      <div className="song-container">
        <button
          onClick={() => handleMp3Click(startIndex + index)}
          className="song-button"
        >
          {mp3File.url}
        </button>
        <button
          onClick={() => handleLikeClick(mp3File.url)}
          className={`like-button ${
            likedSongs.includes(mp3File.url) ? 'liked' : ''
          }`}
        >
          &#x2764;
        </button>
      </div>
    </li>
  ))}
</ul>


        <div className="pagination">
          {getPageNumbers().map((pageNumber, index) => (
            <button
              key={index}
              className={pageNumber === currentPage ? 'active' : ''}
              onClick={() =>
                typeof pageNumber === 'number'
                  ? paginate(pageNumber)
                  : null
              }
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
      <div className="selected-component-container">
        {selectedMp3Index !== null && (
          <div className="selected-component">
            <M mp3Ul={mp3Files[selectedMp3Index].url} onNext={handleNext} onPrevious={handlePrevious} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
