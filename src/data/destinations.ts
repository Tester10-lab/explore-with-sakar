import { Destination } from '@/types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'kathmandu-valley',
    name: 'Kathmandu Valley',
    nepaliName: 'काठमाडौं उपत्यका',
    tagline: 'Living Museum of Sacred Shrines & Medieval Bahals',
    elevation: '1,400 m',
    description: 'The cultural heartbeat of Nepal, where seven UNESCO World Heritage zones, centuries-old Buddhist stupas, and vibrant Newari artisan quarters thrive in harmonious sync.',
    image: {
      src: '/explore-with-sakar/images/heritage/durbar-square.jpg',
      alt: 'Patan Durbar Square temples and ancient brick courtyards',
    },
    highlights: ['Swayambhunath & Boudhanath Stupas', 'Patan Secret Monastic Courtyards', 'Bhaktapur Pottery & Woodcarving', 'Pashupatinath Sacred Aarti'],
  },
  {
    id: 'pokhara-annapurna',
    name: 'Pokhara & Annapurna Foothills',
    nepaliName: 'पोखरा र अन्नपूर्ण',
    tagline: 'Reflections of Machapuchare on Phewa Lake',
    elevation: '820 m - 2,100 m',
    description: 'A tranquil lakeside haven framed by the towering dramatic ramparts of the Annapurna range. The launching point for world-class community walks and peaceful retreats.',
    image: {
      src: '/explore-with-sakar/images/mountains/mountain-ridge.jpg',
      alt: 'Scenic mountain ridge in Pokhara overlooking Himalayan range',
    },
    highlights: ['Sarangkot Dawn Ridge Vista', 'Peace Pagoda Meditation Walk', 'Gurung Heritage Villages', 'Phewa Lake Wooden Boat Sunset'],
  },
  {
    id: 'mustang-muktinath',
    name: 'Mustang & Muktinath',
    nepaliName: 'मुस्ताङ र मुक्तिनाथ',
    tagline: 'Sacred Rainshadow Kingdom & Eternal Springs',
    elevation: '2,800 m - 3,800 m',
    description: 'A dramatic high-altitude desert canyon sculpted by the Kali Gandaki River, home to ancient Bon-Buddhist cave settlements and the holy pilgrimage waters of Muktinath.',
    image: {
      src: '/explore-with-sakar/images/trails/sacred-mountain-lake.jpg',
      alt: 'Dramatic arid mountain landscape of Lower Mustang',
    },
    highlights: ['Muktinath 108 Sacred Water Fountains', 'Medieval Mud Citadel of Kagbeni', 'Marpha Cobblestone Lanes & Orchards', 'Stark Wind-Sculpted Canyons'],
  },
  {
    id: 'langtang-helambu',
    name: 'Langtang & Helambu',
    nepaliName: 'लाङटाङ र हेलम्बु',
    tagline: 'Valley of Glaciers & Sacred Monasteries',
    elevation: '1,500 m - 3,870 m',
    description: 'A pristine alpine sanctuary just north of Kathmandu, celebrated for lush rhododendron forests, Tamang indigenous warmth, and glacial rivers cutting through granite peaks.',
    image: {
      src: '/explore-with-sakar/images/mountains/alpine-valley.jpg',
      alt: 'Alpine valley and glacial mountain stream in Langtang',
    },
    highlights: ['Kyanjin Gompa Alpine Sanctuary', 'Tamang Heritage Cultural Homestays', 'Wild Rhododendron Forest Walks', 'Organic Yak Cheese Craft Dairies'],
  },
  {
    id: 'chitwan-subtropics',
    name: 'Chitwan Lowlands',
    nepaliName: 'चितवन',
    tagline: 'Sub-tropical Jungles & Indigenous Tharu Guardians',
    elevation: '150 m',
    description: 'A lush southern paradise of sal forests and elephant grass, home to the endangered greater one-horned rhinoceros, royal Bengal tiger, and indigenous Tharu heritage.',
    image: {
      src: '/explore-with-sakar/images/trails/river-gorge.jpg',
      alt: 'Peaceful river flowing through sub-tropical Chitwan valley',
    },
    highlights: ['Silent Wooden Canoe Safaris', 'Ethical Jungle Walking Safaris', 'Indigenous Tharu Village Homestays', 'Community Buffer Zone Conservation'],
  },
  {
    id: 'bandipur-heritage',
    name: 'Bandipur Hilltop Town',
    nepaliName: 'बन्दिपुर',
    tagline: 'Preserved 18th-Century Newari Silk Route Post',
    elevation: '1,030 m',
    description: 'A pedestrian-only hilltop town perched on a high ridge, renowned for its beautifully preserved 18th-century Newari architecture, slate courtyards, and epic Himalayan horizons.',
    image: {
      src: '/explore-with-sakar/images/homestays/stone-village-house.jpg',
      alt: 'Traditional Newari architecture and stone paved street in Bandipur',
    },
    highlights: ['Car-free Historic Main Bazaar', 'Panoramic 180° Himalayan Sunset', 'Local Silkworm Farm Visits', 'Thani Mai Hilltop Sunrise Viewpoint'],
  }
];
