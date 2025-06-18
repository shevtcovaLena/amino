import { useState, useMemo } from 'react'

import { getTheme } from '@/theme'
import useMediaQuery from '@mui/material/useMediaQuery'
import { ThemeProvider, CssBaseline } from '@mui/material'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import './App.css'
import SequenceForm from '@components/SequenceForm'
import AlignmentView from '@components/AlignmentView/AlignmentView'
import AminoAcidColorLegend from '@components/Legend';

import type { Sequences } from '@/types'

function App() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => getTheme(prefersDark ? 'dark' : 'light'), [prefersDark])
  
  const [sequences, setSequences] = useState<Sequences>({sequence1: '', sequence2: ''})
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SequenceForm setSequences={setSequences}/>
      <AlignmentView sequence1={sequences.sequence1} sequence2={sequences.sequence2}/>
      <AminoAcidColorLegend />
      <ToastContainer autoClose={1000} hideProgressBar/>
    </ThemeProvider>
  )
}

export default App
