import logo from './logo.svg';
import './App.css';
import Auth from './components/auth';
import {auth, db, storage} from "./config/firebase"
import { useEffect, useMemo, useState } from 'react';
import {getDocs,collection,addDoc,deleteDoc,doc, updateDoc} from "firebase/firestore"
import { ref, uploadBytes } from 'firebase/storage';


//getDoc is also there for a single document
//Tip:use useMemo for firebase functions extensive
//set rules for db to allow to query the database
//in order to delete a doc, get doc by doc function from firestore


//allow write,update,delete: if request.auth != null && request.auth.uid == request.resource.data.userId;
//write-> combination of three things -> create,update,delete

function App() {
  const [movieList,setMovieList]=useState([]);
  const moviesCollectionRef=useMemo(()=>collection(db,"movies"),[])

  //New Movie States
  const [newMovieTitle,setNewMovieTitle]=useState("")
  const [newReleaseDate,setNewReleaseDate]=useState(0)
  const [isOscar,setIsOscar]=useState(false)

  //Update Title State
  const [updatedTitle,setUpdatedTitle]=useState("");


  //File Upload States
  const [fileUpload,setFileUpload]=useState(null);

  const getMovieList=async()=>{
    try{
    //READ THE DATA
    const data=await getDocs(moviesCollectionRef)
    const filteredData=data.docs.map((doc)=>({...doc.data(),id:doc.id}))
    console.log(filteredData)
    //SET THE MOVIE LIST
    setMovieList(filteredData)
    }
    catch(err){
      console.error(err)
    }
  }


  const deleteMovie=async(id)=>{
    try{
      const movieDoc=doc(db,"movies",id)
      await deleteDoc(movieDoc)
      getMovieList()
    }
    catch(err){
      console.error(err)
    }
  }


  useEffect(()=>{

  getMovieList()

  },[])

  const onSubmitMovie=async()=>{
    try{
      await addDoc(moviesCollectionRef,
        {
          title:newMovieTitle,
          releaseDate:newReleaseDate,
          receivedAnOscar:isOscar,
          userId:auth?.currentUser?.uid
        })
      getMovieList();
    }
    catch(err){
      console.error(err)
    }
  }

  const updateTitle=async(id)=>{
    try{
      const movieDoc=doc(db,"movies",id)
      await updateDoc(movieDoc,{title:updatedTitle})
      getMovieList()
    }
    catch(err){
      console.error(err)
    }
  }

  const uploadFile=async()=>{
    if(!fileUpload){
      return;
    }
    try{
      const filesFolderRef=ref(storage,`projectFiles/${fileUpload?.name}`)
      await uploadBytes(filesFolderRef,fileUpload)
    }
    catch(err){
      console.error(err)
    }
  }
  console.log(auth?.currentUser?.email)
  return (
    <div className="App">
      <Auth/>

      <div style={{margin:10}}>

        <input onChange={(e)=>setNewMovieTitle(e.target.value)} placeholder='movie title...'/>
        <input onChange={(e)=>setNewReleaseDate(Number(e.target.value))} placeholder='release date...' type='number'/>
        <input type='checkbox' checked={isOscar} onChange={(e)=>setIsOscar(e.target.checked)}/>

        <label>Received An Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie)=>(
          <div>
            <h1 style={{color:movie.receivedAnOscar ? "green" : "red"}}>{movie?.title}</h1>
            <p>{movie?.releaseDate}</p>
            <button onClick={()=>deleteMovie(movie.id)}>Delete Movie</button>
            <input placeholder='new title...' onChange={(e)=>setUpdatedTitle(e.target.value)}/>
            <button onClick={()=>updateTitle(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>

      <div>
        <input type='file' onChange={(e)=>setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
