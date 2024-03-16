import { useState, useEffect} from 'react'

import './App.css'

import axios from 'axios'


function App() {
  const [quoteList, setQuoteList] = useState([])
  const [imageArray, setImageArray] = useState([])
  const [loaded, setLoaded] = useState()
  const [random, setRandom] = useState(0)
  const [change, setChange] = useState(false)

  useEffect(() => {
    axios.get('https://strengthened-treasure-houseboat.glitch.me/quotesList')
    .then(function(response) {
      setQuoteList(response.data.quotesList);
    })
    .catch(function(error) {
      console.log(error)
    })
  }, [])

  useEffect(() => {
    axios.get('https://picsum.photos/v2/list')
    .then(function(response) {
      setImageArray(response.data)
    })
    .catch(function(error) {
      console.log(error)
    })
  }, [])


  function loadFunction() {
    
    setLoaded(quoteList[random])
  }

  function handleClick() {
    let randomNumber = Math.floor(Math.random() * 24)
    setRandom(randomNumber)

    setChange(true)
  }

  return (
  <div className='start-container'>
    {!change ? <button id='start-btn' onClick={() => handleClick()}>Inspire-se!</button> : 
    <div className="quote-show">
    <img src={imageArray[random] ? imageArray[random].download_url : ""} alt="quote-bg"  onLoad={() => loadFunction()}/>
    <p id='quote'>{loaded ? loaded.quote : ""}</p>
    <p id='reload' onClick={() => handleClick()}><i class="bi bi-arrow-clockwise"></i></p>
  </div>
    }
  </div>
  )
}

export default App
