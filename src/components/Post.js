import React, { useState, useEffect} from 'react'
import "../styles/Post.css"
import { Avatar } from '@mui/material'
import { collection, onSnapshot,add, Timestamp, DataSnapshot,updateDoc, addDoc} from 'firebase/firestore'
import {  uploadBytes, listAll, getDownloadURL, getStorage } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { ref } from "firebase/storage";
import { db, auth } from "./firebase";


function Post({userName, source, caption, postId,userSigned }) {



  const [comment,setComment] = useState("")
  const [comments, setComments] = useState([]);


  // const docSnap = async () => await getDoc(docRef);
  const [user,setUsers]=useState(null)


  const docRef = doc(db, "posts", postId);

  useEffect(()=>{
    if(postId){
      const stepOne = collection(db,"posts")
      const stepTwo = doc(stepOne,postId)
      const stepThree = collection(stepTwo,"comments")
      const stepFour = onSnapshot(stepThree,((snapshot)=>setComments(snapshot.docs.map((doc)=>doc.data()))))
    }
  },[postId])


  const postComment = (e) => {
    e.preventDefault();
    const stepOne = collection(db,"posts")
    const stepTwo = doc(stepOne,postId)
    const stepThree = collection(stepTwo,"comments")
    addDoc(stepThree, {
      text: comment,
      userName: userSigned.displayName
    });
    setComment(" ")
  }

  const allComments = comments.map((comment)=><p className = "post_comments">
    <strong>{comment.userName}</strong>
    <>{" "}{comment.text}</>
  </p>)
  
  

  return (
    <div className = "post">
        <div className = "post_header">
            <Avatar 
            className = "post_avatar"
            alt="Tokyo" 
            src="/static/images/avatar/1.jpg" 
            />
            <h3>{userName}</h3>
        </div>

        <img  className = "post_image" src = {source}/>

        <h4 className = "post_text"><strong>{userName}:</strong> {caption}</h4>

        {allComments}
       {userSigned&& <form className = "post_inputBox">
          <input
              className = "post_input"
              placeholder = "Add a comment"
              type = "text"
              value = {comment}
              onChange = {(e)=>setComment(e.target.value)}
              />
              
            <button
            className = "post_button"
            type = "submit"
            disabled={!comment}
            onClick = {postComment}>Post</button>
        </form>}
        {/* header -> avatar + username

        
        image

        username + caption */}
    </div>
  )
}

export default Post