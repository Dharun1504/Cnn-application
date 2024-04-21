import React, { useState, useEffect } from 'react';
import axios from 'axios';
import M from './M';

const Recommendation = () => {
  const [mp3Files, setMp3Files] = useState([]);
  const [selectedMp3Index, setSelectedMp3Index] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [currentRecommendationIndex, setCurrentRecommendationIndex] = useState(0);

  useEffect(() => {
    const fetchMp3Files = async () => {
      try {
        const response = await axios.get('/api/recommendmp3Files');
        setMp3Files(response.data);
        setSelectedMp3Index(0); 
      } catch (error) {
        console.error('Error fetching MP3 files:', error);
      }
    };

    fetchMp3Files();
  }, []);

  const handleMp3Click = (index, mp3FileName) => {
    setSelectedMp3Index(index);
    setCurrentRecommendationIndex(0);
    handleRecommendation(mp3FileName);
  };

  const handleRecommendation = (mp3FileName) => {
    setIsLoading(true);
    axios.post("http://localhost:5000/data", { url: mp3FileName })
      .then(response => {
        console.log(response.data.message);
        setRecommendations(response.data.recommendations);
        setCurrentRecommendationIndex(0);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error recommending MP3:', error);
        setIsLoading(false);
      });
  };

  const handleNextRecommendation = () => {
    setCurrentRecommendationIndex(currentRecommendationIndex + 1);
  };

  const handlePreviousRecommendation = () => {
    setCurrentRecommendationIndex(currentRecommendationIndex - 1);
  };

  return (
    <div>
      <h1>MP3 Files</h1>
      <ul>
        {mp3Files.map((mp3File, index) => (
          <li key={index}>
            <button onClick={() => handleMp3Click(index, mp3File.url)}>
              {mp3File.url}
            </button>
          </li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
      {recommendations.length > 0 && (
        <div>
          <h2>Recommendations:</h2>
          <ul>
            {recommendations.map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        </div>
      )}
      {selectedMp3Index !== null && (
        <div>
          <h2>Selected MP3: {mp3Files[selectedMp3Index].url}</h2>
          <M
            mp3Ul={mp3Files[selectedMp3Index].url}
            onNext={handleNextRecommendation}
            onPrevious={handlePreviousRecommendation}
          />
        </div>
      )}
    </div>
  );
};

export default Recommendation;
