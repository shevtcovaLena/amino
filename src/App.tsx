import { useState } from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './App.css'
import SequenceForm from '@components/SequenceForm'
import AlignmentView from '@components/AlignmentView/AlignmentView'

import type { Sequences } from '@types'

function App() {
  const [sequences, setSequences] = useState<Sequences>({sequence1: '', sequence2: ''})
  
  return (
    <>
      <SequenceForm setSequences={setSequences}/>
      <AlignmentView sequence1={sequences.sequence1} sequence2={sequences.sequence2}/>
      <ToastContainer autoClose={1000} hideProgressBar/>
    </>
  )
}

export default App
