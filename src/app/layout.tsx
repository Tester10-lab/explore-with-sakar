import type { Metadata, Viewport } from 'next';
import { Cinzel, Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import PublicLayoutWrapper from '@/components/layout/PublicLayoutWrapper';
import { SettingsProvider } from '@/context/SettingsContext';
import { getPublicSettings, getPublicNavigation } from '@/lib/content';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#FBF8F2',
};

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-cinzel',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://explorewithsakar.com'),
  title: 'Explore With Sakar — Authentic Nepal Travel & Cultural Experiences',
  description: 'Meaningful Nepal travel experiences beyond ordinary tourism. Guided by local host Sakar through living culture, village homestays, Himalayan spirituality, and responsible slow travel.',
  keywords: [
    'Nepal travel',
    'Nepal local guide',
    'authentic Nepal cultural tours',
    'Nepal homestay experience',
    'spiritual Nepal journeys',
    'singing bowl healing Nepal',
    'responsible tourism Nepal',
    'Kathmandu heritage walks',
    'Sakar Nepal guide',
  ],
  authors: [{ name: 'Sakar' }],
  creator: 'Explore With Sakar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://explorewithsakar.com',
    siteName: 'Explore With Sakar',
    title: 'Explore With Sakar — Authentic Nepal Travel & Cultural Experiences',
    description: 'Discover Nepal through culture, spirituality, adventure & meaningful human connections with local host Sakar.',
    images: [
      {
        url: '/explore-with-sakar/images/mountains/sunrise-himalayas.jpg',
        width: 1600,
        height: 1200,
        alt: 'Explore With Sakar — Authentic Himalayan Travel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explore With Sakar — Meaningful Nepal Journeys',
    description: 'Travel beyond ordinary tourism in Nepal. Village homestays, living heritage, and spiritual connection.',
    images: ['/explore-with-sakar/images/mountains/sunrise-himalayas.jpg'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, navigation] = await Promise.all([
    getPublicSettings(),
    getPublicNavigation(),
  ]);

  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${playfair.variable} ${plusJakarta.variable} scroll-smooth`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TravelAgency',
              name: 'Explore With Sakar',
              description:
                'Meaningful Nepal travel experiences beyond ordinary tourism. Culture, spirituality, homestays, and community-based slow travel.',
              founder: {
                '@type': 'Person',
                name: 'Sakar',
                jobTitle: 'Responsible Tour Director',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Kathmandu',
                addressCountry: 'NP',
              },
              url: 'https://explorewithsakar.com',
              telephone: '+977-9840482692',
              priceRange: '$$',
            }),
          }}
        />
      </head>
      <body className="bg-parchment-100 text-himalaya-900 antialiased selection:bg-terracotta/20 selection:text-terracotta-dark min-h-screen flex flex-col">
        <SettingsProvider initialSettings={settings} initialNavigation={navigation}>
          <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
        </SettingsProvider>
      </body>
    </html>
  );
}
