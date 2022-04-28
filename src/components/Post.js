import React from 'react'
import "../styles/Post.css"
import { Avatar } from '@mui/material'


function Post({userName, source, caption }) {
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
        {/* header -> avatar + username

        
        image

        username + caption */}
    </div>
  )
}

export default Post