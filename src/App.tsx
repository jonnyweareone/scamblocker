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

// New landing pages
import DigitalLandline from './pages/DigitalLandline'

// Blog pages
import BlogIndex from './pages/blog/BlogIndex'
import BlogHMRCScams from './pages/blog/HMRCScamCalls'

// Dashboard pages
import Dashboard from './pages/dashboard/Dashboard'
import SSO from './pages/SSO'
import QuickSetup from './pages/quick-setup/QuickSetup'

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
            <Route path="/sso" element={<SSO />} />
            
            {/* New landing pages */}
            <Route path="/digital-landline" element={<DigitalLandline />} />
            
            {/* Blog pages */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/hmrc-scam-calls" element={<BlogHMRCScams />} />
            
            {/* Protected Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/quick-setup" element={<QuickSetup />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
