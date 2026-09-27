export interface ChakraDetail {
  chakra: string;
  english: string;
  mantra: string;
  attribute: string;
}

export interface GoWithinChapter {
  id: string;
  chapterNumber: string;
  title: string;
  subtitle: string;
  nepaliTitle?: string;
  tagline: string;
  location: string;
  duration: string;
  image: string;
  imageAlt: string;
  summary: string;
  paragraphs: string[];
  highlights: string[];
  keyQuote?: {
    quote: string;
    attribution: string;
  };
  chakras?: ChakraDetail[];
}

export interface GoWithinData {
  title: string;
  subtitle: string;
  nepaliTitle: string;
  intro: {
    heading: string;
    paragraphs: string[];
  };
  chapters: GoWithinChapter[];
}

export const GO_WITHIN_CONTENT: GoWithinData = {
  title: 'Go Within',
  subtitle: 'Sacred Himalayan Sound & Spiritual Sanctuary',
  nepaliTitle: 'आध्यात्मिक शान्ति र अन्तर्यात्रा',
  intro: {
    heading: 'Reconnecting with Stillness in the Sacred Himalayas',
    paragraphs: [
      'For thousands of years, the high ridges, pine valleys, and sacred caves of Nepal have served as the world’s most potent sanctuary for yogis, meditators, and those seeking mental clarity.',
      'We craft gentle, contemplative journeys focused on acoustic sound resonance, dawn monastery prayers, mindful walking, and pure presence. Rather than dogmatic practice, our approach is experiential, peaceful, and restorative.',
    ],
  },
  chapters: [
    {
      id: 'sacred-geometry-valley',
      chapterNumber: 'Chapter 01',
      title: 'Sacred Geometry of the Valley',
      subtitle: 'The Cosmic Maps of Kathmandu, Patan, and Bhaktapur',
      nepaliTitle: 'काठमाडौँ उपत्यकाको पवित्र ज्यामिति',
      tagline: 'Ashta Matrikas • Dashamahavidyas • Nava Durga & Tantric Yantras',
      location: 'Kathmandu, Patan (Lalitpur) & Bhaktapur',
      duration: 'Full Day (Contemplative)',
      image: '/explore-with-sakar/images/spiritual/buddhist-stupa.jpg',
      imageAlt: 'Ancient sacred geometry, stupa eyes, and mandala patterns of the Kathmandu Valley',
      summary: 'Behind the temples and sacred boundaries lies a living mandala where Shaiva, Vaishnava, Shakta, and Buddhist traditions maintain cosmic balance through divine geometry.',
      paragraphs: [
        'Behind the temples, courtyards and sacred boundaries lies a world of Shaiva, Vaishnava, Shakta and Buddhist traditions, where each deity carries a role in maintaining cosmic balance. The placement of shrines, guardian deities and sacred spaces reflects the idea of a living mandala or sword in a city where geography and spirituality are connected.',
        'What if Kathmandu, Patan and Bhaktapur were not simply built, but sacredly imagined?',
        'KATHMANDU: Around the historic city are the Ashta Matrikas—the Eight Mother Goddesses, traditionally regarded as guardians of the settlement. Their sacred sites are connected through a larger ritual geography, traditionally associated with the form of a Khadga (a sacred sword).',
        'PATAN: Patan is renowned for its connection with the Dashamahavidyas—the Ten Great Wisdom Goddesses of the Tantric tradition. These manifestations of the Divine Feminine (Shakti) represent cosmic energy and wisdom woven into the city’s rituals. Symbolically associated with a Yantra (sacred diagram) and the Dharma Chakra (sacred wheel), when you walk through Patan, you walk through a sacred map of the Divine Feminine.',
        'BHAKTAPUR: The Nava Durga—the Nine Manifestations of the Divine Mother—guard Bhaktapur through an ancient Tantric network symbolically connected with the Khunda (खुँडा, the sacred weapon of protection). During the famous Nava Durga dance, sacred masked deities emerge into the streets, blessing the people and renewing the bond with their guardians.',
      ],
      highlights: [
        'Discovering the Khadga (sword) sacred geometry formed by the Ashta Matrikas in Kathmandu',
        'Walking the Dashamahavidya Tantric Shakti Yantra map through the hidden bahals of Patan',
        'Understanding the protective Khunda network and Nava Durga masked ritual dances of Bhaktapur',
        'Experiencing how urban space, architectural mandalas, and spiritual faith coexist',
      ],
      keyQuote: {
        quote: 'What if Kathmandu, Patan and Bhaktapur were not simply built, but sacredly imagined?',
        attribution: 'Sacred Himalayan Geography',
      },
    },
    {
      id: 'pashupati-life-and-eternity',
      chapterNumber: 'Chapter 02',
      title: 'Pashupatinath: Where Life Meets Eternity',
      subtitle: 'A Leisurely Walk Along the Bagmati Sanctuary',
      nepaliTitle: 'पशुपतिनाथ: जीवन र अनन्तको सङ्गम',
      tagline: 'Bagmati Cremation Ghats • Temple Bells • The Beauty of Impermanence',
      location: 'Pashupatinath Sacred Sanctuary',
      duration: 'Half Day (Morning)',
      image: '/explore-with-sakar/images/spiritual/monastery-monk.jpg',
      imageAlt: 'Morning sun touching the sacred Bagmati river, temple spires, and peaceful ghats of Pashupatinath',
      summary: 'At Pashupati, life and death are not separated; they exist together, reminding us to pause, reflect, and experience the profound beauty of impermanence.',
      paragraphs: [
        'A leisurely walk through Pashupati is a journey into the deeper rhythm of life. As the morning sun touches the Bagmati River, the sacred cremation ghats quietly reveal the eternal cycle of existence where farewell, prayer, love and memories meet.',
        'The sound of temple bells blends with chants, flowing water and the movement of life around the sanctuary. Cows wander peacefully, monkeys move through the trees, dogs rest along the pathways, and nature continues its timeless presence.',
        'At Pashupati, life and death are not separated; they exist together, reminding us to pause, reflect and experience the beauty of impermanence.',
      ],
      highlights: [
        'Quiet morning reflection along the sacred Bagmati River cremation ghats',
        'Experiencing the harmonious blending of temple bells, Vedic chants, and river flows',
        'Observing animals and nature existing peacefully within the sacred sanctuary',
        'Embracing the profound yogic teaching of impermanence (Anicca)',
      ],
      keyQuote: {
        quote: 'At Pashupati, life and death are not separated; they exist together, reminding us to pause, reflect and experience the beauty of impermanence.',
        attribution: 'Pashupati Sanctuary Wisdom',
      },
    },
    {
      id: 'himalayan-shamanism',
      chapterNumber: 'Chapter 03',
      title: 'Himalayan Shamanism (Dhami-Jhankri)',
      subtitle: 'Nepal’s Ancient Bridge Between Nature and Spirit',
      nepaliTitle: 'हिमाली धामी-झाँक्री र प्राकृतिक ज्ञान',
      tagline: 'Ancestral Healers • Sacred Drums & Ritual Chants • Surrender & Tree Connections',
      location: 'Himalayan Foothills & Sacred Groves',
      duration: 'Full Day / Evening Ceremony',
      image: '/explore-with-sakar/images/mountains/mountain-ridge.jpg',
      imageAlt: 'Himalayan shamanic practitioner drumming amidst sacred forest groves and mountain mist',
      summary: 'For centuries, Dhami-Jhankri practitioners have served as spiritual guides and custodians of ancestral wisdom, reminding us of our forgotten connection with the Earth.',
      paragraphs: [
        'Beyond Nepal’s famous temples and monasteries exists another spiritual world—one carried through mountains, forests, rivers and generations of ancestral wisdom.',
        'For centuries, Himalayan communities have preserved the tradition of Dhami-Jhankri (shamanic practitioners), who serve as spiritual guides, healers and custodians of ancient knowledge. Their practices are deeply connected with nature, ancestors, sacred rituals, chants, meditation and the belief that harmony between humans and the unseen world is essential for balance.',
        'Shamanism is not a single tradition but a collection of diverse indigenous practices passed through different communities of Nepal. Through rituals, drums, sacred objects and ancestral teachings, shamans continue to carry stories and wisdom that have travelled across generations.',
        'The Moment I Felt the Essence of Shamanic Wisdom: Sometimes, the deepest spiritual journeys do not begin with curiosity—they begin with surrender. When life places us in situations where our strength feels tested, a search for meaning begins.',
        'Sitting with the shaman, I understood that ancient traditions are about relationships with ourselves, nature, and ancestors. When I gently caressed my own hair, I felt a motherly warmth and self-care. When I embraced a tree, I felt a quiet connection with something ancient—touching a living memory of the Earth.',
      ],
      highlights: [
        'Understanding the indigenous Dhami-Jhankri shamanic healing lineage of Nepal',
        'Personal experience of tree-hugging, grounding rituals, and self-care awareness',
        'Experiencing the rhythmic resonance of shamanic drums, brass bells, and ancestral chants',
        'Reconnecting with the Earth as a living memory and sacred entity',
      ],
      keyQuote: {
        quote: 'Spirituality is not about escaping the world, but about learning to see it with a deeper awareness.',
        attribution: 'Himalayan Jhankri Wisdom',
      },
    },
    {
      id: 'beyond-names-ashram',
      chapterNumber: 'Chapter 04',
      title: 'Beyond Names: The Universal Force & Ashram',
      subtitle: 'Finding the Power That Connects Us All',
      nepaliTitle: 'नामभन्दा पर: चेतना र आश्रम',
      tagline: 'Universal Consciousness • Ashram Sanctuary • Looking Inward',
      location: 'Shivapuri Foothill Ashram & Quiet Retreats',
      duration: '1–2 Days Silent Retreat',
      image: '/explore-with-sakar/images/mountains/alpine-valley.jpg',
      imageAlt: 'Peaceful mountain ashram surrounded by pine forests and quiet meditation halls',
      summary: 'Different cultures call it God, the Universe, or consciousness. Away from daily noise, the ashram helps us discover the wisdom that already exists within.',
      paragraphs: [
        'I may not always define my beliefs through a particular name or form of God, but I deeply believe in a power that holds this universe together—a force that created the stars, the mountains, the rivers and the endless mystery of existence.',
        'Different cultures have given this power different names. Some call it God, some call it the Universe, some call it consciousness, energy or the divine. Perhaps the name is not the most important part. What matters is the feeling of connection, the understanding that we are part of something much greater than ourselves.',
        'For me, the ashram has become a place where I experience a deeper connection with myself and the greater force that surrounds us. It is not merely a physical space, but a sanctuary for reflection, learning and inner discovery.',
        'Away from the noise and distractions of everyday life, the ashram allows one to slow down, observe and reconnect with the deeper self. The teachers and masters become guiding forces—helping us discover the wisdom that already exists within us.',
      ],
      highlights: [
        'Experiencing non-dogmatic spiritual presence focused on universal consciousness',
        'Immersing in the silent reflection and contemplative rhythm of a Himalayan ashram',
        'Learning to look inward and cultivate self-compassion under master guidance',
        'Discovering the bridge between the universe outside and the universe within',
      ],
      keyQuote: {
        quote: 'Ultimately, the search for the power that created everything leads to the most important discovery: the connection between the universe outside and the universe within.',
        attribution: 'Ashram Contemplation',
      },
    },
    {
      id: 'cosmic-language-of-sound',
      chapterNumber: 'Chapter 05',
      title: 'The Cosmic Language of Sound: Nada Yoga',
      subtitle: 'Tibetan Singing Bowls, 7 Chakras, and Bija Mantras',
      nepaliTitle: 'ध्वनि योग: नाद र सात चक्र',
      tagline: 'Nada Vibration • 7-Metal Singing Bowls • 7 Chakras & Bija Mantras',
      location: 'Sound Sanctuary Studio (Kathmandu Valley)',
      duration: '2 Hours / Private Session',
      image: '/explore-with-sakar/images/spiritual/buddhist-stupa.jpg',
      imageAlt: 'Hand-hammered 7-metal Tibetan singing bowl on handwoven padma cushion',
      summary: 'Before there were words, there was vibration. Himalayan singing bowls act as a bridge between outer sound and inner awareness, balancing the 7 chakras.',
      paragraphs: [
        'Before there were words, there was vibration. Every movement in the universe carries a rhythm—the movement of planets, the flow of rivers, the breath of humans and the silent pulse of nature. Ancient yogic traditions describe this primordial vibration as Nada, the inner and cosmic sound that connects individual consciousness with the greater universe.',
        'The Himalayan singing bowl is considered by practitioners as a bridge between the outer world of sound and the inner world of awareness. When the bowl is gently played, it creates layers of tones and overtones that fill the space, inviting the mind to slow down and enter a state of deep listening.',
        'In the tradition of Nada Yoga, sound is seen as a pathway of meditation. The famous sacred sound Om (Aum) is traditionally regarded as a symbol of the universal vibration from which creation emerges.',
        'The Sacred Rhythm of Seven: The number seven appears in time, nature, and spirit—7 days, 7 musical notes (Sa Re Ga Ma Pa Dha Ni), 7 chakras, and the Saptarishi. Sound meditation tunes the human mind and body into this primordial rhythm.',
      ],
      highlights: [
        'Private sound session with hand-hammered 7-metal planetary singing bowls',
        'Acoustic resonance tuning across the 7 energy centers (Chakras)',
        'Understanding Nada Yoga, Bija Mantras, and the universal Om (Aum) frequency',
        'Experiencing deep mental relaxation and emotional recalibration',
      ],
      chakras: [
        { chakra: 'Muladhara', english: 'Root', mantra: 'LAM', attribute: 'Grounding & Stability' },
        { chakra: 'Svadhisthana', english: 'Sacral', mantra: 'VAM', attribute: 'Creativity & Flow' },
        { chakra: 'Manipura', english: 'Solar Plexus', mantra: 'RAM', attribute: 'Strength & Willpower' },
        { chakra: 'Anahata', english: 'Heart', mantra: 'YAM', attribute: 'Love & Compassion' },
        { chakra: 'Vishuddha', english: 'Throat', mantra: 'HAM', attribute: 'Expression & Truth' },
        { chakra: 'Ajna', english: 'Third Eye', mantra: 'OM', attribute: 'Awareness & Intuition' },
        { chakra: 'Sahasrara', english: 'Crown', mantra: 'Silence', attribute: 'Higher Connection' },
      ],
      keyQuote: {
        quote: 'Healing does not come from searching for something new, but from remembering the vibration, stillness and awareness that have always existed within us.',
        attribution: 'Nada Yoga Tradition',
      },
    },
    {
      id: 'essence-of-buddhism',
      chapterNumber: 'Chapter 06',
      title: 'The Essence of Buddhism: Awakening the Mind',
      subtitle: 'From Kopan and Swayambhunath to Namo Buddha & Lumbini',
      nepaliTitle: 'बुद्ध धर्मको सार: मनको जागरण',
      tagline: 'Kopan Monastery • Swayambhunath & Boudhanath • Namo Buddha & Lumbini',
      location: 'Kopan, Swayambhunath, Boudhanath & Namo Buddha',
      duration: '1–3 Days',
      image: '/explore-with-sakar/images/spiritual/buddhist-stupa.jpg',
      imageAlt: 'Prayer flags fluttering around the eyes of Boudhanath Stupa in dawn light',
      summary: 'Buddhism is not only about visiting monasteries or lighting lamps; it is a journey inward to understand the mind, cultivate compassion, and transform suffering into wisdom.',
      paragraphs: [
        'From the peaceful hills of Kopan Monastery to the ancient whispers of Swayambhunath, the sacred energy of Boudhanath, the meditation caves of Padmasambhava, the blessed land of Namo Buddha and the birthplace of Buddha in Lumbini—each destination tells a story, yet carries the same message.',
        'Buddhism is not only about visiting monasteries, lighting lamps or walking around stupas. It is a journey inward—a path to understand the mind, cultivate compassion, practice awareness and transform suffering into wisdom.',
        'The true pilgrimage is not measured by the distance we travel, but by the changes we create within ourselves. A sacred place becomes meaningful when it inspires us to become more peaceful, more conscious and more compassionate.',
        'Nepal is not just a destination for Buddhist heritage; it is an invitation to experience mindfulness, wisdom, and inner transformation.',
      ],
      highlights: [
        'Morning circumambulation (Kora) around Boudhanath and Swayambhunath stupas',
        'Mindful meditation and teachings at Kopan Monastery overlooking the valley',
        'Pilgrimage to Namo Buddha where the Bodhisattva offered his body to a starving tigress',
        'Learning the core Buddhist practice of transforming daily challenges into compassion',
      ],
      keyQuote: {
        quote: 'The true pilgrimage is not measured by the distance we travel, but by the changes we create within ourselves.',
        attribution: 'Buddhist Dharma Wisdom',
      },
    },
    {
      id: 'taudaha-and-pharping',
      chapterNumber: 'Chapter 07',
      title: 'Taudaha Lake & Pharping Meditation Caves',
      subtitle: 'Serpent Kingdoms & Coexistence of Faiths',
      nepaliTitle: 'टौदह र फर्पिङ: नागराज र असुर गुफा',
      tagline: 'Karkotak Naga Serpent Lake • Asura Cave • Shesh Narayan Coexistence',
      location: 'Taudaha Lake & Pharping Sacred Ridge',
      duration: 'Full Day',
      image: '/explore-with-sakar/images/trails/sacred-mountain-lake.jpg',
      imageAlt: 'Tranquil waters of Taudaha Lake surrounded by greenery and pine forests of Pharping',
      summary: 'From the mythical serpent kingdom of Taudaha to the Asura Cave of Guru Padmasambhava and Hindu Shesh Narayan, discover a landscape where legends live.',
      paragraphs: [
        'Just outside the busy rhythm of Kathmandu lies a place where mythology, nature and spirituality meet—Taudaha Lake.',
        'According to legend, when Manjushri Bodhisattva drained the ancient lake of Kathmandu to create human settlement, the serpent king Karkotak Naga found refuge in Taudaha. Even today, standing beside its peaceful waters, the lake resembles the map of Kathmandu Valley.',
        'During migration seasons, birds travel from Siberia to Taudaha, creating a peaceful wetland sanctuary.',
        'A short journey takes you to Pharping: home to Asura Cave, where Guru Padmasambhava (Guru Rinpoche) attained realization, and the revered Hindu Shesh Narayan Temple. Here, Vajrayana Buddhism and Hinduism walk together in seamless harmony.',
      ],
      highlights: [
        'Visiting Taudaha Lake, the mythical home of serpent king Karkotak Naga & Siberian migratory birds',
        'Entering Asura Cave where Guru Padmasambhava meditated and attained supreme realization',
        'Experiencing the harmonic coexistence of Hindu Shesh Narayan Temple and Buddhist monasteries',
        'Walking sacred pine forest trails to Dakshinkali',
      ],
      keyQuote: {
        quote: 'A Kathmandu where stories live in lakes, caves, forests and mountains—where Hindu and Buddhist traditions continue to walk together.',
        attribution: 'Pharping Sacred Tradition',
      },
    },
    {
      id: 'nepali-birth-chart-janma-kundali',
      chapterNumber: 'Chapter 08',
      title: 'Nepali Birth Chart (Janma Kundali / Jat)',
      subtitle: 'The Celestial Map Between Astrology and Life Journey',
      nepaliTitle: 'नेपाली जन्म कुण्डली र ज्योतिष ज्ञान',
      tagline: 'Jyotish Shastra • 12 Houses (Bhava) • Planets & Nakshatras Cosmic Bridge',
      location: 'Kathmandu Jyotish Vedic Ateliers',
      duration: '2 Hours (Private Reading)',
      image: '/explore-with-sakar/images/heritage/ancient-alleyways.jpg',
      imageAlt: 'Traditional hand-written Nepali Janma Kundali parchment scroll with planetary charts',
      summary: 'Preserved through Janma Kundali, Vedic astrology maps the 12 houses, 9 planets, and lunar Nakshatras to connect human life with cosmic rhythms.',
      paragraphs: [
        'The moment a child takes the first breath into this world, ancient traditions believe that the sky above carries a unique story.',
        'In Nepal, this story is preserved through Janma Kundali (जन्म कुण्डली)—a traditional birth chart created by studying the position of planets, stars and celestial movements at the exact time and place of birth.',
        'Based on the principles of Vedic astrology (Jyotish Shastra), the birth chart is divided into twelve houses (Bhava), nine planets (Graha), zodiac signs (Rashi) and lunar constellations (Nakshatra), creating a symbolic map of one’s journey.',
        'A Janma Kundali is not only a chart drawn on paper; it is a cultural bridge between humans and the cosmos—a reminder that every individual is born into a unique moment in the vast story of the universe.',
      ],
      highlights: [
        'Understanding the ancient tradition of Janma Kundali (handwritten birth scroll)',
        'Private consultation with traditional Jyotish Vedic astrologers in Kathmandu',
        'Exploring the 12 houses (Bhava), 9 planets (Graha), and Nakshatras',
        'Reflecting on your personal strengths and relationship with cosmic cycles',
      ],
      keyQuote: {
        quote: 'A Janma Kundali is a cultural bridge between humans and the cosmos—a reminder that every individual is born into a unique moment in the vast story of the universe.',
        attribution: 'Nepali Jyotish Shastra',
      },
    },
  ],
};
