export interface PackageItem {
  id: string;
  slug: string;
  title: string;
  nepaliTitle?: string;
  tagline: string;
  duration: string;
  idealFor: string;
  season: string;
  groupSize: string;
  image: {
    src: string;
    alt: string;
  };
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  accommodationStyle: string;
  transportStyle: string;
  customizable: boolean;
  featured: boolean;
  price?: number;
  currency?: string;
}

export const TRAVEL_PACKAGES: PackageItem[] = [
  {
    "id": "living-culture-heritage",
    "slug": "living-culture-heritage",
    "title": "Living Culture & Heritage Immersion",
    "nepaliTitle": "जीवन्त संस्कृति र सम्पदा",
    "tagline": "Centuries of Sacred Art, Hidden Bahals & Newari Hearth Hospitality",
    "duration": "5 – 7 Days",
    "idealFor": "Culture enthusiasts, photographers, historians & mindful travelers",
    "season": "Year-Round (Best: Oct – May)",
    "groupSize": "Private (1 – 8 Travelers)",
    "image": {
      "src": "/explore-with-sakar/images/heritage/durbar-square.jpg",
      "alt": "Ancient Newari temple courtyards in Kathmandu Valley"
    },
    "overview": "Step beyond standard monument tickets into living monastic courtyards (Bahals), private artisan studios, and family hearths across Kathmandu, Patan, and Bhaktapur. Guided personally by Sakar, you will explore secret shrines, meet master bronze sculptors and woodcarvers, and experience authentic festive meals.",
    "highlights": [
      "Private walking tours through secret Patan & Bhaktapur residential courtyards",
      "Exclusive sessions with multi-generational master woodcarvers & bronze smiths",
      "Traditional multi-course Newari Samay Baji feast in a private heritage home",
      "Dawn circumambulation (Kora) and prayer wheel blessing at Swayambhunath Stupa",
      "Evening spiritual aarti ceremony and classical flute music along the holy riverbanks"
    ],
    "inclusions": [
      "Personal tour directing & local cultural hosting by Sakar throughout",
      "Private comfortable climate-controlled transport for all transfers & excursions",
      "Handpicked boutique heritage hotel / guesthouse accommodations",
      "All UNESCO World Heritage site entry permits and heritage conservation fees",
      "Curated authentic meals (daily breakfast + featured traditional culinary feasts)",
      "Private artisan studio access and hands-on workshop materials"
    ],
    "exclusions": [
      "International flights to/from Kathmandu",
      "Nepal tourist entry visa fees",
      "Personal travel & medical insurance",
      "Discretionary personal expenses, souvenirs & alcoholic beverages"
    ],
    "accommodationStyle": "Boutique Heritage Suites & Preserved Traditional Guesthouses",
    "transportStyle": "Private Chauffeur-Driven Air-Conditioned Vehicle",
    "customizable": true,
    "featured": true,
    "price": 1450,
    "currency": "USD"
  },
  {
    "id": "himalayan-spiritual-sound",
    "slug": "himalayan-spiritual-sound",
    "title": "Himalayan Spiritual & Sound Sanctuary",
    "nepaliTitle": "ध्वनि ध्यान र आध्यात्मिक यात्रा",
    "tagline": "7-Metal Tibetan Singing Bowls, Monastery Dawns & Sacred Mountain Solitude",
    "duration": "7 – 10 Days",
    "idealFor": "Inner seekers, wellness travelers, yogis & those seeking deep mental reset",
    "season": "Year-Round (Best: Sep – Dec & Feb – May)",
    "groupSize": "Private / Intimate Group (1 – 6 Travelers)",
    "image": {
      "src": "/explore-with-sakar/images/spiritual/buddhist-stupa.jpg",
      "alt": "Sacred stupa with fluttering prayer flags in morning light"
    },
    "overview": "A restorative journey dedicated to inner stillness and ancient Himalayan sound practices. Experience private 1-on-1 sound therapy sessions using 7-metal hand-hammered singing bowls, witness dawn monastery chanting ceremonies, explore the sacred meditation caves of Pharping, and practice gentle breathwork amidst tranquil mountain ridges.",
    "highlights": [
      "Private Tibetan singing bowl resonance therapies with certified traditional master",
      "Dawn monastery chanting and butter lamp offering puja in Pharping sacred valley",
      "Mindfulness walking meditation along serene pine forest ridge trails",
      "Exclusive philosophy dialogues with elder Buddhist and Vedic practitioners",
      "Organic Ayurvedic and herbal meals crafted for digestion and vitality"
    ],
    "inclusions": [
      "Private accompaniment & cultural context by Sakar",
      "Daily guided meditation and private singing bowl sound immersion sessions",
      "Monastery guest house & peaceful hillside wellness lodge accommodations",
      "All private road transfers in dedicated vehicle",
      "Nutritious organic vegetarian meals and herbal teas throughout",
      "Monastery donations and sacred site access arrangements"
    ],
    "exclusions": [
      "International flights to/from Nepal",
      "Nepal entry visa fees",
      "Personal medical & travel insurance",
      "Personal sound bowl purchases"
    ],
    "accommodationStyle": "Tranquil Mountain Wellness Lodges & Monastic Guest Sanctuaries",
    "transportStyle": "Private Overland Vehicle",
    "customizable": true,
    "featured": true,
    "price": 1850,
    "currency": "USD"
  },
  {
    "id": "authentic-homestay-quiet-trails",
    "slug": "authentic-homestay-quiet-trails",
    "title": "Authentic Village Homestay & Quiet Trails",
    "nepaliTitle": "गाउँले होमस्टे र शान्त हिमाली बाटो",
    "tagline": "Stay With Nepal: Living Hearth Hospitality & Off-the-Beaten-Path Walks",
    "duration": "8 – 12 Days",
    "idealFor": "Conscious travelers, slow explorers, families & community-minded adventurers",
    "season": "Sep – Jun (Best: Oct – Nov & Mar – May)",
    "groupSize": "Private (2 – 6 Travelers)",
    "image": {
      "src": "/explore-with-sakar/images/homestays/village-meal.jpg",
      "alt": "Host family sharing meal around traditional wood stove"
    },
    "overview": "Stay in the welcoming stone and timber homes of Gurung and Tamang mountain communities in the Annapurna and Langtang foothills. Wake to golden Himalayan sunrises, harvest organic greens from terraced fields, cook on woodstoves, and walk peaceful trails through rhododendron forests with zero commercial tourist crowds.",
    "highlights": [
      "Live with verified, clean, welcoming host families as honored guests",
      "Hands-on village cooking: farm-fresh Dal Bhat, buckwheat rotis & wild nettle soup",
      "Gentle day treks along peaceful unpaved mountain ridges and suspension bridges",
      "Direct cultural bridge provided by Sakar for genuine heartfelt human conversations",
      "100% of homestay hosting fees go directly into village household hands"
    ],
    "inclusions": [
      "Full-time guidance, facilitation, and cultural translation by Sakar",
      "Private family homestay accommodations with clean private bedding & mountain views",
      "All hearty, home-cooked farm-to-hearth organic meals and morning teas",
      "All local community entry fees and conservation area permits (ACAP/TIMS)",
      "Private dedicated 4WD / vehicle transfers to trailheads and villages",
      "Ethically compensated local porters where light luggage assistance is needed"
    ],
    "exclusions": [
      "International flights",
      "Nepal entry visa",
      "Personal travel insurance (mandatory for trekking)",
      "Extra snacks, bottled beverages & personal gear"
    ],
    "accommodationStyle": "Verified Community Homestays & Small Family Eco-Lodges",
    "transportStyle": "Private 4WD Jeep & Scenic Walking Routes",
    "customizable": true,
    "featured": true,
    "price": 1650,
    "currency": "USD"
  },
  {
    "id": "grand-sacred-nepal-explorer",
    "slug": "grand-sacred-nepal-explorer",
    "title": "Grand Sacred Nepal Explorer",
    "nepaliTitle": "महान पवित्र नेपाल यात्रा",
    "tagline": "The Definitive Journey: Valley Shrines, Himalayan Ridges, High Desert & Terai Wilds",
    "duration": "12 – 16 Days",
    "idealFor": "Travelers wanting the complete, deep Nepal journey at an unhurried pace",
    "season": "Oct – Dec & Feb – May",
    "groupSize": "Private (1 – 8 Travelers)",
    "image": {
      "src": "/explore-with-sakar/images/mountains/sunrise-himalayas.jpg",
      "alt": "Panoramic Himalayan view across Nepal mountain ridges"
    },
    "overview": "A masterfully curated grand journey weaving Kathmandu’s ancient medieval bahals, Pokhara’s lakeside serenity, the sacred rainshadow gorges of Muktinath & Lower Mustang, peaceful Gurung mountain homestays, and the lush sub-tropical lowlands of Chitwan National Park.",
    "highlights": [
      "Comprehensive cultural exploration of Kathmandu, Patan & Bhaktapur with Sakar",
      "Scenic Himalayan mountain flights framing the Annapurna and Dhaulagiri massifs",
      "Pilgrimage to holy Muktinath 108 water spouts and medieval mud citadel of Kagbeni",
      "Relaxing lakeside retreat in Pokhara with private boat rides and ridge sunsets",
      "Silent river canoe safari and ethical wildlife tracking in Chitwan National Park",
      "Homestay warmth combined with boutique mountain lodge comfort"
    ],
    "inclusions": [
      "Complete private journey direction and seamless accompaniment by Sakar",
      "All domestic flights (e.g. Pokhara – Jomsom – Pokhara / Chitwan – Kathmandu)",
      "Private air-conditioned overland vehicles and rugged 4WD for Mustang gorge",
      "Carefully balanced accommodations: boutique heritage hotels, eco-lodges & homestays",
      "All meals throughout the journey (breakfast, authentic lunches & curated dinners)",
      "All national park, conservation, ACAP, TIMS, and heritage monument permits",
      "All private boat excursions, monastery pujas, and artisan sessions"
    ],
    "exclusions": [
      "International flights to/from Nepal",
      "Nepal entry visa",
      "Comprehensive travel and medical insurance with high-altitude coverage",
      "Personal tips and personal shopping expenses"
    ],
    "accommodationStyle": "Boutique Heritage Suites, Premium Eco-Resorts & Curated Homestays",
    "transportStyle": "Private Flights, Overland AC Vehicles & 4WD Mountain Jeeps",
    "customizable": true,
    "featured": true,
    "price": 3200,
    "currency": "USD"
  },
  {
    "id": "beyond-the-map-grand-journey",
    "slug": "beyond-the-map-grand-journey",
    "title": "Go Beyond the Map: Kathmandu Valley & Pokhara Grand Journey",
    "nepaliTitle": "नक्साभन्दा परको यात्रा: उपत्यका र पोखरा",
    "tagline": "Kathmandu Durbar Square • Bhaktapur Medieval Calm • Patan Makers • Pokhara Peace",
    "duration": "8 – 10 Days",
    "idealFor": "Travelers seeking authentic cultural depth, living crafts, and unhurried lake serenity",
    "season": "Year-Round (Best: Sep – May)",
    "groupSize": "Private (1 – 6 Travelers)",
    "image": {
      "src": "/images/beyond-the-map/living-courtyards.jpg",
      "alt": "Morning light in the ancient courtyards of Kathmandu and Pokhara"
    },
    "overview": "Step past the tourist facades into living courtyards, ancient Silk Road trade alleys, multi-generational artisan workshops, and calm Himalayan waters. Featuring deep unhurried journeys through Kathmandu Durbar Square, Bhaktapur, Patan, and peaceful Pokhara with Sakar.",
    "highlights": [
      "Dawn morning walk through Ason spice alleys and Newar community settlements with Sakar",
      "Entering Bhaktapur: traffic-free brick lanes, master potters, and tasting fresh Juju Dhau",
      "Behind-the-scenes ateliers in Patan watching sacred deities forged and carved by hand",
      "Sunrise wooden boat ride across calm Phewa Lake reflecting Machhapuchhre fishtail peak",
      "Leaving Lakeside to discover Pokhara’s historic trade routes and living Gurung/Magar heritage"
    ],
    "inclusions": [
      "Full personal tour directing and cultural interpretation by Sakar throughout",
      "Private air-conditioned overland vehicle and Pokhara scenic transfers",
      "Curated heritage hotel and lakeside boutique accommodations",
      "All monument entries, pottery workshops, and private boat fees on Phewa Lake",
      "All breakfasts and specially curated traditional Newari feasts and tastings"
    ],
    "exclusions": [
      "International airfare",
      "Nepal entry visa fees",
      "Personal travel insurance",
      "Discretionary tips and souvenirs"
    ],
    "accommodationStyle": "Boutique Heritage Hotels & Charming Lakeside Lodges",
    "transportStyle": "Private AC Vehicle & Wooden Boat Excursions",
    "customizable": true,
    "featured": true,
    "price": 1950,
    "currency": "USD"
  },
  {
    "id": "himalayan-sound-silence-caves",
    "slug": "himalayan-sound-silence-caves",
    "title": "Himalayan Sound, Silence & Sacred Cave Immersion",
    "nepaliTitle": "हिमाली ध्वनि र गुफा ध्यान",
    "tagline": "Pharping Caves, Tibetan Sound Bowls, and Monastery Dawn Chanting",
    "duration": "6 – 8 Days",
    "idealFor": "Mindfulness practitioners, seekers of inner quiet, and acoustic therapy lovers",
    "season": "Year-Round",
    "groupSize": "Private (1 – 4 Travelers)",
    "image": {
      "src": "/explore-with-sakar/images/spiritual/meditation-session.jpg",
      "alt": "Ancient meditation caves and singing bowls in the Himalayan foothills"
    },
    "overview": "An unhurried spiritual pilgrimage dedicated to inner stillness. Undergo personalized 7-metal Tibetan singing bowl acoustic healing sessions, meditate inside ancient 8th-century caves in Pharping, and attend dawn monastic chanting.",
    "highlights": [
      "Private acoustic vibrational therapies with 7-metal hand-hammered singing bowl masters",
      "Meditation inside Padmasambhava’s 8th-century sacred Asura Cave in Pharping",
      "Early morning kora and butter lamp blessing at Boudhanath Stupa before dawn",
      "Namo Buddha high mountain ridge walk and monastery drum puja attendance"
    ],
    "inclusions": [
      "Personal accompaniment and spiritual context translation by Sakar",
      "Private sound healing master sessions and singing bowl assessment",
      "All monastery guesthouse and peaceful foothill eco-retreat accommodations",
      "All vegetarian meals, organic herbal teas, and butter lamp ceremonial supplies",
      "Private transfers to all holy sites and foothill sanctuaries"
    ],
    "exclusions": [
      "International airfare",
      "Visa fees",
      "Personal gear"
    ],
    "accommodationStyle": "Monastery Guest Sanctuaries & Hillside Meditation Lodges",
    "transportStyle": "Private Overland Vehicle",
    "customizable": true,
    "featured": false,
    "price": 1550,
    "currency": "USD"
  },
  {
    "id": "kathmandu-valley-artisan-lineage",
    "slug": "kathmandu-valley-artisan-lineage",
    "title": "Artisan Guilds & Living Heritage of the Kathmandu Valley",
    "nepaliTitle": "काठमाडौँ उपत्यकाका हस्तकला र सिर्जना",
    "tagline": "Centuries of Sacred Woodcarving, Lost-Wax Bronze & Thangka Mastery",
    "duration": "5 – 6 Days",
    "idealFor": "Artists, craft lovers, architects, and travelers who appreciate hand craftsmanship",
    "season": "Year-Round",
    "groupSize": "Private (1 – 6 Travelers)",
    "image": {
      "src": "/images/beyond-the-map/artisan-path.jpg",
      "alt": "Master artisan carving sacred wooden beam in courtyard workshop"
    },
    "overview": "Gain exclusive access to the multi-generational ateliers of Kathmandu Valley. Sit with master woodcarvers transforming timber into sacred deities, watch glowing lost-wax bronze casting, and grind lapis lazuli with sacred Thangka artists.",
    "highlights": [
      "Private access into residential family ateliers closed to regular commercial tourists",
      "Hands-on chisel demonstrations with master Newari temple woodcarvers",
      "Lost-wax bronze casting demonstration in an ancient Lalitpur foundry",
      "Pottery wheel experience and traditional Juju Dhau in medieval Bhaktapur"
    ],
    "inclusions": [
      "Sakar as your personal host and architectural translator throughout",
      "All workshop entry honorariums paid directly to master artisan families",
      "Hands-on raw materials for carving and painting demonstrations",
      "Boutique heritage boutique hotel accommodations with courtyard breakfasts",
      "All UNESCO World Heritage site admissions and private transport"
    ],
    "exclusions": [
      "International flights",
      "Personal art and antique purchases",
      "Travel insurance"
    ],
    "accommodationStyle": "Restored Newari Heritage Mansions & Boutique Courtyard Hotels",
    "transportStyle": "Private AC Van & Walking Tours",
    "customizable": true,
    "featured": false,
    "price": 1350,
    "currency": "USD"
  },
  {
    "id": "nepal-village-hearth-homestays",
    "slug": "nepal-village-hearth-homestays",
    "title": "Nepal Village Hearth, Community Homestays & Sacred Forests",
    "nepaliTitle": "नेपाली चुलो र गाउँले आतिथ्यता",
    "tagline": "Warm Family Hearths in Panauti, Balthali & Annapurna Gurung Foothills",
    "duration": "7 – 9 Days",
    "idealFor": "Slow travelers, food lovers, families, and lovers of genuine human warmth",
    "season": "Sep – May",
    "groupSize": "Private (1 – 6 Travelers)",
    "image": {
      "src": "/explore-with-sakar/images/homestays/village-meal.jpg",
      "alt": "Warm family dinner around traditional village wood stove"
    },
    "overview": "Experience the real heart of Nepal by sharing daily life, woodstove cooking, and quiet terraced walks with indigenous families. Base yourself in clean, vetted village homestays from medieval Panauti to the stone hamlets of Ghandruk.",
    "highlights": [
      "Sleep in verified private bedrooms within welcoming family-run village homes",
      "Pick fresh organic vegetables and learn family secrets of woodfire dal bhat",
      "Terraced walking routes through orange orchards, pine forests, and mountain ridges",
      "Listen to fireside storytelling and community folklore with village elders"
    ],
    "inclusions": [
      "Full personal guidance and translation by Sakar throughout",
      "All homestay lodging and 100% home-cooked organic meals and snacks",
      "Community homestay cooperative contributions and kitchen materials",
      "Private vehicle transfers between Kathmandu, Panauti, and Pokhara foothills",
      "Guided village walks and community farm visits"
    ],
    "exclusions": [
      "International travel expenses",
      "Personal travel insurance",
      "Alcoholic drinks and personal souvenirs"
    ],
    "accommodationStyle": "Vetted Community Homestays with Clean Private Rooms",
    "transportStyle": "Private Overland Transport & Scenic Foothill Trails",
    "customizable": true,
    "featured": false,
    "price": 1400,
    "currency": "USD"
  },
  {
    "id": "bhaktapur-medieval-craft-living-museum",
    "slug": "bhaktapur-medieval-craft-living-museum",
    "title": "Bhaktapur Living Medieval City, Clay Guilds & Ancient Feasts",
    "nepaliTitle": "भक्तपुर: जीवन्त मध्यकालीन सहर र माटोका भाँडाहरू",
    "tagline": "The City That Slowed Down: Pottery Square, Golden Gate & Juju Dhau Heritage",
    "duration": "4 – 5 Days",
    "idealFor": "Architecture buffs, photographers, culinary travelers and history enthusiasts",
    "season": "Year-Round (Best: Oct – Apr)",
    "groupSize": "Private (1 – 6 Travelers)",
    "image": {
      "src": "/explore-with-sakar/images/heritage/durbar-square.jpg",
      "alt": "Nyatapola temple and courtyards in historic Bhaktapur"
    },
    "overview": "Immerse yourself in Bhaktapur—the city that chose to slow down and protect its memories. Walk vehicle-free red brick alleys, sit beside master potters shaping clay in Pottery Square, taste fresh King of Yogurt (Juju Dhau) served in earthen vessels, and marvel at the 55-window royal palace.",
    "highlights": [
      "Unhurried morning walks along car-free medieval brick alleys before tour buses arrive",
      "Private pottery masterclass with a third-generation potter at Pottery Square",
      "Taste authentic Juju Dhau prepared traditionally in clay bowls using buffalo milk",
      "Architectural analysis of the 5-tiered Nyatapola Temple and Golden Gate with Sakar",
      "Sunset hike to ancient Changu Narayan Temple through terraced pine woods"
    ],
    "inclusions": [
      "Private cultural accompaniment by Sakar throughout",
      "Boutique traditional Newari guest suite inside Bhaktapur ancient quarter",
      "All entrance fees and historic monument preservation permits",
      "Pottery wheel private lesson, clay materials, and artisan donation",
      "Daily breakfasts, traditional Newari feasts, and authentic Juju Dhau tastings"
    ],
    "exclusions": [
      "International flights",
      "Nepal visa",
      "Personal travel insurance"
    ],
    "accommodationStyle": "Traditional Newari Heritage Boutique Hotel",
    "transportStyle": "Pedestrian Walking & Private Overland Transfers",
    "customizable": true,
    "featured": false,
    "price": 1100,
    "currency": "USD"
  },
  {
    "id": "patan-city-of-makers-sacred-bronze",
    "slug": "patan-city-of-makers-sacred-bronze",
    "title": "Patan: City of Makers, Sacred Metalwork & Ancient Water Hitis",
    "nepaliTitle": "पाटन: कालिगढहरूको सहर र ढुङ्गेधारा",
    "tagline": "Lost-Wax Bronze Casting, Golden Temple Courtyards & Urban Water Engineering",
    "duration": "4 – 5 Days",
    "idealFor": "Sculptors, design aficionados, spiritual seekers & slow urban explorers",
    "season": "Year-Round",
    "groupSize": "Private (1 – 6 Travelers)",
    "image": {
      "src": "/explore-with-sakar/images/heritage/temple-courtyard.jpg",
      "alt": "Ancient stone temple and courtyard in Patan"
    },
    "overview": "Discover Patan—the city of makers where metal is quietly hammered into deities and history is made by hand every day. Explore Krishna Mandir’s stone carvings, decipher ancient sunken spouts (Hitis) at Manga Hiti, and slip behind closed doorways into private lost-wax bronze workshops.",
    "highlights": [
      "Step behind wooden doorways into hidden monastic courtyards (Bahals)",
      "Watch master sculptors shape glowing molten copper and lost-wax molds",
      "Visit Hiranya Varna Mahavihar (Golden Temple) during morning butter lamp offerings",
      "Decode the ancient community hydraulic architecture of Manga Hiti and Tusha Hiti",
      "Traditional tea and conversation with elder master artisans in their courtyard studios"
    ],
    "inclusions": [
      "Dedicated cultural facilitation and Newar art history insights by Sakar",
      "Handpicked boutique heritage lodging in quiet historic Patan quarters",
      "All UNESCO World Heritage admissions and private workshop access permissions",
      "Artisan studio stipend directly supporting local bronze casters",
      "All breakfasts and traditional multi-course festive lunch banquets"
    ],
    "exclusions": [
      "International flights",
      "Nepal visa",
      "Personal shopping expenses"
    ],
    "accommodationStyle": "Boutique Courtyard Heritage Residence",
    "transportStyle": "Private Vehicle & Guided Courtyard Walks",
    "customizable": true,
    "featured": false,
    "price": 1150,
    "currency": "USD"
  },
  {
    "id": "pokhara-laid-back-lake-mountain-stillness",
    "slug": "pokhara-laid-back-lake-mountain-stillness",
    "title": "Pokhara Laid-Back: Phewa Waters, Tal Barahi & Mountain Stillness",
    "nepaliTitle": "शान्त पोखरा: फेवाताल र माछापुच्छ्रेको काख",
    "tagline": "The Laid-Back City That Makes You Want to Stay • Lakeside Rhythms & Gurung Culture",
    "duration": "5 – 7 Days",
    "idealFor": "Couples, writers, creative minds, and travelers longing to unplug and breathe",
    "season": "Year-Round (Best: Sep – May)",
    "groupSize": "Private (1 – 6 Travelers)",
    "image": {
      "src": "/explore-with-sakar/images/mountains/mountain-ridge.jpg",
      "alt": "Reflections of Annapurna and Machhapuchhre in quiet morning waters"
    },
    "overview": "Some places make you want to see everything; Pokhara makes you want to stay. Glide in wooden paddle boats on early morning Phewa Lake with Machhapuchhre reflected in the mirror-smooth surface. Leave the tourist strip to explore historic Gurung and Thakali settlements and peaceful hill temples.",
    "highlights": [
      "Early morning silent wooden boat journey across Phewa Lake to Tal Barahi Temple",
      "Watch the dawn glow touch Machhapuchhre (Fishtail) and the Annapurna range",
      "Walk through Old Pokhara’s historic bazaar and traditional Newari brick houses",
      "Afternoon coffee and journaling at peaceful lakeside vantage points away from crowds",
      "Gentle hike to the World Peace Pagoda through lush Rani Ban subtropical forest"
    ],
    "inclusions": [
      "Personal hosting and relaxed itinerary pacing by Sakar",
      "Scenic flight or private overland transit between Kathmandu and Pokhara",
      "Handpicked boutique lakeside hotel with private balcony mountain/lake vistas",
      "Private wooden boat charters and boatman compensation",
      "All breakfasts and handpicked lakeside fresh culinary dinners"
    ],
    "exclusions": [
      "International travel",
      "Personal paragliding or extreme sports fees"
    ],
    "accommodationStyle": "Boutique Lakeside Eco-Resort & Spa",
    "transportStyle": "Private Overland Vehicle & Wooden Boat",
    "customizable": true,
    "featured": false,
    "price": 1390,
    "currency": "USD"
  },
  {
    "id": "unhurried-langtang-valley-tamang-heritage",
    "slug": "unhurried-langtang-valley-tamang-heritage",
    "title": "Unhurried Langtang Valley, Sacred Lakes & Tamang Heritage",
    "nepaliTitle": "शान्त लाङटाङ उपत्यका र तामाङ सम्पदा",
    "tagline": "High Himalayan Valleys, Yak Pastures & Resilient Mountain Communities",
    "duration": "9 – 11 Days",
    "idealFor": "Hikers wanting pristine nature, genuine mountain communities, and moderate trekking",
    "season": "Mar – May & Oct – Dec",
    "groupSize": "Private (2 – 6 Travelers)",
    "image": {
      "src": "/explore-with-sakar/images/trails/suspension-bridge.jpg",
      "alt": "Suspension bridge across rushing glacial river in Langtang"
    },
    "overview": "Trek gently through the sacred valley of glaciers. Ascend along turquoise river gorges lined with moss-draped oak and rhododendron forests, visit historic Kyanjin Gompa, taste artisan yak cheese, and share stories with resilient Tamang families.",
    "highlights": [
      "Paced for mindful breathing and altitude acclimatization without rushing",
      "Kyanjin Ri (4,773m) sunrise viewpoint framing the Langtang Lirung massif",
      "Taste fresh alpine yak cheese at the historic 1950s Swiss-established cheese factory",
      "Experience the incredible spirit and warmth of the rebuilt Langtang valley",
      "Contribute directly to locally-owned teahouses and porter family cooperatives"
    ],
    "inclusions": [
      "Experienced wilderness guide Sakar + licensed assistant guide & ethical porters",
      "All Langtang National Park permits & TIMS mountain cards",
      "Private 4WD jeep transport between Kathmandu and Syabrubesi trailhead",
      "All teahouse mountain accommodations along the route",
      "Three hot hearty meals per day + fresh seasonal mountain fruit and teas"
    ],
    "exclusions": [
      "International flights",
      "High altitude medical insurance"
    ],
    "accommodationStyle": "Cozy Family Mountain Teahouses",
    "transportStyle": "Private 4WD Jeep & Footpath",
    "customizable": true,
    "featured": false,
    "price": 1750,
    "currency": "USD"
  },
  {
    "id": "gorkha-historic-citadel-foothills",
    "slug": "gorkha-historic-citadel-foothills",
    "title": "Gorkha: Historic Royal Citadel & Foothill Living Heritage",
    "nepaliTitle": "गोरखा: ऐतिहासिक दरबार र गाउँले जनजीवन",
    "tagline": "Ancient Hilltop Palace, Gurung Heritage & Unhurried Himalayan Ridgeways",
    "duration": "7 – 9 Days",
    "idealFor": "History enthusiasts, cultural travelers, and seekers of quiet mountain life",
    "season": "Sep – May (Clear Himalayan views and pleasant hill climate)",
    "groupSize": "Private (2 – 6 Travelers)",
    "image": {
      "src": "/explore-with-sakar/images/mountains/himalayan-peaks.jpg",
      "alt": "Ancient hilltop palace and terraced valleys of Gorkha"
    },
    "overview": "Perched on a dramatic mountain ridge, the historic citadel of Gorkha offers a profound look into Nepal's founding history. Walk up ancient stone staircases to the 16th-century royal palace, visit sacred shrines overlooking panoramic Himalayan peaks, and spend quiet days in peaceful foothill villages.",
    "highlights": [
      "Walk the ancient stone stairways to the hilltop Gorkha Durbar and Gorakhnath cave shrine",
      "Panoramic sunrise views of the Manaslu, Himalchuli, and Annapurna ranges",
      "Stay in traditional foothill village homestays with local Gurung and Magar families",
      "Learn traditional hill farming, organic cooking, and regional folk history",
      "Unhurried walks along serene ridgeline trails away from commercial tourist circuits"
    ],
    "inclusions": [
      "Full personal hosting and cultural interpretation by Sakar throughout",
      "All heritage site entrance fees and community donations",
      "Private comfortable overland transport with experienced driver",
      "Authentic heritage inn and village homestay accommodations",
      "All freshly prepared organic farm meals and mountain refreshments"
    ],
    "exclusions": [
      "International flights",
      "Nepal visa",
      "Personal travel insurance"
    ],
    "accommodationStyle": "Heritage Inns & Verified Mountain Family Homestays",
    "transportStyle": "Private Overland Vehicle & Gentle Walking",
    "customizable": true,
    "featured": false,
    "price": 1850,
    "currency": "USD"
  },
  {
    "id": "annapurna-foothill-villages-panoramic-walk",
    "slug": "annapurna-foothill-villages-panoramic-walk",
    "title": "Annapurna Foothills: Gurung Terraces & Golden Mountain Sunrises",
    "nepaliTitle": "अन्नपूर्ण फेदीका गुरुङ गाउँहरू",
    "tagline": "Gentle Walking, Cobblestone Mountain Hamlets & Spectacular Snowpeaks",
    "duration": "6 – 8 Days",
    "idealFor": "Beginner trekkers, families with children, nature lovers, and cultural explorers",
    "season": "Sep – May",
    "groupSize": "Private (1 – 8 Travelers)",
    "image": {
      "src": "/explore-with-sakar/images/homestays/village-meal.jpg",
      "alt": "Traditional slate-roofed Gurung stone village in the Annapurnas"
    },
    "overview": "Enjoy the breathtaking splendor of the Annapurnas without extreme altitude or exhausting ascents. Walk stone staircases linking beautiful Gurung hamlets, watch golden sunrise illuminate Annapurna South and Machhapuchhre, and sleep in cozy stone lodges.",
    "highlights": [
      "Panoramic dawn views from Poon Hill and Australian Camp over Annapurna and Dhaulagiri",
      "Explore Ghandruk’s Gurung cultural museum and traditional slate-roof architecture",
      "Walk through moss-covered rhododendron and bamboo cloud forests along babbling brooks",
      "Home-cooked organic farm food including freshly picked wild mountain greens",
      "Comfortable private pacing adapted to all ages with light luggage porter support"
    ],
    "inclusions": [
      "Dedicated guidance by Sakar & certified mountain team",
      "ACAP and TIMS permits handled seamlessly",
      "Private transport between Pokhara and the foothill trailheads",
      "All mountain lodge / eco-guesthouse stays with private room options",
      "All hearty meals and tea breaks while on the trail"
    ],
    "exclusions": [
      "International airfare",
      "Personal mountain snacks and drinks"
    ],
    "accommodationStyle": "Comfortable Mountain Eco-Lodges & Family Inns",
    "transportStyle": "Private Transport to Trailhead & Gentle Scenic Walking",
    "customizable": true,
    "featured": false,
    "price": 1350,
    "currency": "USD"
  },
  {
    "id": "chitwan-tharu-conservation-wildlife",
    "slug": "chitwan-tharu-conservation-wildlife",
    "title": "Chitwan Regenerative Wildlife & Tharu Indigenous Stewardship",
    "nepaliTitle": "चितवन: दुर्लभ वन्यजन्तु र थारू संरक्षण",
    "tagline": "One-Horned Rhinos, River Dugout Canoes & Community-Led Buffer Zone Forests",
    "duration": "4 – 5 Days",
    "idealFor": "Wildlife lovers, birders, conservation-minded travelers & families",
    "season": "Oct – Apr",
    "groupSize": "Private (1 – 8 Travelers)",
    "image": {
      "src": "/explore-with-sakar/images/trails/river-gorge.jpg",
      "alt": "Rapti river misty morning in Chitwan National Park"
    },
    "overview": "Experience Nepal’s lush subtropical river lowlands in Chitwan National Park. Guided by native Tharu naturalists, drift silently down the Rapti River in wooden dugout canoes observing fish-eating Gharial crocodiles, track endangered Greater One-Horned Rhinoceros on foot in community buffer forests, and learn ancestral botanical wisdom.",
    "highlights": [
      "Dawn silent wooden dugout canoe safari watching migratory birds and gharials",
      "Gentle ethical walking safari through community-managed wildlife buffer zones",
      "Spotting Greater One-Horned Rhinoceros, deer herds, and exotic jungle birds",
      "Visit traditional Tharu earthen villages and learn clay wall relief painting",
      "Direct contribution to community forest anti-poaching patrols and village clinics"
    ],
    "inclusions": [
      "Personal hosting by Sakar & senior Tharu certified wildlife naturalists",
      "Private air-conditioned transport between Kathmandu / Pokhara and Chitwan",
      "Charming riverside eco-lodge accommodations with peaceful garden grounds",
      "All national park conservation fees, river permits, and community forest passes",
      "All meals: farm-fresh organic lowlands buffet and traditional Tharu dishes"
    ],
    "exclusions": [
      "International flights",
      "Alcoholic beverages and personal tips"
    ],
    "accommodationStyle": "Riverside Eco-Resort with Thatched Villas",
    "transportStyle": "Private AC Overland Vehicle & River Dugout Canoe",
    "customizable": true,
    "featured": false,
    "price": 1250,
    "currency": "USD"
  },
  {
    "id": "helambu-sacred-forests-hidden-gompas",
    "slug": "helambu-sacred-forests-hidden-gompas",
    "title": "Helambu Sacred Forests, High Apples & Serene Hermitages",
    "nepaliTitle": "हेलम्बु: शान्त वन र बौद्ध गुम्बाहरू",
    "tagline": "Quiet Ridges Just Beyond Kathmandu • Hyolmo Culture, Sweet Apples & Mist",
    "duration": "5 – 7 Days",
    "idealFor": "Seekers of tranquility, meditators, slow walkers, and cultural immersion",
    "season": "Sep – Jun",
    "groupSize": "Private (1 – 6 Travelers)",
    "image": {
      "src": "/explore-with-sakar/images/mountains/sunrise-himalayas.jpg",
      "alt": "Mist drifting across prayer-flagged ridges in Helambu"
    },
    "overview": "Located just north of Kathmandu yet untouched by mass tourism, Helambu is the homeland of the warm Hyolmo people. Walk through mossy oak forests and terraced sweet apple orchards to ancient meditation shrines and quiet hill gompas.",
    "highlights": [
      "Unhurried walking along ridge trails overlooking the Langtang and Jugal Himal peaks",
      "Explore Melamchi Ghyang and Tarke Ghyang ancient Buddhist monastic communities",
      "Taste fresh Helambu highland apples, apple cider, and traditional Hyolmo bread",
      "Meditation sessions in tranquil hilltop hermitages where Padmasambhava practiced",
      "Zero commercial trekker congestion and intimate family hearth experiences"
    ],
    "inclusions": [
      "Full accompaniment by Sakar and local Hyolmo community hosts",
      "Shivapuri and Langtang National Park entry permits",
      "Private 4WD transfers from Kathmandu to trail gateway",
      "All guesthouse and monastery family lodge accommodations",
      "All home-cooked organic meals and hot mountain teas"
    ],
    "exclusions": [
      "International airfare",
      "Personal insurance",
      "Tips"
    ],
    "accommodationStyle": "Cozy Hyolmo Family Mountain Inns",
    "transportStyle": "Private 4WD Vehicle & Scenic Foothill Trails",
    "customizable": true,
    "featured": false,
    "price": 1280,
    "currency": "USD"
  },
  {
    "id": "pharping-dakshinkali-spiritual-caves",
    "slug": "pharping-dakshinkali-spiritual-caves",
    "title": "Sacred Pharping: Guru Rinpoche Caves & Newar Tantric Shrines",
    "nepaliTitle": "फर्पिङ: पवित्र गुफाहरू र ध्यान स्थल",
    "tagline": "The Sacred Mandala of Southern Kathmandu Valley • Tibetan Nyingma & Tantric Roots",
    "duration": "3 – 4 Days",
    "idealFor": "Spiritual seekers, Buddhist practitioners, historians, and pilgrims",
    "season": "Year-Round",
    "groupSize": "Private (1 – 4 Travelers)",
    "image": {
      "src": "/explore-with-sakar/images/spiritual/meditation-session.jpg",
      "alt": "Butter lamps burning in front of golden Buddha statue in Pharping"
    },
    "overview": "Pharping (known to Tibetans as Yangleshö) is considered second only to Bodh Gaya in sanctity for Tibetan Buddhists. Here, Guru Padmasambhava achieved profound realization in the 8th century. Explore Asura Cave, ancient Vajrayogini temple, and tranquil monastic gardens.",
    "highlights": [
      "Sit quietly inside the sacred Asura and Yangleshö meditation caves of Padmasambhava",
      "Offer traditional butter lamps and receive private prayers with senior resident lamas",
      "Visit the ancient 17th-century tantric Vajrayogini shrine hidden in pine groves",
      "Walk through prayer flag-decked ridges offering panoramic southern valley views",
      "Private sound bowl meditation session amidst the fragrant mountain pines"
    ],
    "inclusions": [
      "In-depth spiritual and historical guidance by Sakar",
      "Private transfers in dedicated comfortable vehicle",
      "Serene hillside monastery guesthouse / eco-retreat stay",
      "All vegetarian meals, herbal teas, and ceremonial butter lamp offerings",
      "Donations to local monastics and sacred shrine trusts"
    ],
    "exclusions": [
      "Personal flights",
      "Nepal visa",
      "Personal travel insurance"
    ],
    "accommodationStyle": "Peaceful Hillside Monastery Guest Retreat",
    "transportStyle": "Private AC Vehicle & Forest Walks",
    "customizable": true,
    "featured": false,
    "price": 890,
    "currency": "USD"
  },
  {
    "id": "everest-foothills-sherpa-heritage-walk",
    "slug": "everest-foothills-sherpa-heritage-walk",
    "title": "Everest High Foothills: Sherpa Monasteries & Sacred Peaks",
    "nepaliTitle": "सगरमाथा फेदी र शेर्पा संस्कृति",
    "tagline": "Slow Walking in the Solu Foothills • Ancient Monasteries, Mani Walls & Everest Vistas",
    "duration": "8 – 10 Days",
    "idealFor": "Travelers seeking majestic Everest views without extreme altitude stress",
    "season": "Oct – May",
    "groupSize": "Private (2 – 6 Travelers)",
    "image": {
      "src": "/explore-with-sakar/images/mountains/himalayan-peaks.jpg",
      "alt": "Sherpa prayer stupa framing snowy Everest and Ama Dablam peaks"
    },
    "overview": "Explore the heart of Sherpa culture in the tranquil lower Solu-Khumbu foothills. Far from the congested Everest Base Camp highway, discover ancient monasteries like Chiwong and Thubten Chöling, walk along hand-carved Mani stone walls, and gaze upon Sagarmatha rising above the pine ridges.",
    "highlights": [
      "Magnificent clear views of Mount Everest, Ama Dablam, and Thamserku",
      "Visit centuries-old Sherpa monasteries and attend evening horn and drum pujas",
      "Stay in authentic family-run Sherpa lodges with wood-burning central stoves (Bukhari)",
      "Learn about high-altitude Sherpa mountaineering heritage and Buddhist mountain ethics",
      "Gentle, mindful hiking pace with comfortable sleep elevations below 3,800m"
    ],
    "inclusions": [
      "Personal journey guidance by Sakar and Sherpa mountain guides",
      "Scenic mountain flights (Kathmandu – Phaplu/Lukla – Kathmandu)",
      "Sagarmatha National Park and local municipality permits",
      "Cozy Sherpa lodge accommodations with hot showers and warm private bedding",
      "All mountain meals including hot Sherpa potato stews and Tibetan breads"
    ],
    "exclusions": [
      "International airfare",
      "Travel and evacuation insurance"
    ],
    "accommodationStyle": "Authentic Sherpa Family Mountain Lodges",
    "transportStyle": "Scenic Mountain Flight & Forest Trails",
    "customizable": true,
    "featured": false,
    "price": 2450,
    "currency": "USD"
  },
  {
    "id": "balthali-panauti-organic-farm-retreat",
    "slug": "balthali-panauti-organic-farm-retreat",
    "title": "Panauti & Balthali: Living Valley Hearths & Organic Terraces",
    "nepaliTitle": "पनौती र बल्थली: जीवन्त नेपाली गाउँ",
    "tagline": "Medieval River Confluences, Newari Woodcraft & Secluded Hillside Retreats",
    "duration": "3 – 5 Days",
    "idealFor": "Couples, families, slow living advocates, and weekend restorative travelers",
    "season": "Year-Round",
    "groupSize": "Private (1 – 6 Travelers)",
    "image": {
      "src": "/explore-with-sakar/images/homestays/village-meal.jpg",
      "alt": "Green terraced fields and peaceful rural hamlet in Balthali"
    },
    "overview": "Only two hours from Kathmandu lies ancient Panauti—a medieval Newar town standing at the sacred confluence of the Roshi and Punyamati rivers. Walk through untouched brick alleys to 14th-century Indreshwar Mahadev, then hike to Balthali village plateau perched amidst orange groves and pine hills.",
    "highlights": [
      "Explore medieval Panauti: intricately carved temple beams, stone spouts, and ghats",
      "Stay with local Newar and Tamang families enjoying genuine home-cooked hospitality",
      "Scenic hike across suspension bridges to the peaceful hill plateau of Balthali",
      "Pick organic citrus fruits and farm greens straight from village terrace fields",
      "Unhurried evening tea while listening to river waters and mountain birds"
    ],
    "inclusions": [
      "Personal guidance and local connections facilitated by Sakar",
      "Private roundtrip transport from Kathmandu in air-conditioned vehicle",
      "Charming village homestay and eco-lodge accommodations",
      "All home-cooked meals, farm snacks, and organic teas",
      "Guided village heritage walk and temple preservation fees"
    ],
    "exclusions": [
      "Personal expenses",
      "Tips"
    ],
    "accommodationStyle": "Vetted Community Homestay & Hilltop Eco-Lodge",
    "transportStyle": "Private AC Transport & Easy Countryside Walking",
    "customizable": true,
    "featured": false,
    "price": 750,
    "currency": "USD"
  },
  {
    "id": "bardia-untamed-west-nepal-wildlife",
    "slug": "bardia-untamed-west-nepal-wildlife",
    "title": "Wild Bardia: Untamed River Safaris, Bengal Tigers & Elephant Grass",
    "nepaliTitle": "बर्दिया: बाघको पाइला र कर्णाली नदी",
    "tagline": "Far West Nepal’s Greatest Wilderness • Raw Nature, Wild Tigers & Tharu Hospitality",
    "duration": "5 – 7 Days",
    "idealFor": "True wildlife enthusiasts, big cat trackers, and intrepid nature lovers",
    "season": "Oct – May",
    "groupSize": "Private (1 – 6 Travelers)",
    "image": {
      "src": "/explore-with-sakar/images/trails/river-gorge.jpg",
      "alt": "Towering riverine forest and pristine wilderness in Bardia"
    },
    "overview": "Escape far off the tourist circuit into Bardia National Park—Nepal’s premier untamed jungle. With dense sal forests, braided Karnali and Babai river systems, and sweeping grasslands, Bardia offers the highest chances in Asia to encounter wild Royal Bengal Tigers and wild Asian Elephants on foot with expert local trackers.",
    "highlights": [
      "Full-day guided walking safaris with seasoned local trackers deep inside the park",
      "Sit quietly at river machans (viewing hides) waiting for tigers to come drink",
      "Rafting or canoeing down the pristine Karnali River spotting freshwater Gangetic dolphins",
      "Encounter wild herds of Asian elephants, swamp deer, and Greater One-Horned rhinos",
      "Authentic Tharu cultural hospitality in traditional mud-and-thatch community villages"
    ],
    "inclusions": [
      "Sakar accompanying + elite certified indigenous Bardia wildlife trackers",
      "Domestic flights (Kathmandu – Nepalgunj – Kathmandu) & private 4WD jungle transfers",
      "Boutique jungle eco-lodge with organic garden dining",
      "All Bardia National Park entrance permits and community forest passes",
      "All safari activities: river drift, walking safaris, and open 4WD drives",
      "All meals and fresh refreshments throughout"
    ],
    "exclusions": [
      "International flights",
      "Personal travel insurance"
    ],
    "accommodationStyle": "Eco-Friendly Thatched Jungle Lodge",
    "transportStyle": "Domestic Flights, 4WD Jungle Jeep & Silent River Raft",
    "customizable": true,
    "featured": false,
    "price": 1980,
    "currency": "USD"
  }
];

export function getPackageBySlug(slug: string): PackageItem | undefined {
  return TRAVEL_PACKAGES.find((p) => p.slug === slug);
}

export function getFeaturedPackages(): PackageItem[] {
  return TRAVEL_PACKAGES.filter((p) => p.featured);
}
