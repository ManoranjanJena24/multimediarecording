import React, { useState, useRef } from 'react';
import RecordRTC from 'recordrtc';

const ScreenRecordingComponent = () => {
    const [recording, setRecording] = useState(false);
    const [mediaStream, setMediaStream] = useState(null);
    const [recordedBlob, setRecordedBlob] = useState(null);
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);

    const recorderRef = useRef(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: videoEnabled,
                audio: audioEnabled,
            });
            const recorder = new RecordRTC(stream, { type: 'video' });
            recorderRef.current = recorder;
            setMediaStream(stream);
            recorder.startRecording();
            setRecording(true);
        } catch (error) {
            console.error('Error starting screen recording:', error);
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

    return (
        <div>
            <h2>Screen Recording</h2>
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
            {recordedBlob && (
                <video controls src={URL.createObjectURL(recordedBlob)} />
            )}
        </div>
    );
};

export default ScreenRecordingComponent;
