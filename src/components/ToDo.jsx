import React, { useState } from 'react'
import '../components/todo.css'


const ToDo = () => {

  const [job, setJob] = useState('');
  const [listJobs, setListJobs] = useState([]);
  const [activeTag, setActiveTag] = useState('all');


  const handleAddJob = () => {
    if (job.trim() !== '') {
      const newJob = {
        id: job.length + 1,
        title: job,
        completed: false,
      };
      setListJobs([...listJobs, newJob]);
      setJob('');
    }
  };

  console.log(listJobs);

  const handleCompleteJob = (jobId) => {
    const newListJobs = listJobs.map((job) => {
      if (job.id === jobId) {
        return {
          ...job,
          completed: !job.completed,
        };
      }
      return job;
    });
    setListJobs(newListJobs);
  };

  const handleDeleteJob = (jobId) => {
    const newListJobs = listJobs.filter((job) => job.id !== jobId);
    setListJobs(newListJobs);
  };

  const handleDeleteAllJobs = () => {
    setListJobs([]);
  };

  const filteredJobs =  listJobs?.filter((job) => {
    
        if (activeTag === 'active') {
            return !job.completed;
        } else if (activeTag === 'complete') {
            return job.completed;
        }
        return true;
    });
  
  return (
    <div className="container">
      <h1>#ToDo</h1>
      <div className="tag-container">
        <span
          className={activeTag === 'all' ? 'active' : ''}
          onClick={() => setActiveTag('all')}
        >
          All
        </span>
        <span
          className={activeTag === 'active' ? 'active' : ''}
          onClick={() => setActiveTag('active')}
        >
          Active
        </span>
        <span
          className={activeTag === 'complete' ? 'active' : ''}
          onClick={() => setActiveTag('complete')}
        >
          Complete
        </span>
      </div>
      <div className="add">
        <input className='add-job' value={job} onChange={e => setJob(e.target.value)} placeholder="Enter a job" />
        <button className='btn-add' onClick={handleAddJob}>Add</button>
      </div>
      <div className='list-jobs'>
        <ul className="list">
          {filteredJobs.map((job) => (
            <li key={job.id} className={job.completed ? 'completed' : ''}>
              <span
                className="job-title"
                onClick={() => handleCompleteJob(job.id)}
              >
                {job.title}
              </span>
              <i
                className="fa-solid fa-trash"
                onClick={() => handleDeleteJob(job.id)}
              >
              </i>
            </li>
          ))}
        </ul>
        <button className="delete-all-button" onClick={handleDeleteAllJobs}>
          Delete All
        </button>
      </div>
    </div>
  )
}

export default ToDo;