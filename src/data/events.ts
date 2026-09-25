export interface NepalEvent {
  id: string;
  title: string;
  nepaliName: string;
  category: 'festival' | 'spiritual' | 'community';
  categoryLabel: string;
  date: string;
  location: string;
  season: string;
  image: string;
  shortDesc: string;
  highlights: string[];
  sakarNote: string;
  time?: string;
  route?: string;
  flyerImage?: string;
  isToday?: boolean;
  isTomorrow?: boolean;
}

export const EVENTS_DATA: NepalEvent[] = [
  // ==================== HAPPENING TODAY (SEP 25, 2026) ====================
  {
    id: 'indrajatra-koney-yaa',
    title: 'Indrajatra – Koney Yaa (Down-Town Chariot Procession)',
    nepaliName: 'क्वने या: (इन्द्रजात्रा)',
    category: 'festival',
    categoryLabel: 'Happening Today',
    date: 'Sep 25, 2026 (Today)',
    time: '4:30 pm onwards',
    location: 'Basantapur Durbar Square, Kathmandu',
    route: 'Basantapur → Chikanmugal → Jaisidewal → Lagan → Bramhatole → Hyumata → Kohiti → Bhimsensthan → Basantapur',
    season: 'Autumn',
    image: '/images/events/indrajatra-koney-yaa.jpg',
    flyerImage: '/images/events/indrajatra-koney-yaa-card.jpg',
    isToday: true,
    isTomorrow: false,
    shortDesc:
      'The ceremonial downtown chariot procession of the Royal Living Goddess Kumari, Lord Ganesh, and Lord Bhairav pulled through the ancient southern alleyways of historic Kathmandu.',
    highlights: [
      'Ceremonial pulling of the multi-tiered golden chariot of the Living Goddess Kumari',
      'Traditional Route: Basantapur → Chikanmugal → Jaisidewal → Lagan → Bramhatole → Hyumata → Kohiti → Bhimsensthan → Basantapur',
      'Masked Lakhey demon dancers leaping and swirling through packed medieval squares',
      'Photo credit: Ameet Ranjit Photography',
    ],
    sakarNote:
      'Koney Yaa is the first grand day of the chariot procession. The energy at Jaisidewal and Lagan as dusk falls is hypnotic. Arrive near Basantapur by 3:30 PM to secure a vantage point on a temple plinth.',
  },
  {
    id: 'khat-jatra-kupondole',
    title: 'Khat Jatra — Traditional Palanquin Procession',
    nepaliName: 'खत जात्रा (गुसिङ्गल, कुपण्डोल)',
    category: 'festival',
    categoryLabel: 'Happening Today',
    date: 'Sep 25, 2026 (Today)',
    time: '2:00 pm onwards',
    location: 'Gusingal, Kupondole, Lalitpur',
    season: 'Autumn',
    image: '/images/events/khat-jatra-kupondole.jpg',
    flyerImage: '/images/events/khat-jatra-kupondole-card.jpg',
    isToday: true,
    isTomorrow: false,
    shortDesc:
      'An energetic community palanquin festival where local guthi youths hoist sacred wooden shrines on their shoulders, running through the streets to rhythmic dhime beats and vermilion powder.',
    highlights: [
      'Shoulder-carried sacred Khat (palanquin) procession with traditional brass finials',
      'Vibrant community gathering of Kupondole and Patan local Newar guthis',
      'Resounding synchronized dhime drums and bhushyah cymbals echoing through the alleys',
      'Photo credit: Bibek Tandukar',
    ],
    sakarNote:
      'Khat Jatra at Gusingal starts early at 2:00 PM—it’s an intimate neighborhood celebration where travelers can stand shoulder-to-shoulder with locals and feel the raw festive pulse before the evening Kathmandu processions.',
  },
  {
    id: 'siddhapokhari-mela',
    title: 'Siddhapokhari Mela & Night Water Illuminations',
    nepaliName: 'सिद्धपोखरी मेला (भक्तपुर)',
    category: 'festival',
    categoryLabel: 'Happening Today',
    date: 'Sep 25 & 26, 2026 (Starts Tonight)',
    time: '8:00 pm onwards (Tonight)',
    location: 'Siddhapokhari, Bhaktapur',
    season: 'Autumn',
    image: '/images/events/siddhapokhari-mela.jpg',
    flyerImage: '/images/events/siddhapokhari-mela-card.jpg',
    isToday: true,
    isTomorrow: false,
    shortDesc:
      'A spellbinding night celebration at Bhaktapur’s ancient 15th-century reflection reservoir, illuminated by thousands of floating clay oil lamps mirrored on tranquil waters.',
    highlights: [
      'Spectacular night illumination of the historical Ta-Pukhu (Siddhapokhari) reservoir',
      'Thousands of earthen butter lamps glowing along medieval brick embankments',
      'Devotional singing and traditional Newar flute music under the autumn night sky',
      'Photo credit: Bhaktapur.com',
    ],
    sakarNote:
      'Siddhapokhari at night during this festival is one of Bhaktapur’s best kept secrets. The calm reflection of oil flames across the water creates an atmosphere of pure meditation.',
  },
  {
    id: 'dagin-procession',
    title: 'Dāgin Procession — The Descent of Indra’s Mother',
    nepaliName: 'दागिं जात्रा (मरु, बसन्तपुर)',
    category: 'festival',
    categoryLabel: 'Happening Today',
    date: 'Sep 25, 2026 (Tonight)',
    time: '10:00 pm onwards {tentative}',
    location: 'Maru, Basantapur, Kathmandu',
    season: 'Autumn',
    image: '/images/events/dagin-procession.jpg',
    flyerImage: '/images/events/dagin-procession-card.jpg',
    isToday: true,
    isTomorrow: false,
    shortDesc:
      'One of Indra Jatra’s most mystical midnight rituals: a masked representation of Goddess Dāgin (Indra’s mother) leads bereaved families through the ancient streets, guiding departed souls.',
    highlights: [
      'Mystic masked figure of Goddess Dāgin dressed in silk and gold robes leading the procession',
      'Starts from Maru tole immediately after the Kumari chariot procession completes',
      'Solemn accompaniment by families who lost loved ones during the past year',
      'Photo credit: Ameet Ranjit Photography',
    ],
    sakarNote:
      'The Dāgin procession begins late at night (tentatively 10:00 PM onwards) once the Kumari chariot rests. It is deeply moving and solemn—walk silently behind the procession with respect.',
  },
  {
    id: 'baumata-procession',
    title: 'Baumata Procession — The Towering Reed Lamp',
    nepaliName: 'बौमत जात्रा (काष्ठमण्डप)',
    category: 'spiritual',
    categoryLabel: 'Happening Today',
    date: 'Sep 25, 2026 (Tonight)',
    time: '10:30 pm onwards {tentative}',
    location: 'Kasthamandap, Kathmandu',
    season: 'Autumn',
    image: '/images/events/baumata-procession.jpg',
    flyerImage: '/images/events/baumata-procession-card.jpg',
    isToday: true,
    isTomorrow: false,
    shortDesc:
      'A dramatic midnight spectacle of a multi-tiered bamboo tower carrying blazing oil lamps aloft, carried through medieval Kathmandu in the wake of the Dāgin procession.',
    highlights: [
      'Elaborate tiered bamboo frame adorned with dozens of blazing oil lamps carried by young men',
      'Traditional route starting from the historic timber temple of Kasthamandap',
      'Follows the midpoint of the Dāgin procession, illuminating the narrow stone corridors',
      'Photo credit: Ameet Ranjit Photography',
    ],
    sakarNote:
      'Baumata starts around 10:30 PM after Dāgin reaches halfway. Standing under the shadows of Kasthamandap as the blazing lights approach is unforgettable.',
  },

  // ==================== GAI JATRA FESTIVAL ====================
  {
    id: 'gai-jatra',
    title: 'Gai Jatra — The Festival of Cows & Sacred Laughter',
    nepaliName: 'गाईजात्रा (सापारु)',
    category: 'festival',
    categoryLabel: 'Sacred Living Heritage',
    date: 'Late August or September (Bhadra Krishna Pratipada)',
    location: 'Kathmandu, Patan & Bhaktapur Durbar Squares',
    season: 'Monsoon / Autumn',
    image: '/images/events/gai-jatra.jpg',
    shortDesc:
      'A riot of color, clashing cymbals, rhythmic dhime drums, and communal roar of laughter. Beneath this carnival atmosphere lies one of the most profoundly emotional traditions in Newar civilization: transforming isolated grief into universal love and healing laughter.',
    highlights: [
      'Processions of young boys dressed as sacred cows with painted faces and cardboard horns to guide departed souls safely across the mythical Baitarni river',
      'A royal tradition dating to 17th-century King Pratap Malla, who decreed a citywide comedy procession to heal his grieving queen after the death of the crown prince',
      'Uncensored cultural protection of satirical theater, political parody, and hilarious street humor across the medieval toles of Kathmandu Valley',
      'Nepal’s vibrant annual LGBTQ+ Pride Parade celebrated right in the heart of this welcoming carnival atmosphere',
    ],
    sakarNote:
      'Today is a day about death, but it is not a day of silence. The Newar philosophy teaches us that grief is too heavy to carry alone in the dark. We bring it out into the streets. We share it. We wrap it in absurdity, in satire, and in comedy. If a young boy dressed as a cow offers you a piece of fruit or a sweet, accept it with both hands—it is a blessing from a family remembering their loved one. The best way to heal a broken heart is to share the tears, and then, together, find the strength to laugh again.',
  },

  // ==================== CORE ANNUAL FESTIVALS ====================
  {
    id: 'indra-jatra',
    title: 'Indra Jatra & Sacred Kumari Festival',
    nepaliName: 'इन्द्रजात्रा',
    category: 'festival',
    categoryLabel: 'Sacred Festival',
    date: 'September (Bhadra Full Moon)',
    location: 'Kathmandu & Patan Durbar Squares',
    season: 'Autumn',
    image: '/explore-with-sakar/images/heritage/temple-courtyard.jpg',
    shortDesc:
      'Eight days of ancient Newari masquerade dances, the ceremonial chariot procession of the Living Goddess Kumari, and secret wooden windows dispensing holy rice beer.',
    highlights: [
      'Witness the masked Majipa Lakhey demon dance through medieval alleyways',
      'Ceremonial chariot procession of the Royal Kumari',
      'Night illumination of the 12th-century Swet Bhairab mask',
      'Shared traditional Samay Baji feasts with local guthi families',
    ],
    sakarNote:
      'Indra Jatra is pure electric cultural energy. I know the quiet rooftop terraces overlooking the chariot route where you can witness the rituals away from the dense crushing crowds.',
  },
  {
    id: 'tihar-deepawali',
    title: 'Tihar — The Festival of Lights & Living Bonds',
    nepaliName: 'तिहार / यमपञ्चक',
    category: 'festival',
    categoryLabel: 'Living Culture',
    date: 'Late October or Early November',
    location: 'Rural Villages & Mountain Homestays',
    season: 'Autumn',
    image: '/explore-with-sakar/images/homestays/traditional-kitchen.jpg',
    shortDesc:
      'Nepal’s most heartfelt autumn celebration honoring dogs, cows, crows, and siblings with clay butter lamps, vibrant marigold garlands, and village singing under starry skies.',
    highlights: [
      'Clay diya lamps and hand-drawn rice flour rangoli mandalas outside every doorway',
      'Deusi-Bhailo musical troupes visiting village homes with spontaneous folk poetry',
      'Bhai Tika seven-colored forehead blessings and homemade sel-roti bread',
      'Experiencing authentic celebration gathered around a Gurung woodfire hearth',
    ],
    sakarNote:
      'Celebrating Tihar in a mountain village instead of a city hotel changes how you perceive family and hospitality forever. You become part of the family circle.',
  },
  {
    id: 'mani-rimdu',
    title: 'Mani Rimdu Sacred Monastic Festival',
    nepaliName: 'मणि रिम्दु',
    category: 'spiritual',
    categoryLabel: 'Spiritual Tradition',
    date: 'November (Full Moon, 3 Days)',
    location: 'Tengboche & Chiwong Monasteries, Solukhumbu',
    season: 'Late Autumn',
    image: '/explore-with-sakar/images/mountains/sunrise-himalayas.jpg',
    shortDesc:
      'The highest-altitude sacred Buddhist festival in the world. Monks perform sacred costumed dances enacting the triumph of wisdom over ignorance against the dramatic backdrop of Ama Dablam.',
    highlights: [
      'Intricate sacred sand mandala creation and ritual dissolution ceremony',
      'Chham masked monastic dances accompanied by long alpine horns (dungchen)',
      'Fire puja (Jinsik) and empowerment blessings by high Sherpa Rinpoches',
      'Quiet walking along sacred juniper ridges and prayer-flag stupas',
    ],
    sakarNote:
      'The sound of monastic horns echoing across the 3,800m amphitheater of snow peaks is something that stays in your ribcage for life.',
  },
  {
    id: 'himalayan-solstice-retreat',
    title: 'Solstice Himalayan Sound Sanctuary & Meditation',
    nepaliName: 'ध्यान तथा ध्वनि साधना',
    category: 'spiritual',
    categoryLabel: 'Spiritual Retreat',
    date: 'Spring & Autumn Equinox / Solstices',
    location: 'Pharping Sacred Valley Sanctuary',
    season: 'Spring / Autumn',
    image: '/explore-with-sakar/images/trails/suspension-bridge.jpg',
    shortDesc:
      'An intimate 4-day silence and sound healing gathering using 7-metal singing bowls, gentle pranayama, forest walking meditation, and Buddhist monastery dawn chanting.',
    highlights: [
      'Personal 7-metal sound therapy sessions with master practitioners',
      'Dawn circumambulation and butter lamp lighting at Asura Cave',
      'Mindful walking through pine forest nature trails in silence',
      'Nourishing organic Ayurvedic meals and wild herbal teas',
    ],
    sakarNote:
      'We keep these gatherings strictly limited to 6 travelers to protect the sanctity and stillness of the valley.',
  },
  {
    id: 'community-reforestation-schools',
    title: 'Buffer Zone Reforestation & Village School Day',
    nepaliName: 'सामुदायिक वन तथा विद्यालय कार्यक्रम',
    category: 'community',
    categoryLabel: 'Community & Impact',
    date: 'Ongoing Seasonal Departures (Monthly)',
    location: 'Chitwan Buffer Zone & Nawalpur Villages',
    season: 'Year-Round',
    image: '/explore-with-sakar/images/homestays/village-storyteller.jpg',
    shortDesc:
      'Direct, responsible hands-on collaboration with indigenous community buffer zone councils to plant wildlife corridor trees and support rural village school libraries.',
    highlights: [
      'Plant native fodder and fruit saplings in anti-poaching wildlife buffer corridors',
      'Distribute stationery and storybooks to primary school students with local teachers',
      'Learn indigenous Tharu herbal medicine and wildlife tracking from elder naturalists',
      '100% of project contributions directly fund local youth and women’s cooperative funds',
    ],
    sakarNote:
      'This is not performative charity. It is respectful, shoulder-to-shoulder collaboration requested directly by village councils.',
  },
  {
    id: 'maha-shivaratri',
    title: 'Maha Shivaratri & Sacred River Aarti',
    nepaliName: 'महाशिवरात्रि',
    category: 'festival',
    categoryLabel: 'Sacred Festival',
    date: 'Late February or Early March',
    location: 'Pashupatinath Temple Complex, Kathmandu',
    season: 'Late Winter',
    image: '/explore-with-sakar/images/heritage/ancient-alleyways.jpg',
    shortDesc:
      'The Great Night of Shiva. Over a million holy men (sadhus), pilgrims, and yogis converge along the holy Bagmati river for nightlong bonfires, classical hymns, and spiritual devotion.',
    highlights: [
      'Meet Himalayan ascetics and learn about ancient renunciate philosophies',
      'Sunset classical flute and sitar concert on historical river platforms',
      'Sacred evening aarti with multi-tiered camphor oil lamps',
      'Respectful guided access with Sakar explaining sacred Hindu cosmology',
    ],
    sakarNote:
      'Pashupatinath during Shivaratri is an intense, mesmerizing immersion into primordial Vedic spirituality. Experiencing it with proper cultural reverence and context makes all the difference.',
  },
];
