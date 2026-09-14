export interface ResourceSection {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  overview: string;
  keyPoints: {
    heading: string;
    details: string;
    tag?: string;
  }[];
  practicalTips: string[];
}

export const TRAVEL_RESOURCES: ResourceSection[] = [
  {
    id: 'seasons-climate',
    title: 'Seasons & Himalayan Weather',
    subtitle: 'When to visit for clear mountain vistas, cultural festivals, or quiet trails',
    iconName: 'Sun',
    overview: 'Nepal’s diverse topography creates dramatic micro-climates ranging from tropical lowlands (Chitwan) to alpine Himalayan heights. Understanding seasonal cycles helps you choose the best window for your personal travel style.',
    keyPoints: [
      {
        heading: 'Autumn (October – November)',
        details: 'The premier season. Post-monsoon air is crystal clear with panoramic Himalayan visibility, mild daytime temperatures (15°C–22°C in valleys), and major festival celebrations (Dashain and Tihar).',
        tag: 'Peak Season',
      },
      {
        heading: 'Spring (March – May)',
        details: 'Warm and vibrant. Wild rhododendrons and magnolias carpet the hillsides in scarlet and pink. Longer daylight hours and excellent high-altitude trekking conditions.',
        tag: 'Great for Flora & Treks',
      },
      {
        heading: 'Winter (December – February)',
        details: 'Crisp, sunny days with cold mornings and nights. Lower valley trails, Kathmandu heritage walks, and Chitwan wildlife safaris are wonderfully quiet with minimal tourist crowds.',
        tag: 'Quiet & Crisp',
      },
      {
        heading: 'Monsoon / Summer (June – August)',
        details: 'Lush green agricultural terraces and dramatic misty landscapes. Ideal for rain-shadow regions like Upper Mustang and Muktinath which sit sheltered behind the Annapurna massif.',
        tag: 'Rainshadow Havens',
      },
    ],
    practicalTips: [
      'Layering is essential in the Himalayas — mornings are cold, midday is warm in the sun, and evenings cool quickly.',
      'Check local festival dates ahead of time if you want to experience authentic masked dances and street celebrations.',
    ],
  },
  {
    id: 'visa-entry',
    title: 'Visa & Entry Formalities',
    subtitle: 'Step-by-step guidance for arriving smoothly in Nepal',
    iconName: 'FileText',
    overview: 'Entering Nepal is straightforward for most nationalities. Tourist visas are issued upon arrival at Tribhuvan International Airport (KTM) in Kathmandu or can be processed through pre-arrival online immigration forms.',
    keyPoints: [
      {
        heading: 'On-Arrival Tourist Visa',
        details: 'Available for most passport holders at Kathmandu Airport. Duration options include 15 Days ($30 USD), 30 Days ($50 USD), and 90 Days ($125 USD). Payable in cash USD/EUR/GBP or by credit card.',
      },
      {
        heading: 'Passport Requirements',
        details: 'Your passport must be valid for at least 6 months beyond your scheduled departure date and contain at least two blank visa pages.',
      },
      {
        heading: 'Online Pre-Arrival Form',
        details: 'We recommend filling out the official Nepal Department of Immigration online visa application within 14 days before your flight to save time at the airport kiosk.',
      },
      {
        heading: 'Airport Arrival & Greeting',
        details: 'Once through customs and baggage collection, Sakar or your private driver will greet you outside the arrival terminal holding an Explore With Sakar welcome sign.',
      },
    ],
    practicalTips: [
      'Carry 2–4 physical passport-sized photos for local permits and SIM card registration.',
      'Keep a small amount of cash in USD/EUR for airport visa processing kiosks.',
    ],
  },
  {
    id: 'cultural-etiquette',
    title: 'Cultural & Sacred Etiquette',
    subtitle: 'Navigating local traditions with grace, humility, and warmth',
    iconName: 'Heart',
    overview: 'Nepali culture is deeply gracious and welcoming. Demonstrating respect for centuries-old spiritual and social traditions enriches your interactions and opens doors to genuine heartfelt connections.',
    keyPoints: [
      {
        heading: 'The Traditional Greeting (Namaste)',
        details: 'Placing your palms together at chest level with a slight bow while saying "Namaste" signifies "I bow to the divine within you" and is warmly received everywhere.',
      },
      {
        heading: 'Sacred Temples & Stupas',
        details: 'Always walk clockwise around Buddhist stupas, mani stones, and Hindu shrines (keeping the monument on your right). Remove footwear before entering temple inner sanctums and home kitchens.',
      },
      {
        heading: 'Photography Respect',
        details: 'Always ask permission before photographing people, particularly monks, sadhus, and village elders. Never take photographs inside active monastery inner shrines where cameras are forbidden.',
      },
      {
        heading: 'Modest Dress Standards',
        details: 'In rural villages and religious sites, cover your shoulders and knees. Avoid revealing attire to honor traditional local norms.',
      },
    ],
    practicalTips: [
      'Use your right hand when giving or receiving items, food, or money.',
      'Never touch someone on the top of their head, as the head is considered the sacred seat of the spirit.',
    ],
  },
  {
    id: 'packing-checklist',
    title: 'Packing Essentials Checklist',
    subtitle: 'What to bring for slow travel, homestays, and mountain walks',
    iconName: 'Luggage',
    overview: 'Smart packing for Nepal is all about lightweight, versatile layers that keep you comfortable across changing valley and mountain microclimates.',
    keyPoints: [
      {
        heading: 'Footwear & Socks',
        details: 'Comfortable, broken-in trail walking shoes or lightweight trekking boots with good grip. Slip-on shoes or sandals for homestays and temple visits. 3–4 pairs of merino wool socks.',
      },
      {
        heading: 'Clothing Layers',
        details: 'Lightweight breathable base layers, comfortable moisture-wicking shirts, fleece mid-layer, packable down jacket for cool evenings, and a wind/waterproof outer shell.',
      },
      {
        heading: 'Sun & Eye Protection',
        details: 'High-UV polarized sunglasses, wide-brim sun hat, high SPF broad-spectrum sunscreen, and nourishing lip balm with UV protection.',
      },
      {
        heading: 'Personal First Aid & Hydration',
        details: 'Personal medications, blister plasters, rehydration salts, hand sanitizer, water purification tablets/UV purifier, and a reusable insulated water bottle.',
      },
    ],
    practicalTips: [
      'High-quality trekking gear and warm woolens can also be purchased or rented affordably in Kathmandu and Pokhara.',
      'Pack a universal power adapter and a portable power bank for rural village stays.',
    ],
  },
  {
    id: 'altitude-acclimatization',
    title: 'Altitude & Mountain Well-being',
    subtitle: 'Understanding elevation pacing and listening to your body',
    iconName: 'Activity',
    overview: 'When ascending above 2,500 meters, allowing your body time to adjust naturally is the golden rule of Himalayan travel. Our itineraries are intentionally paced to ensure slow, safe acclimatization.',
    keyPoints: [
      {
        heading: 'The Golden Rule: Climb High, Sleep Low',
        details: 'Our walking days incorporate gradual ascents with designated rest stops, allowing your respiratory system to adapt without rush or strain.',
      },
      {
        heading: 'Hydration & Nutrition',
        details: 'Drink 3–4 liters of fluids daily (water, herbal teas, garlic soup, and lemon ginger honey). Eat carbohydrate-rich meals like Dal Bhat and avoid alcohol at higher elevations.',
      },
      {
        heading: 'Listening to Early Symptoms',
        details: 'Mild headaches or fatigue can happen as you cross 3,000m. Always inform Sakar immediately so pacing can be adjusted. We never hesitate to rest or descend if needed.',
      },
      {
        heading: 'Mandatory Travel Insurance',
        details: 'Ensure your travel insurance policy explicitly covers emergency medical evacuation up to the maximum altitude of your itinerary (typically 4,000m).',
      },
    ],
    practicalTips: [
      'Walk at a conversational pace — if you cannot speak in full sentences while walking uphill, slow down your rhythm.',
      'Sakar carries a wilderness first aid kit with pulse oximeter for daily altitude monitoring.',
    ],
  },
  {
    id: 'money-connectivity',
    title: 'Money, SIM Cards & Connectivity',
    subtitle: 'Staying connected and managing local finances in Nepal',
    iconName: 'Wifi',
    overview: 'While Kathmandu and Pokhara have modern connectivity and digital payment options, rural villages and mountain ridges rely predominantly on cash transactions and mobile cellular data.',
    keyPoints: [
      {
        heading: 'Local Currency (NPR)',
        details: 'The official currency is the Nepalese Rupee (NPR). ATMs are widely available in Kathmandu and Pokhara (dispensing NPR). Exchange bureaus accept USD, EUR, GBP, AUD, and CAD.',
      },
      {
        heading: 'Cash for Village & Mountain Stays',
        details: 'Carry sufficient cash NPR for personal souvenirs, snacks, and artisan tips before leaving major towns, as ATMs do not exist in remote mountain villages.',
      },
      {
        heading: 'Local SIM Cards & 4G/5G',
        details: 'We help you obtain a local tourist SIM card (Ncell or Nepal Telecom) with high-speed data upon arrival. 4G signal is surprisingly robust across most inhabited valleys.',
      },
      {
        heading: 'Wi-Fi & Charging in Homestays',
        details: 'Most boutique lodges and homestays provide Wi-Fi and solar/mains charging for phones and camera batteries. A portable power bank is recommended for day excursions.',
      },
    ],
    practicalTips: [
      'Notify your credit card provider that you will be traveling to Nepal to avoid card security blocks at ATMs.',
      'Keep small denomination notes (Rs. 50, 100, 500) handy for tea shops and local craft stalls.',
    ],
  },
];
