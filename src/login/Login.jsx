import React from 'react'
import "./login.css"
import { auth } from "../firebase-config"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
const Login = ({SetUserData,SetIsAuth}) => {
  let navigate = useNavigate();

    const googleSignIn = () =>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
          SetIsAuth(true);
          window.localStorage.setItem("isAuth", true);
          SetUserData(result.user);
          navigate("/home");
        }).catch((error) => {
          console.log("error")
        });
    }

  return (
    <div className='login'>
      
        <div className="login-image"></div>
        <div className="login-content">
            <h2 className="title">
                Make your dream carrer with jobs.
            </h2>
            <p className="content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti perferendis laborum voluptatem necessitatibus a laudantium minima sint tenetur illum, reiciendis tempore itaque nostrum ex, provident, assumenda incidunt vitae velit nesciunt.
            </p>
            <button className='google' onClick={googleSignIn}>Sign-in with Google</button>
        </div>
        
    </div>
  )
}

export default Login