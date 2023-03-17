import React, { useState, useEffect } from 'react';

function CorrectSymbol({visibility, image}) {

  return (
    <div>
      {/* {visibility && <img src="checkmark.png" width="50" height="50"/>} */}

      {visibility &&    <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
        >
          <img src={image} alt="overlay image" />
        </div>}

    </div>

  ) 
}


function CorrectCounter({correctamount}){

  return(

    <h2>Score: { correctamount }</h2>

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


  function handleImageClickSong1() {
    // console.log("clicked1")
    // console.log(song1["popularity"])
    if ( song1["popularity"] >= song2["popularity"] ) {
      console.log("Correct!");

      setCorrectAmount(prevCount => prevCount + 1);

      setImage("checkmark.png")

      setVisibility(true);

      // Set the visibility back to true after 3 seconds
      setTimeout(() => {
        setVisibility(false);
      }, 2000);

    }

    else{
      setCorrectAmount(0)

      setImage("redx.png")

      setVisibility(true);

      // Set the visibility back to true after 3 seconds
      setTimeout(() => {
        setVisibility(false);
      }, 2000);

    }
    handleButtonClick()
  }

  function handleImageClickSong2() {
    console.log("clicked2 ")
    if (song2["popularity"] >= song1["popularity"]) {
      console.log("Correct!");

      setCorrectAmount(prevCount => prevCount + 1);

      setImage("checkmark.png")

      setVisibility(true);

      // Set the visibility back to true after 3 seconds
      setTimeout(() => {
        setVisibility(false);
      }, 2000);

    }

    else{
      setCorrectAmount(0)

      setImage("redx.png")

      setVisibility(true);

      // Set the visibility back to true after 3 seconds
      setTimeout(() => {
        setVisibility(false);
      }, 2000);

    }
    handleButtonClick()
  }

return (
  <div className="centeritems">
    <button onClick={handleButtonClick}>
      {isLoading ? 'Loading...' : 'Get new data'}
    </button>
    {song1.length !== 0 && song2.length !== 0 ? (
      <div className="sideways">
        <div className="ontop">
          <div>{song1.artist}</div>
          <div>{song1.name}</div>
          <button onClick={handleImageClickSong1} class ="inpbuttonimg">
            <img src={song1.image} width="512" height="700" />
          </button>
        </div>
        <div className="ontop">
          <div>{song2.artist}</div>
          <div>{song2.name}</div>
          <button onClick={handleImageClickSong2} class ="inpbuttonimg">
            <img src={song2.image} width="512" height="700" />
          </button>
        </div>
      </div>
    ) : null}
  </div>
);
}

function App() {
  const [correctamount,setCorrectAmount] = useState(0)
  const [isVisible,setVisibility] = useState(false);
  const [image, setImage] = useState("checkmark.png")

  return (
    <div className="centeritems">

      <h1>Which song is more popular?</h1>  

      <CorrectSymbol visibility={isVisible} image={image}/>

      <CorrectCounter correctamount={correctamount}/>

      <DataComponent 
        setCorrectAmount={setCorrectAmount} 
        setVisibility={setVisibility} 
        setImage ={setImage}
        />

     
      
    </div>
  );
}

export default App;