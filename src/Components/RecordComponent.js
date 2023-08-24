import React, { useState, useRef } from 'react';
import RecordRTC from 'recordrtc';

const RecordComponent = () => {
    const [recording, setRecording] = useState(false);
    const [mediaStream, setMediaStream] = useState(null);
    const [recordedBlob, setRecordedBlob] = useState(null);
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [screenEnabled, setScreenEnabled] = useState(false);

    const recorderRef = useRef(null);

    const startRecording = async () => {
        const constraints = {
            video: videoEnabled && screenEnabled,
            audio: audioEnabled,
        };

        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            const recorder = new RecordRTC(stream, { type: 'video' });
            recorderRef.current = recorder;
            setMediaStream(stream);
            recorder.startRecording();
            setRecording(true);
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    const stopRecording = () => {
        if (recorderRef.current) {
            recorderRef.current.stopRecording(() => {
                setRecordedBlob(recorderRef.current.getBlob());
                setMediaStream(null);
                setRecording(false);
            });
        }
    };

    const toggleVideo = () => {
        setVideoEnabled(prevVideoEnabled => !prevVideoEnabled);
    };

    const toggleAudio = () => {
        setAudioEnabled(prevAudioEnabled => !prevAudioEnabled);
    };

    const toggleScreen = () => {
        setScreenEnabled(prevScreenEnabled => !prevScreenEnabled);
    };

    return (
        <div>
            <h2>Recording Component</h2>
            <button onClick={startRecording} disabled={recording}>
                Start Recording
            </button>
            <button onClick={stopRecording} disabled={!recording}>
                Stop Recording
            </button>
            <button onClick={toggleVideo}>
                {videoEnabled ? 'Disable Video' : 'Enable Video'}
            </button>
            <button onClick={toggleAudio}>
                {audioEnabled ? 'Disable Audio' : 'Enable Audio'}
            </button>
            <button onClick={toggleScreen}>
                {screenEnabled ? 'Disable Screen' : 'Enable Screen'}
            </button>
            {recordedBlob && (
                <video controls src={URL.createObjectURL(recordedBlob)} />
            )}
        </div>
    );
};

export default RecordComponent;
