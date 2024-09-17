import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import Webcam from 'react-webcam';

const FitnessTracker = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [feedback, setFeedback] = useState('');
  const [report, setReport] = useState([]);
  const EXERCISE_THRESHOLD = 150; 

  const runPosenet = useCallback(async () => {
    try {
      await tf.ready();
      const net = await posenet.load();
      const interval = setInterval(() => {
        detect(net);
      }, 100);
      return () => clearInterval(interval);
    } catch (error) {
      console.error('Error loading PoseNet:', error);
    }
  }, []); 

  const detect = async (net) => {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      video.width = videoWidth;
      video.height = videoHeight;

      try {
        const pose = await net.estimateSinglePose(video, { flipHorizontal: false });
        drawCanvas(pose, video, videoWidth, videoHeight);
        analyzePose(pose);
      } catch (error) {
        console.error('Error estimating pose:', error);
      }
    } else {
      console.error('Webcam video not ready');
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight) => {
    const ctx = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    ctx.clearRect(0, 0, videoWidth, videoHeight);
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

    pose.keypoints.forEach((keypoint) => {
      if (keypoint.score > 0.5) {
        const { y, x } = keypoint.position;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
      }
    });
  };

  const analyzePose = (pose) => {
    const { keypoints } = pose;
    if (keypoints[5]?.score > 0.5 && keypoints[2]?.score > 0.5) {
      const distance = Math.sqrt(
        Math.pow(keypoints[5].position.x - keypoints[2].position.x, 2) +
        Math.pow(keypoints[5].position.y - keypoints[2].position.y, 2)
      );

      if (distance < EXERCISE_THRESHOLD) {
        setFeedback('Push-up detected. Form looks good!');
      } else {
        setFeedback('Push-up detected. Check your form.');
      }
    } else {
      setFeedback('No exercise detected.');
    }

    setReport((prevReport) => [...prevReport, { feedback, timestamp: new Date() }]);
  };

  useEffect(() => {
    runPosenet();
  }, [runPosenet]); 

  return (
    <div className="FitnessTracker" style={{ textAlign: 'center' }}>
      <Webcam 
        audio={false} 
        ref={webcamRef} 
        style={{ 
          width: '100%', 
          maxWidth: 640, 
          height: 'auto' 
        }} 
      />
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: '100%', 
          maxWidth: 640, 
          height: 'auto' 
        }} 
      />
      <div>
        <h2>Feedback: {feedback}</h2>
        <h3>Report:</h3>
        <ul>
          {report.map((entry, index) => (
            <li key={index}>{entry.timestamp.toString()}: {entry.feedback}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FitnessTracker;
