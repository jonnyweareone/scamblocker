import { Helmet } from "react-helmet";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({
  title,
  description,
  keywords = "scam blocker, digital landline, safe phone for elderly, prevent phone scams, call protection uk, ai call screening, phone scam blocker, elderly phone protection, virtual landline uk, fraud prevention, scam call blocker, senior phone service, vulnerable adult protection",
  image = "https://scamblocker.co.uk/og-image.jpg",
  url = "https://scamblocker.co.uk",
  type = "website"
}: SEOProps) {
  const fullTitle = title.includes("ScamBlocker") ? title : `${title} | ScamBlocker`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="ScamBlocker" />
      <meta property="og:locale" content="en_GB" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="ScamBlocker" />
      <meta name="geo.region" content="GB" />
      <meta name="geo.placename" content="United Kingdom" />
      <link rel="canonical" content={url} />
    </Helmet>
  );
}
