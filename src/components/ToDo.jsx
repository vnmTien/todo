import React, { useState, useRef } from 'react'
import '../components/todo.css'
import All from '../pages/All';
import Complete from '../pages/Complete';


const ToDo = () => {

  const storageJobs = JSON.parse(localStorage.getItem('jobs'));
  const storageActiveJobs = JSON.parse(localStorage.getItem('activeJobs'));
  const storageCompletedJobs = JSON.parse(localStorage.getItem('completedJobs'));

  const [job, setJob] = useState(storageJobs || []);
  const [isChecked, setIsChecked] = useState(false);
  const [completedJobs, setCompletedJobs] = useState(storageCompletedJobs || []);
  const [activeJobs, setActiveJobs] = useState(storageActiveJobs || []);
  const [renderTitle, setRenderTitle] = useState('All');
  const inputRef = useRef(null);

  const TitleJobs = ["All", "Active", "Completed"]

  const handleAddJob = () => {
    if (inputRef.current.value === '') return;
    const newJob = {
      id: job.length + 1,
      job: inputRef.current.value,
      isChecked: false
    };

    setActiveJobs(prev => {

      const saveJobs = [...prev, newJob]

      const jsonJobs = JSON.stringify(saveJobs)
      localStorage.setItem('jobs', jsonJobs)

      console.log(jsonJobs)

      return saveJobs
    });

    setJob(prev => {

      const saveJobs = [...prev, newJob]

      const jsonJobs = JSON.stringify(saveJobs)
      localStorage.setItem('jobs', jsonJobs)

      console.log(jsonJobs)

      return saveJobs
    });
    inputRef.current.value = '';

  };

  const checkJob = (item, e) => {
    job.map((item) => {
      if (item.id == e.target.id) {
        item.isChecked = !item.isChecked;
        setCompletedJobs(prev => [...prev, item]);
      }
    })
    filterActiveJobs(item);
    filterCompletedJobs(item);
    localStorage.setItem('jobs', JSON.stringify(job));
  };

  const filterCompletedJobs = () => {
    const completed = job.filter((item) => item.isChecked === true);
    setCompletedJobs(completed);
    localStorage.setItem('completedJobs', JSON.stringify(completed));
  };

  const filterActiveJobs = () => {
    const active = job.filter((item) => item.isChecked === false);
    setActiveJobs(active);
    console.log([setActiveJobs(active)])
    localStorage.setItem('activeJobs', JSON.stringify(active));
  };

  const handleDeleteJob = (jobId) => {
    const newJobs = job.filter((jobItem) => jobItem.id !== jobId);
    const newCompletedJobs = completedJobs.filter((job) => job.id !== jobId);
    setJob(newJobs);
    setCompletedJobs(newCompletedJobs);
  };

  const handleDeleteAllJobs = () => {
    const newJobs = job.filter((jobItem) => jobItem.isChecked !== true);
    setJob(newJobs);
    setCompletedJobs([]);
  };

  const titleRender = (title) => {
    setRenderTitle(title);
  ;}

  return (
    <div className="container">
      <h1>#ToDo</h1>
      <div className="task-status-container">
        <div className="task-status-display">
          {TitleJobs.map((item, index) => {
            return <div className="task-status-item" onClick={() => titleRender(item)} key={index}>{item}</div>
          })}
        </div>
      </div>
      <div className='active-container'>
        <div className="active-tasks">
          <div className="task-action">
            <div className="task-input">
              <input type="text" placeholder='Enter Your Job...' ref={inputRef} />
            </div>
            <button className='add-btn' onClick={handleAddJob}>Add</button>
          </div>
          {renderTitle === 'All' && job?.map((item, index) => { return (<All key={index} item={item} checkJob={checkJob} />) })}
          {renderTitle === 'Active' && activeJobs?.map((item, index) => { return (<All key={index} item={item} checkJob={checkJob} />) })}
          {renderTitle === 'Completed' && completedJobs?.map((item, index) => { return (<Complete key={index} item={item} checkJob={checkJob} deleteJob={handleDeleteJob} />) })}
          {renderTitle === 'Completed' && <button className='delete-btn' onClick={handleDeleteAllJobs}>Delete All</button>}
        </div>
      </div>
    </div>
  )
}


export default ToDo;