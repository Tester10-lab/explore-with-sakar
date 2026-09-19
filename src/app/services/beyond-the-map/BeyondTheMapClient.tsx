'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  Sparkles,
  Check,
  ArrowRight,
  Quote,
  BookOpen,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import CTASection from '@/components/common/CTASection';

export interface StorySection {
  heading: string;
  paragraphs: string[];
}

export interface BeyondExperience {
  id: string;
  pageNumber: string; // e.g. "Page 01", "Page 02", etc.
  title: string;
  subtitle: string;
  nepaliTitle?: string;
  tagline: string;
  location: string;
  duration: string;
  groupSize: string;
  image: string;
  imageAlt: string;
  promise: string;
  experienceOverview: string;
  keyQuote: {
    quote: string;
    attribution: string;
  };
  highlights: string[];
  storySections: StorySection[];
  ctaSubject: string;
}

export const BEYOND_EXPERIENCES: BeyondExperience[] = [
  {
    id: 'kathmandu-durbar-square',
    pageNumber: 'Page 01',
    title: 'Kathmandu Durbar Square',
    subtitle: 'Where Every Stone Holds a Story',
    nepaliTitle: 'काठमाडौँ दरबार क्षेत्र',
    tagline: 'Ason Morning Alleys • Ancient Trade Routes • Sustainable Human Settlements',
    location: 'Old Kathmandu (Ason Alleys & Basantapur Durbar Square)',
    duration: 'Full Day (Unhurried)',
    groupSize: 'Private / 1–6 Travelers',
    image: '/images/beyond-the-map/living-courtyards.jpg',
    imageAlt: 'Morning light across ancient brick courtyards and temples in Kathmandu',
    promise:
      'If you want to understand Kathmandu, do not start with a monument. Start with a morning walk where the city wakes up in the narrow alleys of Ason.',
    experienceOverview:
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
    ctaSubject: 'Go Beyond the Map: Kathmandu Durbar Square (Page 01)',
    storySections: [
      {
        heading: 'Start With a Morning Walk in Ason',
        paragraphs: [
          'If you want to understand Kathmandu, do not start with a monument. Start with a morning walk. Start where the city wakes up in the narrow alleys of Ason.',
          'As the first rays of sunlight enter between old brick houses, the smell of spices, incense, fresh vegetables, and traditional sweets fills the air. Shopkeepers open wooden shutters that have witnessed generations of customers. People rush through lanes that appear too narrow for a modern city, yet somehow carry the rhythm of thousands of years.',
          'This is not just a marketplace. This is a memory.',
          'For centuries, Ason remained one of the beating hearts of Kathmandu, standing along ancient trade routes that connected the southern plains of India with the Tibetan plateau. Traders, pilgrims, monks, and travellers passed through these streets carrying goods, stories, beliefs, and cultures.',
          'Perhaps that is why Kathmandu has always felt different. It was never a city that belonged to only one culture. It was a meeting point: a place where northern mountains met southern civilizations, where Hindu temples stood beside Buddhist monasteries, where merchants discussed business while bells from nearby shrines reminded them of something beyond wealth.',
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
          'Why did so many rulers dream of controlling Kathmandu? Because Kathmandu was never just beautiful. It was valuable.',
          'The valley had fertile land, water resources, skilled artisans, and a strategic location between Tibet and the Indian subcontinent. Whoever controlled Kathmandu controlled the centre of trade, administration, and influence in the Himalayan region.',
          'The earliest chapters of Kathmandu’s recorded history take us back to ancient kingdoms, including the Licchavi period, when administration, art, inscriptions, and religious architecture began flourishing. Imagine walking through Kathmandu today and knowing that beneath the roads and houses is a civilization that has been continuously evolving for centuries.',
          'The city you see is not one city. There are many cities built on top of each other.',
        ],
      },
      {
        heading: 'When Rivalry Created Beauty',
        paragraphs: [
          'Then came the Malla era—the age when Kathmandu Valley became a canvas for royal imagination. The kings of Kathmandu, Patan, and Bhaktapur competed with each other, not only for power but also for beauty. They wanted their temples to reach higher. They wanted their palaces to become grander. They wanted their cities to be remembered.',
          'This rivalry created something extraordinary: a competition of creativity. The result was a valley filled with artistic treasures where wood, stone, metal, and brick were transformed into stories.',
          'The artisans were not simply builders. They were storytellers. A carved window was a chapter. The temple roof was a poem. A courtyard was a gathering place where generations shared life.',
        ],
      },
      {
        heading: 'Entering Basantapur: Where the Stones Remember',
        paragraphs: [
          'As the walk continues from Ason towards Basantapur, the noise of the market slowly meets the silence of history. And suddenly, Kathmandu changes. The old palace walls appear. The temples rise above the square. The wooden carvings look down as if they have been watching the city for centuries.',
          'Kathmandu Durbar Square is not a place where history ended. It is a place where history is still breathing. Here, kings were crowned. Festivals were celebrated. Artists created masterpieces. And ordinary people continued their everyday lives around extraordinary monuments.',
          'The palace was never separated from the people. The city and the palace grew together.',
        ],
      },
    ],
  },
  {
    id: 'bhaktapur-durbar-square',
    pageNumber: 'Page 02',
    title: 'Bhaktapur Durbar Square',
    subtitle: 'A Walk Through Nepal’s Living Medieval City',
    nepaliTitle: 'भक्तपुर दरबार क्षेत्र',
    tagline: 'The City That Slowed Down • Living Museum • Pottery Square & Juju Dhau',
    location: 'Bhaktapur Ancient Citadel & Pottery Square',
    duration: 'Full Day (Unhurried)',
    groupSize: 'Private / 1–6 Travelers',
    image: '/explore-with-sakar/images/heritage/durbar-square.jpg',
    imageAlt: 'Nyatapola temple and courtyards in historic Bhaktapur',
    promise:
      'Bhaktapur is not a place where you simply visit the past. It is a place where the past still welcomes you. There are cities that move forward by leaving the past behind. Bhaktapur chose a different path: it slowed down.',
    experienceOverview:
      'The first feeling you get when you enter Bhaktapur is not excitement. It is calm. The sound of footsteps on old brick pavements replaces the noise of busy roads. The smell of freshly prepared Newari food mixes with the fragrance of incense. An artisan sits quietly working with his hands, continuing a skill that may have travelled through generations. You suddenly realize: this is not a city where history is displayed. This is a city where history is lived—a living museum.',
    keyQuote: {
      quote:
        'A city does not become timeless because it has old buildings. A city becomes timeless when people continue to give those buildings meaning.',
      attribution: 'Local Artisan, Pottery Square Bhaktapur',
    },
    highlights: [
      'Strolling vehicle-free red brick alleys where footsteps echo gently on ancient stone pavers',
      'Observing master potters at Pottery Square spinning raw Himalayan clay into sacred vessels',
      'Tasting fresh Juju Dhau (“King of Yogurt”) prepared traditionally in clay pots using buffalo milk',
      'Standing before the Golden Gate and the Palace of Fifty-Five Windows in royal contemplation',
    ],
    ctaSubject: 'Go Beyond the Map: Bhaktapur Durbar Square (Page 02)',
    storySections: [
      {
        heading: 'The City That Slowed Down to Protect Its Memories',
        paragraphs: [
          'Bhaktapur is not a place where you simply visit the past. It is a place where the past still welcomes you. There are cities that move forward by leaving the past behind. Bhaktapur chose a different path. It slowed down. It protected its memories.',
          'It allowed its old brick lanes, wooden windows, courtyards and traditions to continue telling stories in a world that is changing faster than ever.',
          'The first feeling you get when you enter Bhaktapur is not excitement. It is calm. The sound of footsteps on old brick pavements replaces the noise of busy roads. The smell of freshly prepared Newari food mixes with the fragrance of incense. An artisan sits quietly working with his hands, continuing a skill that may have travelled through generations.',
          'You suddenly realize: this is not a city where history is displayed. This is a city where history is lived, so it is known as a living museum.',
        ],
      },
      {
        heading: 'A City Built Around People',
        paragraphs: [
          'Before modern ideas of sustainable cities became popular, Bhaktapur had already created a human-centred way of living. The city was not divided into places where people lived, worked, worshipped, and gathered separately. Everything existed together.',
          'A temple was not only a religious space. A courtyard was not only architecture. A public water source was not only infrastructure. They were places where relationships were created. Neighbours met, festivals were organized, knowledge was shared, and communities looked after each other.',
          'This is perhaps why Bhaktapur feels different from many historic cities. Its heritage is not only in the monuments. It is in the lifestyle that surrounds them.',
        ],
      },
      {
        heading: 'The Taste of Abundance & Culture',
        paragraphs: [
          'Bhaktapur’s culture also tells a story of a community connected with its land. The fertile valley provided crops, and those crops became part of celebrations, rituals, and social life. Traditional foods, festivals, and drinks like Ayla became expressions of sharing and togetherness.',
          'There is a beautiful thought hidden in such traditions: a community that has enough to preserve, create, and celebrate has moved beyond survival. It has created culture.',
        ],
      },
      {
        heading: 'Walking Through Bhaktapur Durbar Square',
        paragraphs: [
          'When you finally arrive at Bhaktapur Durbar Square, you do not feel like you have reached a monument. You feel like you have entered a conversation with the past.',
          'The palace windows silently watch over the square. The temples rise above the city like guardians. The statues stand as if they are waiting for the next generation to hear their stories. The Golden Gate, the Palace of Fifty-Five Windows, and the temples around the square are not just examples of architecture—they are reminders of a civilization that believed beauty was an essential part of life.',
          'The greatest treasure of Bhaktapur is not only what was built centuries ago. It is what continues today. A potter shaping clay. A family following traditions. A festival bringing an entire neighbourhood together. A child growing up beside a temple that has watched hundreds of generations.',
          'Bhaktapur teaches us something important: a city does not become timeless because it has old buildings. A city becomes timeless when people continue to give those buildings meaning.',
        ],
      },
      {
        heading: 'The Hands That Keep Bhaktapur Alive: Pottery & Juju Dhau',
        paragraphs: [
          'Beyond the grand temples and royal courtyards, the true heartbeat of Bhaktapur can be found in the hands of its people.',
          'At Pottery Square, the rhythm of the spinning wheel has continued for generations. As the potter’s wheel turns slowly, ordinary clay transforms into lamps, vessels, and everyday objects. It is not just a craft; it is a conversation between the earth and human hands. The potters of Bhaktapur remind us that heritage is not only found in palaces. Sometimes, it lives in the simplest objects created for daily life.',
          'And then there is Juju Dhau—the “King of Yogurt” of Bhaktapur. Prepared through traditional methods using buffalo milk and clay pots, Juju Dhau is more than a sweet delicacy. It represents patience, skill, and a culture where food carries identity. For generations, it has been part of festivals, celebrations, and hospitality, offering visitors a taste of Bhaktapur’s warmth.',
          'Perhaps this is what makes Bhaktapur different: the city’s heritage is not only carved into wood and stone. It is also shaped in clay and preserved in taste. A temple tells the story of kings. A potter tells the story of ordinary people. A bowl of Juju Dhau tells the story of a community that knows how to preserve tradition.',
        ],
      },
    ],
  },
  {
    id: 'patan-durbar-square',
    pageNumber: 'Page 03',
    title: 'Patan Durbar Square',
    subtitle: 'The City of Hidden Courtyards and Living Craft',
    nepaliTitle: 'पाटन दरबार क्षेत्र',
    tagline: 'City of Makers • Krishna Mandir • Sacred Water Systems • The Workshop as Museum',
    location: 'Lalitpur (Historic Patan Bahals & Durbar Square)',
    duration: 'Full Day (Unhurried)',
    groupSize: 'Private / 1–6 Travelers',
    image: '/explore-with-sakar/images/heritage/temple-courtyard.jpg',
    imageAlt: 'Ancient stone temple and courtyard in Patan',
    promise:
      'Kathmandu can feel restless. Bhaktapur feels as though it has paused to remember another time. But Patan feels busy creating quietly, patiently, almost unnoticed.',
    experienceOverview:
      'Walk away from the main road and Patan begins to reveal itself. A small doorway opens into a courtyard. A shrine appears between two old houses. Somewhere nearby, metal is being hammered into shape. A craftsman sits with the concentration of someone who has done the same work for decades. In Kathmandu, you encounter history everywhere; in Bhaktapur, you feel history surrounding everyday life; in Patan, you can watch history being made by hand.',
    keyQuote: {
      quote:
        'Patan is not simply a city where ancient things remain. It is a city where ancient knowledge still has work to do.',
      attribution: 'Sakar, Cultural Interpreter',
    },
    highlights: [
      'Stepping off tourist thoroughfares into secluded residential courtyards and monastic bahals',
      'Observing multi-generational master metalworkers and sculptors hand-hammering bronze deities',
      'Admiring the distinctive stone architecture of Krishna Mandir and the carved bath of Tusha Hiti',
      'Discovering how ancient hydraulic engineering in Manga Hiti and Kumbheshwar sustained community life',
    ],
    ctaSubject: 'Go Beyond the Map: Patan Durbar Square (Page 03)',
    storySections: [
      {
        heading: 'A City Built by Makers',
        paragraphs: [
          'There is something different about Patan. Kathmandu can feel restless. Bhaktapur feels as though it has paused to remember another time. But Patan feels busy creating quietly, patiently, almost unnoticed.',
          'Walk away from the main road and the city begins to reveal itself. A small doorway opens into a courtyard. A shrine appears between two old houses. Somewhere nearby, metal is being hammered into shape. A craftsman sits with the concentration of someone who has done the same work for decades.',
          'Patan is often introduced through its temples and Durbar Square. But if you only look at its monuments, you miss what makes the city special. Patan is a city of makers.',
          'For generations, artisans here have worked with metal, wood, stone and clay. Walk through the older neighbourhoods and you may hear the unmistakable rhythm of a hammer striking metal. The techniques are ancient, but the work is not simply preserved behind glass. It is still being done.',
          'That is what makes Patan different. In Kathmandu, you can encounter history everywhere. In Bhaktapur, you can feel history surrounding everyday life. In Patan, you can sometimes watch history being made by hand.',
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
        heading: 'Leave the Main Square: The Hidden Bahals',
        paragraphs: [
          'This is where I would encourage anyone visiting Patan to do something simple: leave the main square.',
          'You may find Mahaboudha, an extraordinary terracotta Buddhist monument covered with countless Buddha images. You may discover Rudra Varna Mahavihar, with its remarkable collection of religious art.',
          'You may come across an old bahal where people are still gathering, a small shrine tucked between houses, or a traditional water spout that once formed part of the city’s sophisticated water system. These are the moments when Patan becomes interesting. Because the city does not always announce its treasures. You have to look for them.',
        ],
      },
      {
        heading: 'A City That Understands Water & The Workshop as Museum',
        paragraphs: [
          'Patan’s old water systems reveal another side of its intelligence. Places such as Manga Hiti and Kumbheshwar remind us that these cities were not built only around temples and palaces. They were designed around life.',
          'Water had to reach communities. People needed gathering places. Religious spaces, homes, courtyards, markets and public infrastructure had to function together. The old city was not a collection of beautiful buildings; it was an urban system. And perhaps that is one of the most interesting things to discover while walking through Patan: behind the beauty is a practical understanding of how a community survives.',
          'Eventually, you begin to understand something: Patan’s greatest museum may not be a museum at all. It may be the workshop of an artisan.',
          'A piece of metal slowly becomes a deity. A block of wood becomes a window. Clay becomes an architectural detail. A traditional technique passes quietly from one generation to another. The city’s heritage survives because someone still knows how to make it.',
          'Patan introduces you to the people who know how to create. And perhaps that is the best way to explore Patan—not by rushing from one monument to another, but by slowing down enough to notice the hands, sounds, courtyards and traditions that continue to give the city its identity.',
          'Patan is not simply a city where ancient things remain. It is a city where ancient knowledge still has work to do.',
        ],
      },
    ],
  },
  {
    id: 'pokhara-the-laid-back-city',
    pageNumber: 'Page 04',
    title: 'Pokhara',
    subtitle: 'The Laid-Back City',
    nepaliTitle: 'शान्त पोखरा',
    tagline: 'Phewa Lake Stillness • Machhapuchhre Dawn • Historic Trade Quarters & People',
    location: 'Pokhara Valley & Phewa Lake Sanctuary',
    duration: 'Full Day to Multi-Day',
    groupSize: 'Private / 1–6 Travelers',
    image: '/explore-with-sakar/images/mountains/mountain-ridge.jpg',
    imageAlt: 'Reflections of Annapurna and Machhapuchhre in calm morning waters of Pokhara',
    promise:
      'Some places make you want to see everything. Pokhara makes you want to stay. Photographs cannot really explain Pokhara, because it is not only about what you see—it is about how the place makes you feel.',
    experienceOverview:
      'The morning light on the lake. The sound of paddles touching the water. A distant temple bell. The mountains appear between buildings. A small café opened its doors. The smell of rain on the hills. And suddenly, without realizing it, you stop rushing. Pokhara teaches you to slow down. Gives you that laid back vibes. Glide past Tal Barahi Temple on Phewa Lake, then leave Lakeside to discover the older trade quarters carrying the living traditions of Gurung, Magar, and Thakali communities.',
    keyQuote: {
      quote:
        'Nature and spirituality don’t feel separated here. They are part of the same landscape.',
      attribution: 'Sakar, Journey Host',
    },
    highlights: [
      'Early morning silent wooden paddle boat on Phewa Lake before Lakeside wakes up',
      'Reflections of sacred Machhapuchhre (Fishtail) touching the mirror-still lake surface',
      'Visiting Tal Barahi island temple where nature and spiritual devotion converge',
      'Leaving tourist zones to walk through Old Pokhara’s historic bazaars and indigenous communities',
    ],
    ctaSubject: 'Go Beyond the Map: Pokhara (Page 04)',
    storySections: [
      {
        heading: 'The City That Makes You Want to Stay',
        paragraphs: [
          'Some places make you want to see everything. Pokhara makes you want to stay. I think that is the first thing you should know about Pokhara.',
          'You may arrive thinking you are here to see the Himalayas. You may have seen the photographs already of Phewa Lake, a wooden boat, Machhapuchhre rising behind the water. But photographs cannot really explain Pokhara. Because Pokhara is not only about what you see. It is about how the place makes you feel.',
          'The morning light on the lake. The sound of paddles touching the water. A distant temple bell. The mountains appear between buildings. A small café opened its doors. The smell of rain on the hills.',
          'And suddenly, without realizing it, you stop rushing. Pokhara teaches you to slow down. Gives you that laid-back vibes.',
        ],
      },
      {
        heading: 'Start With the Lake: Phewa & Tal Barahi',
        paragraphs: [
          'I would not begin by taking you from one attraction to another. I would begin at Phewa Lake. Early in the morning, before Lakeside becomes busy, the lake has a completely different personality.',
          'Take a boat. Don’t rush to the other side. Just sit.',
          'Watch the hills reflected in the water. Look towards the mountains. If the sky is clear, Machhapuchhre appears almost impossibly close. And somewhere in the middle of the lake is Tal Barahi Temple, connecting the landscape with the spiritual life of the city.',
          'This is one of the things I love about Pokhara: nature and spirituality don’t feel separated here. They are part of the same landscape.',
        ],
      },
      {
        heading: 'Then Let Me Show You Another Pokhara: The Historic Communities',
        paragraphs: [
          'Most visitors stay around Lakeside. And I understand why. But if you want to know Pokhara, I would ask you to leave it. Go towards the older parts of the city.',
          'Walk through local neighbourhoods. Find the places where tourism becomes less visible and everyday life becomes more visible.',
          'Pokhara has been shaped by movement for generations. It was historically connected to trade routes between India and Tibet, and the wider area carries the traditions of communities including Gurung, Magar and Thakali people.',
          'This is the Pokhara I want you to notice. Not just the hotels. Not just the adventure activities. The people who make the place what it is.',
        ],
      },
    ],
  },
  {
    id: 'secret-residential-bahals',
    pageNumber: 'Page 05',
    title: 'Secret Residential Bahals',
    subtitle: 'The Hidden Heartbeats of Kathmandu Valley',
    nepaliTitle: 'बहाल र बाहाहरूको रहस्य',
    tagline: 'Centuries-Old Monastic Courtyards • Stupa Sanctuaries • Morning Butter Lamps',
    location: 'Historic Courtyards of Kathmandu & Patan',
    duration: 'Half Day (Morning Focus)',
    groupSize: 'Private / 1–6 Travelers',
    image: '/images/beyond-the-map/living-courtyards.jpg',
    imageAlt: 'Secluded historic Newari courtyard with prayer stupa and carved wooden doorways',
    promise:
      'Step through a doorway lower than your shoulder, and leave modern traffic behind. Inside a Bahal, life operates according to medieval rhythms of devotion and neighbourly care.',
    experienceOverview:
      'The Newar Bahal (monastic courtyard) is one of the architectural marvels of Asia. Enclosed on four sides by historic residential brick dwellings, each bahal centers on a sacred votive stupa or shrine. In the early morning, grandmothers light brass butter lamps, children play beside stone chaityas carved eight centuries ago, and the air smells of crushed marigolds and juniper. Guided by Sakar, you enter these intimate spaces not as an intrusive spectator, but as an invited guest.',
    keyQuote: {
      quote:
        'A Bahal is not a museum courtyard; it is a sacred living room shared by four generations of families who know every neighbor by name.',
      attribution: 'Sakar, Cultural Guide',
    },
    highlights: [
      'Entering hidden courtyards through low carved brick archways unknown to commercial tourists',
      'Witnessing the quiet dawn ritual of butter lamp offerings and morning circumambulation',
      'Examining Licchavi-era stone chaityas carved with cosmological representations of the cosmos',
      'Meeting local family elders who maintain hereditary care over their courtyard shrines',
    ],
    ctaSubject: 'Go Beyond the Map: Secret Residential Bahals (Page 05)',
    storySections: [
      {
        heading: 'The Sacred Architecture of the Bahal',
        paragraphs: [
          'To understand the genius of Newar urban planning, one must study the Bahal. Derived from the Sanskrit word Vihara (monastery), these courtyards were originally conceived as residential monasteries for Buddhist monks. Over centuries, as monks married and founded families, the viharas transitioned into tight-knit residential family compounds.',
          'Yet the sanctity remained unbroken. Every Bahal has a central chaitya or stupa, a shrine dedicated to Kwapa-dya (the guardian deity), and a sacred torana carving above the sanctum doorway.',
          'When you enter, notice how the building facades form a protective wall against the outside world. The noise of modern motorbikes and commerce fades instantly. What remains is the sound of water dripping from an earthen pot, pigeon wings fluttering across tile roofs, and elders chatting in low voices on wooden porches (Phalechas).',
        ],
      },
      {
        heading: 'Living Devotion in Daily Rhythms',
        paragraphs: [
          'In western cities, sacred spaces are visited on designated holy days. In the Bahals of Kathmandu and Patan, sacredness is woven into every breath. A mother carrying a basket of vegetables to her kitchen pauses to touch her forehead to the base of a 7th-century stone stupa.',
          'A craftsman sweeps the courtyard flagstones before sitting down to carve timber. At dusk, oil lamps cast dancing shadows against hand-pressed Malla bricks.',
          'Walking through these bahals with Sakar offers travelers an intimate window into human-centered urban ecology—a way of living where architecture protects community, and community keeps the sacred alive.',
        ],
      },
    ],
  },
  {
    id: 'living-goddess-tantric-architecture',
    pageNumber: 'Page 06',
    title: 'The Living Goddess Kumari',
    subtitle: 'Sacred Tantric Architecture & Royal Devotion',
    nepaliTitle: 'जीवन्त देवी कुमारी र तान्त्रिक वास्तुकला',
    tagline: 'Kumari Ghar • Carved Wooden Struts • Sacred Cosmological City Alignment',
    location: 'Basantapur & Southern Old Kathmandu',
    duration: 'Half Day (Afternoon)',
    groupSize: 'Private / 1–6 Travelers',
    image: '/explore-with-sakar/images/heritage/durbar-square.jpg',
    imageAlt: 'Intricate wood carvings and historic windows of Kumari Ghar',
    promise:
      'In Kathmandu, divinity is not an abstract concept relegated to mythology. It walks among us, looks through carved palace windows, and blesses emperors and citizens alike.',
    experienceOverview:
      'At the southern edge of Kathmandu Durbar Square stands the Kumari Ghar—a magnificent three-story brick-and-timber palace built in 1757 by King Jaya Prakash Malla. Behind its intricately carved windows lives the Royal Kumari, a young girl chosen through ancient esoteric trials to serve as the living embodiment of the divine feminine energy Taleju. We study the profound cosmological architecture of the residence, explore the tantric symbolism carved into its wooden roof struts, and learn the living traditions of the Shakya artisan clan.',
    keyQuote: {
      quote:
        'The Kumari tradition is not an oddity of the past; it is the living anchor of Kathmandu’s collective faith and feminine reverence.',
      attribution: 'Heritage Scholar, Kathmandu Valley',
    },
    highlights: [
      'Standing inside the quiet courtyard of Kumari Ghar to appreciate master Newari woodcraft',
      'Decoding the 32 physical and spiritual attributes required for selection of the Living Goddess',
      'Understanding the tantric mandala geometry that protects the ancient royal city',
      'Exploring the relationship between Newar Vajrayana Buddhism and Hindu royalty',
    ],
    ctaSubject: 'Go Beyond the Map: The Living Goddess Kumari (Page 06)',
    storySections: [
      {
        heading: 'The Sacred Selection and Cosmic Balance',
        paragraphs: [
          'The tradition of the Kumari is unique in the world. Selected from the Buddhist Shakya clan of goldsmiths and jewelers, the young girl is tested for fearlessness, serenity, and physical perfection. Once enthroned, she is revered by both Buddhist and Hindu communities, embodying the complete syncretism of the Kathmandu Valley.',
          'Her role is not merely symbolic: during the autumn festival of Indra Jatra, the head of state comes before her to bow his head and receive her tika blessing, conferring legitimacy to rule for another year.',
          'Through this ceremony, power is symbolically subordinated to spiritual innocence and the divine feminine principle.',
        ],
      },
      {
        heading: 'Architecture of the Kumari Ghar',
        paragraphs: [
          'The Kumari Ghar itself is a masterpiece of Newari architecture. The exterior brickwork features carved wooden windows (Sanjhyas) of extraordinary complexity, with hundreds of tiny interlocking pieces constructed without a single iron nail.',
          'Inside the peaceful inner courtyard, wooden columns carved with protective multi-armed deities lean outwards to support the heavy tiled roofs.',
          'Looking up into the courtyard frames a perfect square of sky—a physical manifestation of the cosmological mandala that protects the sacred resident within.',
        ],
      },
    ],
  },
  {
    id: 'lalitpur-chisel-masters-bronze',
    pageNumber: 'Page 07',
    title: 'Lalitpur’s Chisel Masters',
    subtitle: 'Lost-Wax Bronze & Hand-Hammered Metal Guilds',
    nepaliTitle: 'ललितपुरका कालिगढ र धातु कला',
    tagline: 'Cire Perdue Casting • Hereditary Ateliers • Hammered Singing Bowls',
    location: 'Lalitpur Ancient Artisan Quarters',
    duration: 'Full Day',
    groupSize: 'Private / 1–6 Travelers',
    image: '/images/beyond-the-map/artisan-path.jpg',
    imageAlt: 'Master sculptor hand-chiseling intricate bronze deity in Patan atelier',
    promise:
      'Step behind metal doors where fires burn as they did in the 12th century, transforming beeswax and molten copper into timeless expressions of sacred enlightenment.',
    experienceOverview:
      'Patan’s historic name—Lalitpur—translates to “The City of Fine Arts”. For nearly a millennium, master craftsmen from the hereditary Tamrakar and Shakya guilds have perfected the delicate art of lost-wax bronze casting (Cire Perdue). We take you into private home ateliers where raw beeswax is carved into deities with micro-chisels, wrapped in layers of river clay and cow dung, and fired until the wax melts away to make room for glowing molten bronze.',
    keyQuote: {
      quote:
        'A master bronze sculptor does not create a deity; he removes the excess metal until the deity hidden within can breathe.',
      attribution: 'Master Sculptor Shakya, 5th-Generation Foundryman',
    },
    highlights: [
      'Private studio access to multi-generational bronze casters closed to tourist traffic',
      'Hands-on demonstration of natural beeswax sculpture and ancient lost-wax mold preparation',
      'Watching glowing crucible pours of molten copper and zinc in traditional wood-fired furnaces',
      'Sound resonance testing of hand-hammered 7-metal Tibetan singing bowls with master tuners',
    ],
    ctaSubject: 'Go Beyond the Map: Lalitpur Chisel Masters (Page 07)',
    storySections: [
      {
        heading: 'The Alchemy of Lost-Wax Casting',
        paragraphs: [
          'The technique of lost-wax casting in Patan has survived virtually unchanged since the Licchavi golden age. The process begins with pure natural beeswax harvested from high Himalayan cliff hives, mixed with sal tree resin to create a pliable modeling wax.',
          'The artisan sculpts every serene facial feature, every finger mudra, and every tiny bead of jewelry by hand using warm bronze tools. Once perfected, the wax model is coated with successive layers of fine river silt mixed with rice husks and clay.',
          'When fired, the wax melts and pours out through a tiny channel, leaving a negative void of astonishing precision. Into this hollow chamber, molten bronze heated to over 1,000 degrees Celsius is poured. Once cooled, the clay shell is gently hammered open to reveal the raw bronze deity.',
        ],
      },
      {
        heading: 'A Living Lineage of Mastery',
        paragraphs: [
          'What makes Patan extraordinary is that this is not an industrial process; it is a family art form handed down from father to son for twenty generations. An apprentice begins by sweeping the foundry floor and grinding charcoal at age seven, gradually learning the proportion canons laid down in ancient Sanskrit texts.',
          'Meeting these artists in their intimate courtyard studios allows travelers to witness the quiet pride of human craftsmanship in an increasingly mass-produced world.',
        ],
      },
    ],
  },
  {
    id: 'ancient-trans-himalayan-trade-routes',
    pageNumber: 'Page 08',
    title: 'Ancient Trans-Himalayan Routes',
    subtitle: 'Where Tibet Met the Gangetic Plains',
    nepaliTitle: 'प्राचीन व्यापारिक मार्ग र इतिहास',
    tagline: 'Salt Caravans • Silk Road Outposts • Swayambhu & Boudha Caravanserais',
    location: 'Kathmandu Valley Trade Corridors & Stupa Quarters',
    duration: 'Full Day',
    groupSize: 'Private / 1–6 Travelers',
    image: '/explore-with-sakar/images/spiritual/buddhist-stupa.jpg',
    imageAlt: 'Prayer flags framing ancient Buddhist stupa and mountain horizon',
    promise:
      'Kathmandu was never an isolated mountain valley; it was the great Himalayan trade hub where Tibetan yak wool, musk, and salt were exchanged for Indian silks, spices, and precious gems.',
    experienceOverview:
      'For centuries, merchants crossing the treacherous trans-Himalayan passes timed their arrivals to Kathmandu’s autumn and winter seasons. Old caravanserais (Dharamsalas) welcomed weary traders from Lhasa, Kham, Ladakh, and Calcutta. We retrace the footsteps of these historic merchants, starting with dawn circumambulations at Swayambhunath, following ancient cobbled cart tracks through the city, and discovering hidden resting rest-houses where stories were swapped over butter tea.',
    keyQuote: {
      quote:
        'The trade routes brought not only silver and spices, but languages, ideas, artistic styles, and spiritual philosophies that transformed Kathmandu into a world cultural crossroads.',
      attribution: 'Historian & Geographer of Himalayan Trade',
    },
    highlights: [
      'Retracing the historical caravan entry routes into Kathmandu Valley',
      'Visiting preserved Malla-era resting pavilions (Patis and Sattals) along historic paths',
      'Dawn kora with Tibetan pilgrims and Newar Buddhists around Swayambhunath hill',
      'Discovering how ancient currency, spice weighing, and banking operated in old Ason',
    ],
    ctaSubject: 'Go Beyond the Map: Trans-Himalayan Routes (Page 08)',
    storySections: [
      {
        heading: 'The Crossroads of Two Civilizations',
        paragraphs: [
          'Before modern borders closed Himalayan passes, Kathmandu was the indispensable middleman of Asia. The Newar merchant class (known as the Lhasa Newars) established permanent trading houses in Lhasa, Shigatse, and Gyantse, maintaining caravans that took up to two months to cross the high glaciated passes of Kuti and Kyirong.',
          'They brought back wool, dried yak cheese, turquoise, gold dust, and precious rock salt. In return, they supplied the Tibetan plateau with metal ritual statues, hand-woven cotton textiles, spices, sugar, and tobacco.',
          'This intense commercial exchange generated the immense wealth that funded the golden roofs, stone temples, and palatial complexes of the Malla kings.',
        ],
      },
      {
        heading: 'Caravanserais, Rest Houses & Enduring Hospitality',
        paragraphs: [
          'Because the trade brought strangers from every corner of Asia, Newar civilization developed an elaborate infrastructure of public hospitality. Wealthy benefactors built hundreds of free roadside shelters called Patis and Sattals, where any traveler could sleep, cook, and draw water from nearby stone spouts without paying a copper paisa.',
          'Walking through these historic transit corridors today with Sakar reveals the generous civic spirit that shaped Kathmandu into one of the most welcoming cities in the ancient world.',
        ],
      },
    ],
  },
  {
    id: 'upper-mustang-walled-citadel-caves',
    pageNumber: 'Page 09',
    title: 'Upper Mustang',
    subtitle: 'The Walled Citadel of Lo Manthang & Sky Caves',
    nepaliTitle: 'माथिल्लो मुस्ताङ र आकाशे गुफाहरू',
    tagline: 'Trans-Himalayan Canyons • Preserved Tibetan Kingdom • 2,000-Year-Old Cliff Caves',
    location: 'Upper Mustang Rainshadow Plateau (Lo Manthang)',
    duration: 'Multi-Day Expedition Foundation',
    groupSize: 'Private / 2–6 Travelers',
    image: '/explore-with-sakar/images/mountains/himalayan-peaks.jpg',
    imageAlt: 'Red clay canyons, ancient chortens, and snowy peaks of Upper Mustang',
    promise:
      'Behind the mighty barrier of the Annapurnas lies a wind-carved desert kingdom where time paused six centuries ago.',
    experienceOverview:
      'Upper Mustang was closed to outsiders until 1992, allowing its ancient Tibetan Buddhist culture, royal lineage, and architectural heritage to remain intact. Inside the whitewashed earthen walls of Lo Manthang, flagstone alleys wind past 14th-century gompas housing giant gilded Buddhas and priceless frescoes. Outside the city walls, vertical red cliffs conceal mysterious human-carved sky caves dating back over two millennia.',
    keyQuote: {
      quote:
        'Mustang is not just a place of dramatic landscapes; it is one of the last sanctuaries of uncorrupted classical Tibetan Buddhist civilization on earth.',
      attribution: 'Tibetan Art Historian & Mustang Explorer',
    },
    highlights: [
      'Walking inside the historic fortified medieval capital of Lo Manthang through ancient gates',
      'Exploring the mysterious multi-level sky caves of Chhoser carved high into vertical cliffs',
      'Marveling at preserved 14th-century monastery murals inside Jampa Lhakhang and Thubchen Gompa',
      'Witnessing stark ochre, red, and golden canyons glowing in high-altitude twilight',
    ],
    ctaSubject: 'Go Beyond the Map: Upper Mustang (Page 09)',
    storySections: [
      {
        heading: 'The Walled Citadel in the Rainshadow',
        paragraphs: [
          'Protected by the massive rainshadow of Dhaulagiri and Annapurna, Upper Mustang receives virtually no monsoon rain, creating an arid, dramatic landscape of wind-sculpted canyons and eroded sandstone cliffs.',
          'The walled city of Lo Manthang was founded around 1380 by the legendary warrior Ame Pal. Enclosed by a massive six-meter-high rammed-earth defensive wall, the city could be sealed shut at nightfall with a single wooden gate.',
          'Even today, the palace of the King of Mustang stands at the center of the citadel, surrounded by flat-roofed mud-brick homes with juniper firewood neatly stacked along their parapets.',
        ],
      },
      {
        heading: 'The Enigma of the Sky Caves',
        paragraphs: [
          'Carved into sheer vertical cliff faces hundreds of feet above the riverbed are thousands of man-made cave chambers. Archaeologists have discovered that these caves served three distinct historical eras: first as burial tombs 2,000 years ago, later as fortified cliff dwellings during periods of tribal warfare, and finally as secluded meditation hermitages for Buddhist hermits.',
          'Standing beneath these honeycomb cliffs, you feel the profound resilience of human beings who carved civilization into the most inhospitable vertical stone.',
        ],
      },
    ],
  },
  {
    id: 'terracotta-temples-mandala-planning',
    pageNumber: 'Page 10',
    title: 'Terracotta Poetry',
    subtitle: 'Astronomical Alignments & The Valley Mandala',
    nepaliTitle: 'टेराकोटा मन्दिर र मण्डल योजना',
    tagline: 'Mahaboudha Temple of 9,000 Buddhas • Five-Element Nyatapola • Sacred Geometry',
    location: 'Patan, Bhaktapur & Changu Narayan',
    duration: 'Full Day',
    groupSize: 'Private / 1–6 Travelers',
    image: '/explore-with-sakar/images/heritage/durbar-square.jpg',
    imageAlt: 'Intricate terracotta temple with thousands of carved Buddha reliefs',
    promise:
      'Every brick, stepped plinth, and directional gate in Kathmandu Valley was laid according to sacred geometry and celestial alignments.',
    experienceOverview:
      'To build in the Kathmandu Valley was not merely an engineering endeavor; it was an act of cosmic alignment. Cities were conceived as living Mandalas, bounded by guardian goddesses (Ashta Matrikas) stationed at the eight cardinal and intercardinal points. We explore masterpieces of terracotta craftsmanship such as Mahaboudha Temple in Patan—where every single molded brick bears an image of the Buddha—and analyze how the five tiers of Nyatapola Temple in Bhaktapur symbolize the five cosmic elements.',
    keyQuote: {
      quote:
        'A Newar temple does not sit on the land; it anchors heaven to the earth through sacred proportions of golden geometry.',
      attribution: 'Architectural Historian, Lalitpur',
    },
    highlights: [
      'Decoding the sacred Mandala layout of Kathmandu, Patan, and Bhaktapur',
      'Marveling at the 9,000 individually stamped terracotta Buddha tiles of Mahaboudha',
      'Analyzing the earthquake-defying structural engineering of the 5-tiered Nyatapola Temple',
      'Sunset architectural walk at Changu Narayan, the oldest surviving temple in the valley',
    ],
    ctaSubject: 'Go Beyond the Map: Terracotta Poetry (Page 10)',
    storySections: [
      {
        heading: 'Mahaboudha: The Temple of Ten Thousand Tiles',
        paragraphs: [
          'Tucked away in a quiet residential courtyard south of Patan Durbar Square stands Mahaboudha Temple. Built in the late 16th century by a devout priest named Abhaya Raj, this soaring Shikhara-style monument was inspired by the Mahabodhi Temple at Bodh Gaya.',
          'What makes it unique is its construction: every single terracotta brick was hand-molded and fired with an image of Lord Buddha in various mudras.',
          'When the great earthquake of 1934 destroyed the spire, local artisans meticulously numbered the fallen tiles and reconstructed the entire complex brick by brick, preserving a national masterpiece of clay sculpture.',
        ],
      },
      {
        heading: 'The Five Tiers of Nyatapola and Seismic Wisdom',
        paragraphs: [
          'In Bhaktapur, the five-tiered pagoda of Nyatapola has withstood every major earthquake for over 300 years. King Bhupatindra Malla built it in 1702 with profound structural insight.',
          'The temple rests on a massive five-tier stone plinth, flanked by guardian stone figures that double in strength with each ascending tier: wrestlers, elephants, lions, griffins, and the goddesses Baghini and Singhini.',
          'The broad eaves, interlocking timber joints, and low center of gravity allow the temple to absorb seismic ground waves without collapsing, demonstrating how ancient engineering married spiritual metaphor with practical resilience.',
        ],
      },
    ],
  },
  {
    id: 'living-hearth-newar-feasting-rituals',
    pageNumber: 'Page 11',
    title: 'Living Hearth Feasts',
    subtitle: 'Newar Samay Baji & The Rituals of Food',
    nepaliTitle: 'नेवारी भोज र परम्परागत खानपान',
    tagline: 'Farm-to-Hearth Cooking • Sacred Samay Baji Banquets • Home-Brewed Ayla',
    location: 'Historic Courtyard Family Homes in Panauti & Patan',
    duration: 'Half Day to Evening Feast',
    groupSize: 'Private / 1–6 Travelers',
    image: '/explore-with-sakar/images/homestays/village-meal.jpg',
    imageAlt: 'Traditional Newari feast served on hand-stitched leaf plates with brass bowls',
    promise:
      'Food in Nepal is not simply nourishment for the body; it is a sacred offering, a family gathering ritual, and a celebration of seasonal abundance.',
    experienceOverview:
      'Sit cross-legged on hand-woven straw mats (Sukuls) inside a private heritage home to partake in an authentic Newari Samay Baji feast. Served on traditional hand-stitched sal leaf plates (Laptya), every item carries profound philosophical significance: beaten rice (Baji) represents the earth, roasted spiced buffalo meat (Choila) represents fire, black soybeans (Bhatmas) represent water, and pungent ginger roots represent wind. We share homemade Ayla poured from high above in a thin, unbroken stream.',
    keyQuote: {
      quote:
        'When you sit on our mats and eat from our leaf plates, you become part of the family lineage that prepared this hearth.',
      attribution: 'Newar Host Grandmother, Panauti',
    },
    highlights: [
      'Hands-on culinary session learning to spice authentic Choila on wood-fire embers',
      'Multi-course Samay Baji banquet served on traditional sal leaf plates in historic courtyard',
      'The dramatic pouring ritual of homemade distilled Ayla spirit into small clay cups (Salpa)',
      'Understanding the medicinal and Ayurvedic philosophy behind traditional Newar dining',
    ],
    ctaSubject: 'Go Beyond the Map: Living Hearth Feasts (Page 11)',
    storySections: [
      {
        heading: 'The Sacred Anatomy of Samay Baji',
        paragraphs: [
          'In Newar culture, Samay Baji was originally consumed by farmers returning from hard labor in the fertile valley fields. Over centuries, it evolved into an elaborate ceremonial feast accompanying every major festival and life milestone.',
          'Each ingredient on the plate must be freshly prepared: Baji (flatted rice beaten by foot pestle), Choila (tender meat marinated in mustard oil, green garlic, and charred red chilies), Wauncha (seasonal wild greens), and Aalu Tama (fermented bamboo shoots with black-eyed beans).',
          'Eating with your fingers connects touch directly with taste, honoring the earth that produced the crops and the hands that prepared the food.',
        ],
      },
      {
        heading: 'Hospitality as a Sacred Duty',
        paragraphs: [
          'In Nepal, the ancient Sanskrit proverb Atithi Devo Bhava (“The guest is an embodiment of God”) is practiced at every meal. Guests are served first, urged to take second and third helpings, and sent forth with auspicious tika blessings on their foreheads.',
          'Dining inside a traditional home with Sakar removes every barrier between traveler and local culture, transforming a simple meal into an unforgettable memory of warmth and human connection.',
        ],
      },
    ],
  },
  {
    id: 'sacred-water-architecture-hitis',
    pageNumber: 'Page 12',
    title: 'Sacred Water Architecture',
    subtitle: 'Manga Hiti & The Ancient Subterranean Aqueducts',
    nepaliTitle: 'ढुङ्गेधारा र प्राचीन पानी प्रणाली',
    tagline: 'Raj Kulo Canals • Sunken Stone Spouts • Hydraulic Engineering of the Medieval Valley',
    location: 'Patan, Kathmandu & Bhaktapur Public Hitis',
    duration: 'Half Day',
    groupSize: 'Private / 1–6 Travelers',
    image: '/explore-with-sakar/images/heritage/temple-courtyard.jpg',
    imageAlt: 'Ancient sunken stone water spout (Hiti) carved with aquatic makara creatures',
    promise:
      'Before modern pipes, ancient valley engineers constructed a self-cleaning subterranean hydraulic network that supplied pure mountain water to hundreds of public spouts for a millennium.',
    experienceOverview:
      'Descend stone steps into a sunken courtyard below street level, and you enter a Dhunge Dhara or Hiti. Carved from solid granite in the shape of a mythical Makara (sea monster), crystal-clear water pours continuously into stone basins. Fed by subterranean brick gravity canals called Raj Kulo (Royal Canals) stretching from mountain springs miles away, this sophisticated water system sustained the cities of Kathmandu Valley for centuries. We examine the ancient engineering, filter systems, and community water stewardship.',
    keyQuote: {
      quote:
        'The ancients knew that a city that forgets its water forgets its future. The Hiti was engineered to be communal, sacred, and forever renewable.',
      attribution: 'Civil Engineer & Heritage Hydraulic Specialist',
    },
    highlights: [
      'Descending into ancient sunken Hitis in Patan and Bhaktapur still dispensing fresh water today',
      'Decoding the mythical Makara and Naga carvings that protect sacred water sources',
      'Inspecting the buried terracotta filtering systems (gravel, charcoal, and sand) invented centuries ago',
      'Understanding how community management trusts (Guthis) maintained clean urban water for generations',
    ],
    ctaSubject: 'Go Beyond the Map: Sacred Water Architecture (Page 12)',
    storySections: [
      {
        heading: 'The Engineering Genius of the Raj Kulo',
        paragraphs: [
          'In the 14th to 17th centuries, the Malla kings developed the Raj Kulo—a vast network of underground brick conduits that captured water from mountain streams in the surrounding hills and funneled it by gravity into the dense urban cores of Patan and Bhaktapur.',
          'Before reaching the spout, the water passed through multiple settling tanks and filtration layers composed of sand, charcoal, and crushed river stone.',
          'Because the stone spouts were constructed several meters below natural ground level, continuous gravity pressure ensured a steady stream of water even during dry pre-monsoon months.',
        ],
      },
      {
        heading: 'Communal Life Around the Water Spout',
        paragraphs: [
          'A Dhunge Dhara was never just a tap; it was the vibrant social nexus of the neighborhood. Here, women gathered at dawn to fill brass vessels, wash laundry, and share news.',
          'Nearby niches housed stone statues of Varuna (god of water) and Bhagiratha (who brought the sacred river down from heaven).',
          'Community maintenance was institutionalized through hereditary Guthis (cooperatives) that cleaned the channels every year before the monsoon. In our modern era of environmental challenges, Patan’s traditional water engineering offers profound lessons in sustainable urban design.',
        ],
      },
    ],
  },
];

const ITEMS_PER_PAGE = 4;

export default function BeyondTheMapClient() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(BEYOND_EXPERIENCES.length / ITEMS_PER_PAGE);
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedExperiences = BEYOND_EXPERIENCES.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE
  );

  const startIdx = (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIdx = Math.min(safeCurrentPage * ITEMS_PER_PAGE, BEYOND_EXPERIENCES.length);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const el = document.getElementById('beyond-editorial-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-parchment-100">
      {/* 1. Hero */}
      <PageHero
        badge="Curated Editorial Series"
        nepaliTitle="नक्साभन्दा परको यात्रा"
        title="Go Beyond the Map"
        subtitle="A sequenced editorial journey through living courtyards, ancient trade corridors, multi-generational artisan workshops, and calm Himalayan waters with Sakar."
        backgroundImage="/images/beyond-the-map/living-courtyards.jpg"
        breadcrumbs={[
          { label: 'Experiences', href: '/experience' },
          { label: 'Go Beyond the Map' },
        ]}
      />

      {/* 2. Editorial Philosophy Banner */}
      <section className="py-16 sm:py-20 bg-white border-b border-parchment-300">
        <div className="editorial-container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sequenced Editorial Archive</span>
            </span>

            <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-himalaya-950 tracking-tight leading-tight">
              Not Just Visiting Places — Stepping Inside the Living Soul of Nepal
            </h2>

            <p className="text-base sm:text-lg text-himalaya-700 font-light leading-relaxed">
              Most visitors see Nepal through the hurried frame of a tour bus window or the crowded ticket gates of main monuments. <strong className="font-semibold text-himalaya-900">&ldquo;Go Beyond the Map&rdquo;</strong> is our personal pledge to walk past superficial facades into the real, beating pulse of our homeland.
            </p>

            {/* Chapter Quick Index */}
            <div className="pt-6 border-t border-parchment-200">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-himalaya-500 mb-3">
                Complete 12-Experience Series Index:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {BEYOND_EXPERIENCES.map((exp, idx) => {
                  const targetPage = Math.floor(idx / ITEMS_PER_PAGE) + 1;
                  const isActivePage = targetPage === safeCurrentPage;
                  return (
                    <button
                      key={exp.id}
                      onClick={() => handlePageChange(targetPage)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-all font-mono ${
                        isActivePage
                          ? 'bg-terracotta text-white shadow-warm font-bold'
                          : 'bg-parchment-100 text-himalaya-700 hover:bg-parchment-200 border border-parchment-300'
                      }`}
                      title={`${exp.pageNumber}: ${exp.title}`}
                    >
                      <span className="font-bold">{exp.pageNumber}:</span> {exp.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Paginated Editorial Experiences (4 per page) */}
      <section id="beyond-editorial-grid" className="py-20 sm:py-28 bg-sand border-b border-parchment-300 scroll-mt-20">
        <div className="editorial-container space-y-20">
          {/* Section Header with View Indicator */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-6 border-b border-parchment-300">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-terracotta block">
                Editorial Catalog • 4 Experiences Per Page
              </span>
              <h3 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-himalaya-950">
                Viewing Experiences {startIdx}–{endIdx} of {BEYOND_EXPERIENCES.length}
              </h3>
            </div>

            <div className="text-xs font-mono bg-white px-4 py-2 rounded-xl border border-parchment-300 text-himalaya-700 shadow-subtle">
              Page <span className="font-bold text-terracotta">{safeCurrentPage}</span> of <span className="font-bold">{totalPages}</span>
            </div>
          </div>

          {/* Render the 4 Active Experiences */}
          <div className="space-y-24 sm:space-y-32">
            {paginatedExperiences.map((journey, index) => {
              const isEven = index % 2 === 1;
              return (
                <article
                  key={journey.id}
                  id={journey.id}
                  className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-parchment-300 shadow-editorial"
                >
                  {/* Photo & Pull Quote Column */}
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
                        <div className="absolute inset-0 bg-gradient-to-t from-himalaya-950/70 via-transparent to-transparent opacity-70" />
                        
                        {/* Page Number Badge (e.g. Page 01, Page 02, etc.) */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-terracotta text-white text-xs font-mono font-bold tracking-wider uppercase shadow-warm">
                            {journey.pageNumber}
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

                      {/* Inquiry Action */}
                      <div className="pt-2">
                        <Link
                          href={`/contact?subject=${encodeURIComponent(journey.ctaSubject)}`}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-himalaya-950 hover:bg-terracotta text-white text-xs font-bold uppercase tracking-wider shadow-subtle hover:shadow-warm transition-all text-center w-full"
                        >
                          <span>Inquire About {journey.title}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Content Column: Full Text Attached to Experience */}
                  <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="space-y-2 border-b border-parchment-200 pb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold text-terracotta uppercase tracking-wider">
                          {journey.pageNumber} • {journey.tagline}
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
                      <p className="font-editorial-serif italic text-lg sm:text-xl text-terracotta">
                        {journey.subtitle}
                      </p>
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

                    {/* Full Editorial Text Sections Attached Directly */}
                    <div className="space-y-8 pt-4">
                      {journey.storySections.map((sec, sIdx) => (
                        <div key={sIdx} className="space-y-3">
                          <h4 className="font-editorial-serif text-lg sm:text-xl font-bold text-himalaya-950 flex items-center gap-2">
                            <span className="text-xs font-mono text-terracotta font-normal">§{sIdx + 1}</span>
                            <span>{sec.heading}</span>
                          </h4>
                          <div className="space-y-3.5 text-sm sm:text-base text-himalaya-700 font-light leading-relaxed">
                            {sec.paragraphs.map((p, pIdx) => (
                              <p key={pIdx}>{p}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Curated Highlights */}
                    <div className="space-y-3 pt-6 border-t border-parchment-200">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-himalaya-900">
                        Curated Sensory Highlights
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
                  </div>
                </article>
              );
            })}
          </div>

          {/* 4. Pagination Controls (Strictly 4 per page, numbering > 4) */}
          <div className="pt-10 border-t border-parchment-300 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs sm:text-sm text-himalaya-600 font-light">
                Showing <span className="font-semibold text-himalaya-950">Experiences {startIdx}–{endIdx}</span> of <span className="font-semibold text-himalaya-950">{BEYOND_EXPERIENCES.length}</span> in the Go Beyond the Map sequence
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(safeCurrentPage - 1)}
                disabled={safeCurrentPage <= 1}
                className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-parchment-300 bg-white text-himalaya-700 hover:bg-parchment-200 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5"
                aria-label="Previous experiences"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isCurrent = pageNum === safeCurrentPage;
                  const pageStart = (pageNum - 1) * ITEMS_PER_PAGE + 1;
                  const pageEnd = Math.min(pageNum * ITEMS_PER_PAGE, BEYOND_EXPERIENCES.length);
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 sm:px-4 h-10 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1 ${
                        isCurrent
                          ? 'bg-terracotta text-white shadow-warm'
                          : 'bg-white text-himalaya-700 hover:bg-parchment-200 border border-parchment-300'
                      }`}
                      aria-label={`Go to page ${pageNum}: experiences ${pageStart} to ${pageEnd}`}
                      aria-current={isCurrent ? 'page' : undefined}
                    >
                      <span>Page {pageNum}</span>
                      <span className="hidden md:inline text-[10px] opacity-80">
                        (Exp {String(pageStart).padStart(2, '0')}–{String(pageEnd).padStart(2, '0')})
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(safeCurrentPage + 1)}
                disabled={safeCurrentPage >= totalPages}
                className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-parchment-300 bg-white text-himalaya-700 hover:bg-parchment-200 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5"
                aria-label="Next experiences"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA */}
      <CTASection
        title="Ready to Weave These Experiences Into a Bespoke Journey?"
        subtitle="Every chapter can be experienced individually or combined into an unhurried multi-day expedition guided personally by Sakar."
        primaryButtonText="Inquire About Beyond the Map"
        primaryButtonHref="/contact?subject=Go%20Beyond%20the%20Map%20Custom%20Journey"
        secondaryButtonText="Explore All Journeys"
        secondaryButtonHref="/experience"
      />
    </div>
  );
}
