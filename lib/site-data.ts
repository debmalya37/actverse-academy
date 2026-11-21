export const PHONE = "9004316169";
export const EMAIL = "info.actverse@gmail.com";
export const WHATSAPP_URL = "https://wa.me/919004316169?text=" + encodeURIComponent("Hi Actverse! I'd like to know about your courses.");
export const PAYMENT_METHODS = ["UPI", "Cash", "Bank Transfer"];
export const REFUND_POLICY = "Fees once paid are non-refundable and non-transferable under any circumstances.";
export const HOUSING_START = 15000;
export const formatFee = (fee: number | null) => fee === null ? "On request" : `₹${fee.toLocaleString("en-IN")}`;
export type Course = { slug: string; name: string; duration: string; fee: number | null; category: "Acting" | "Workshops" | "Dance"; blurb: string };
export const courses: Course[] = [
  { slug: "one-month-foundation", name: "One-Month Foundation Program", duration: "1 month", fee: 50000, category: "Acting", blurb: "Take your first step into acting with a focused foundation program." },
  { slug: "online-foundation", name: "Online One-Month Foundation Program", duration: "1 month", fee: 30000, category: "Acting", blurb: "Begin your acting journey through our online foundation program." },
  { slug: "foundation-certificate", name: "Foundation Certificate in Acting", duration: "3 months", fee: 120000, category: "Acting", blurb: "Give your talent time to grow with a three-month foundation in acting." },
  { slug: "professional-diploma", name: "Professional Diploma in Acting", duration: "6 months", fee: 200000, category: "Acting", blurb: "Commit to your craft with a six-month professional acting program." },
  { slug: "advance-screen-diploma", name: "Advance Diploma in Screen Acting", duration: "1 year", fee: 500000, category: "Acting", blurb: "A year-long path for aspiring performers pursuing screen acting." },
  { slug: "weekend-workshop", name: "Weekend Acting Workshop", duration: "1 month", fee: 30000, category: "Workshops", blurb: "Make space for acting with a month of weekend training." },
  { slug: "one-to-one-workshop", name: "One to One Workshop", duration: "On request", fee: 120000, category: "Workshops", blurb: "Enquire about individual training and available schedules." },
  { slug: "corporate-workshop", name: "Corporate Workshop", duration: "On request", fee: null, category: "Workshops", blurb: "Speak to our team about a workshop for your organisation." },
  { slug: "dance-special-training", name: "Pick Any Dance Form — Special Training", duration: "1 month", fee: 20000, category: "Dance", blurb: "Choose a dance form and explore rhythm, movement and expression." },
];
export const danceForms = ["Contemporary", "Hip-hop", "Western", "Bollywood", "Kathak", "Jazz", "Semiclassical", "Aerobics", "Yoga", "Garba"];
export const faqs = [
  { q: "What are the course fees?", a: "Full-payment fees start at ₹20,000 for one-month dance training. Acting foundation programs start at ₹30,000 online and ₹50,000 for the One-Month Foundation Program. Taxes apply as per government norms. Corporate workshop fees are available on request." },
  { q: "Are discounts available?", a: "Enquire with the admissions team about early-bird discounts and special offers. Special senior citizen discounts are available on Foundation courses in Acting." },
  { q: "Which payment methods are accepted?", a: `We accept ${PAYMENT_METHODS.join(", ")}.` },
  { q: "Can I get a refund or transfer my fees?", a: REFUND_POLICY },
  { q: "Is accommodation available for outstation students?", a: "We support outstation students in choosing paying guest, hotel, service apartment and rental options. Hostel accommodation expenses in Mumbai start at ₹20,000 per month and vary by accommodation type and location." },
  { q: "Where is Actverse Academy located?", a: "Actverse Academy is in Versova, Mumbai, opposite Mukesh Khapra Casting. Local trains, metro, buses, auto-rickshaws and cab services provide convenient connectivity. Contact admissions for directions." },
];
