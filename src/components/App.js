import '../App.css';
import Post from './Post';
import { useState, useEffect } from 'react';
import { db, auth } from "./firebase";
import { collection, onSnapshot } from 'firebase/firestore'
import { createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword,signOut, updateProfile } from "firebase/auth"
import Modal from '@mui/material/Modal';
import { Button, Box, Typography, Input } from '@mui/material';
import { async } from '@firebase/util';
import ImageUpload from './ImageUpload';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,

  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {

  const postsCollectionRef = collection(db, "posts");
  

  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [openSignIn,setOpenSignIn] = useState(false);
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(authUser)=>{
      if(authUser){
        setUser(authUser)

        if(authUser.displayName){

        }else{
          return updateProfile(authUser, {
            displayName: username,
          })
        }

      } else {
        return setUser(null)
      }
    })
    return () => {
      unsubscribe();
    }
  },[user,username])

  useEffect(()=>{
    const getPosts = async () => {
    const unsub = onSnapshot(postsCollectionRef, (snapshot) => {
    setPosts(snapshot.docs.map(doc => ({
      id: doc.id,
      post: doc.data()
    })));
    });
    return unsub
    }

    getPosts()
  },[])

 const handleSubmit = async (e) => {
   e.preventDefault();

   try {
    const user = await createUserWithEmailAndPassword(auth,email,password).then((authuser)=>{return authuser.user.updateProfile(user, {displayName: username})})
    } catch (error) {
      alert(error.message);
    }
  setOpen(false)
 }

 const signIn = async (e) =>{
   e.preventDefault();

   try {
    const user = await signInWithEmailAndPassword(auth,email,password)
    console.log(user)
    } catch (error) {
      alert(error.message);
    }

    setOpenSignIn(false)

 }

  const allPosts = posts.map(({id, post})=>
  <Post key = {id} userName = {post.userName} caption ={post.caption} source = {post.imageUrl}/>);





  return (
    <div className="App">
      <ImageUpload />



      {user? 
      <Button onClick = {()=> signOut(auth)}>Logout</Button>:
      <div>
      <Button onClick = {()=> setOpenSignIn(true)}>Sign In</Button>
      <Button onClick = {()=> setOpen(true)}>Sign Up</Button>
      </div>
      }

<Modal
        className = {style}
        open={openSignIn}
        onClose={()=> setOpenSignIn(false)}
      >
           <Box sx={style}>
           <center>
           <form className = "app_signup">
          
        
              <img
              className = "app_headerImage" 
              src = "https://www.vectorlogo.zone/logos/instagram/instagram-ar21.png"
              alt ="IG Logo"
              />

              <Input
              placeholder = "email"
              type = "text"
              value = {email}
              onChange = {(e)=>setEmail(e.target.value)}
              />

              <Input
              placeholder = "password"
              type = "text"
              value = {password}
              onChange = {(e)=>setPassword(e.target.value)}
              />
              
              <Button type = "submit" onClick = {signIn}>Sign Up</Button>
           
          </form>
          </center>
        </Box>
      
      </Modal>

      <Modal
        className = {style}
        open={open}
        onClose={()=> setOpen(false)}
      >
           <Box sx={style}>
           <center>
           <form className = "app_signup">
          
        
              <img
              className = "app_headerImage" 
              src = "https://www.vectorlogo.zone/logos/instagram/instagram-ar21.png"
              alt ="IG Logo"
              />

              <Input
              placeholder = "username"
              type = "text"
              value = {username}
              onChange = {(e)=>setUserName(e.target.value)}
              />

              <Input
              placeholder = "email"
              type = "text"
              value = {email}
              onChange = {(e)=>setEmail(e.target.value)}
              />

              <Input
              placeholder = "password"
              type = "text"
              value = {password}
              onChange = {(e)=>setPassword(e.target.value)}
              />
              
              <Button type = "submit" onClick = {handleSubmit}>Sign Up</Button>
           
          </form>
          </center>
        </Box>
      
      </Modal>

      <div className = "app_header">
        <img
        className = "app_headerImage"
        src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt = "instagram logo">
        </img>
      </div>
      {allPosts}


      <h1>THIS BE THE INSTAGRAM CLONE</h1>

    </div>
  );
}

export default App;
