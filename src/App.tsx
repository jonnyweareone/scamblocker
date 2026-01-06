import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { AuthProvider } from './contexts/AuthContext'

// Marketing pages
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Mobile from './pages/Mobile'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Complaints from './pages/Complaints'
import Rates from './pages/Rates'
import Login from './pages/Login'

// Dashboard pages
import Dashboard from './pages/dashboard/Dashboard'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-center" richColors />
          <Routes>
            {/* Marketing / Public pages */}
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mobile" element={<Mobile />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/rates" element={<Rates />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
