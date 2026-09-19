import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  Sparkles,
  Check,
  ArrowRight,
  Heart,
  ChevronDown,
  BookOpen,
  Quote,
} from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import CTASection from '@/components/common/CTASection';

export const metadata: Metadata = {
  title: 'Go Beyond the Map | Authentic Exploration with Sakar',
  description:
    'Kathmandu, Bhaktapur, Patan, and Pokhara. Step past the tourist facades into living courtyards, ancient Silk Road trade alleys, multi-generational artisan workshops, and calm Himalayan waters.',
};

interface StorySection {
  heading: string;
  paragraphs: string[];
}

interface BeyondJourney {
  id: string;
  chapter: string;
  title: string;
  nepaliTitle?: string;
  tagline: string;
  location: string;
  duration: string;
  groupSize: string;
  image: string;
  imageAlt: string;
  promise: string;
  experience: string;
  keyQuote: {
    quote: string;
    attribution: string;
  };
  highlights: string[];
  storySections: StorySection[];
  ctaSubject: string;
}

const BEYOND_JOURNEYS: BeyondJourney[] = [
  {
    id: 'kathmandu-durbar-square',
    chapter: 'Chapter 01',
    title: 'Kathmandu Durbar Square: Where Every Stone Holds a Story',
    nepaliTitle: 'काठमाडौँ दरबार क्षेत्र',
    tagline: 'Ason Morning Alleys • Ancient Silk Routes • Sustainable Human Settlements',
    location: 'Old Kathmandu (Ason Alleys & Basantapur Durbar Square)',
    duration: 'Full Day (Unhurried)',
    groupSize: 'Private / 1–6 Travelers',
    image: '/images/beyond-the-map/living-courtyards.jpg',
    imageAlt: 'Morning light across ancient brick courtyards and temples in Kathmandu',
    promise:
      'If you want to understand Kathmandu, do not start with a monument. Start with a morning walk where the city wakes up in the narrow alleys of Ason.',
    experience:
      'As the first rays of sunlight enter between old brick houses, the smell of spices, incense, fresh vegetables, and traditional sweets fills the air. Ason is not just a marketplace—it is a living memory standing along the ancient trade routes connecting the plains of India with the Tibetan plateau. Here, northern mountains met southern civilizations, and Hindu temples stood beside Buddhist monasteries. As you walk towards Basantapur, the noise of the market meets the silence of history: ancient palace walls rise, carved windows look down, and history breathes in the present.',
    keyQuote: {
      quote:
        'Kathmandu reminds the world that the future of cities is not only about technology, but also about preserving communities where people live, work, and care for each other.',
      attribution: 'Anil Chitrakar, Heritage Conservationist',
    },
    highlights: [
      'Dawn walk through spice-scented Ason alleys as wooden shutters open to morning devotion',
      'Discovering traditional Newar settlements designed for walkable community and human connection',
      'Uncovering the Licchavi and Malla era rivalries that transformed brick and timber into artistic poetry',
      'Entering Basantapur where royal palace walls grew alongside the everyday life of the people',
    ],
    ctaSubject: 'Kathmandu Durbar Square: Where Every Stone Holds a Story',
    storySections: [
      {
        heading: 'Start With a Morning Walk in Ason',
        paragraphs: [
          'If you want to understand Kathmandu, do not start with a monument. Start with a morning walk. Start where the city wakes up in the narrow alleys of Ason.',
          'As the first rays of sunlight enter between old brick houses, the smell of spices, incense, fresh vegetables, and traditional sweets fills the air. Shopkeepers open wooden shutters that have witnessed generations of customers. People rush through lanes that appear too narrow for a modern city, yet somehow carry the rhythm of thousands of years.',
          'This is not just a marketplace. This is a memory.',
          'For centuries, Ason remained one of the beating hearts of Kathmandu, standing along ancient trade routes that connected the southern plains of India with the Tibetan plateau. Traders, pilgrims, monks, and travellers passed through these streets carrying goods, stories, beliefs, and cultures.',
          'Perhaps that is why Kathmandu has always felt different. It was never a city that belonged to only one culture. It was a meeting point—a place where northern mountains met southern civilizations, where Hindu temples stood beside Buddhist monasteries, where merchants discussed business while bells from nearby shrines reminded them of something beyond wealth.',
        ],
      },
      {
        heading: 'A City Designed for Human Connection',
        paragraphs: [
          'One of Kathmandu’s greatest secrets is hidden not in its palaces, but in its neighbourhoods. The old settlements were designed around people.',
          'A family could live in a traditional courtyard house, walk a few steps to a temple, visit a nearby market, meet neighbours in community spaces, and participate in festivals that connected generations. The city was not separated into residential areas, commercial areas, and religious zones like many modern cities. Life happened together.',
          'A temple was not only a place of worship. A courtyard was not only empty space. A marketplace was not only for buying and selling. Everything had a purpose. The traditional Newar settlements of the valley show a remarkable understanding of community living, where architecture, social relationships, culture, and daily activities were woven together.',
          'As the world discusses climate change and the importance of sustainable urban living, the traditional close-knit communities of Kathmandu Valley offer a valuable lesson. For centuries, these settlements were designed around people—with homes, markets, temples, schools, and social spaces within walking distance.',
          'Heritage conservationist Anil Chitrakar, often regarded as a walking encyclopedia of Nepal’s heritage, highlights how these traditional communities represent a way of living where culture, sustainability, and human connection existed together. Kathmandu reminds the world that the future of cities is not only about technology, but also about preserving communities where people live, work, and care for each other.',
        ],
      },
      {
        heading: 'The Valley That Attracted Kings',
        paragraphs: [
          'Why did so many rulers dream of controlling Kathmandu? Because Kathmandu was never just beautiful. It was valuable. The valley had fertile land, water resources, skilled artisans, and a strategic location between Tibet and the Indian subcontinent. Whoever controlled Kathmandu controlled the centre of trade, administration, and influence in the Himalayan region.',
          'The earliest chapters of Kathmandu’s recorded history take us back to ancient kingdoms, including the Licchavi period, when administration, art, inscriptions, and religious architecture began flourishing.',
          'Imagine walking through Kathmandu today and knowing that beneath the roads and houses is a civilization that has been continuously evolving for centuries. The city you see is not one city. There are many cities built on top of each other.',
        ],
      },
      {
        heading: 'When Rivalry Created Beauty',
        paragraphs: [
          'Then came the Malla era, the age when Kathmandu Valley became a canvas for royal imagination. The kings of Kathmandu, Patan, and Bhaktapur competed with each other, not only for power but also for beauty.',
          'They wanted their temples to reach higher. They wanted their palaces to become grander. They wanted their cities to be remembered. This rivalry created something extraordinary: a competition of creativity.',
          'The result was a valley filled with artistic treasures where wood, stone, metal, and brick were transformed into stories. The artisans were not simply builders. They were storytellers. A carved window was a chapter. The temple roof was a poem. A courtyard was a gathering place where generations shared life.',
        ],
      },
      {
        heading: 'Entering Basantapur: Where the Stones Remember',
        paragraphs: [
          'As the walk continues from Ason towards Basantapur, the noise of the market slowly meets the silence of history. And suddenly, Kathmandu changes.',
          'The old palace walls appear. The temples rise above the square. The wooden carvings look down as if they have been watching the city for centuries.',
          'Kathmandu Durbar Square is not a place where history ended. It is a place where history is still breathing. Here, kings were crowned. Festivals were celebrated. Artists created masterpieces. And ordinary people continued their everyday lives around extraordinary monuments.',
          'The palace was never separated from the people. The city and the palace grew together.',
        ],
      },
    ],
  },
  {
    id: 'bhaktapur-durbar-square',
    chapter: 'Chapter 02',
    title: 'Exploring Bhaktapur Durbar Square: A Walk Through Nepal’s Living Medieval City',
    nepaliTitle: 'भक्तपुर दरबार क्षेत्र',
    tagline: 'The City That Slowed Down • Pottery Square Wheels • Juju Dhau (King of Yogurt)',
    location: 'Bhaktapur Durbar Square & Pottery Square',
    duration: 'Full Day (Unhurried)',
    groupSize: 'Private / 1–6 Travelers',
    image: '/explore-with-sakar/images/heritage/durbar-square.jpg',
    imageAlt: 'Soaring medieval pagoda temples and red brick courtyards of Bhaktapur Durbar Square',
    promise:
      'Bhaktapur is not a place where you simply visit the past. It is a place where the past still welcomes you. It slowed down and protected its memories.',
    experience:
      'The first feeling you get when you enter Bhaktapur is not excitement. It is calm. Footsteps on ancient brick pavements replace the noise of busy roads. The fragrance of incense mingles with the aroma of freshly prepared Newari feasts. An artisan sits quietly working with his hands, continuing a skill that has travelled through generations. Here, history is not displayed behind glass—it is actively lived as a living museum.',
    keyQuote: {
      quote:
        'A city does not become timeless because it has old buildings. A city becomes timeless when people continue to give those buildings meaning.',
      attribution: 'Sakar, on the Timelessness of Bhaktapur',
    },
    highlights: [
      'Walking traffic-free brick lanes where footsteps replace the roar of modern city roads',
      'Entering the Golden Gate and Palace of Fifty-Five Windows in unhurried contemplative peace',
      'Observing master potters shape spinning clay into ritual vessels at Pottery Square',
      'Tasting authentic Juju Dhau (King of Yogurt) prepared with centuries-old skill in clay pots',
    ],
    ctaSubject: 'Exploring Bhaktapur Durbar Square: Living Medieval City',
    storySections: [
      {
        heading: 'A Place Where the Past Still Welcomes You',
        paragraphs: [
          'Bhaktapur is not a place where you simply visit the past. It is a place where the past still welcomes you. There are cities that move forward by leaving the past behind. Bhaktapur chose a different path.',
          'It slowed down. It protected its memories. It allowed its old brick lanes, wooden windows, courtyards and traditions to continue telling stories in a world that is changing faster than ever.',
          'The first feeling you get when you enter Bhaktapur is not excitement. It is calm. The sound of footsteps on old brick pavements replaces the noise of busy roads. The smell of freshly prepared Newari food mixes with the fragrance of incense. An artisan sits quietly working with his hands, continuing a skill that may have travelled through generations. You suddenly realize: this is not a city where history is displayed. This is a city where history is lived—so it is known as a living museum.',
        ],
      },
      {
        heading: 'A City Built Around People & The Taste of Abundance',
        paragraphs: [
          'Before modern ideas of sustainable cities became popular, Bhaktapur had already created a human-centred way of living. The city was not divided into places where people lived, worked, worshipped, and gathered separately. Everything existed together.',
          'A temple was not only a religious space. A courtyard was not only architecture. A public water source was not only infrastructure. They were places where relationships were created. Neighbours met, festivals were organized, knowledge was shared and communities looked after each other. Its heritage is not only in the monuments—it is in the lifestyle that surrounds them.',
          'Bhaktapur’s culture also tells a story of a community connected with its land. The fertile valley provided crops, and those crops became part of celebrations, rituals, and social life. Traditional foods, festivals and drinks like Ayla became expressions of sharing and togetherness.',
          'There is a beautiful thought hidden in such traditions: A community that has enough to preserve, create and celebrate has moved beyond survival. It has created culture.',
        ],
      },
      {
        heading: 'Walking Through Bhaktapur Durbar Square',
        paragraphs: [
          'When you finally arrive at Bhaktapur Durbar Square, you do not feel like you have reached a monument. You feel like you have entered a conversation with the past.',
          'The palace windows silently watch over the square. The temples rise above the city like guardians. The statues stand as if they are waiting for the next generation to hear their stories. The Golden Gate, the Palace of Fifty-Five Windows, and the temples around the square are not just examples of architecture—they are reminders of a civilization that believed beauty was an essential part of life.',
          'A city does not become timeless because it has old buildings. A city becomes timeless when people continue to give those buildings meaning.',
        ],
      },
      {
        heading: 'The Hands That Keep Bhaktapur Alive: Pottery & Juju Dhau',
        paragraphs: [
          'Beyond the grand temples and royal courtyards, the true heartbeat of Bhaktapur can be found in the hands of its people.',
          'At Pottery Square, the rhythm of the spinning wheel has continued for generations. As the potter’s wheel turns slowly, ordinary clay transforms into lamps, vessels, and everyday objects. It is not just a craft; it is a conversation between the earth and human hands. The potters of Bhaktapur remind us that heritage is not only found in palaces. Sometimes, it lives in the simplest objects created for daily life.',
          'And then there is Juju Dhau—the “King of Yogurt” of Bhaktapur. Prepared through traditional methods using buffalo milk and clay pots, Juju Dhau is more than a sweet delicacy. It represents patience, skill and a culture where food carries identity. For generations, it has been part of festivals, celebrations, and hospitality, offering visitors a taste of Bhaktapur’s warmth.',
          'Perhaps this is what makes Bhaktapur different: the city’s heritage is not only carved into wood and stone. It is also shaped in clay and preserved in taste. A temple tells the story of kings. A potter tells the story of ordinary people. A bowl of Juju Dhau tells the story of a community that knows how to preserve tradition.',
        ],
      },
    ],
  },
  {
    id: 'patan-durbar-square',
    chapter: 'Chapter 03',
    title: 'Patan Durbar Square: The City of Hidden Courtyards and Living Craft',
    nepaliTitle: 'पाटन दरबार क्षेत्र (ललितपुर)',
    tagline: 'City of Makers • Krishna Mandir • Sacred Bahals & The Living Workshop',
    location: 'Patan (Lalitpur) & Hidden Monastic Bahals',
    duration: 'Full Day (Unhurried)',
    groupSize: 'Private / 1–6 Travelers',
    image: '/images/beyond-the-map/artisan-path.jpg',
    imageAlt: 'Master metal, bronze, and wood artisans in traditional Patan ateliers',
    promise:
      'Patan is a city of makers. In Kathmandu, you encounter history everywhere. In Bhaktapur, you feel history surrounding you. In Patan, you watch history being made by hand.',
    experience:
      'Walk away from the main road and the city begins to reveal itself: a small doorway opens into a courtyard; a shrine appears between two old houses; nearby, metal is being hammered into shape. Patan’s square feels like an open museum of Newar civilization, except the museum is still alive and the workshops are still actively creating deities, windows, and sacred bronze details.',
    keyQuote: {
      quote:
        'Patan is not simply a city where ancient things remain. It is a city where ancient knowledge still has work to do.',
      attribution: 'Sakar, on Patan’s Living Guilds',
    },
    highlights: [
      'Walking through quiet residential bahals echoing with the rhythmic chime of bronze hammers',
      'Admiring the stone mastery of Krishna Mandir and the water engineering of Sundari Chowk and Tusha Hiti',
      'Crossing the sacred threshold between Hinduism and Buddhism at the Golden Temple (Hiranya Varna Mahavihar)',
      'Discovering terracotta marvels like Mahaboudha and ancient public water spouts like Manga Hiti',
    ],
    ctaSubject: 'Patan Durbar Square: City of Hidden Courtyards and Living Craft',
    storySections: [
      {
        heading: 'A City Built by Makers',
        paragraphs: [
          'There is something different about Patan. Kathmandu can feel restless. Bhaktapur feels as though it has paused to remember another time. But Patan feels busy creating—quietly, patiently, almost unnoticed.',
          'Walk away from the main road and the city begins to reveal itself. A small doorway opens into a courtyard. A shrine appears between two old houses. Somewhere nearby, metal is being hammered into shape. A craftsman sits with the concentration of someone who has done the same work for decades.',
          'Patan is often introduced through its temples and Durbar Square. But if you only look at its monuments, you miss what makes the city special: Patan is a city of makers.',
          'For generations, artisans here have worked with metal, wood, stone and clay. Walk through the older neighbourhoods and you may hear the unmistakable rhythm of a hammer striking metal. The techniques are ancient, but the work is not simply preserved behind glass. It is still being done. In Kathmandu, you can encounter history everywhere. In Bhaktapur, you can feel history surrounding everyday life. In Patan, you can sometimes watch history being made by hand.',
        ],
      },
      {
        heading: 'Patan Durbar Square: More Than a Royal Palace',
        paragraphs: [
          'Patan Durbar Square was once the royal centre of the Malla kingdom, but standing there today, it is difficult to think of it simply as a palace complex. The square feels more like an open museum of Newar civilization—except that the museum is still alive.',
          'The Krishna Mandir, with its distinctive stone architecture, stands at the heart of the square. The courtyards lead you deeper into the old palace complex, where carved windows, bronze details and traditional architectural forms reveal the extraordinary skill of the people who built them.',
          'And then there are places such as Sundari Chowk and Tusha Hiti, where water, architecture and craftsmanship come together. The remarkable thing is not simply that these structures survived. It is that their ideas still belong to the city.',
        ],
      },
      {
        heading: 'Where Hinduism and Buddhism Meet',
        paragraphs: [
          'Perhaps nowhere is Patan’s character clearer than in its religious architecture. You do not have to travel far to move between Hindu temples and Buddhist monasteries. A few steps can take you from one tradition into another.',
          'The Golden Temple, or Hiranya Varna Mahavihar, leads you into one of Patan’s historic Buddhist courtyards. Elsewhere, temples and bahals continue to exist within the same urban fabric.',
          'This is not simply a story of two religions existing side by side. For centuries, the traditions have influenced one another, shared artistic traditions and become part of the same community life. Patan teaches you that heritage does not always have neat boundaries. Sometimes, it grows through exchange.',
        ],
      },
      {
        heading: 'Leave the Main Square: Shrines & Ancient Water',
        paragraphs: [
          'This is where I would encourage anyone visiting Patan to do something simple: Leave the main square.',
          'You may find Mahaboudha, an extraordinary terracotta Buddhist monument covered with countless Buddha images. You may discover Rudra Varna Mahavihar, with its remarkable collection of religious art. You may come across an old bahal where people are still gathering, a small shrine tucked between houses, or a traditional water spout that once formed part of the city’s sophisticated water system.',
          'These are the moments when Patan becomes interesting, because the city does not always announce its treasures. You have to look for them.',
          'Patan’s old water systems reveal another side of its intelligence. Places such as Manga Hiti and Kumbheshwar remind us that these cities were not built only around temples and palaces. They were designed around life. Water had to reach communities. People needed gathering places. Religious spaces, homes, courtyards, markets and public infrastructure had to function together. The old city was not a collection of beautiful buildings. It was an urban system.',
        ],
      },
      {
        heading: 'The Real Museum Is the Workshop',
        paragraphs: [
          'Eventually, you begin to understand something: Patan’s greatest museum may not be a museum at all. It may be the workshop of an artisan.',
          'A piece of metal slowly becomes a deity. A block of wood becomes a window. Clay becomes an architectural detail. A traditional technique passes quietly from one generation to another. The city’s heritage survives because someone still knows how to make it.',
          'Kathmandu tells you about a city shaped by power, trade and constant change. Bhaktapur invites you into a city that seems determined to remember. Patan introduces you to the people who know how to create.',
          'And perhaps that is the best way to explore Patan—not by rushing from one monument to another, but by slowing down enough to notice the hands, sounds, courtyards and traditions that continue to give the city its identity. Patan is not simply a city where ancient things remain. It is a city where ancient knowledge still has work to do.',
        ],
      },
    ],
  },
  {
    id: 'pokhara-laid-back-city',
    chapter: 'Chapter 04',
    title: 'Pokhara: The Laid-Back City That Makes You Want to Stay',
    nepaliTitle: 'पोखरा उपत्यका',
    tagline: 'Phewa Lake Reflections • Tal Barahi Temple • Beyond Lakeside to Living Roots',
    location: 'Pokhara Valley, Phewa Lake & Old Bazaar',
    duration: '1–3 Days (Unhurried)',
    groupSize: 'Private / 1–6 Travelers',
    image: '/explore-with-sakar/images/mountains/mountain-ridge.jpg',
    imageAlt: 'Morning mist and wooden boats on Phewa Lake reflecting Annapurna peaks in Pokhara',
    promise:
      'Some places make you want to see everything. Pokhara makes you want to stay. It teaches you to stop rushing and embrace true laid-back peace.',
    experience:
      'Photographs cannot really explain Pokhara, because it is not only about what you see—it is about how the place makes you feel. The morning light on the lake, the sound of paddles touching the water, a distant temple bell, Machhapuchhre rising behind the mist. Here, nature and spirituality become one landscape. Leaving Lakeside reveals the older city, shaped by trade routes and the living traditions of Gurung, Magar, and Thakali communities.',
    keyQuote: {
      quote:
        'Photographs cannot really explain Pokhara. Because Pokhara is not only about what you see. It is about how the place makes you feel.',
      attribution: 'Sakar, on the Cadence of Pokhara',
    },
    highlights: [
      'Gliding across Phewa Lake in a wooden boat at dawn before the morning bustle awakens',
      'Watching the reflection of Machhapuchhre (Fishtail) touch the clear waters',
      'Visiting island shrine Tal Barahi Temple where landscape and worship merge in stillness',
      'Walking through Pokhara’s historic trade quarters and indigenous Gurung, Magar, and Thakali neighbourhoods',
    ],
    ctaSubject: 'Pokhara: The Laid-Back City Exploration',
    storySections: [
      {
        heading: 'Some Places Make You Want to Stay',
        paragraphs: [
          'Some places make you want to see everything. Pokhara makes you want to stay. I think that is the first thing you should know about Pokhara.',
          'You may arrive thinking you are here to see the Himalayas. You may have seen the photographs already of Phewa Lake, a wooden boat, Machhapuchhre rising behind the water. But photographs cannot really explain Pokhara. Because Pokhara is not only about what you see. It is about how the place makes you feel.',
          'The morning light on the lake. The sound of paddles touching the water. A distant temple bell. The mountains appear between buildings. A small café opened its doors. The smell of rain on the hills. And suddenly, without realizing it, you stop rushing. Pokhara teaches you to slow down. Gives you that laid back vibes.',
        ],
      },
      {
        heading: 'Start With the Lake: Nature & Spirituality',
        paragraphs: [
          'I would not begin by taking you from one attraction to another. I would begin at Phewa Lake.',
          'Early in the morning, before Lakeside becomes busy, the lake has a completely different personality. Take a boat. Don’t rush to the other side. Just sit.',
          'Watch the hills reflected in the water. Look towards the mountains. If the sky is clear, Machhapuchhre appears almost impossibly close. And somewhere in the middle of the lake is Tal Barahi Temple, connecting the landscape with the spiritual life of the city.',
          'This is one of the things I love about Pokhara: Nature and spirituality don’t feel separated here. They are part of the same landscape.',
        ],
      },
      {
        heading: 'Then Let Me Show You Another Pokhara',
        paragraphs: [
          'Most visitors stay around Lakeside. And I understand why. But if you want to know Pokhara, I would ask you to leave it.',
          'Go towards the older parts of the city. Walk through local neighbourhoods. Find the places where tourism becomes less visible and everyday life becomes more visible.',
          'Pokhara has been shaped by movement for generations. It was historically connected to trade routes between India and Tibet, and the wider area carries the traditions of communities including Gurung, Magar and Thakali people.',
          'This is the Pokhara I want you to notice. Not just the hotels. Not just the adventure activities. The people who make the place what it is.',
        ],
      },
    ],
  },
];

