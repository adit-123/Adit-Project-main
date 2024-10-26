import React from 'react'
import ContactForm from './components/Contact'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Product from './components/Product'
import ReferenceCMP from './components/ReferenceCMP'
import Navbar from './components/NavBar'
const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<ContactForm />} />
      <Route path='/product' element={<Product />}/>
      <Route path='/reference'  element={<ReferenceCMP />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App