import React, { useState,useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import axios from 'axios'
import { Redirect } from 'react-router';
import Modal from './lessonModal';

require('react-big-calendar/lib/css/react-big-calendar.css');


const Home=(props)=>{
   
    const[id, setId] = useState();
    const[job, setJob] = useState("");
    const[event, setEvent] = useState([]);
    const[out,setOut] = useState(false);
    const[openModal, setModal] = useState(false)
    const filterEvents = event.map(d => ({
        start: d.date_time,
        end: d.date_time,
        title: d.ID,
    }))
    useEffect(() => {
        setId(props.location.state.id);
        setJob(props.location.state.title);
        if (props.location.state.title === "teachers"){
        axios.post('http://localhost:8004/teacherSchedule', {
                id:props.location.state.id,
        }).then(response=> {
        setEvent(response.data.details);
        })

    }
    else {
        // student view calender
        axios.post('http://localhost:8004/studentSchedule', {
                id:id,
        }).then(response=> {
        setEvent(response.data.details);
        })
    }
    },[openModal]) 

    const localizer = momentLocalizer(moment)
    const handleLogout =()=> {
        setId("");
        localStorage.clear();
        setOut(true);
    }
    const handleModal =()=> {
        setModal(true);
    }
    return(
        <div id="home">
            <div className="commandLine">
            <button className="plusbutton" onClick={handleModal}>
			+
			</button>
            <button className="logoutbutton" onClick={handleLogout}>
			Logout
			</button>
            </div>
            {!openModal && <Calendar
      localizer={localizer}
      events={filterEvents}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />}
    {openModal && <Modal id={id} title={job} isOpen={()=>setModal(true)} isClose={()=>setModal(false)}/>}
    {out && <Redirect to={{
            pathname: '/login'
        }}/>}
    </div>
    )}  
    export default Home;