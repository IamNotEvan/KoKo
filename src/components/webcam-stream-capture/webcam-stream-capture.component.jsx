import React, {useState} from "react";

import Webcam from "react-webcam";

import axios from "axios";
import Button from '@mui/material/Button';
import { CircularProgress } from "@mui/material";

import "./webcam-stream-capture.component.css"

const WebcamStreamCapture = ({val, setVal, currentWord}) => {
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
  
    const handleStartCaptureClick = React.useCallback(() => {
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm"
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);
  
    const handleDataAvailable = React.useCallback(
      ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );
  
    const handleStopCaptureClick = React.useCallback(() => {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);
  
    const handleDownload = React.useCallback(() => {
      if (recordedChunks.length) {
        const blob = new Blob(recordedChunks, {
          type: "video/webm"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "react-webcam-stream-capture.webm";
        a.click();
        window.URL.revokeObjectURL(url);
        setRecordedChunks([]);
      }
    }, [recordedChunks]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const blob = new Blob(recordedChunks, {
          type: "video/webm"
        });
    
        const formData = new FormData();
        formData.append("file", blob);
    
        try {
          axios.post("http://localhost:5002/upload", formData).then((res) => {
            console.log(res.data.prediction);
            setVal(res.data.prediction);
            setRecordedChunks([]);
          });
          // alert("File uploaded successfully");
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
    };
  
    return (
      <>
      <div className="webcam-container">
        <Webcam audio={false} ref={webcamRef} />
        {capturing ? (
          <div className="start-capture">
            <Button className="stop-capture-button" variant="contained" onClick={handleStopCaptureClick}>Stop Capture</Button>
          </div>
        ) : (
          <Button className="start-capture-button" variant="contained" onClick={handleStartCaptureClick}>Start Capture</Button>
        )}
        <div className="upload-button">
          {recordedChunks.length > 0 && (
            <Button className="upload-button" variant="contained" onClick={handleSubmit}>Upload</Button>
          )}
        </div>
        {
          loading && (<CircularProgress />)
        }
        <div>What you signed: {val}</div>
        { val !== currentWord && val !== "" && (<div>Try Again</div>)}
        </div>
      </>
    );
};

export default WebcamStreamCapture;