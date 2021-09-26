import React, { useState,useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import axios from 'axios'

require('react-big-calendar/lib/css/react-big-calendar.css');




const Home=(props)=>{
    const [id, setId] = useState();
    const[event, setEvent] = useState([]);

    const filterEvents = event.map(d => ({
        start: d.date_time,
        end: d.date_time,
        title: d.FullName,
    }))
    useEffect(() => {
        setId(props.location.state.id);
        axios.post('http://localhost:8004/schedule', {
                id:props.location.state.id,
        }).then(response=> {
        setEvent(response.data.details);
        })
    },[]) 

    const localizer = momentLocalizer(moment)
    
    return(
        <div >
            <Calendar
      localizer={localizer}
      events={filterEvents}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
        </div>
    )}  
    export default Home;