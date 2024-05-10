import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpLong, faDownLong, faRoad} from '@fortawesome/free-solid-svg-icons'
import alarm from "./assets/alarm.wav"
import './App.css'


function App() {
  const [time1, settime1] = useState(5)
  const [time2, settime2] = useState(25)
  const [keystart, setkey] = useState(false)
  const [timepass, Setimepass] = useState(0)
  const strattime = useRef(0)
  const interval = useRef(null)
  const [reset1, setreset1] = useState(25)
  const [isRunning, setIsRunning] = useState(false) // Nueva variable de estado
  const [word, setword] = useState("Session")
  const [classbkc,setclassbkc] = useState('container2')
  useEffect(() => {
    if (keystart && !isRunning) { // Verifica si el cronómetro está en ejecución
      interval.current = setInterval(() => {
        let remainingTime = Math.max(0, Math.ceil((reset1 * 60 * 1000 - timepass) / 1000));
        if (remainingTime === 0) {
          if (word==="Session"){
            setword("Break")
          }else{
            setword("Session")
          }
          clearInterval(interval.current);
          strattime.current = Date.now()+7450;
          Setimepass(0);
          setIsRunning(true)
          audio();
          setclassbkc("container2 background")
          if (time1 === time2) {
            setreset1(time2);
          } else {
            setreset1(time1);
          }
          setTimeout(() => {
            setIsRunning(false); // Establece isRunning en false después de 8 segundos
            setclassbkc("container2")
          }, 7500);
        } else {
          Setimepass(Date.now() - strattime.current);
        }
      }, 10);
    } else {
      clearInterval(interval.current);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [keystart, timepass, isRunning]);

  function start() {
    setkey(true)
    strattime.current = Date.now() - timepass
  }

  function audio() {
    const audio = new Audio(alarm)
    audio.play()
  }

  function stop() {
    setkey(false)
  }

  function increset1() {
    if (time1 >= 1) {
      settime1(time1 + 1)
    }
  }

  function decreset1() {
    if (time1 > 1) {
      settime1(time1 - 1)
    }
  }

  function increset2() {
    if (time2 >= 1) {
      settime2(time2 + 1)
      setreset1(time2 + 1)
    }
  }

  function decreset2() {
    if (time2 > 1) {
      settime2(time2 - 1)
      setreset1(time2 - 1)
    }
  }

  function reset() {
    Setimepass(0)
    stop()
    settime1(5)
    settime2(25)
    setreset1(25)
  }

  function Format({ time }) {
    let remainingTime = Math.max(0, Math.ceil((time * 60 * 1000 - timepass) / 1000));
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    let milliseconds = Math.floor((timepass % 1000) / 10);
    let formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    let formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    let formattedMilliseconds = milliseconds < 10 ? `0${milliseconds}` : `${milliseconds}`;

    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  }

  function Breaklength({ text, number, increset, decreset, id1}) {
    return (
      <>
        <div className='container'>
          <p>{text}</p>
          <div id={id1} className='display'>
            <button className='button2 pointer' onClick={increset} ><FontAwesomeIcon icon={faUpLong}/></button>
            <p>{number}</p>
            <button className='button2 pointer' onClick={decreset} ><FontAwesomeIcon icon={faDownLong} /></button>
          </div>
        </div>
      </>
    )
  }

  return (
    <div id='container-principal' className='principal'>
      <h1>25 + 5 Clock</h1>
      <div id='container' className='display'>
        <Breaklength text={"Break Length"} number={time1} increset={increset1} decreset={decreset1} id1={"break-label"} buttonword={1}/>
        <Breaklength text={"Session Length"} number={time2} increset={increset2} decreset={decreset2} id1={"session-label"} />
      </div>
      <div id="container2" className={classbkc}>
        <p className="title-word" id='word'>{word}</p>
        <p id='format-time' className='format-time-display'><Format time={reset1} /></p>
      </div>
      <button className='pointer' onClick={start}>Start</button>
      <button className='pointer' onClick={stop}>Stop</button>
      <button onClick={reset} className='pointer'>Reset</button>
      <p id='author'>Dising and Code by Cesar Gonzalez</p>
      <div id='icons' >
        <img src='https://cdn-icons-png.flaticon.com/256/15772/15772810.png' id='react' className='img' />
        <img src="https://cdn-icons-png.flaticon.com/256/5968/5968292.png" id='js' className='img' />
      </div>
    </div>
  )
}

export default App
