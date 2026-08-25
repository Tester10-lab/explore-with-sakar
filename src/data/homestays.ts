import { HomestayExperience, Testimonial } from '@/types';

export const HOMESTAYS: HomestayExperience[] = [
  {
    id: 'ghandruk-gurung',
    villageName: 'Ghandruk Heritage Village',
    region: 'Annapurna Conservation Area',
    hostFamily: 'Gurung Family & Aama Group',
    community: 'Gurung Indigenous Community',
    description: 'Perched high on a terraced slope with straight-on views of Annapurna South and Hiunchuli, this traditional slate-roof homestead welcomes travelers into the heart of Gurung hospitality.',
    quote: 'We do not receive visitors as clients; when you sit by our wood fire and eat our rice, you are family.',
    image: {
      src: '/explore-with-sakar/images/homestays/village-meal.jpg',
      alt: 'Family and guests sharing a hot home-cooked meal around wooden table',
      caption: 'Gathering around the family kitchen in Ghandruk.',
    },
    dailyRhythm: [
      '6:00 AM — Fresh milk tea and sunrise over Annapurna peaks',
      '8:30 AM — Farm-fresh breakfast of buckwheat pancakes and wild honey',
      '11:00 AM — Walking the terraced organic fields and community weaving loom',
      '5:30 PM — Hands-on cooking session by the wood stove (Chulo)',
      '7:30 PM — Evening storytelling and Gurung folk songs by the hearth',
    ],
    foodExperience: [
      'Organic red rice and wild black lentil soup (Kalo Daal)',
      'Gundruk & Bhatmas (fermented dried leaf and roasted soybean salad)',
      'Handmade millet rotis with fresh yak butter and chili pickle',
      'Locally harvested mountain nettle (Sisnoo) soup',
    ],
  },
  {
    id: 'tamang-heritage-briddhim',
    villageName: 'Briddhim Tibetan-Tamang Homestay',
    region: 'Langtang Valley Foothills',
    hostFamily: 'Tenzing & Pema Household',
    community: 'Tamang Buddhist Heritage',
    description: 'A traditional timber and fieldstone home with Tibetan Buddhist motifs. The family weaves sheep-wool rugs, keeps apple orchards, and maintains the ancient village prayer wheel.',
    quote: 'The mountain silence heals whatever heaviness you brought from the city.',
    image: {
      src: '/explore-with-sakar/images/homestays/stone-village-house.jpg',
      alt: 'Traditional stone house in Briddhim village with slate roof',
      caption: 'Stone and timber homestay in the high Tamang hills.',
    },
    dailyRhythm: [
      '5:45 AM — Morning butter lamp offering at the family altar',
      '7:00 AM — Steaming Tibetan salt-butter tea and roasted barley flour (Tsampa)',
      '10:00 AM — Herb harvesting with village elder in pine forest',
      '4:00 PM — Traditional wool spinning and carpet knotting workshop',
      '7:00 PM — Steaming vegetable momos and mountain herbal broth',
    ],
    foodExperience: [
      'Hand-pinched Tibetan momos stuffed with garden greens and paneer',
      'Freshly roasted Tsampa porridge with clarified mountain butter',
      'Sweet and tangy organic Mustang apple pie baked in wood oven',
      'Herbal mountain tea infused with wild mint and holy basil',
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    author: 'Elena & Marcus Weber',
    country: 'Switzerland',
    countryFlag: '🇨🇭',
    journey: '10-Day Cultural & Village Immersion',
    date: 'October 2025',
    highlight: 'Sakar made Nepal feel like home from our very first hour.',
    quote: 'We wanted an authentic journey away from mass tour buses, and Sakar delivered something truly life-changing. Staying in Ghandruk with his extended community, laughing with the grandmothers over woodfire tea, and walking peaceful trails with zero crowds was the highlight of our decade of traveling.',
    avatar: '/explore-with-sakar/images/sakar/sakar-portrait.jpg',
  },
  {
    id: 't-2',
    author: 'Dr. Alistair Campbell',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    journey: '7-Day Spiritual & Singing Bowl Retreat',
    date: 'November 2025',
    highlight: 'The depth of Sakar’s cultural knowledge and quiet integrity is extraordinary.',
    quote: 'As someone who has traveled across Asia for thirty years, I have rarely met a guide who combines such humility, deep philosophical understanding, and meticulous care. Sakar is not just a guide; he is a bridge into the spiritual heart of Nepal.',
    avatar: '/explore-with-sakar/images/sakar/sakar-portrait.jpg',
  },
  {
    id: 't-3',
    author: 'Sarah Lin & David Chen',
    country: 'Canada',
    countryFlag: '🇨🇦',
    journey: '8-Day Hidden Trails & Heritage Journey',
    date: 'December 2025',
    highlight: 'Pure human warmth, incredible food, and breathtaking vistas.',
    quote: 'Every single meal, every suspension bridge, and every hidden alleyway in Patan had a story that Sakar brought to life. You can feel how much the local communities love and respect him everywhere you go. We cannot recommend Explore With Sakar enough.',
    avatar: '/explore-with-sakar/images/sakar/sakar-portrait.jpg',
  },
];
