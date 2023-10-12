import {BrowserRouter, Route, Routes} from 'react-router-dom'


import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Main from './pages/Main'
import PassComponent from './components/PassComponent/PassComponent'

//import Header from './components/Header'


import { AuthProvider } from './context/Auth.context'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/fuiweucbkalksebvañosefnuaibeowuebfibepf' element={<PassComponent/>}/>

        <Route element={< ProtectedRoute/>}>
          <Route path='/main' element={<Main/>}/>
        </Route>
        {/*<Route path='/header/notheader/header' element={<Header/>}/>*/}
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    
  )
}

export default App