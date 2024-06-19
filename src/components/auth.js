import React, { useState } from 'react'
import {auth, googleProvider} from "../config/firebase"
import {createUserWithEmailAndPassword,signInWithPopup,signOut} from 'firebase/auth'
//Sign in with redirect is also there for google , opens in a new tab
const Auth = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

//   console.log(auth?.currentUser?.email) -> signed in user email 
// will initially not read on refresh, change something and it will print 

  console.log(auth?.currentUser?.email)
  console.log(auth?.currentUser?.photoURL)
  const signIn=async()=>{
    try{
    await createUserWithEmailAndPassword(auth,email,password)
    }
    catch(err){
        console.error(err)
    }
}

const signInWithGoogle=async()=>{
    try{
    await signInWithPopup(auth,googleProvider)
    }
    catch(err){
       
        console.error(err)
    }
}

  const Logout=async()=>{
    try{
        await signOut(auth)
        }
        catch(err){
            console.error(err)
        }
  }

  return (
    <div>
        <input type="email" placeholder='email' onChange={(e)=>{setEmail(e.target.value)}}/>
        <br/>
        <input type="password" placeholder='password...' onChange={(e)=>{setPassword(e.target.value)}}/>
        <br/>
        <button onClick={signIn} >Sign In</button>
        <br/>
        <button onClick={signInWithGoogle}>Sign in With Google</button>
        <br/>
        <button onClick={Logout}>Logout</button>
    </div>
  )
}

export default Auth