import { useEffect, useState } from "react"; 
import useSound from "use-sound";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; 
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; 
import { IconContext } from "react-icons"; 
import '../styles/m.css';

function M({ mp3Ul, onNext, onPrevious }) { 
    const [isPlaying, setIsPlaying] = useState(false);
    const mp3Url=`${process.env.PUBLIC_URL}/${mp3Ul}`;
    
    console.log(mp3Url)
    const [play, { stop, pause, duration, sound }] = useSound(mp3Url); 
    const [currTime, setCurrTime] = useState({
        min: "",
        sec: "",
    });
    const [seconds, setSeconds] = useState(0);
    
    const playingButton = () => {
        if (isPlaying) {
            pause();
            setIsPlaying(false);        
        } else {
            play();
            setIsPlaying(true);
        }
    };
    
    useEffect(() => {
        const sec = duration / 1000;
        const min = Math.floor(sec / 60);
        const secRemain = Math.floor(sec % 60);
        setCurrTime({
            min: min,
            sec: secRemain
        });
    }, [duration]);
    
    useEffect(() => {
        if (sound) {
          const interval = setInterval(() => {
            setSeconds(sound.seek());
            const min = Math.floor(sound.seek() / 60);
            const sec = Math.floor(sound.seek() % 60);
            setCurrTime({ min, sec });
      
            console.log(sound.seek())
            // Calculate progress percentage
            const progress = (sound.seek() / duration) * 100;
            document.documentElement.style.setProperty('--progress', progress + '%');

          }, 1000);
          return () => clearInterval(interval);
        }
      }, [sound, duration]);
      
    
    useEffect(() => {
        if (isPlaying) {
            play();
        } else {
            pause();
        }
    }, [isPlaying, play, pause]);

    useEffect(() => {
        if (mp3Url !== null) {
            setIsPlaying(true);
        }
    }, [mp3Url]);

    useEffect(() => {
        if (mp3Url !== null) {
            play();
        }
        return () => {
            stop(); // Stop the currently playing song when unmounting or changing the URL
        };
    }, [mp3Url, play, stop]);

    return (
        <div>
            <div className="component">
                <h2>Playing Now</h2>
                <img
                    className="musicCover"
                    src={process.env.PUBLIC_URL + "/image1.png"}
                    alt="gh "
                />
                <div>
                    <h3 className="title1">{mp3Ul}</h3>
                
                </div>
                <div>
                    <div>
                        <div className="time">
                            <p>
                                {currTime.min}:{currTime.sec}
                            </p>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max={duration / 1000}
                            defaultValue="0" 
                            value={seconds}
                            className="timeline"
                            onChange={(e) => {
                                sound.seek(e.target.value);
                            }}
                        />
                    </div>
                    <button className="playButton">
                        <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                            <BiSkipPrevious onClick={onPrevious} /> 
                        </IconContext.Provider>
                    </button>
                    {!isPlaying ? (
                        <button className="playButton" onClick={playingButton}>
                            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                                <AiFillPlayCircle />
                            </IconContext.Provider>
                        </button>
                    ) : (
                        <button className="playButton" onClick={playingButton}>
                            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                                <AiFillPauseCircle />
                            </IconContext.Provider>
                        </button>
                    )}
                    <button className="playButton">
                        <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                            <BiSkipNext onClick={onNext} /> 
                        </IconContext.Provider>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default M;
