import React from 'react'
import "../styles/ImageUpload.css"
import { useState, useEffect } from "react"
import { Button } from '@mui/material'
import { storage, db } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL, getStorage } from "firebase/storage";
import { collection, onSnapshot,add, Timestamp } from 'firebase/firestore'
import { doc, setDoc, addDoc, serverTimestamp, FieldValue} from "firebase/firestore"; 
import { FirebaseError } from 'firebase/app';

import {v4} from "uuid"

// const stepOne = collection(db,"posts")
// const stepTwo = doc(stepOne,postId)
// const stepThree = collection(stepTwo,"comments")
// const stepFour = onSnapshot(stepThree,((snapshot)=>snapshot.docs.map((doc)=>console.log(doc.data()))))



function ImageUpload(
    {username}
    ) {

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const [progress,setProgress] = useState(0);
    const imageListRef = ref(storage, "images/")


    const handleChange = (e) => {
            setImage(e.target.files[0])
    };

    const handleCaption = (e) => {
        setCaption(e.target.value)
    }

    const handleUpload = () => {
        if(image === null){
            return;
          }

           const imageRef = ref(storage, `images/${image.name + v4()}`)
           const uploadedImage = uploadBytes(imageRef, image).then((response)=>{
           getDownloadURL(response.ref).then((url)=>
           {
               addDoc(collection(db,"posts"),{
                   timestamp:serverTimestamp(),
                   userName:username, 
                   caption:caption,
                   imageUrl:url
               })
           }
    
          
         )      
            alert(`Image Uploaded`)
            setProgress(0);
            setCaption("");
            setImage(null);
        }).catch((error)=>console.log(error.message))
        
        //    console.log('this is it')
   
           };

  return (
    <div className = "image_upload">
        <input type = "type" placeholder = "Enter a caption..." value ={caption} onChange = {handleCaption}/>
        <input type = "file" onChange = {handleChange}/>
        <Button onClick = {handleUpload}>Submit</Button>
    </div>
  )
}

export default ImageUpload


     //    const getUrl = listAll(imageListRef).then((response)=>response.items.forEach((item)=>getDownloadURL(item).then((url)=>
        //    addDoc(collection(db,"posts"),{
        //     userName:username, 
        //     caption:caption,
        //     imageUrl:url
        //    })
        // //    console.log(collection(db,"posts"))
        //    )))
