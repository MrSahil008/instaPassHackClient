import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GetData from './GetData'
import Home from './Home'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/getdata/:password' element={<GetData/>} />
      <Route path='*' element={<Home/>} />
    </Routes>
  )
}

export default App