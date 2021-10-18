import Modal from 'react-modal';
import React, { useState,useEffect } from 'react';
import axios from 'axios'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '40%',
      width: '40%',
      backgroundColor: "#d8564d",
    },
  };
  const LessonModal=(props)=>
  {
    const [teacherId, setTeacherId] = useState();
    const [teacherName, setTeacherName] = useState("");
    const [dateTime, setDateTime] = useState ("");
    const [location, setLocation] = useState();
    var isTeacher = false;
    if(props.title == "teachers"){
      isTeacher = true;
    }
    let subtitle;
    function afterOpenModal() {
        //subtitle.style.backgroundColor = "red";
      }
      function closeModal() {
        props.isClose();
      }
      const handleSubmit =()=> {
        if(dateTime && location){
          setTeacherId(props.id);
          setTeacherName(props.name);
        axios.post('http://localhost:8004/addLesson', {
          teacherId: props.id,
          teacherName: props.name,
          dateTime,
          location,
        }).then(response=> {
          props.isClose();
        })
        }
      }
      return(
        <div>
            <Modal
        isOpen={props.isOpen}
        //appElement={document.getElementById()}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add lesson</h2>
          {isTeacher ? 
          (
            <div>
            <label> Choose a time for your appointment:</label>
          <input type="datetime-local" id="meeting-time" onChange= {e=>setDateTime(e.target.value)}/>
          <select  className="location" onChange= {e=>setLocation(e.target.value)}>
          <option selected disabled>Lesson's Location:</option>
        	<option value="0">Zoom</option>
        	<option value="1">Student's House</option>
          <option value="2">Teacher's House</option>
          </select>
          <button className="formbutton" onClick={handleSubmit}>
			      Submit
			    </button> 
          <button className="closebutton" onClick={closeModal}>close</button>
          </div>
          ) : (
          <div>
          <input />
          <button>student</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
          <button className="closebutton" onClick={closeModal}>close</button>
          </div>
         )}
        </Modal>
        </div>
      )
    }
    export default LessonModal;