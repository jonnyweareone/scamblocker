import { Shield, Zap, Users, Lock, TrendingUp, Code, Database, Cloud } from "lucide-react";

const CompanyTechnical = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ScamBlocker: Company & Technical Overview
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Enterprise-grade telecommunications infrastructure protecting UK families from telephone fraud
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">£1.2B</div>
              <div className="text-gray-600">Annual UK fraud losses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">81%</div>
              <div className="text-gray-600">Scams start by phone</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">&lt;500ms</div>
              <div className="text-gray-600">Screening initiation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">2027</div>
              <div className="text-gray-600">PSTN shutdown deadline</div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Description */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">Company Description</h2>
          </div>

          {/* Executive Summary */}
          <div className="prose prose-lg max-w-none mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>ScamBlocker</strong> is an AI-powered digital landline service that protects UK households from telephone fraud by screening unknown callers <em>before</em> the phone rings. Operating as the first consumer product from <strong>SONIQ Labs</strong>, a UK-based Communications Platform as a Service (CPaaS) provider under We Are One 1 Limited (Company No. 15052885), ScamBlocker applies enterprise-grade telecommunications infrastructure to address the £1.2 billion annual telephone scam crisis affecting British families.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Unlike traditional call-blocking services that react after damage occurs, ScamBlocker uses real-time voice AI to intercept and analyze caller intent before connection, preventing scammers from ever reaching vulnerable individuals. The service provides complete landline replacement with unlimited UK calling, positioning protection as the primary value rather than an add-on feature.
            </p>
          </div>

          {/* Market Problem */}
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-12 rounded-r-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Market Problem</h3>
            <p className="text-gray-700 mb-4">
              The UK faces a telephone fraud epidemic with devastating social and financial consequences:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span><strong>£1.2 billion</strong> in annual losses to telephone scams (UK Finance, 2024)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span><strong>81%</strong> of successful fraud attempts begin with a phone call</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span><strong>Elderly and vulnerable adults</strong> are disproportionately targeted</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span><strong>Traditional call-blocking</strong> is reactive—analyzing calls after 20+ minute conversations have occurred</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span><strong>PSTN shutdown in 2027</strong> forces millions onto digital alternatives without adequate protection</span>
              </li>
            </ul>
          </div>

          {/* Solution Architecture */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-purple-600" />
              Solution Architecture: 5-Layer Protection
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <div className="font-bold text-purple-900 mb-2">1. Whitelist Protection</div>
                <p className="text-gray-700 text-sm">Trusted contacts connect immediately without screening</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <div className="font-bold text-purple-900 mb-2">2. Trust Score Analysis</div>
                <p className="text-gray-700 text-sm">Real-time verification using telecommunications metadata</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <div className="font-bold text-purple-900 mb-2">3. AI Voice Screening</div>
                <p className="text-gray-700 text-sm">Unknown callers interviewed by AI before phone rings</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <div className="font-bold text-purple-900 mb-2">4. Behavioral Analysis</div>
                <p className="text-gray-700 text-sm">NLP detects manipulation tactics and scam patterns</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 md:col-span-2">
                <div className="font-bold text-purple-900 mb-2">5. Payment Blocker™</div>
                <p className="text-gray-700 text-sm">Prevents phone-based financial transactions without appointed contact approval</p>
              </div>
            </div>
          </div>

          {/* Competitive Comparison */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Competitive Differentiation</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left">Capability</th>
                    <th className="border border-gray-300 p-3 text-left">ScamBlocker</th>
                    <th className="border border-gray-300 p-3 text-left">BT Call Protect</th>
                    <th className="border border-gray-300 p-3 text-left">Traditional Providers</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-medium">Intervention Timing</td>
                    <td className="border border-gray-300 p-3 text-green-600 font-medium">Before call connects</td>
                    <td className="border border-gray-300 p-3 text-gray-600">During/after call</td>
                    <td className="border border-gray-300 p-3 text-gray-600">After call (database)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-medium">AI Screening</td>
                    <td className="border border-gray-300 p-3 text-green-600 font-medium">Real-time voice analysis</td>
                    <td className="border border-gray-300 p-3 text-red-600">None</td>
                    <td className="border border-gray-300 p-3 text-red-600">None</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-medium">Payment Prevention</td>
                    <td className="border border-gray-300 p-3 text-green-600 font-medium">Built-in blocker</td>
                    <td className="border border-gray-300 p-3 text-red-600">None</td>
                    <td className="border border-gray-300 p-3 text-red-600">None</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-medium">Family Oversight</td>
                    <td className="border border-gray-300 p-3 text-green-600 font-medium">Optional appointed contacts</td>
                    <td className="border border-gray-300 p-3 text-red-600">None</td>
                    <td className="border border-gray-300 p-3 text-red-600">None</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-medium">Service Type</td>
                    <td className="border border-gray-300 p-3 text-green-600 font-medium">Complete replacement</td>
                    <td className="border border-gray-300 p-3 text-gray-600">Add-on feature</td>
                    <td className="border border-gray-300 p-3 text-gray-600">Add-on feature</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-600 italic">
              <strong>Key Advantage:</strong> ScamBlocker stops manipulation before the conversation begins. Competitors analyze recordings hours after a 20-minute scam call has already established trust.
            </p>
          </div>

          {/* Business Model */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-lg border border-purple-200 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              Pricing & Business Model
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-purple-600 mb-2">£14.99/mo</div>
                <div className="font-medium mb-2">Landline Service</div>
                <div className="text-sm text-gray-600">Usually £24.99 • Unlimited UK calls</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-purple-600 mb-2">£7.99/mo</div>
                <div className="font-medium mb-2">Mobile Protection</div>
                <div className="text-sm text-gray-600">AI screening for mobile numbers</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-purple-600 mb-2">£19.99/mo</div>
                <div className="font-medium mb-2">Combined Protection</div>
                <div className="text-sm text-gray-600">Both landline & mobile</div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-900 mb-3">Revenue Channels</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Direct B2C:</strong> scamblocker.co.uk with digital marketing and content strategy</li>
                <li><strong>Partner Channel:</strong> White-label platform for telecommunications resellers, care providers, and service organizations through SONIQ Labs partnership program</li>
              </ul>
            </div>
          </div>

          {/* Company Background */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Company Background: SONIQ Labs</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              SONIQ Labs is the consumer brand of <strong>We Are One 1 Limited</strong>, a UK CPaaS provider delivering enterprise voice, messaging, and telecommunications infrastructure to businesses requiring advanced communications capabilities.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-3">Key Information</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Director:</strong> Philippa Highfield</li>
                <li><strong>Location:</strong> Portsmouth, Hampshire, United Kingdom</li>
                <li><strong>Founded:</strong> 2024</li>
                <li><strong>Company Registration:</strong> 15052885 (England and Wales)</li>
                <li><strong>Website:</strong> scamblocker.co.uk | soniqlabs.co.uk</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Description */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
            <Code className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">Technical Description</h2>
          </div>

          {/* Architecture Overview */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">System Architecture Overview</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              ScamBlocker is built on a <strong>cloud-native, microservices architecture</strong> leveraging enterprise CPaaS infrastructure to deliver consumer-grade telecommunications protection. The system combines real-time voice communication, AI-powered natural language processing, and intelligent routing to intercept and analyze telephone calls before user connection.
            </p>
          </div>

          {/* Tech Stack */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-purple-600" />
              Core Technology Stack
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Frontend */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-bold text-purple-900 mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-purple-600 rounded-full"></span>
                  Frontend Layer
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><strong>React 18.2</strong> with TypeScript</li>
                  <li><strong>Vite 5.0</strong> build system</li>
                  <li><strong>React Router 6.21</strong> for routing</li>
                  <li><strong>Tailwind CSS 3.4</strong> custom design system</li>
                  <li><strong>Radix UI</strong> accessible component library</li>
                  <li><strong>TanStack Query 5.90</strong> server state management</li>
                </ul>
              </div>

              {/* Backend */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-bold text-purple-900 mb-4 flex items-center gap-2">
                  <Database className="w-3 h-3 text-purple-600" />
                  Backend & Database
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><strong>Supabase</strong> (PostgreSQL-based) data persistence</li>
                  <li><strong>Supabase Edge Functions</strong> (Deno runtime)</li>
                  <li><strong>Supabase Realtime</strong> WebSocket updates</li>
                  <li><strong>Row Level Security (RLS)</strong> database access control</li>
                </ul>
              </div>

              {/* VoIP */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-bold text-purple-900 mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-purple-600 rounded-full"></span>
                  VoIP & Telecommunications
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><strong>LiveKit</strong> WebRTC media streaming</li>
                  <li><strong>OpenAI Realtime API</strong> conversational AI</li>
                  <li><strong>Custom VAD</strong> voice activity detection</li>
                  <li><strong>SIP trunking</strong> PSTN interconnection</li>
                </ul>
              </div>

              {/* Infrastructure */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-bold text-purple-900 mb-4 flex items-center gap-2">
                  <Cloud className="w-3 h-3 text-purple-600" />
                  Infrastructure & Deployment
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><strong>Vercel</strong> frontend hosting with global CDN</li>
                  <li><strong>Cloudflare</strong> DNS management and CDN</li>
                  <li><strong>Docker</strong> containerized microservices</li>
                  <li><strong>OAuth 2.0 / JWT</strong> authentication (Supabase Auth)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call Flow Architecture */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Call Flow Architecture</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-purple-900 mb-2">1. Incoming Call Reception</h4>
                <div className="bg-gray-50 p-4 rounded font-mono text-sm text-gray-700">
                  External PSTN Call → SIP Trunk → LiveKit Media Server → ScamBlocker Routing Engine
                </div>
              </div>

              <div>
                <h4 className="font-bold text-purple-900 mb-2">2. Caller Classification</h4>
                <div className="bg-gray-50 p-4 rounded font-mono text-sm text-gray-700 whitespace-pre">
{`Routing Engine checks:
├─ Whitelist Match? → Connect immediately
├─ Known Scammer? → Block immediately
└─ Unknown? → Initiate AI Screening`}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-purple-900 mb-2">3. AI Screening Process</h4>
                <div className="bg-gray-50 p-4 rounded font-mono text-sm text-gray-700 whitespace-pre">
{`LiveKit Session Created
│
├─ OpenAI Realtime API Connection Established
├─ AI Voice Agent: "Hello, who are you trying to reach?"
├─ Caller Response Captured
├─ Natural Language Processing Analysis
│   ├─ Identity Verification
│   ├─ Purpose Statement Extraction
│   ├─ Pressure Tactic Detection
│   └─ Scam Pattern Matching
│
└─ Decision Engine:
    ├─ Trust Score Calculation (0-100)
    ├─ Behavioral Red Flags
    └─ Hard Guardrail Evaluation`}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-purple-900 mb-2">4. Connection Decision</h4>
                <div className="bg-gray-50 p-4 rounded text-sm text-gray-700">
                  <div className="mb-2"><strong>High Trust (&gt;80)</strong> → Connect to user immediately</div>
                  <div className="mb-2"><strong>Medium Trust (50-80)</strong> → Alert user, allow accept/reject</div>
                  <div className="mb-2"><strong>Low Trust (&lt;50)</strong> → Block, log attempt, notify if suspicious</div>
                  <div><strong>Hard Guardrail Trigger</strong> → Immediate block, no option to override</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-purple-900 mb-2">5. Payment Blocker™ Detection</h4>
                <p className="text-sm text-gray-700 mb-3">During screening and active calls, the system monitors for:</p>
                <ul className="space-y-1 text-sm text-gray-700 ml-4">
                  <li>• Credit card number patterns (regex + Luhn algorithm validation)</li>
                  <li>• Bank account detail requests (sort codes, account numbers)</li>
                  <li>• Authorization phrases ("yes, I authorize payment")</li>
                  <li>• Contract agreement language ("I agree to the terms")</li>
                </ul>
              </div>
            </div>
          </div>

          {/* AI & ML Components */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">AI & Machine Learning Components</h3>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200 mb-6">
              <h4 className="font-bold text-purple-900 mb-3">OpenAI Realtime API Integration</h4>
              <p className="text-gray-700 mb-3">The system leverages OpenAI's voice-native Realtime API for low-latency conversational AI:</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Voice Activity Detection (VAD)</strong> for turn-taking management</li>
                <li>• <strong>Streaming transcription</strong> with sub-second latency</li>
                <li>• <strong>Context-aware response generation</strong> based on call history</li>
                <li>• <strong>Emotion and tone analysis</strong> for manipulation detection</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="font-bold text-purple-900 mb-3">Trust Score Calculation</h4>
              <p className="text-gray-700 mb-3">Proprietary algorithm combining:</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Telecommunications metadata (caller ID spoofing detection)</li>
                <li>• Spam database lookups (integration with third-party services)</li>
                <li>• Speech pattern analysis (hesitation, script reading, accent authenticity)</li>
                <li>• Keyword frequency (HMRC, tax refund, virus on computer, etc.)</li>
                <li>• Historical call behavior (repeat callers, consistent vs. varying stories)</li>
              </ul>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-purple-600" />
              Performance Metrics
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-purple-900 mb-3">Lighthouse Scores</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Performance:</span>
                    <span className="font-medium text-green-600">93/100 (Desktop), 86/100 (Mobile)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Accessibility:</span>
                    <span className="font-medium text-green-600">96/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Best Practices:</span>
                    <span className="font-medium text-green-600">96/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">SEO:</span>
                    <span className="font-medium text-green-600">100/100</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-purple-900 mb-3">Core Web Vitals</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">First Contentful Paint:</span>
                    <span className="font-medium text-green-600">0.7s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Largest Contentful Paint:</span>
                    <span className="font-medium text-green-600">0.9s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Cumulative Layout Shift:</span>
                    <span className="font-medium text-green-600">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Total Blocking Time:</span>
                    <span className="font-medium text-green-600">170ms</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-purple-900 mb-3">Backend Performance</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">API Response Time:</span>
                    <span className="font-medium text-green-600">&lt;200ms (p95)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Database Queries:</span>
                    <span className="font-medium text-green-600">&lt;50ms (indexed)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Realtime Subscriptions:</span>
                    <span className="font-medium text-green-600">&lt;100ms</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-purple-900 mb-3">Call Processing</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Screening Initiation:</span>
                    <span className="font-medium text-green-600">&lt;500ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">AI Response Generation:</span>
                    <span className="font-medium text-green-600">800ms-1.2s avg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Connection Decision:</span>
                    <span className="font-medium text-green-600">&lt;2s total</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security & Compliance */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Lock className="w-6 h-6 text-purple-600" />
              Security & Compliance
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-bold text-purple-900 mb-3">Data Protection</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <strong>GDPR Compliance</strong> with UK ICO registration</li>
                  <li>• <strong>Data Processing Agreement (DPA)</strong> with third-party processors</li>
                  <li>• <strong>End-to-end encryption</strong> for call recordings</li>
                  <li>• <strong>Retention policies</strong> with automatic deletion</li>
                  <li>• <strong>User data export</strong> for GDPR access requests</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-bold text-purple-900 mb-3">Telecommunications Compliance</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <strong>Ofcom registration</strong> as communications provider</li>
                  <li>• <strong>Emergency services access</strong> (999/112) maintained</li>
                  <li>• <strong>Number portability</strong> support for UK landlines</li>
                  <li>• <strong>Consumer protection</strong> (14-day cooling-off)</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-bold text-purple-900 mb-3">Authentication Security</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <strong>OAuth 2.0</strong> flows via Supabase Auth</li>
                  <li>• <strong>JWT token-based</strong> session management</li>
                  <li>• <strong>Multi-factor authentication (MFA)</strong> planned Q2 2026</li>
                  <li>• <strong>Rate limiting</strong> on authentication endpoints</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-bold text-purple-900 mb-3">Payment Security</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <strong>PCI DSS compliance</strong> via Stripe integration</li>
                  <li>• <strong>No card data stored</strong> on ScamBlocker servers</li>
                  <li>• <strong>Webhook signature verification</strong> for events</li>
                  <li>• <strong>Idempotency keys</strong> for transaction safety</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Scalability */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-lg border border-purple-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Scalability Architecture</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-bold text-purple-900 mb-3">Horizontal Scaling</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Vercel serverless functions (frontend)</li>
                  <li>• Supabase connection pooling</li>
                  <li>• LiveKit cluster deployment</li>
                  <li>• CDN caching (Vercel + Cloudflare)</li>
                  <li>• Edge function auto-scaling</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-purple-900 mb-3">Current Capacity</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <strong>10,000+</strong> concurrent users</li>
                  <li>• <strong>500+</strong> simultaneous AI screening sessions</li>
                  <li>• <strong>100GB+</strong> PostgreSQL storage allocation</li>
                  <li>• Auto-scaling based on demand</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 italic">
                Infrastructure designed to scale from individual households to nationwide deployment without architecture changes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Conclusion</h2>
            <p className="text-lg text-purple-100 leading-relaxed mb-6">
              ScamBlocker represents a sophisticated integration of <strong>enterprise telecommunications infrastructure</strong> (SONIQ Labs CPaaS platform), <strong>real-time AI processing</strong> (OpenAI Realtime API), and <strong>modern web technologies</strong> (React, Supabase, Vercel) to deliver a consumer product that addresses both a technical challenge (PSTN shutdown) and a social crisis (telephone fraud epidemic).
            </p>
            <p className="text-lg text-purple-100 leading-relaxed">
              The system's <strong>pre-emptive screening architecture</strong>—intervening before calls connect—differentiates it from reactive solutions and positions SONIQ Labs as an innovator in consumer telecommunications protection.
            </p>
          </div>

          {/* Contact */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">For More Information</h3>
            <p className="text-gray-700 mb-6">
              Business inquiries, partnership opportunities, and technical documentation
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:support@scamblocker.co.uk" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
                Contact Us
              </a>
              <a href="/" className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300 transition">
                Return to Home
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyTechnical;
