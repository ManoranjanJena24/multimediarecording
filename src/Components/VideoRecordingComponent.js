import React, { useState, useRef } from 'react';
import RecordRTC from 'recordrtc';

const VideoRecordingComponent = () => {
    const [recording, setRecording] = useState(false);
    const [mediaStream, setMediaStream] = useState(null);
    const [recordedBlob, setRecordedBlob] = useState(null);
    const [audioEnabled, setAudioEnabled] = useState(true);

    const recorderRef = useRef(null);

    const startRecording = async () => {
        try {
            const constraints = {
                video: true,
                audio: audioEnabled, // Use the audioEnabled state here
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            const recorder = new RecordRTC(stream, { type: 'video' });
            recorderRef.current = recorder;
            setMediaStream(stream);
            recorder.startRecording();
            setRecording(true);
        } catch (error) {
            console.error('Error starting video recording:', error);
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

    const toggleAudio = () => {
        setAudioEnabled(prevAudioEnabled => !prevAudioEnabled);
    };

    return (
        <div>
            <h2>Video Recording</h2>
            <button onClick={startRecording} disabled={recording}>
                Start Recording
            </button>
            <button onClick={stopRecording} disabled={!recording}>
                Stop Recording
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

export default VideoRecordingComponent;