import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [comic, setComic] = useState(null)

  useEffect(() => {
    axios
      .get('https://cors-anywhere.herokuapp.com/http://xkcd.com/info.0.json')
      .then((res) => setComic(res.data))
      .catch((err) => console.log(err))
  }, [])

  const fetchComic = (num) => {
    setComic(null)
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://xkcd.com/${num}/info.0.json`
      )
      .then((res) => setComic(res.data))
      .catch((err) => console.log(err))
  }

  if (!comic) {
    return <div>loading...</div>
  }

  return (
    <div className='App'>
      {comic.title}
      <button onClick={() => fetchComic(comic.num - 1)}>previous</button>
      <img src={comic.img} />
    </div>
  )
}

export default App
