import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";

const blogPosts = [
  {
    title: "HMRC Scam Calls: How to Spot Fake Tax Threats",
    slug: "hmrc-scam-calls",
    excerpt: "Scammers pretending to be from HMRC have stolen over £43 million from UK victims. Learn the warning signs and how to protect yourself.",
    category: "Scam Types",
    readTime: "8 min read",
    searches: "30,000/month",
    featured: true,
    image: "https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Why Elderly Parents Hide Being Scammed",
    slug: "why-elderly-hide-scams",
    excerpt: "The shame, fear, and isolation that stops victims from getting help - and what families can do about it.",
    category: "Elderly Protection",
    readTime: "10 min read",
    searches: "High intent",
    image: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Why Your Mum Answers Every Call",
    slug: "why-elderly-answer-every-call",
    excerpt: "Why elderly people can't ignore unknown numbers - and what actually works to protect them.",
    category: "Elderly Protection",
    readTime: "9 min read",
    searches: "High intent",
    image: "https://images.pexels.com/photos/4057759/pexels-photo-4057759.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "What is a Digital Landline? Complete UK Guide",
    slug: "what-is-digital-landline",
    excerpt: "Everything you need to know about digital landlines in 2026. How they work, costs, setup, and why ScamBlocker is different.",
    category: "Technology",
    readTime: "12 min read",
    searches: "5,000/month",
    featured: true,
    image: "https://images.pexels.com/photos/4629633/pexels-photo-4629633.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Bank Scam Calls: The £800 Payment That Wasn't",
    slug: "bank-scam-calls",
    excerpt: "How fake bank fraud calls work, what scammers say, and why your parents are perfect targets.",
    category: "Scam Types",
    readTime: "10 min read",
    searches: "6,000/month",
    image: "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Safe Phone for Elderly: Complete Protection Guide",
    slug: "safe-phone-for-elderly",
    excerpt: "How to protect elderly parents from scam calls without taking away their independence.",
    category: "Elderly Protection",
    readTime: "11 min read",
    searches: "8,000/month",
    featured: true,
    image: "https://images.pexels.com/photos/4057693/pexels-photo-4057693.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

export default function BlogIndex() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="ScamBlocker Blog - Phone Scam Protection & Elderly Safety"
        description="Expert guides on protecting yourself and elderly family from phone scams. HMRC scams, bank fraud, digital landlines, and AI call screening explained."
        keywords="phone scam blog, scam protection uk, elderly phone safety, hmrc scam guide, digital landline blog"
        url="https://scamblocker.co.uk/blog"
      />

      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">
              <span className="text-[#1e3a8a]">Scam</span>
              <span className="bg-gradient-to-r from-[#7c3aed] to-[#db2777] bg-clip-text text-transparent">Blocker</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/rates">
              <Button variant="ghost">Pricing</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-violet-100 text-violet-700">ScamBlocker Blog</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Protect Your Family from <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">Phone Scams</span>
            </h1>
            <p className="text-xl text-slate-600">
              Expert guides on HMRC scams, bank fraud, protecting elderly parents, and why AI call screening actually works.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.slug} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                      {post.searches && (
                        <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {post.searches}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900">{post.title}</h3>
                    <p className="text-slate-600 mb-4 text-sm">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                      <Link to={`/blog/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="text-violet-600 hover:text-violet-700">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">More Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <Card key={post.slug} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                      {post.searches && post.searches !== "High intent" && (
                        <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {post.searches}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900">{post.title}</h3>
                    <p className="text-slate-600 mb-4 text-sm">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                      <Link to={`/blog/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="text-violet-600 hover:text-violet-700">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Protect Your Family?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            AI call screening blocks scam calls automatically. Your parents stay safe, you get peace of mind.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="mt-6 text-sm opacity-75">
            £14.99/month • No contract • 14-day money-back guarantee
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-xl font-bold">
                <span className="text-white">Scam</span>
                <span className="text-violet-400">Blocker</span>
              </span>
              <p className="text-sm mt-2">© 2026 ScamBlocker. All rights reserved.</p>
            </div>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="hover:text-white">Privacy</Link>
              <Link to="/terms" className="hover:text-white">Terms</Link>
              <Link to="/complaints" className="hover:text-white">Complaints</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
