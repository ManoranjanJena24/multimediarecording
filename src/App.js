import React from 'react'
import VideoRecordingComponent from './Components/VideoRecordingComponent';
import AudioRecordingComponent from './Components/AudioRecordingComponent';
import ScreenRecordingComponent from './Components/ScreenRecordingComponent';
import RecordingComponent from './Components/RecordingComponent';


function App() {
  return (
    <div>
      <VideoRecordingComponent />
      <AudioRecordingComponent />
      {/* <ScreenRecordingComponent /> */}
      <RecordingComponent />
    </div>
  )
}

export default App

