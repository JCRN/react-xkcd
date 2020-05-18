import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.scss'

function App() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [comic, setComic] = useState(null)
  const [latestComicNum, setLatestComicNum] = useState(null)

  const fetchComic = (num) => {
    setLoading(true)
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://xkcd.com/${num}/info.0.json`
      )
      .then((res) => setComic(res.data))
      .catch((err) => {
        console.log(err)
        setError(err)
      })
      .finally(() => setLoading(false))
  }

  const fetchLatestComic = () => {
    setLoading(true)
    axios
      .get('https://cors-anywhere.herokuapp.com/http://xkcd.com/info.0.json')
      .then((res) => {
        setComic(res.data)
        setLatestComicNum(res.data.num)
      })
      .catch((err) => {
        console.log(err)
        setError(err)
      })
      .finally(() => setLoading(false))
  }

  const fetchRandomComic = () => {
    let num = Math.floor(Math.random() * (latestComicNum - 1) + 1)
    fetchComic(num)
  }

  const ComicButtons = ({
    comic,
    latestComicNum,
    loading,
    fetchComic,
    fetchLatestComic,
    fetchRandomComic,
  }) => {
    return (
      <div className='buttons'>
        <button
          disabled={loading || comic.num === 1}
          onClick={() => fetchComic(1)}>
          first
        </button>
        <button
          disabled={loading || comic.num <= 1}
          onClick={() => fetchComic(comic.num - 1)}>
          previous
        </button>
        <button disabled={loading} onClick={() => fetchRandomComic()}>
          random
        </button>
        <button
          disabled={loading || comic.num === latestComicNum}
          onClick={() => fetchComic(comic.num + 1)}>
          next
        </button>
        <button
          disabled={loading || comic.num === latestComicNum}
          onClick={() => fetchLatestComic()}>
          latest
        </button>
      </div>
    )
  }

  useEffect(() => {
    fetchLatestComic()
  }, [])

  if (error) {
    return <div>error</div>
  }

  return (
    <div className='App'>
      <h1>{loading ? 'Loading...' : comic.title}</h1>
      <ComicButtons
        comic={comic}
        latestComicNum={latestComicNum}
        loading={loading}
        fetchComic={fetchComic}
        fetchLatestComic={fetchLatestComic}
        fetchRandomComic={fetchRandomComic}
      />
      {loading ? (
        <div className='loading'>
          <div className='spinner' />
        </div>
      ) : (
        <div className='comic'>
          <img src={comic.img} title={comic.alt} alt={comic.title} />
        </div>
      )}
      <ComicButtons
        comic={comic}
        latestComicNum={latestComicNum}
        loading={loading}
        fetchComic={fetchComic}
        fetchLatestComic={fetchLatestComic}
        fetchRandomComic={fetchRandomComic}
      />
    </div>
  )
}

export default App
