import logo from './BroaredLogo.png';
import './App.css';
import Project from './Project';
import { useEffect, useState } from 'react';
import React from "react";
import axios from 'axios';

// const apiCall = () => {
//   axios.get('http://localhost:8080').then((data) =>{
//     const obj = JSON.parse(data);
//     console.log(obj);
//   });
// }


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
    postObjs ();
  }, []);

  function postObjs () {
    
    
    console.log("Adding a new object");
    const url = 'http://localhost:3000/project/post';
    const data =   {id: '3', name: '', img: '', task: '',  technologies: '', authors: '', notes: ''};

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

  // function putObjs ( putId) {
    
    
  //   console.log("Putting a new object");
  //   const url = 'http://localhost:8080/data/put';
  //   const data =   {id: putId, name: '', img: '', tasks: '', completionlevel: '', technologies: '', authors: '', notes: ''};

  //   fetch(url, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  //   .catch((error) => {
  //     console.error('Error', error);
  //   });
  //   fetchObjs();
  // };
  //  const[projects, setProjects] = useState(proj);
  //  const[name, setName] = useState('');
  //  const[img, setImg] = useState('');
  //  const[technologies, setTech] = useState('');
  //  const[authors, setAuthors] = useState('');
  //   function handleClick(){
  //         console.log("project being added");
  //   const insertAt = 1;
  //   const nextProjects = [
  //     ...projects.slice(0, insertAt),
  //     {id: nextId++, name: name, img: img, technologies: technologies, authors: authors},
  //     ...projects.slice(insertAt)
  //   ];
  //   setProjects(nextProjects);
  //  const [data, setData] = React.useState(null);

  
  // };
  
  
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
             <p>Project name: {data.name}<input
             /></p> 
              <p>Image: {data.img}<input/></p>
              <p>Tasks: {data.tasks}<input/></p>
              <p>Completion Level: {data.completionlevel}</p>
              <p>Technologies: {data.technologies}<input/></p>
              <p>Authors: {data.authors}<input/></p>
              <p>Notes: {data.notes}<input/></p>
              
              
              
              </ul>
          
          
          </>
        ))}
        </ol>
      </div>
    </div>
    </div>
      
    // 
    //   <div>Name: </div>
    //   <input
    //   value= {name}
    //   onChange={e => setImg(e.target.value)}
    //   />
    // <div>Image: </div>
    //   <input
    //   value= {img}
    //   onChange={e => setImg(e.target.value)}
    //   />

    //   <div>Technologies: </div>
    //   <input
    //   value= {technologies}
    //   onChange={e => setImg(e.target.value)}
 
    //   />

    //   <div>Authors: </div>
    //   <input
    //   value= {authors}
    //   onChange={e => setImg(e.target.value)}
    //   />
    //   <br></br>
    //   <br></br>
    //   <button onClick ={handleClick}><h1>Add Projects</h1></button>
     
     
    //     <ul>
    //          {projects.map(proj =>(
    // <li key = {proj.id}>
        
    //      <div> 
    //     <h1>Project Name:  {proj.name}</h1>
    //     <h1>img: <img src={proj.img}></img></h1>
    //     <h1>Tasks: {proj.tasks}</h1>
    //     <h1>Completion Level: {proj.completionlevel}</h1>
    //     <h1>Technologies: {proj.technologies}</h1>
    //     <h1>Authors: {proj.authors}</h1>
    //     <h1>notes: {proj.notes}</h1>
    //     </div>
       
    // </li>
    //          ))}
    //         </ul>
      
    // </div>
 
     
      
        
     
      
    
  );
}

