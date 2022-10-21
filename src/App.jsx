import React, { useState } from 'react';
import './styles.css';

const initialValue = {
  artist: '',
  song: '',
  
}

function App() {

  const [values, setValues] = useState(initialValue)
  const [lyric, setLyric] = useState('')

  function onChange(ev) {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value });
  }

  async function searchLyric(artist,song){

    try{
    const response  = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)
    const data = await response.json()

    if(data.lyrics)
      setLyric(data.lyrics)
    else
    setLyric(data.error)
      
      
    }
    catch(err){
    console.log(err)
      
    }
  }

  function onSubmit(ev) {
    ev.preventDefault(); 
    setLyric("searching")
    searchLyric(values.artist, values.song)

  }
    
    

    



  return (
      <>
      <div className="container" >
        <form onSubmit={onSubmit}>
          <h1>Buscador de letras de músicas</h1>
          <div className="inputsContainer">
            <div className="">
                  <label htmlFor="artist">Artista: </label>
                  <input name='artist' id="artist" type="text" onChange={onChange} placeholder='digite o nome do artista' /> 
            </div>
            <div className="">
                  <label htmlFor="song">Música: </label>
                  <input name='song' id="song" type="text" onChange={onChange} placeholder='digite o nome da música' /> 
            </div>
          </div>
          <button type="submit">Buscar Música</button>
        </form>
      </div>
      <div className="lyric">
          {lyric  == "searching" ? "Procurando música..." : lyric }
          
      </div>
    </>
  )
}

export default App
