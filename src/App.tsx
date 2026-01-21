import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { AuthProvider } from './contexts/AuthContext'
import { Analytics } from '@vercel/analytics/react'

// Marketing pages
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import CheckEmail from './pages/CheckEmail'
import Mobile from './pages/Mobile'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Complaints from './pages/Complaints'
import Rates from './pages/Rates'
import Login from './pages/Login'
import Contact from './pages/Contact'

// New landing pages
import DigitalLandline from './pages/DigitalLandline'
import StopScamCalls from './pages/ad-landing/StopScamCalls'
import CompanyTechnical from './pages/about/CompanyTechnical'

// Blog pages
import BlogIndex from './pages/blog/BlogIndex'
import BlogHMRCScams from './pages/blog/HMRCScamCalls'
import WhyElderlyHideScams from './pages/blog/WhyElderlyHideScams'
import WhyElderlyAnswerEveryCall from './pages/blog/WhyElderlyAnswerEveryCall'
import WhatIsDigitalLandline from './pages/blog/WhatIsDigitalLandline'
import BankScamCalls from './pages/blog/BankScamCalls'
import SafePhoneForElderly from './pages/blog/SafePhoneForElderly'

// Dashboard pages
import Dashboard from './pages/dashboard/Dashboard'
import Onboarding from './pages/dashboard/Onboarding'
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
          <Analytics />
          <Routes>
            {/* Marketing / Public pages */}
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/check-email" element={<CheckEmail />} />
            <Route path="/mobile" element={<Mobile />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/rates" element={<Rates />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sso" element={<SSO />} />
            
            {/* New landing pages */}
            <Route path="/digital-landline" element={<DigitalLandline />} />
            <Route path="/stop-scam-calls" element={<StopScamCalls />} />
            
            {/* About pages */}
            <Route path="/about/company-technical" element={<CompanyTechnical />} />
            
            {/* Blog pages */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/hmrc-scam-calls" element={<BlogHMRCScams />} />
            <Route path="/blog/why-elderly-hide-scams" element={<WhyElderlyHideScams />} />
            <Route path="/blog/why-elderly-answer-every-call" element={<WhyElderlyAnswerEveryCall />} />
            <Route path="/blog/what-is-digital-landline" element={<WhatIsDigitalLandline />} />
            <Route path="/blog/bank-scam-calls" element={<BankScamCalls />} />
            <Route path="/blog/safe-phone-for-elderly" element={<SafePhoneForElderly />} />
            
            {/* Protected Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/onboarding" element={<Onboarding />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/quick-setup" element={<QuickSetup />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
