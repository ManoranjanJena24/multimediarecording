import React from 'react'
import VideoRecordingComponent from './Components/VideoRecordingComponent';
import AudioRecordingComponent from './Components/AudioRecordingComponent';
import ScreenRecordingComponent from './Components/ScreenRecordingComponent';


function App() {
  return (
    <div>
      <VideoRecordingComponent />
      <AudioRecordingComponent />
      <ScreenRecordingComponent />
    </div>
  )
}

export default App

