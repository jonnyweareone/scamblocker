import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Mobile from './pages/Mobile'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Complaints from './pages/Complaints'
import Rates from './pages/Rates'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/join" element={<Signup />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/rates" element={<Rates />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
