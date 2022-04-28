import React from 'react'
import { useState } from "react"
import { Button } from '@mui/material'
import { storage, db } from './firebase'

function ImageUpload() {

    const [image, setImage] = useState(null);
    const [progress,setProgress] = useState(0);
    const [caption, setCaption] = useState("");

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    };

    const handleUpload = () => {
           const uploadTask = storage.ref(`images/${image.name}`).put(image);
    };

  return (
    <div>
        <input type = "type" placeholder = "Enter a caption..." value ={caption} onChange = {(e)=>setCaption(e.target.value)}/>
        <input type = "file" onChange = {handleChange}/>
        <Button onClick = {handleUpload}></Button>
    </div>
  )
}

export default ImageUpload