export interface StorySection {
  heading: string;
  paragraphs: string[];
}

export interface BeyondExperience {
  id: string;
  pageNumber: string; // e.g. "Page 01", "Page 02", "Page 03", "Page 04"
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
      'If you want to understand Kathmandu, do not start with a monument. Start with a morning walk. Start where the city wakes up in the narrow alleys of Ason.',
    experienceOverview:
      'As the first rays of sunlight enter between old brick houses, the smell of spices, incense, fresh vegetables, and traditional sweets fills the air. Ason is not just a marketplace; it is a living memory standing along ancient trade routes connecting the southern plains of India with the Tibetan plateau. As you continue toward Basantapur, the noise of the market meets the silence of history: ancient palace walls appear, carved windows look down, and history breathes in the present.',
    keyQuote: {
      quote:
        'Kathmandu reminds the world that the future of cities is not only about technology, but also about preserving communities where people live, work, and care for each other.',
      attribution: 'Heritage Conservationist Anil Chitrakar',
    },
    highlights: [
      'Dawn walk through spice-scented Ason alleys as wooden shutters open to morning devotion',
      'Discovering traditional Newar settlements designed around human connection and sustainable community',
      'Uncovering the Licchavi and Malla era rivalries that transformed brick, stone, and timber into artistic poetry',
      'Entering Basantapur where kings were crowned and royal palace walls grew alongside the everyday life of the people',
    ],
    ctaSubject: 'Go Beyond the Map: Kathmandu Durbar Square (Page 01)',
    storySections: [
      {
        heading: 'Start With a Morning Walk in Ason',
        paragraphs: [
          'If you want to understand Kathmandu, do not start with a monument. Start with a morning walk. Start where the city wakes up in the narrow alleys of Ason.',
          'As the first rays of sunlight enter between old brick houses, the smell of spices, incense, fresh vegetables, and traditional sweets fills the air. Shopkeepers open wooden shutters that have witnessed generations of customers. People rush through lanes that appear too narrow for a modern city, yet somehow carry the rhythm of thousands of years.',
          'This is not just a marketplace.',
          'This is a memory.',
          'For centuries, Ason remained one of the beating hearts of Kathmandu, standing along ancient trade routes that connected the southern plains of India with the Tibetan plateau. Traders, pilgrims, monks, and travellers passed through these streets carrying goods, stories, beliefs, and cultures.',
          'Perhaps that is why Kathmandu has always felt different. It was never a city that belonged to only one culture. It was a meeting point: a place where northern mountains met southern civilizations, where Hindu temples stood beside Buddhist monasteries, where merchants discussed business while bells from nearby shrines reminded them of something beyond wealth.',
        ],
      },
      {
        heading: 'A City Designed for Human Connection',
        paragraphs: [
          'One of Kathmandu’s greatest secrets is hidden not in its palaces, but in its neighbourhoods.',
          'The old settlements were designed around people. A family could live in a traditional courtyard house, walk a few steps to a temple, visit a nearby market, meet neighbours in community spaces, and participate in festivals that connected generations.',
          'The city was not separated into residential areas, commercial areas, and religious zones like many modern cities. Life happened together. A temple was not only a place of worship. A courtyard was not only empty space. A marketplace was not only for buying and selling. Everything had a purpose.',
          'The traditional Newar settlements of the valley show a remarkable understanding of community living, where architecture, social relationships, culture, and daily activities were woven together.',
          'As the world discusses climate change and the importance of sustainable urban living, the traditional close-knit communities of Kathmandu Valley offer a valuable lesson. For centuries, these settlements were designed around people—with homes, markets, temples, schools, and social spaces within walking distance.',
          'Heritage conservationist Anil Chitrakar, often regarded as a walking encyclopedia of Nepal’s heritage, highlights how these traditional communities represent a way of living where culture, sustainability, and human connection existed together.',
          'Kathmandu reminds the world that the future of cities is not only about technology, but also about preserving communities where people live, work, and care for each other.',
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
    tagline: 'A City That Slowed Down • Living Museum • Pottery Square & Juju Dhau',
    location: 'Bhaktapur Medieval City (Pottery Square, Taumadhi & Durbar Square)',
    duration: 'Full Day (Unhurried)',
    groupSize: 'Private / 1–6 Travelers',
    image: '/images/beyond-the-map/stone-mysteries.jpg',
    imageAlt: 'Ancient brick alleys and multi-tiered pagoda temples of Bhaktapur Durbar Square',
    promise:
      'Bhaktapur is not a place where you simply visit the past. It is a place where the past still welcomes you. There are cities that move forward by leaving the past behind. Bhaktapur chose a different path.',
    experienceOverview:
      'The first feeling you get when you enter Bhaktapur is not excitement. It is calm. The sound of footsteps on old brick pavements replaces the noise of busy roads. The smell of freshly prepared Newari food mixes with the fragrance of incense. An artisan sits quietly working with his hands, continuing a skill that may have travelled through generations. You suddenly realize this is not a city where history is displayed. This is a city where history is lived—a living museum.',
    keyQuote: {
      quote:
        'A city does not become timeless because it has old buildings. A city becomes timeless when people continue to give those buildings meaning.',
      attribution: 'Sakar, Local Host & Storyteller',
    },
    highlights: [
      'Experiencing the profound calm and timeless rhythm of old brick lanes without the noise of busy roads',
      'Discovering a human-centred city where temples, courtyards, and public water spouts weave relationships',
      'Tasting the sweetness of cultural abundance through Juju Dhau, the King of Yogurt prepared in clay pots',
      'Watching master potters shape spinning clay at Pottery Square with generational patience',
    ],
    ctaSubject: 'Go Beyond the Map: Bhaktapur Durbar Square (Page 02)',
    storySections: [
      {
        heading: 'A City That Chose to Slow Down',
        paragraphs: [
          'Bhaktapur is not a place where you simply visit the past. It is a place where the past still welcomes you. There are cities that move forward by leaving the past behind. Bhaktapur chose a different path.',
          'It slowed down. It protected its memories. It allowed its old brick lanes, wooden windows, courtyards and traditions to continue telling stories in a world that is changing faster than ever.',
          'The first feeling you get when you enter Bhaktapur is not excitement. It is calm. The sound of footsteps on old brick pavements replaces the noise of busy roads. The smell of freshly prepared Newari food mixes with the fragrance of incense. An artisan sits quietly working with his hands, continuing a skill that may have travelled through generations. You suddenly realize this is not a city where history is displayed. This is a city where history is lived so it is known as a living museum.',
        ],
      },
      {
        heading: 'A City Built Around People',
        paragraphs: [
          'Before modern ideas of sustainable cities became popular, Bhaktapur had already created a human-centred way of living. The city was not divided into places where people lived, worked, worshipped, and gathered separately. Everything existed together.',
          'A temple was not only a religious space. A courtyard was not only architecture. A public water source was not only infrastructure. They were places where relationships were created.',
          'Neighbours met, festivals were organized, knowledge was shared and communities looked after each other. This is perhaps why Bhaktapur feels different from many historic cities. Its heritage is not only in the monuments. It is in the lifestyle that surrounds them.',
        ],
      },
      {
        heading: 'The Taste of Abundance',
        paragraphs: [
          'Bhaktapur’s culture also tells a story of a community connected with its land. The fertile valley provided crops, and those crops became part of celebrations, rituals, and social life. Traditional foods, festivals and drinks like Ayla became expressions of sharing and togetherness.',
          'There is a beautiful thought hidden in such traditions: A community that has enough to preserve, create and celebrate has moved beyond survival. It has created culture.',
        ],
      },
      {
        heading: 'Walking Through Bhaktapur Durbar Square',
        paragraphs: [
          'When you finally arrive at Bhaktapur Durbar Square, you do not feel like you have reached a monument. You feel like you have entered a conversation with the past.',
          'The palace windows silently watch over the square. The temples rise above the city like guardians. The statues stand as if they are waiting for the next generation to hear their stories. The Golden Gate, the Palace of Fifty-Five Windows, and the temples around the square are not just examples of architecture—they are reminders of a civilization that believed beauty was an essential part of life.',
        ],
      },
      {
        heading: 'Bhaktapur’s Greatest Treasure & The Hands That Keep It Alive',
        paragraphs: [
          'The greatest treasure of Bhaktapur is not only what was built centuries ago. It is what continues today. A potter shaping clay. A family following traditions. A festival bringing an entire neighbourhood together. A child growing up beside a temple that has watched hundreds of generations.',
          'Bhaktapur teaches us something important: A city does not become timeless because it has old buildings. A city becomes timeless when people continue to give those buildings meaning.',
          'Beyond the grand temples and royal courtyards, the true heartbeat of Bhaktapur can be found in the hands of its people. At Pottery Square, the rhythm of the spinning wheel has continued for generations. As the potter’s wheel turns slowly, ordinary clay transforms into lamps, vessels, and everyday objects. It is not just a craft; it is a conversation between the earth and human hands. The potters of Bhaktapur remind us that heritage is not only found in palaces. Sometimes, it lives in the simplest objects created for daily life.',
          'And then there is Juju Dhau—the “King of Yogurt” of Bhaktapur. Prepared through traditional methods using buffalo milk and clay pots, Juju Dhau is more than a sweet delicacy. It represents patience, skill and a culture where food carries identity. For generations, it has been part of festivals, celebrations, and hospitality, offering visitors a taste of Bhaktapur’s warmth.',
          'Perhaps this is what makes Bhaktapur different. The city’s heritage is not only carved into wood and stone. It is also shaped in clay and preserved in taste. A temple tells the story of kings. A potter tells the story of ordinary people. A bowl of Juju Dhau tells the story of a community that knows how to preserve tradition.',
        ],
      },
    ],
  },
  {
    id: 'patan-durbar-square',
    pageNumber: 'Page 03',
    title: 'Patan Durbar Square',
    subtitle: 'The City of Hidden Courtyards and Living Craft',
    nepaliTitle: 'पाटन दरबार क्षेत्र (ललितपुर)',
    tagline: 'City of Makers • Krishna Mandir • Secret Bahals & Ancient Water Systems',
    location: 'Patan / Lalitpur (Old Courtyards, Bahals & Durbar Square)',
    duration: 'Full Day (Unhurried)',
    groupSize: 'Private / 1–6 Travelers',
    image: '/images/beyond-the-map/artisan-path.jpg',
    imageAlt: 'Ornate wood carvings, golden temple spires, and quiet inner bahals of Patan',
    promise:
      'There is something different about Patan. Kathmandu can feel restless. Bhaktapur feels as though it has paused to remember another time. But Patan feels busy creating quietly, patiently, almost unnoticed.',
    experienceOverview:
      'Walk away from the main road and the city begins to reveal itself. A small doorway opens into a courtyard. A shrine appears between two old houses. Somewhere nearby, metal is being hammered into shape. Patan is a city of makers. For generations, artisans here have worked with metal, wood, stone and clay. The techniques are ancient, but the work is not simply preserved behind glass. It is still being done. That is what makes Patan different.',
    keyQuote: {
      quote:
        'Patan is not simply a city where ancient things remain. It is a city where ancient knowledge still has work to do.',
      attribution: 'Patan Master Craftsman Philosophy',
    },
    highlights: [
      'Walking past the main square into secret residential bahals, Mahaboudha, and Rudra Varna Mahavihar',
      'Witnessing where Hinduism and Buddhism meet seamlessly in temples, courtyards, and sacred art',
      'Discovering sophisticated ancient stone water systems at Manga Hiti, Kumbheshwar, and Tusha Hiti',
      'Visiting the living workshops of master metalworkers, woodcarvers, and bronze sculptors',
    ],
    ctaSubject: 'Go Beyond the Map: Patan Durbar Square (Page 03)',
    storySections: [
      {
        heading: 'A City Built by Makers',
        paragraphs: [
          'There is something different about Patan. Kathmandu can feel restless. Bhaktapur feels as though it has paused to remember another time. But Patan feels busy creating quietly, patiently, almost unnoticed.',
          'Walk away from the main road and the city begins to reveal itself. A small doorway opens into a courtyard. A shrine appears between two old houses. Somewhere nearby, metal is being hammered into shape. A craftsman sits with the concentration of someone who has done the same work for decades.',
          'Patan is often introduced through its temples and Durbar Square. But if you only look at its monuments, you miss what makes the city special. Patan is a city of makers.',
          'For generations, artisans here have worked with metal, wood, stone and clay. Walk through the older neighbourhoods and you may hear the unmistakable rhythm of a hammer striking metal. The techniques are ancient, but the work is not simply preserved behind glass. It is still being done. That is what makes Patan different.',
          'In Kathmandu, you can encounter history everywhere. In Bhaktapur, you can feel history surrounding everyday life. In Patan, you can sometimes watch history being made by hand.',
        ],
      },
      {
        heading: 'Patan Durbar Square: More Than a Royal Palace',
        paragraphs: [
          'Patan Durbar Square was once the royal centre of the Malla kingdom, but standing there today, it is difficult to think of it simply as a palace complex.',
          'The square feels more like an open museum of Newar civilization except that the museum is still alive.',
          'The Krishna Mandir, with its distinctive stone architecture, stands at the heart of the square. The courtyards lead you deeper into the old palace complex, where carved windows, bronze details and traditional architectural forms reveal the extraordinary skill of the people who built them.',
          'And then there are places such as Sundari Chowk and Tusha Hiti, where water, architecture and craftsmanship come together. The remarkable thing is not simply that these structures survived. It is that their ideas still belong to the city.',
        ],
      },
      {
        heading: 'Where Hinduism and Buddhism Meet',
        paragraphs: [
          'Perhaps nowhere is Patan’s character clearer than in its religious architecture. You do not have to travel far to move between Hindu temples and Buddhist monasteries. A few steps can take you from one tradition into another.',
          'The Golden Temple, or Hiranya Varna Mahavihar, leads you into one of Patan’s historic Buddhist courtyards. Elsewhere, temples and bahals continue to exist within the same urban fabric.',
          'This is not simply a story of two religions existing side by side. For centuries, the traditions have influenced one another, shared artistic traditions and become part of the same community life.',
          'Patan teaches you that heritage does not always have neat boundaries. Sometimes, it grows through exchange.',
        ],
      },
      {
        heading: 'Leave the Main Square',
        paragraphs: [
          'This is where I would encourage anyone visiting Patan to do something simple: Leave the main square.',
          'You may find Mahaboudha, an extraordinary terracotta Buddhist monument covered with countless Buddha images. You may discover Rudra Varna Mahavihar, with its remarkable collection of religious art.',
          'You may come across an old bahal where people are still gathering, a small shrine tucked between houses, or a traditional water spout that once formed part of the city’s sophisticated water system.',
          'These are the moments when Patan becomes interesting. Because the city does not always announce its treasures. You have to look for them.',
        ],
      },
      {
        heading: 'A City That Understands Water',
        paragraphs: [
          'Patan’s old water systems reveal another side of its intelligence. Places such as Manga Hiti and Kumbheshwar remind us that these cities were not built only around temples and palaces. They were designed around life.',
          'Water had to reach communities. People needed gathering places. Religious spaces, homes, courtyards, markets and public infrastructure had to function together. The old city was not a collection of beautiful buildings. It was an urban system.',
          'And perhaps that is one of the most interesting things to discover while walking through Patan: behind the beauty is a practical understanding of how a community survives.',
        ],
      },
      {
        heading: 'The Real Museum Is the Workshop',
        paragraphs: [
          'Eventually, you begin to understand something: Patan’s greatest museum may not be a museum at all. It may be the workshop of an artisan.',
          'A piece of metal slowly becomes a deity. A block of wood becomes a window. Clay becomes an architectural detail. A traditional technique passes quietly from one generation to another.',
          'The city’s heritage survives because someone still knows how to make it. That is why Patan feels different from Kathmandu and Bhaktapur. Kathmandu tells you about a city shaped by power, trade and constant change. Bhaktapur invites you into a city that seems determined to remember. Patan introduces you to the people who know how to create.',
          'And perhaps that is the best way to explore Patan—not by rushing from one monument to another, but by slowing down enough to notice the hands, sounds, courtyards and traditions that continue to give the city its identity.',
          'Patan is not simply a city where ancient things remain. It is a city where ancient knowledge still has work to do.',
        ],
      },
    ],
  },
  {
    id: 'pokhara-laid-back-city',
    pageNumber: 'Page 04',
    title: 'Pokhara',
    subtitle: 'The Laid-Back City',
    nepaliTitle: 'पोखरा: ताल र शान्तिको शहर',
    tagline: 'Phewa Morning Reflections • Active Landscapes • Sarangkot Sunrise & Mountain Villages',
    location: 'Pokhara Valley (Phewa Lake, Old Bazaar, Caves & Sarangkot)',
    duration: '2–3 Days (Unhurried Pace)',
    groupSize: 'Private / 1–6 Travelers',
    image: '/images/beyond-the-map/secret-sanctuary.jpg',
    imageAlt: 'Wooden boats on serene Phewa Lake with sacred Machhapuchhre reflecting in calm water',
    promise:
      'Some places make you want to see everything. Pokhara makes you want to stay. I think that is the first thing you should know about Pokhara.',
    experienceOverview:
      'You may arrive thinking you are here to see the Himalayas. You may have seen photographs of Phewa Lake, a wooden boat, and Machhapuchhre rising behind the water. But photographs cannot really explain Pokhara. Because Pokhara is not only about what you see; it is about how the place makes you feel. The morning light on the lake. The sound of paddles touching the water. A distant temple bell. The mountains appearing between buildings. And suddenly, without realizing it, you stop rushing. Pokhara teaches you to slow down. Gives you that laid-back vibe.',
    keyQuote: {
      quote:
        'The mountains you came to see are not simply scenery. They are home. You stop asking, "What can I see?" You begin asking, "Who lives here, and what can I learn?"',
      attribution: 'Sakar, Traveling with Meaning',
    },
    highlights: [
      'Early morning rowboat on Phewa Lake before Lakeside wakes up, watching Machhapuchhre reflect in stillness',
      'Leaving tourist strips to explore older neighborhoods, historic trade crossroads, and Gurung & Thakali cultures',
      'Exploring active geological wonders: the deep underground Seti gorge, Davis Falls, and sacred Gupteshwor Cave',
      'Sunrise hike to Sarangkot where golden light touches the Annapurnas, followed by quiet contemplation at World Peace Pagoda',
      'Staying with local mountain village families beyond Lakeside to share homecooked food and heartfelt stories',
    ],
    ctaSubject: 'Go Beyond the Map: Pokhara Laid-Back City (Page 04)',
    storySections: [
      {
        heading: 'Start With the Lake',
        paragraphs: [
          'Some places make you want to see everything. Pokhara makes you want to stay. I think that is the first thing you should know about Pokhara.',
          'You may arrive thinking you are here to see the Himalayas. You may have seen the photographs already of Phewa Lake, a wooden boat, Machhapuchhre rising behind the water. But photographs cannot really explain Pokhara. Because Pokhara is not only about what you see. It is about how the place makes you feel.',
          'The morning light on the lake. The sound of paddles touching the water. A distant temple bell. The mountains appear between buildings. A small café opened its doors. The smell of rain on the hills. And suddenly, without realizing it, you stop rushing. Pokhara teaches you to slow down. Gives you that laid back vibes.',
          'I would not begin by taking you from one attraction to another. I would begin at Phewa Lake. Early in the morning, before Lakeside becomes busy, the lake has a completely different personality.',
          'Take a boat. Don’t rush to the other side. Just sit. Watch the hills reflected in the water. Look towards the mountains. If the sky is clear, Machhapuchhre appears almost impossibly close. And somewhere in the middle of the lake is Tal Barahi Temple, connecting the landscape with the spiritual life of the city.',
          'This is one of the things I love about Pokhara: Nature and spirituality don’t feel separated here. They are part of the same landscape.',
        ],
      },
      {
        heading: 'Then Let Me Show You Another Pokhara',
        paragraphs: [
          'Most visitors stay around Lakeside. And I understand why. But if you want to know Pokhara, I would ask you to leave it. Go towards the older parts of the city. Walk through local neighbourhoods. Find the places where tourism becomes less visible and everyday life becomes more visible.',
          'Pokhara has been shaped by movement for generations. It was historically connected to trade routes between India and Tibet, and the wider area carries the traditions of communities including Gurung, Magar and Thakali people. This is the Pokhara I want you to notice. Not just the hotels. Not just the adventure activities. The people who make the place what it is.',
        ],
      },
      {
        heading: 'A River That Disappears',
        paragraphs: [
          'Then there is the Seti. You might not expect one of Pokhara’s most fascinating experiences to be looking down into a river gorge from a bridge. But the Seti is unusual.',
          'In places, the river seems to disappear beneath the city, carving itself through a remarkably deep gorge. Stand above it and look down. The city suddenly feels different. You realize that beneath the peaceful streets, cafés and houses is a landscape shaped by powerful geological forces. Pokhara has always had another world beneath the one we see. And nowhere is that more obvious than here.',
        ],
      },
      {
        heading: 'Go Underground & When the Water Falls, the City Changes',
        paragraphs: [
          'That is why I like taking people to the caves. At Gupteshwor Mahadev Cave, you enter the earth itself. The light disappears. The sound changes. The walls close around you. And somewhere inside the darkness is a sacred space dedicated to Shiva.',
          'The cave is closely associated with the underground flow connected to Davis Falls, making the relationship between Pokhara’s water, geology and spiritual traditions particularly fascinating. Nearby, Davis Falls throws water into the landscape before it disappears underground. And suddenly the postcard version of Pokhara feels incomplete. Because there is a Pokhara above the ground, and a world underneath.',
          'Stand beside Davis Falls after rain and you understand why nature has such a strong presence here. The water is not decorative. It is powerful. It cuts, disappears and continues its journey through the landscape.',
          'This is why I would never describe Pokhara simply as a city with beautiful scenery. The landscape here is active: the mountains shape the horizon, the lakes shape the rhythm, the rivers shape the ground, the caves reveal what lies underneath, and the people have built their lives around all of it.',
        ],
      },
      {
        heading: 'Take the Road Up & And Then There Is the Sky',
        paragraphs: [
          'Then, one morning, I would take you to Sarangkot. Not because it is simply another viewpoint, but because you should see Pokhara wake up. Leave before sunrise. The city is still quiet. The roads are darker. And gradually, as you climb, the horizon begins to change. Then the first light touches the mountains. Machhapuchhre appears. The Annapurna range slowly emerges. And for a few moments, nobody needs to say anything. That is the beauty of Sarangkot. You don’t need to explain a sunrise like that. You just need to be there.',
          'Sarangkot is also part of Pokhara’s adventure culture, including paragliding, which allows visitors to experience the valley from an entirely different perspective.',
          'And then there is the sky: Pokhara can make you contemplative in the morning and adventurous by afternoon. You can be sitting quietly beside the lake one moment and flying above it the next. Paragliding, trekking, mountain biking, boating, kayaking and other outdoor activities have become part of the city’s identity.',
          'But adventure in Pokhara does not have to mean chasing adrenaline. Sometimes adventure is simply walking somewhere you have never been. Taking a different road. Following a village trail. Sitting with a local family. Trying food you cannot pronounce. Listening to someone’s story. For me, that is the kind of adventure that stays with you.',
        ],
      },
      {
        heading: 'Find the Quiet Side & Pokhara Has a Spiritual Side',
        paragraphs: [
          'Then I would take you towards the World Peace Pagoda. The road, the forest and the climb gradually remove you from the noise of the city. And when you finally reach the top, Pokhara opens below you: Phewa Lake, the valley, the hills, the mountains, and the white stupa standing quietly above it all.',
          'The World Peace Pagoda sits on a hill on the southern side of Phewa Lake and offers expansive views across the valley and towards the Annapurna range. But again, I would not tell you simply to “visit the viewpoint.” I would tell you to sit there. Stay for a while. Sometimes a place becomes meaningful only when you stop trying to photograph it.',
          'Perhaps this is why Pokhara attracts more than trekkers and adventure seekers. There is something about the geography that invites reflection: temples, monasteries, the lake, the mountains, the caves, the forest, the silence. You can spend a morning exploring and an afternoon doing absolutely nothing. And both can feel equally worthwhile. Pokhara’s cultural landscape also extends into Buddhist monasteries and Tibetan settlements around the valley, adding another layer to its identity.',
        ],
      },
      {
        heading: 'Don’t Forget the Villages: Who Lives Here, and What Can I Learn?',
        paragraphs: [
          'This is something I would especially want you to experience: Don’t let Pokhara become only Lakeside. Go beyond it.',
          'Meet the communities living on the hills. Stay in a homestay if you can. Eat what the family eats. Wake up without an alarm. Listen to the stories.',
          'Because the mountains you came to see are not simply scenery. They are home. And when you understand that, travelling through Nepal begins to feel different.',
          'You stop asking, “What can I see?”',
          'You begin asking: “Who lives here, and what can I learn?”',
        ],
      },
    ],
  },
  {
    id: 'chitwan-national-park',
    pageNumber: 'Page 05',
    title: 'Chitwan National Park',
    subtitle: 'Sauraha: Where the Wild Heart of Nepal Beats',
    nepaliTitle: 'चितवन राष्ट्रिय निकुञ्ज (सौरहा)',
    tagline: 'Terai Lowlands • Rapti River Canoe • Indigenous Tharu Forest Guardians',
    location: 'Sauraha & Chitwan National Park',
    duration: '2–3 Days (Jungle & Culture)',
    groupSize: 'Private / 1–6 Travelers',
    image: '/explore-with-sakar/images/trails/river-gorge.jpg',
    imageAlt: 'Peaceful Rapti river, jungle wilderness, and indigenous Tharu villages of Chitwan',
    promise:
      'Some places are not just visited; they are experienced. Chitwan is one of those rare destinations where nature, adventure, and culture come together in a way that stays with you long after you leave.',
    experienceOverview:
      'Imagine waking up in the peaceful surroundings of Sauraha, stepping outside and seeing a rhino calmly walking through the streets nearby, or watching elephants move through the village paths. Here, the boundary between the wilderness and human life feels beautifully connected. Gliding in a traditional canoe on the Rapti River, walking through ancient forests, and learning from the indigenous Tharu community reveals a side of Nepal where conservation protects the profound relationship between humans and nature.',
    keyQuote: {
      quote:
        'A journey through Chitwan is a reminder that conservation is not only about protecting animals. It is about protecting the relationship between humans and nature.',
      attribution: 'Sakar, Wild Heart of Nepal',
    },
    highlights: [
      'Gliding quietly in a traditional wooden dugout canoe on the calm waters of the Rapti River alongside gharials and mugger crocodiles',
      'Experiencing a guided jungle walking safari to observe one-horned rhinos, sloth bears, deer, and rich birdlife in their natural habitat',
      'Connecting deeply with the indigenous Tharu community, learning their ancestral forest wisdom, traditional dances, and resilience',
      'Discovering how human communities and wilderness coexist in harmony along the borders of Nepal’s first National Park',
    ],
    ctaSubject: 'Go Beyond the Map: Chitwan National Park (Page 05)',
    storySections: [
      {
        heading: 'Sauraha: Where the Boundary Between Wild and Human Life Dissolves',
        paragraphs: [
          'Some places are not just visited; they are experienced.',
          'Chitwan is one of those rare destinations where nature, adventure and culture come together in a way that stays with you long after you leave.',
          'Imagine waking up in the peaceful surroundings of Sauraha, stepping outside and seeing a rhino calmly walking through the streets nearby, or watching elephants move through the village paths. Here, the boundary between the wilderness and human life feels beautifully connected.',
        ],
      },
      {
        heading: 'Gliding on the Rapti & Entering the Forest',
        paragraphs: [
          'The adventure begins on the waters of the Rapti River. Sitting quietly in a traditional canoe, gliding through the calm river, you observe crocodiles and the ancient-looking gharials resting along the banks. Every turn of the river brings a sense of curiosity because the jungle is alive around you.',
          'Then comes the moment that every nature lover remembers: entering Chitwan National Park.',
          'A jungle walk is not just a walk. It is an encounter with the unknown.',
          'Every sound from the forest makes you pause. A movement in the bushes creates excitement. The possibility of seeing a tiger, a sloth bear, deer or other wildlife creates an unforgettable connection with the wild. It is not about finding animals only; it is about understanding the rhythm of a forest that has existed for thousands of years.',
        ],
      },
      {
        heading: 'The Indigenous Tharu Community & Conservation',
        paragraphs: [
          'But Chitwan is not only about wildlife. It is also about the people who have lived alongside this ecosystem for generations.',
          'The Tharu community, one of the indigenous communities of the Terai region, has a deep relationship with the land, forests and rivers. Their traditional dances, music and stories showcase a culture shaped by nature and resilience. Through their performances, visitors get a glimpse of how communities have adapted, survived and coexisted with the wildlife around them.',
          'A journey through Chitwan is a reminder that conservation is not only about protecting animals. It is about protecting the relationship between humans and nature.',
          'From thrilling jungle adventures to peaceful village experiences, Chitwan offers a different side of Nepal, a place where the wild is not separated from life, but integrated into it. For those seeking adventure, connection and an authentic Nepalese experience, Chitwan is not just a destination. It is a story waiting to be lived.',
        ],
      },
    ],
  },
];
