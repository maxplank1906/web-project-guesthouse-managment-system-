import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title = "Family Palace Guest House | Islamabad G-13", 
  description = "Experience premium family accommodation in Islamabad G-13/1. Luxury rooms, safe environment, and direct WhatsApp booking available.",
  image = "/assets/hero.png",
  url = "https://family-palace-guest-house.vercel.app",
  type = "website"
}) => {
  const siteTitle = title.includes("Family Palace") ? title : `${title} | Family Palace Guest House`;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="guest house islamabad, G-13 guest house, family accommodation islamabad, affordable hotel islamabad, Family Palace Islamabad" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Hotel",
          "name": "Family Palace Guest House",
          "description": description,
          "image": "https://family-palace-guest-house.vercel.app/assets/hero.png",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "G-13/1",
            "addressLocality": "Islamabad",
            "addressRegion": "Islamabad Capital Territory",
            "addressCountry": "PK"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "33.6558",
            "longitude": "72.9667"
          },
          "url": "https://family-palace-guest-house.vercel.app",
          "telephone": "+923000000000",
          "priceRange": "$$"
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
