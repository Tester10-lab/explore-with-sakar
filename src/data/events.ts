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
}

export const EVENTS_DATA: NepalEvent[] = [
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
