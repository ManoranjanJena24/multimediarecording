import React from 'react'
import App2 from './Components/App2'
// import RecordingComponent from './Components/RecordingComponent'
import VideoRecordingComponent from './Components/VideoRecordingComponent';
import AudioRecordingComponent from './Components/AudioRecordingComponent';
import ScreenRecordingComponent from './Components/ScreenRecordingComponent';
import RecordComponent from './Components/RecordComponent';

function App() {
  return (
    <div>
      {/* <App2 /> */}
      <VideoRecordingComponent />
      <AudioRecordingComponent />
      <ScreenRecordingComponent />
      {/* <RecordComponent /> */}

    </div>
  )
}

export default App

