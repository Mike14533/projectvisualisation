import logo from './BroaredLogo.png';
import './App.css';
import Project from './Project';


import React, {useEffect, useState} from 'react';


export default function App()  {
 
  const [parent, setParent] = useState(null);

  const [obj, setObj] = useState([]);
  const [taskObj, setTaskObj] = useState([]);
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
  
  const fetchTasks = async () => {
    const url = 'http://localhost:3000/project/getTasks';

    try{
      const response = await fetch(url);
      const taskObj = await response.json();
      console.log( taskObj);
      setTaskObj(await taskObj);
    } catch (error){
      console.log(error);
    }
  };

  useEffect(() => {
 
    fetchObjs();
    fetchTasks();
   
  }, []);

  const [putName, setPutName] = useState('');
  function handlePutName(e){
    setPutName(e.target.value);

  }

  const [putImage, setPutImage] = useState('');
  function handlePutImage(e){
    setPutImage(e.target.value);

  }

  const [postTask, setPostTask] = useState('');
  function handlePostTask(e){
    setPostTask(e.target.value);

  }

   const [putTask, setPutTask] = useState('');
  function handlePutTask(e){
    setPutTask(e.target.value);

  }

  const [putTech, setPutTech] = useState('');
  function handlePutTech(e){
    setPutTech(e.target.value);
  }

  const [putAuthor, setPutAuthor] = useState('');
  function handlePutAuthor(e){
    setPutAuthor(e.target.value);
  }

  function postObjs () {
    
    
    console.log("Adding a new object");
    const url = 'http://localhost:3000/project/post';
    const data =   {id: 0, name: '', img: '', task: '',  technologies: '', authors: '', notes: ''};
   
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Error', error);
    });
    fetchObjs();
  };

  function postTasks (postID) {
    
    fetchTasks();
    // console.log("Adding a new object");
     const url = 'http://localhost:3000/project/post/task';
     const data =   {id: postID, task: postTask};
    console.log(data.id);
    console.log(postTask);
     console.log(data.task);
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
     fetchTasks();
  };

   function putObjs ( putId, putName, putImage, putTech, putAuthor) {
    fetchObjs();
     console.log("putName: " + putName);
     console.log("PutId: " + putId);
     console.log("Putting a new object");
     const url = 'http://localhost:3000/project/put';
     
     const data =   {id: putId, name: putName, img: putImage, technologies: putTech, authors: putAuthor, notes: ''};

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

   function putTasks ( putId, putTask, putTaskNo) {
    fetchTasks();
     console.log("putName: " + putName);
     console.log("PutId: " + putId);
     console.log("Putting a new object");
     const url = 'http://localhost:3000/project/put/tasks';
     const data =   {id: putId, task: putTask, taskno: putTaskNo};

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
        
         
         fetchTasks();
   };

   function deleteProject(deleteProjId){
        fetchObjs();
     
     const url = 'http://localhost:3000/project/delete';
     const data =   {id: deleteProjId};

     fetch(url, {
      method: 'DELETE',
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
   }

   function deleteTask(dTaskId, dTaskNo ){
        fetchTasks();
     console.log(dTaskId );
     console.log(dTaskNo);
     const url = 'http://localhost:3000/project/delete/task';
     const data =   {id: dTaskId, taskno: dTaskNo};

     fetch(url, {
      method: 'DELETE',
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
        
         
         fetchTasks();
   }
  function listTasks(data, taskData){
    if(data.id === taskData.id){
      return(

         
        
            
            <p>{taskData.task}</p>
                
                 
       
        
                     
                  
      );
    }
  };
  
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = (taskData) => {
    console.log("clicked");
    const newArray = [...taskObj];
    const match = newArray.find((i, index) => {
      return i.task === taskData.task;
    })
    console.log(match);
    match.done = true;
    setTaskObj(newArray);
  };
 
    
 
  return (
    <div className="App">
      <img src = {logo}></img>
      <h1>Broard</h1>
      
      <h2>Visualise Your Project Timelines</h2>
       <button onClick={postObjs} >New Project</button> 
      <div className="card">
        <div className="container">
        <ol>
        {obj?.map((data) => (
          <>
        
            <ul  key={data.id}>
            <button className = "deleteButton" onClick={() => {
              deleteProject(data.id);
            }}>DELETE</button>
             
             <p><input className = "projName" placeholder={data.name}  onInput={(e) =>{
              handlePutName(e) 
             } 
              } 
              onBlur={  () => {
                  
                  putObjs(data.id, putName, data.image, data.technologies, data.authors)
                  }
                }
               >

               </input>
               
              </p>
              {/* <p>Image: <img src = {data.img} height = {100} width = {100}></img><input  placeholder="Image Address Here" onInput={(e) =>{
              handlePutImage(e) 
             }
            }></input></p> */}
              <h1>Tasks: </h1> <li>
               
                
                  
                {taskObj?.map((taskData) => (
                  
      
                  <p key = {taskData.taskNo}>
                     <p onClick={() => handleClick(taskData)}
                     className={taskData.done ? "isDone" : "in-progress"}
                     >
                      {listTasks(data, taskData)}
                      
                      </p>
                    <button onClick = {() => deleteTask(data.id, taskData.taskno)}>x</button>
                    <input   onInput={(e) =>{
              handlePutTask(e) 
             }
              }></input> 
                    <button onClick={() => {putTasks(data.id, putTask, taskData.taskno)}}>Edit Task</button>
                    <button>Task Completed!</button>
                    
                   
           
             
              </p>
              ))}

                
              <input   onInput={(e) =>{
              handlePostTask(e) 
             }
              }></input> 
               
              </li>
              <button onClick={() => {postTasks(data.id)}}>Add Task</button>  
              <p>Completion Level: <h1>{data.completionlevel}</h1></p>
              <progress value = {0.3}/>
              <p>Technologies: <input className = "projName" placeholder = {data.technologies} onInput={(e) =>{ handlePutTech(e)}}
              onBlur={() => {
                putObjs(data.id, data.name, data.image, putTech, data.authors)
              }}
              ></input></p>
              <p>Authors: <input className = "projName" placeholder = {data.authors} onInput={(e) =>{ handlePutAuthor(e)}}
              onBlur={() => {
                putObjs(data.id, data.name, data.image, data.technologies, putAuthor)
              }}
              ></input></p>
              <p>Notes: <textarea>{data.notes}</textarea></p>
              
              
              
              </ul>
          
          
          </>
        ))}
        </ol>
      </div>
    </div>
    </div>  
  );


}
