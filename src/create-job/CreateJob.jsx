import React from 'react'
import { useState } from 'react';
import "./createjob.css"
import {db} from "../firebase-config";
import {addDoc,collection} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';


const CreateJob = ({userData}) => {
  const navigator = useNavigate();

  const [jobName , setJobName] = useState("");
  const [companyName , setCompanyName] = useState("");
  const [location, setLocation ] = useState("Remote");
  const [jobType, setJobType ] = useState("Full-Time");
  const [jobDescription, setjobDescription ] = useState("");
  const collectionRef = collection(db,"jobs");
  // eslint-disable-next-line new-parens
  const date = new Date;

  const PostOnline = async () =>{
    const postedOn = date.getDate() + '-' + date.getMonth() + "-" + date.getFullYear();
    await addDoc(collectionRef, {
      jobName: jobName,
      companyName: companyName,
      location: location,
      jobType: jobType,
      jobDescription: jobDescription,
      author: userData.displayName,
      authorId: userData.uid,
      postedOn: postedOn,
      applied: [],
    });
    navigator("/home");
  }

  return (
    <div className='postJob'>
      <div className="card">
        <h2 className='job-title'>Create a Job.</h2>
        <div className="inputs">
          <input onChange={(e)=>setJobName(e.target.value)} placeholder='Job Title' type="text" className='field' />
          <input onChange={(e)=>setCompanyName(e.target.value)} placeholder='Company Name' type="text" className='field' />
          <select onChange={(e)=>setLocation(e.target.value)} className='field' name="" id="">
            <option value="Remote">Remote</option>
            <option value="In-office">In-office</option>
          </select>
          <select onChange={(e)=>setJobType(e.target.value)} className='field' name="" id="">
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
          </select>
          <textarea onChange={(e)=>setjobDescription(e.target.value)} placeholder='Job Description' className='field description' cols="30" rows="10"></textarea>
        </div>
        <button onClick={PostOnline} className='post-button'>Post Job</button>
      </div>
    </div>
  )
}

export default CreateJob