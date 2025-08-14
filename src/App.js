import logo from './BroaredLogo.png';
import './App.css';
import Project from './Project';
import { useEffect, useState } from 'react';
import React from "react";


export default function App()  {
  const [obj, setObj] = useState([]);

  const fetchObjs = async () => {
    const url = 'http://localhost:3000/project';

    try{
      const response = await fetch(url);
      const obj = await response.json();
      console.log( obj);
      setObj(await obj);
    } catch (error){
      console.log(error);
    }
  };
  
  

  useEffect(() => {
    fetchObjs();
   
  }, []);

  const [putName, setPutName] = useState('');
  function postObjs () {
    
    
    console.log("Adding a new object");
    const url = 'http://localhost:3000/project/post';
    const data =   {id: '', name: '', img: '', task: '',  technologies: '', authors: '', notes: ''};

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Error', error);
    });
    fetchObjs();
  };

   function putObjs ( putId) {
    
     console.log("putName: " + putName);
     console.log("PutId: " + putId);
     console.log("Putting a new object");
     const url = 'http://localhost:3000/project/put';
     const data =   {id: putId, name: putName, img: '', tasks: '', completionlevel: '', technologies: '', authors: '', notes: ''};

     fetch(url, {
      method: 'PUT',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(data),
     })
     .then(response => response.json())
     .then(data => console.log(data))
     .catch((error) => {
       console.error('Error', error);
         });
         fetchObjs();
   };

  
  
  return (
    <div className="App">
      <img src = {logo}></img>
      <h1>Broard</h1>
      
      <h2>Visualise Your Project Timelines</h2>
      {/* <button onClick={postObjs} >New Project</button> */}
      <div className="card">
        <div className="container">
        <ol>
        {obj?.map((data) => (
          <>
        
            <ul  key={data.id}>
             <p>Project name: <input value = {putName}  onChange={(e) =>{
              setPutName(e.target.value)
              putObjs(data.id);
             }
             }
               ></input>
                <h1>{data.name}</h1>
             </p> 
              <p>Image: <h1 contentEditable="true" suppressContentEditableWarning={true} onInput={e => putObjs(data.id, '', e.currentTarget.value, '', '', '', '', '')}>{data.img}</h1></p>
              <p>Tasks: <h1 contentEditable="true" suppressContentEditableWarning={true} >{data.tasks}</h1></p>
              <p>Completion Level: <h1 contentEditable="true" suppressContentEditableWarning={true}>{data.completionlevel}</h1></p>
              <p>Technologies: <h1 contentEditable="true" suppressContentEditableWarning={true}>{data.technologies}</h1></p>
              <p>Authors: <h1 contentEditable="true" suppressContentEditableWarning={true}>{data.authors}</h1></p>
              <p>Notes: <h1 contentEditable="true" suppressContentEditableWarning={true}>{data.notes}</h1></p>
              
              
              
              </ul>
          
          
          </>
        ))}
        </ol>
      </div>
    </div>
    </div>  
  );
}

