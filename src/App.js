import React, { useEffect, useState } from "react";

const App = () => {
  const [isstart, setisstart] = useState(false);

  const [hourse, setHours] = useState(0);
  const [minute, setMinutes] = useState(0);
  const [second, setSecond] = useState(0);

  const[timimerid,settimerid]=useState(0);

  const[isPossed,setispossed]=useState(false)

  const handleStart = () => {
    if(hourse<0 || minute<0 || second <=0)
    {
      alert("Invalid input")
    }
    else{
      setisstart(true);

    }
  };

  const Reset = () => {
    setisstart(false);
  };


  const hanldlePause =()=>{
    setispossed(true);
    clearInterval(timimerid)

  }

  const hanldleResume =()=>
  {
    setispossed(false);
    runTimer(second,minute,hourse)
    
  }

  const changehnadler = (e) => {
    console.log(e.target.id, e.target.value);
    const value=parseInt(e.target.value);
    const id=e.target.id;
    if(id==='hours'){
      setHours(value)
    }else if(id==='minute'){
      setMinutes(value)
    }else{
      setSecond(value)
    }

    
  };
  console.log(hourse,minute,second)

const  runTimer= (sec,min,hour,tid)=>{
  if(sec>0)
  {
    setSecond((s)=>s-1);
  }else if(sec===0 && min>0){
    setMinutes((m)=>m-1);
    setSecond(59);
  }else{
     setHours((h)=>h-1);
     setMinutes(59);
     setSecond(59);
  }
  if(sec===0 && min===0 && hour===0){
    setHours(0);
    setMinutes(0)
    setSecond(0)

    clearInterval(tid);
    alert("Timer Finish");
  }

}



  useEffect(()=>{

    let tid;
    //if isstart true hai to timer ko chala do
   if(isstart){
   tid =  setInterval(() => {

    runTimer(second,minute,hourse,tid);
      
    }, 1000);
  

    settimerid(tid);
  }

  return()=>{
    clearInterval(tid);
  }


  

    
  },[isstart,minute,hourse,second])
  return (
    <div>
      <h1>Counter app</h1>
      {!isstart && (
        <div className="input-contaienr">
          <div className="input-box">
            <input
              onChange={changehnadler}
              id="hours"
              type="text"
              placeholder="mm"
            />
            <input
              onChange={changehnadler}
              id="minute"
              type="text"
              placeholder="hh"
            />
            <input 
                    onChange={changehnadler}

            id="second" type="text" placeholder="ss" />
          </div>

          <button onClick={handleStart}>start</button>
        </div>
      )}

      {isstart && (
        <div className="timer">
          <div className="timer-input">
            <div>{hourse<10 ? `0${hourse}` : hourse}</div>
            <span>:</span>
            <div>{minute <10 ?`0${minute}`: minute}</div>
            <span>:</span>
            <div>{second <10 ?`0${second}`: second}</div>
          </div>
          <div>
            {
              !isPossed && (
                <button onClick={hanldlePause}>pause</button>

              )
            }
            {
              isPossed && (
                <button onClick={hanldleResume}>resume</button>

              )
            }
            <button onClick={Reset}>REset</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
