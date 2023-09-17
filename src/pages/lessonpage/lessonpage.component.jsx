import React from "react";

import { Link, useParams, useNavigate } from "react-router-dom";

import "./lessonpage.component.css"
import data from "../../firebase/db.json"
import Button from '@mui/material/Button';

import done from "../../images/done.png";
import lock from "../../images/lock.png";

function LessonPage() {
    let { num } = useParams();
    let navigate = useNavigate();

    return (
        <div>
            <div className="lesson-header">
                <h1>Lesson {num}</h1>
                <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>
            </div>
            <div className="circle-grid">
                {
                    data[`lesson${num}`]["lessons"].map((lesson, idx) => 
                        lesson.complete ?
                        <div 
                            className="lesson-links circle circle-complete"
                            key={idx}
                        >
                            <img src={done} className="circle circle-complete"></img>
                        </div> :
                        lesson.locked ? 
                        <div 
                            className="lesson-links circle circle-locked"
                            key={idx}
                        >
                            <img src={lock} className="circle circle-locked"></img>
                        </div> : 
                        <Link 
                            className="lesson-links circle"
                            to={lesson.name} 
                            key={idx}
                        >
                            <div>{lesson.name}</div>
                        </Link>
                    )
                }
            </div>
        </div>
    );
  }

export default LessonPage;