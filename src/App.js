import React, { useState, useEffect } from 'react';

function CorrectSymbol({visibility, image}) {

  return (
    <div>

      {visibility &&  
        <div class = "overlayimage correct-symbol" 
          style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              justifyContent: "center",
              // backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 3,
            }}>
            <img src={image} alt="overlay image" width="300px"/>
          </div>
      }

    </div>
  ) 
}

function CorrectCounter({correctamount}){
  return(
    <h2 class = "correct-counter" style={{
          position: "absolute",
          top: -20,
          left: 30,
          zIndex: 3,
        }}>Score: { correctamount }</h2>
  )
}


function DataComponent({ setCorrectAmount, setVisibility , setImage}) {
  const [song1, setSong1] = useState([]);
  const [song2, setSong2] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
 
  function GrabData(){
    setIsLoading(true);
    return fetch('http://localhost:5000/data')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setIsLoading(false);
        setSong1(data);
        return data;
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }

  function handleButtonClick() {
    setIsLoading(true);
    Promise.all([GrabData(), GrabData()])
      .then(([data1, data2]) => {
        setSong1(data1);
        setSong2(data2);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    handleButtonClick();
  }, []);



  function changeImageWithTime(image,time){
    setImage(image)
    setVisibility(true);
    // Set the visibility back to true after { time } seconds
    setTimeout(() => {
      setVisibility(false);
    }, time);

  }


  function HandleCorrectOrNotClick(guessed,other) {
    console.log("guessed")
    if (guessed["popularity"] >= other["popularity"]) {
      console.log("Correct!");

      setCorrectAmount(prevCount => prevCount + 1);
      changeImageWithTime("checkmark.png",1500)

    }

    else{
      setCorrectAmount(0)
      changeImageWithTime("redx.png",1500)
    }

    handleButtonClick()
  }


  function handleImageClickSong2() {
    HandleCorrectOrNotClick(song2,song1)
  }

  function handleImageClickSong1() {
    HandleCorrectOrNotClick(song1,song2)
  }


return (
  <div className="centeritems">
    {/* <button onClick={handleButtonClick}>
      {isLoading ? 'Loading...' : 'Get new data'}
    </button> */}
    {song1.length !== 0 && song2.length !== 0 ? (
      <div>
  <ArtistWithImage song={song1} functionClick = {handleImageClickSong1} />
  <ArtistWithImage song={song2} functionClick = {handleImageClickSong2} />
  </div>
    ) : null}
  </div>
);
}

  function ArtistWithImage ({ song, functionClick })   { 
    return (
      <div className="ontop">
          <button onClick={functionClick} className="inpbuttonimg">
                      
              <div className="song-info">
                <div className="background">
                  <p>{song.name}</p>
                </div>
                <div className="background-artist">
                  <p>{song.artist}</p>
                </div>
            </div>

            <img src={song.image} className="fullscreen-image" alt="Song album cover"
             onError={event => event.target.src = '/public/musicsymbol.png'} />
          </button>
      </div>
    );
  }

function App() {
  const [correctamount,setCorrectAmount] = useState(0)
  const [isVisible,setVisibility] = useState(false);
  const [image, setImage] = useState("checkmark.png")

  return (
    <div className="centeritems">

      <div className='ontop'>

        <CorrectSymbol visibility={isVisible} image={image}/>

        <CorrectCounter correctamount={correctamount}/>

      </div>

      <DataComponent 
        setCorrectAmount={setCorrectAmount} 
        setVisibility={setVisibility} 
        setImage ={setImage}
        />
      
    </div>
  );
}

export default App;