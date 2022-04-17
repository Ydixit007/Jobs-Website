import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {collection, getDocs } from "firebase/firestore"
import JobCard from '../jobCard/jobCard';
import {db , auth} from "../firebase-config";
import "./Home.css"
import { signOut } from 'firebase/auth';


const Home = ({UserData , SetIsAuth}) => {
  let navigate = useNavigate();
  
  const CreatePost = () =>{
    navigate("/post-job");
  }

  const [jobList, setJobList] = useState([]);
  const [filtered , SetFiltered] = useState([]);
  const collectionRef = collection(db,"jobs");
  
  useEffect(()=>{
    getJobs();
  },[]);

  const getJobs = async () =>{
    const data = await getDocs(collectionRef);
    setJobList(data.docs.map((docs)=>({...docs.data() , id: docs.id })));
    SetFiltered(data.docs.map((docs)=>({...docs.data() , id: docs.id })))
  }

  const logout = async () =>{
    await signOut(auth);
    window.localStorage.setItem("isAuth", false);
    SetIsAuth(false);
    navigate("/");
  }

  const sortData = (value) =>{
     let result = jobList.filter((data)=>{
       return data.jobName.search(value) !== -1;
     })
     SetFiltered(result)
  }

  return (
    <div className='homepage'>
      <header className='home-header'>
        <h2 className='title'>Discover Your Dream Job.</h2>
        <div className="icons">
          <button className='add-button' onClick={CreatePost}></button>
          <img onClick={logout} className='photo' src={UserData.photoURL} alt="logout" />
        </div>
      </header>
      <input onChange={(e)=>{sortData(e.target.value)}} className='search' type="text" placeholder='Search a job.' />
      <h2 className='pilot'>Recent Jobs.</h2>
      <div className="home">
        {filtered.map((job)=>{
          return <JobCard postId={job.id} key={job.id} data={job} getJobs={getJobs} UserData={UserData} />
        })}
      </div>
    </div>
  )
}

export default Home