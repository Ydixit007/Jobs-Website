import { auth , db} from '../firebase-config';
import { doc, updateDoc} from "firebase/firestore"
import { generateGradient } from './gradient';
import "./jobcard.css"

const JobCard = ({data , postId ,getJobs , UserData}) => {
    const grad = generateGradient();
    var applied = data.applied;

    const applyJob = async () =>{
      const jobDoc = await doc(db, "jobs", postId);
      applied.push(UserData.uid)
      updateDoc(jobDoc, {
        applied: applied,
      });
      getJobs();
    };
  return (
    <div className="job-card" style={{background: grad}}>
      <div className="card-content">
        <div className="card-header">
          <div className="info">
            <h2 className='card-title'>{data.jobName}</h2>
            <h4 className='company'>{data.companyName}</h4>
          </div>
          <h4 className='card-subtitle'>{data.location}<br />{data.jobType}</h4>
        </div>
        <div className="card-body">
          <p className='card-dis'>
            {data.jobDescription}
          </p>
        </div>
        <div className="apply">
          <div className="posted">
            <div className="by">{data.author}</div>
            <div className="on">{data.postedOn}</div>
          </div>
          <p className='total-app'>Applicants:- {applied.length-1}</p>
          {UserData.uid === data.authorId ? <></> : applied.includes(UserData.uid) ? <button className='apply-button'>Applied</button> : <button onClick={applyJob} className='apply-button'>Apply</button>}
        </div>
      </div>
    </div>
  )
}

export default JobCard

