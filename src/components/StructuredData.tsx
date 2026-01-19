import { Helmet } from "react-helmet";

interface StructuredDataProps {
  type?: "homepage" | "product" | "article" | "faq";
}

export function StructuredData({ type = "homepage" }: StructuredDataProps) {
  const getSchema = () => {
    const baseOrganization = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ScamBlocker",
      "legalName": "We Are One 1 Limited",
      "url": "https://scamblocker.co.uk",
      "logo": "https://scamblocker.co.uk/logo.png",
      "foundingDate": "2024",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "20 Wenlock Road",
        "addressLocality": "London",
        "postalCode": "N1 7GU",
        "addressCountry": "GB"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "availableLanguage": "English"
      },
      "sameAs": []
    };

    if (type === "homepage" || type === "product") {
      return {
        "@context": "https://schema.org",
        "@graph": [
          baseOrganization,
          {
            "@type": "SoftwareApplication",
            "name": "ScamBlocker",
            "applicationCategory": "SecurityApplication",
            "operatingSystem": "All",
            "offers": [
              {
                "@type": "Offer",
                "name": "Landline Protection",
                "price": "14.99",
                "priceCurrency": "GBP",
                "billingDuration": "P1M",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "name": "Mobile Protection",
                "price": "9.99",
                "priceCurrency": "GBP",
                "billingDuration": "P1M",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "name": "Complete Protection",
                "price": "21.99",
                "priceCurrency": "GBP",
                "billingDuration": "P1M",
                "availability": "https://schema.org/InStock"
              }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "127",
              "bestRating": "5",
              "worstRating": "1"
            },
            "description": "AI-powered scam call protection for UK landlines and mobiles. Block HMRC, bank, and Amazon scams automatically.",
            "featureList": [
              "AI Call Screening",
              "Automatic Scam Detection",
              "HMRC Scam Protection",
              "Bank Fraud Prevention",
              "Elderly Phone Protection",
              "Digital Landline Service",
              "UK Number Porting",
              "24/7 Protection"
            ]
          },
          {
            "@type": "Service",
            "serviceType": "Digital Landline Service",
            "provider": baseOrganization,
            "areaServed": "GB",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Phone Protection Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Landline Scam Protection"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Mobile Scam Protection"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Digital Landline Service"
                  }
                }
              ]
            }
          }
        ]
      };
    }

    if (type === "article") {
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        "publisher": baseOrganization,
        "author": {
          "@type": "Organization",
          "name": "ScamBlocker"
        }
      };
    }

    if (type === "faq") {
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is ScamBlocker?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ScamBlocker is an AI-powered call protection service that screens all your calls and blocks scammers before they can reach you. It works with both landlines and mobiles in the UK."
            }
          },
          {
            "@type": "Question",
            "name": "How much does ScamBlocker cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Landline protection is £14.99/month, mobile protection is £9.99/month, or get both for £21.99/month. No hidden fees, cancel anytime."
            }
          },
          {
            "@type": "Question",
            "name": "Is ScamBlocker suitable for elderly people?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! ScamBlocker is specifically designed to protect elderly and vulnerable adults from phone scams. It works automatically with no complicated setup required."
            }
          },
          {
            "@type": "Question",
            "name": "Can I keep my existing phone number?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can port your existing UK landline number to ScamBlocker at no extra cost. The process takes 5-10 working days."
            }
          }
        ]
      };
    }

    return baseOrganization;
  };

  const schema = getSchema();

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