export default function BeyondTheMapPage() {
  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Page Hero */}
      <PageHero
        badge="Pillar 01 • Guided Exploration"
        nepaliTitle="नक्साभन्दा परको यात्रा"
        title="Go Beyond the Map"
        subtitle="Step past the tourist facades and crowded souvenir corridors. Journey through the living courtyards, ancient Silk Road trade alleys, master artisan workshops, and calm waters of Kathmandu, Bhaktapur, Patan, and Pokhara."
        backgroundImage="/images/beyond-the-map/living-courtyards.jpg"
        breadcrumbs={[
          { label: 'Experiences', href: '/experiences' },
          { label: 'Go Beyond the Map' },
        ]}
      />

      {/* 2. The Beyond the Map Philosophy & Manifesto */}
      <section className="py-16 sm:py-24 bg-white border-b border-parchment-300">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>Our Core Travel Philosophy</span>
              </span>

              <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
                Not Just Visiting Places — Stepping Inside the Living Soul of Nepal
              </h2>

              <p className="text-base sm:text-lg text-himalaya-700 font-light leading-relaxed">
                Most visitors see Nepal through the hurried frame of a tour bus window or the crowded ticket gates of main monuments. <strong className="font-semibold text-himalaya-900">&ldquo;Go Beyond the Map&rdquo;</strong> is our personal pledge to walk past the superficial facades into the real, beating pulse of our homeland.
              </p>

              <p className="text-sm sm:text-base text-himalaya-600 font-light leading-relaxed">
                Guided by Sakar, you enter quiet residential bahals where community life has continued uninterrupted for centuries, sit beside master artisans in private ateliers, discover ancient water conduits holding medieval secrets, and slow down on peaceful Himalayan lake shores where nature and spirituality live as one.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-parchment-200">
                {[
                  'Hidden residential bahals away from mass tourism',
                  'Direct dialogue with multi-generational master guilds',
                  'Unhurried, conversational pacing tailored to your curiosity',
                  'Ethical contribution directly supporting local community heritage',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-himalaya-800">
                    <div className="w-5 h-5 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-floating border border-parchment-300 aspect-[4/5] bg-himalaya-900 group">
                <Image
                  src="/images/beyond-the-map/living-courtyards.jpg"
                  alt="Ancient Kathmandu residential courtyard"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/85 via-himalaya-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                  <p className="font-display-serif italic text-lg sm:text-xl leading-snug">
                    &ldquo;When you leave the noisy main street through a tiny brick doorway, the city suddenly whispers eight centuries of living peace.&rdquo;
                  </p>
                  <p className="text-xs text-saffron-light mt-2 font-semibold uppercase tracking-wider font-mono">
                    — Sakar, Tour Director
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 4 Curated Chapters */}
      <section className="py-20 sm:py-28 bg-parchment-100">
        <div className="editorial-container space-y-24">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Four Distinct Journeys</span>
            </span>
            <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight">
              The Beyond the Map Series
            </h2>
            <p className="text-sm sm:text-base text-himalaya-600 font-light leading-relaxed">
              Four deeply researched, sensorially rich journeys curated for travelers who crave authentic depth, true human connection, and architectural wonder.
            </p>
          </div>

          {/* Journeys List */}
          <div className="space-y-24 sm:space-y-32">
            {BEYOND_JOURNEYS.map((journey, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={journey.id}
                  id={journey.id}
                  className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-parchment-300 shadow-sm hover:shadow-floating transition-shadow"
                >
                  {/* Photo Column */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="sticky top-24 space-y-6">
                      <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[4/3] bg-himalaya-900 border border-parchment-200 shadow-warm group">
                        <Image
                          src={journey.image}
                          alt={journey.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 500px"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/60 via-transparent to-transparent opacity-60" />
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-himalaya-950/80 backdrop-blur-sm text-parchment-100 text-[11px] font-bold tracking-wider uppercase">
                            {journey.chapter}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-xs text-parchment-200 font-mono flex items-center gap-1.5 drop-shadow">
                            <MapPin className="w-3.5 h-3.5 text-terracotta shrink-0" />
                            <span>{journey.location}</span>
                          </p>
                        </div>
                      </div>

                      {/* Pull Quote Card */}
                      <div className="p-5 rounded-2xl bg-parchment-100 border border-parchment-300 relative">
                        <Quote className="w-6 h-6 text-terracotta/20 absolute top-4 right-4" />
                        <p className="font-editorial-serif italic text-sm text-himalaya-900 leading-relaxed">
                          &ldquo;{journey.keyQuote.quote}&rdquo;
                        </p>
                        <p className="text-[11px] font-mono font-semibold text-terracotta mt-2 uppercase tracking-wider">
                          — {journey.keyQuote.attribution}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Link
                          href={`/contact?subject=${encodeURIComponent(journey.ctaSubject)}`}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-terracotta hover:bg-terracotta-light text-white text-xs font-bold uppercase tracking-wider shadow-warm transition-all text-center flex-1"
                        >
                          <span>Inquire About Journey</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-semibold text-terracotta uppercase tracking-wider">
                          {journey.tagline}
                        </span>
                        {journey.nepaliTitle && (
                          <span className="text-xs font-serif text-himalaya-500">
                            • {journey.nepaliTitle}
                          </span>
                        )}
                      </div>
                      <h3 className="font-editorial-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-himalaya-950 leading-tight">
                        {journey.title}
                      </h3>
                    </div>

                    {/* The "Beyond the Map" Promise Card */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-terracotta/5 border border-terracotta/15 space-y-2">
                      <div className="flex items-center gap-2 text-terracotta text-xs font-bold uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-terracotta" />
                        <span>The &ldquo;Beyond the Map&rdquo; Promise</span>
                      </div>
                      <p className="font-editorial-serif italic text-sm sm:text-base text-himalaya-900 leading-relaxed">
                        &ldquo;{journey.promise}&rdquo;
                      </p>
                    </div>

                    {/* The Experience Description */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-himalaya-700">
                        The Experience Overview
                      </h4>
                      <p className="text-sm sm:text-base text-himalaya-700 font-light leading-relaxed">
                        {journey.experience}
                      </p>
                    </div>

                    {/* Curated Highlights */}
                    <div className="space-y-2 pt-2 border-t border-parchment-200">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-himalaya-700">
                        Curated Sensory Moments
                      </h4>
                      <div className="space-y-2">
                        {journey.highlights.map((point, hIdx) => (
                          <div key={hIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-himalaya-800">
                            <div className="w-4 h-4 rounded-full bg-terracotta/15 text-terracotta flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5" />
                            </div>
                            <span className="font-light">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expandable Field Essay Reader */}
                    <div className="pt-4 border-t border-parchment-200">
                      <details className="group rounded-2xl bg-parchment-50 border border-parchment-200/80 overflow-hidden transition-all duration-300 open:shadow-sm">
                        <summary className="cursor-pointer flex items-center justify-between p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-himalaya-900 hover:text-terracotta transition-colors select-none">
                          <div className="flex items-center gap-2.5">
                            <BookOpen className="w-4 h-4 text-terracotta" />
                            <span>Read Sakar&apos;s Full Field Story ({journey.storySections.length} Chapters)</span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-himalaya-500 group-open:rotate-180 transition-transform duration-200" />
                        </summary>

                        <div className="p-5 sm:p-7 pt-2 space-y-8 border-t border-parchment-200/60 bg-white/60">
                          {journey.storySections.map((sec, sIdx) => (
                            <div key={sIdx} className="space-y-3">
                              <h5 className="font-editorial-serif text-lg sm:text-xl font-bold text-himalaya-950 border-b border-parchment-200 pb-1.5">
                                {sec.heading}
                              </h5>
                              <div className="space-y-3">
                                {sec.paragraphs.map((p, pIdx) => (
                                  <p
                                    key={pIdx}
                                    className="text-sm sm:text-base text-himalaya-700 font-light leading-relaxed"
                                  >
                                    {p}
                                  </p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Host Note from Sakar */}
      <section className="py-20 sm:py-24 bg-himalaya-950 text-white relative overflow-hidden">
        <div className="editorial-container relative z-10">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-terracotta/40 shadow-2xl">
                <Image
                  src="/explore-with-sakar/images/sakar/sakar-portrait.jpg"
                  alt="Sakar, Tour Director"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-8 space-y-5 text-center md:text-left">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/20 text-terracotta-light text-xs font-semibold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5" />
                <span>Your Host & Cultural Translator</span>
              </span>

              <h3 className="font-editorial-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                &ldquo;Nepal Is Best Experienced Hand-in-Hand, Not Through a Turnstile.&rdquo;
              </h3>

              <p className="text-sm sm:text-base text-parchment-300 font-light leading-relaxed">
                When you explore with me, there are no scripted spiels or rush to catch the next tourist bus. If a bronze caster invites us into his courtyard for freshly made chiya, we sit down, take off our shoes, and listen. That unscripted human warmth is what makes Nepal unforgettable.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <Link
                  href="https://wa.me/9779840482692?text=Namaste%20Sakar,%20I%20am%20interested%20in%20the%20Go%20Beyond%20the%20Map%20experiences."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>Chat Direct on WhatsApp</span>
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-parchment-100 text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <span>Read Sakar&apos;s Story</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Comprehensive CTA Section */}
      <CTASection
        title="Ready to Step Beyond the Map?"
        subtitle="Whether you have an afternoon in Kathmandu or wish to spend a week decoding medieval kingdoms, living workshops, and peaceful lakes, we will tailor the journey completely around your pace and curiosity."
        primaryButtonText="Design Your Beyond the Map Journey"
        primaryButtonHref="/contact?subject=Go%20Beyond%20the%20Map%20Custom%20Journey"
      />
    </div>
  );
}
