export interface FAQItem {
  id: string;
  category: 'planning' | 'customization' | 'homestays' | 'health' | 'booking' | 'responsible';
  categoryLabel: string;
  question: string;
  answer: string;
}

export const FAQ_CATEGORIES = [
  { key: 'all', label: 'All Questions' },
  { key: 'planning', label: 'Trip Planning' },
  { key: 'customization', label: 'Bespoke Customization' },
  { key: 'homestays', label: 'Homestay Living' },
  { key: 'health', label: 'Health & Altitude' },
  { key: 'booking', label: 'Booking & Policies' },
  { key: 'responsible', label: 'Responsible Tourism' },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'planning',
    categoryLabel: 'Trip Planning',
    question: 'What is the best time of year to visit Nepal?',
    answer: 'Nepal has two prime travel windows: Autumn (October to early December) offers crystal-clear Himalayan skies, pleasant temperatures, and major cultural festivals like Dashain and Tihar. Spring (March to May) brings blooming rhododendron forests, warmer weather, and excellent trekking conditions. Winter (December to February) is quiet, crisp, and sunny at lower altitudes, while monsoon season (June to August) is lush, peaceful, and ideal for rainshadow regions like Mustang.',
  },
  {
    id: 'faq-2',
    category: 'planning',
    categoryLabel: 'Trip Planning',
    question: 'How do I obtain a Nepal tourist visa?',
    answer: 'Most international travelers can obtain an On-Arrival Tourist Visa at Tribhuvan International Airport (KTM) in Kathmandu or at designated land borders. You can also fill out the online pre-arrival visa application on the official Nepal Department of Immigration portal prior to flying. You will need a passport valid for at least 6 months, passport photos, and cash (USD or major currency) or card for the visa fee ($30 for 15 days, $50 for 30 days, $125 for 90 days).',
  },
  {
    id: 'faq-3',
    category: 'customization',
    categoryLabel: 'Bespoke Customization',
    question: 'Can journeys be tailored for solo travelers, couples, or families?',
    answer: 'Yes, absolutely. Over 80% of the journeys Sakar curates are custom-designed around specific travel dates, fitness levels, personal interests (e.g. photography, spiritual practices, culinary traditions, or birdwatching), and travel companions. Whether you are traveling solo seeking safe personal guidance or a multi-generational family needing relaxed pacing and comfortable vehicle logistics, we shape the itinerary specifically for you.',
  },
  {
    id: 'faq-4',
    category: 'customization',
    categoryLabel: 'Bespoke Customization',
    question: 'How does the consultation and custom journey design process work?',
    answer: 'Our process is simple and collaborative: 1) Initial Discovery via inquiry form or direct WhatsApp conversation; 2) Route Proposal where Sakar drafts a bespoke day-by-day plan with pacing and lodging ideas; 3) Fine-tuning where we adjust activities and preferences together; and 4) Seamless Delivery where Sakar and our local team handle every permit, vehicle, host arrangement, and briefing.',
  },
  {
    id: 'faq-5',
    category: 'homestays',
    categoryLabel: 'Homestay Living',
    question: 'What are accommodations and hygiene standards like in village homestays?',
    answer: 'All village homestays partnering with Explore With Sakar are carefully vetted. You will have a private, lockable guest room with fresh, clean linens, warm blankets, and pillows. Bathroom facilities in mountain homes are typically clean shared or private western-style or traditional squat toilets with running water and solar/gas heated water. Meals are prepared fresh in front of you using home-grown organic garden produce and boiled/filtered drinking water.',
  },
  {
    id: 'faq-6',
    category: 'homestays',
    categoryLabel: 'Homestay Living',
    question: 'I have dietary restrictions (vegetarian, vegan, gluten-free). Can homestays accommodate me?',
    answer: 'Yes! Traditional Nepali cuisine is naturally vegetarian-friendly. The staple meal (Dal Bhat) is made with rice, lentil soup, spiced vegetable curries, and fresh greens, making it wholesome and easily adapted to vegan or gluten-free diets. Sakar communicates all dietary needs and allergies directly to your host families beforehand.',
  },
  {
    id: 'faq-7',
    category: 'health',
    categoryLabel: 'Health & Altitude',
    question: 'Do I need high physical fitness or trekking experience?',
    answer: 'Not for our cultural, spiritual, and village heritage journeys. Many experiences involve relaxed walking along medieval paved courtyards and gentle countryside footpaths. For our mountain walking and trekking journeys, a moderate level of general cardiovascular fitness (being able to walk 4–6 hours with a daypack at an unhurried pace) is recommended. We always design generous acclimatization days and never rush on trails.',
  },
  {
    id: 'faq-8',
    category: 'health',
    categoryLabel: 'Health & Altitude',
    question: 'What precautions are taken for high altitude and travel safety?',
    answer: 'Safety is our highest priority. Sakar and our mountain leads are trained in wilderness first aid and altitude symptom monitoring. We design itineraries with gradual elevation gain, maintain emergency medical contact protocols, and require comprehensive travel insurance that includes emergency medical evacuation for all high-elevation journeys.',
  },
  {
    id: 'faq-9',
    category: 'booking',
    categoryLabel: 'Booking & Policies',
    question: 'How are bookings confirmed and what are the payment terms?',
    answer: 'Once your custom itinerary is agreed upon, a 25% deposit secures your dates, private vehicle bookings, host family reservations, and permits. The remaining balance can be settled upon arrival in Kathmandu via bank wire or cash. We provide transparent itemized invoices with zero hidden service charges.',
  },
  {
    id: 'faq-10',
    category: 'booking',
    categoryLabel: 'Booking & Policies',
    question: 'What is your cancellation and date change policy?',
    answer: 'We understand that international travel plans can shift. Date adjustments can be made with reasonable advance notice without penalty subject to lodging availability. If you need to cancel due to unforeseen medical emergencies, deposits are refundable minus any non-recoverable domestic flight or government permit fees.',
  },
  {
    id: 'faq-11',
    category: 'responsible',
    categoryLabel: 'Responsible Tourism',
    question: 'How does traveling with Explore With Sakar directly benefit local communities?',
    answer: 'We practice genuine community-based slow tourism: 100% of homestay hosting payments go directly into the hands of local host families and village mothers; our porters and drivers receive above-standard fair wages with full insurance; and artisan workshop fees directly sustain traditional Newari woodcarvers, thangka masters, and bronze sculptors.',
  },
  {
    id: 'faq-12',
    category: 'responsible',
    categoryLabel: 'Responsible Tourism',
    question: 'What environmental ethics do you practice on trails and in villages?',
    answer: 'We follow strict Leave No Trace principles. We discourage single-use plastic water bottles by providing safe filtered water refills, carry all non-biodegradable waste out of protected wilderness areas, respect local wildlife habitats, and uphold sacred cultural traditions with humility and quiet respect.',
  },
];
