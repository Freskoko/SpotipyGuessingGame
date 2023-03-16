import React, { useState, useEffect } from 'react';

//TODO SOME STUFF


function CorrectCounter({correctamount}){

  return(

    <p>{ correctamount }</p>

  )
}


function DataComponent({ setCorrectAmount }) {
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
    }
  }
  function handleImageClickSong2() {
    console.log("clicked2 ")
    if (song2["popularity"] >= song1["popularity"]) {
      console.log("Correct!");

      setCorrectAmount(prevCount => prevCount + 1);

    }
  }

  return (
    <div className="centeritems"> 
      <button onClick={handleButtonClick} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get new data'}
      </button>¨


      <div class="sideways">

          <div class="ontop">
            
              <div>

              {song1["artist"]}
              {song1["name"]}

              </div>

              
              <button onClick={handleImageClickSong1}>
                <img src={song1["image"]} width="212" height="700"/>
              </button>
              

          </div>



          <div class="ontop">
            
              <div>

              {song2["artist"]}
              {song2["name"]}

              </div>

          
              <button onClick={handleImageClickSong2}>
                <img src={song2["image"]} width="212" height="700"/>
              </button>

          </div>


      </div>

    </div>
  );
}

function App() {
  const [correctamount,setCorrectAmount] = useState(0)

  return (
    <div className="centeritems">

      <h1>Guess the song!</h1>  

      <CorrectCounter correctamount={correctamount}/>

      <DataComponent setCorrectAmount={setCorrectAmount}/>
      
    </div>
  );
}

export default App;