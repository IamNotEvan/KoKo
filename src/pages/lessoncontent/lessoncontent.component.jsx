import React, {useState, useEffect} from "react";

import { Link, useParams, useNavigate } from "react-router-dom";
import WebcamStreamCapture from "../../components/webcam-stream-capture/webcam-stream-capture.component";

import "./lessoncontent.styles.css"
// import data from "../../firebase/db.json";
import Button from '@mui/material/Button';
import BasicModal from "../../components/modal/modal.component";
import axios from "axios";

import useWindowSize from 'react-use/lib/useWindowSize'

import hello from '../../videos/hello.mp4';
import how from '../../videos/how.mp4';
import please from '../../videos/please.mp4';
import thankyou from '../../videos/thankyou.mp4';
import you from '../../videos/you.mp4';

import Confetti from 'react-confetti'

import LinearWithValueLabel from "../../components/progress-bar.component/progress-bar.component";

function LessonContent() {
    let { lesson } = useParams();
    let navigate = useNavigate();
    let videoConstraints = {
        facingMode: "user"
    };

    const [data, setdata] = useState({
        name: "",
        age: 0,
        date: "",
        programming: "",
    });

    const wordsArray = ["hello", "you", "how", "thankyou", "please"];
    const videoHash = {"hello": hello,
                        "you": you,
                        "how": how,
                        "thankyou": thankyou,
                        "please": please
                        };

    const [progress, setProgress] = useState(0)
    const [val, setVal] = useState("");
    const [index, setIndex] = useState(0);
    const [video, setVideo] = useState(hello);

    const [showConfetti, setShowConfetti] = useState(false);

    const [currentWord, setWord] = useState(wordsArray[index]);

    const { width, height } = useWindowSize()
 
    // Using useEffect for single rendering
    useEffect(() => {
        // Using fetch to fetch the api from
        // flask server it will be redirected to proxy
        fetch("/data").then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setdata({
                    name: data.Name,
                    age: data.Age,
                    date: data.Date,
                    programming: data.programming,
                });
            })
        );
    }, []);

    const increaseProgress = () => {
        console.log(val);
        console.log(currentWord);
        if (val === currentWord) {
            var newIndex = index + 1
            setProgress(progress+20);
            setIndex(newIndex);
            setWord(wordsArray[newIndex]);
            setVideo(videoHash[wordsArray[newIndex]]);
            setShowConfetti(true);
            setTimeout(() => {
                console.log("Delayed for 2 second.");
              }, "2000");
            setShowConfetti(false);
        }
        setVal("")
    };

    const skip = () => {
        console.log(val);
        console.log(currentWord);
        var newIndex = index + 1
        setProgress(progress+20);
        setIndex(newIndex);
        setWord(wordsArray[newIndex]);
        setVideo(videoHash[wordsArray[newIndex]]);
        setVal("")
    };

    // Array of all the 5 words
    // Make it display the current word
    // Also make sure current word is the one being tested on

    return (
        <div>
            <div className="lesson-header">
                <h1>{lesson}</h1>
                <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>
            </div>

            <div className="progress-bar">
                <LinearWithValueLabel progress={progress}/>
            </div>

            <h2 className="sign">Sign: {currentWord}</h2>
            

                <div className="web-cam">
                    <div>
                        <h2>Tutorial</h2>
                        <video width="300px" height="300px" controls="controls" style={{display: currentWord !== "hello" ? "none" : null}}>
                            {/* {currentWord === 'hello' && (<source src={hello} type="video/mp4" />)}
                            {currentWord === 'you' && (<source src={you} type="video/mp4" />)}
                            {currentWord === 'please' && (<source src={please} type="video/mp4" />)}
                            {currentWord === 'thankyou' && (<source src={thankyou} type="video/mp4" />)}
                            {currentWord === 'how' && (<source src={how} type="video/mp4" />)} */}
                            <source src={hello} type="video/mp4" />
                        </video>
                        <video width="300px" height="300px" controls="controls" style={{display: currentWord !== "you" ? "none" : null}}>
                            <source src={you} type="video/mp4" />
                        </video>
                        <video width="300px" height="300px" controls="controls" style={{display: currentWord !== "how" ? "none" : null}}>
                            <source src={how} type="video/mp4" />
                        </video>
                        <video width="300px" height="300px" controls="controls" style={{display: currentWord !== "thankyou" ? "none" : null}}>
                            <source src={thankyou} type="video/mp4" />
                        </video>
                        <video width="300px" height="300px" controls="controls" style={{display: currentWord !== "please" ? "none" : null}}>
                            <source src={please} type="video/mp4" />
                        </video>
                    </div>
                    <WebcamStreamCapture val={val} setVal={setVal} currentWord={currentWord}>Webcam</WebcamStreamCapture>
                    <div className="skip">
                        <Button
                            className="next-button"
                            variant="contained" 
                            onClick={increaseProgress}
                            disabled={val === currentWord ? false : true}
                            >NEXT
                        </Button>
                        <Button
                            className="skip-button"
                            variant="contained" 
                            onClick={skip}
                            >SKIP
                        </Button>
                    </div>
                </div>

                <BasicModal progress={progress}/>
                { val === currentWord && (<Confetti
                    width={width}
                    height={height}
                />)}
        </div>
    );
  }

export default LessonContent;