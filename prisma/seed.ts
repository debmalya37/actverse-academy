import { PrismaClient, CourseCategory } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting full database seed...");

  // ---------------------------------------------------------------------------
  // 1. CREATE DEFAULT ADMIN USER
  // ---------------------------------------------------------------------------
  const adminEmail = "admin@actverse.com";
  const adminPassword = await bcrypt.hash("Actverse@2026", 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Super Admin",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  console.log(`Admin user created: ${admin.email}`);

  // ---------------------------------------------------------------------------
  // 2. SEED FACULTY & FOUNDERS
  // ---------------------------------------------------------------------------
  console.log("Clearing & seeding faculty records...");
  await prisma.faculty.deleteMany();

  const facultyData = [
    {
      name: "Koushish Varade",
      role: "Awardee Director, Producer & Founder — Kiida Films and Actverse Academy",
      bio: "Koushish Varade is a director, producer, and founder of Kiida Films and Actverse Academy. His work spans feature films, web series, vertical dramas, music videos, advertisements, promotional films, and documentaries. His project credits include Yeh Saali Aashiqui, Murder in Mahim, and Illegal Season 2. His documentary Tri-Services – All-Women Circumnavigation Sailing Expedition received an Honorable Jury Mention at the 16th Dada Saheb Phalke Film Festival 2026, alongside multiple official selections. His advertisements and promotional videos have also received notable recognition. Through Actverse Academy, he is committed to nurturing emerging talent and preparing aspiring performers for the entertainment industry.",
      order: 1,
      image: "/faculty/Koushish.png", 
      instagramUrl: "https://instagram.com/",
      facebookUrl: "https://facebook.com/",
      linkedinUrl: "https://linkedin.com/"
    },
    {
      name: "Krishnkant Agarwal",
      role: "Co-Founder",
      bio: "Krishnkant Agrawal is a Mumbai-based filmmaker, director, and editor with 5+ years of experience across web series, advertisements, music videos, and vertical series. Drawn to human psychology and meaningful storytelling, he believes every frame should serve a purpose and every cut convey emotion. As co-founder of an acting academy, he aims to help aspiring actors discover their individuality, build confidence, and sharpen their craft through practical, camera-focused training and industry exposure.",
      order: 2,
      image: "/faculty/Krishnkant.png",
    },
    {
      name: "Ashwini Chaudhary",
      role: "Celebrity Lecturer & Consultant",
      bio: "Ashwini Chaudhary is an acclaimed Indian filmmaker, director, writer, and producer whose work spans feature films, television, and OTT. He made his feature-film debut with Laado, which received the National Film Award for Best First Film of a Director. His notable directing credits include Dhoop, Siskiyaan, Good Boy, Bad Boy, Jodi Breakers, Setters, and Illegal – Justice, Out of Order. With extensive experience in storytelling and directing performers, Ashwini brings valuable industry insight to Edwards Academy as a Celebrity Lecturer and Consultant, inspiring aspiring talent to develop their craft, confidence, and creative vision.",
      order: 3,
      image: "/faculty/Ashwini.png",
    },
    {
      name: "Amano Dhyan",
      role: "Head Faculty",
      bio: "With 16+ years of industry experience, Amano Dhyan has worked on popular television shows including Yeh Rishta Kya Kehlata Hai, Bidaai, Mere Sai, and Nimki Mukhiya, along with the National Award-winning film Bahattar Hoorain. As an acting coach, he has trained 1,000+ actors, helping aspiring performers build their skills and confidence for the screen. His experience across acting, casting, and coaching brings students valuable industry insight and practical guidance as they prepare to pursue their own acting careers.",
      order: 4,
      image: "/faculty/Amano.png",
    },
    {
      name: "Atul Shukla",
      role: "Creative Head — Actverse Academy",
      bio: "Atul Shukla is a creative professional with expertise in filmmaking, production, and visual storytelling. He holds a Master’s degree in Foreign Trade, a Level 1 Diploma in French, and diploma certifications in Animation and VFX. As a Producer with Kiida Films Productions, his portfolio includes advertising campaigns, YU 11, two vertical drama series for Kuku TV, and an award-winning documentary associated with the Indian Armed Forces. His work combines creative vision with impactful storytelling and compelling visual experiences.",
      order: 9,
      image: "/faculty/Atul.png",
    },
    {
      name: "Tapan Sharma",
      role: "Actor & Acting Mentor",
      bio: "Tapan Sharma is an inspiring actor and acting mentor who has spent the last 10–12 years guiding young performers. With a passion for nurturing talent, he has trained more than 50 students, many of whom are now working in television and films, with several emerging as promising faces in the industry. A thoughtful teacher and dedicated performer, Tapan understands the emotions of today’s generation and the evolving language of screen storytelling. Through his guidance, he helps students build confidence, explore their individuality, and develop their craft with patience, care, and a genuine love for acting.",
      order: 5,
      image: "/faculty/Tapan.png",
    },
    {
      name: "Nandini Bodse",
      role: "Head Dance Faculty — Actverse Academy",
      bio: "Nandini Bodse is a passionate dance instructor with 7 years of teaching experience. As Head Dance Faculty at Actverse Academy, she trains aspiring actors in a variety of dance styles, including Hip-Hop, Indian, Western, classical, contemporary, Garba, and salsa. Her classes focus on choreography, rhythm, and facial expressions—helping students communicate emotion through movement and bring greater depth to their on-screen performances.",
      order: 6,
      image: "/faculty/Nandini.png",
    },
    {
      name: "Himanshu Vishwakarma",
      role: "Head Dance Faculty — Actverse Academy",
      bio: "Himanshu Vishwakarma is an experienced dancer and mentor with a strong presence in the dance community. As Head Dance Faculty at Actverse Academy, he will train aspiring actors in a range of styles, including Indian, Western, classical, contemporary, Garba, and salsa. His classes focus on rhythm, choreography, and expressive movement—helping students use dance and facial expressions to bring emotion and depth to their on-screen performances.",
      order: 7,
      image: "/faculty/Himanshu.png",
    },
    {
      name: "Tanvi Jain",
      role: "Founder, Networkly Digital | Digital Faculty — Actverse Academy",
      bio: "Tanvi Jain is the founder of Networkly Digital and a digital branding professional who has helped build and grow brands from the ground up. Her experience spans brand identity, content strategy, and digital reach across businesses, including builders, academies, and colleges. As Digital Faculty at Actverse Academy, she will help aspiring actors develop a strong professional presence beyond the camera. Through practical guidance in personal branding, content creation, and social media strategy, she will teach students how to showcase their talent, connect with audiences, and build visibility for their acting careers.",
      order: 8,
      image: "/faculty/Tanvi.png",
    },
  ];

  await prisma.faculty.createMany({ data: facultyData });

  // ---------------------------------------------------------------------------
  // 3. SEED COURSES & SYLLABUS MODULES IN EXACT DOCUMENT ORDER
  // ---------------------------------------------------------------------------
  console.log("Clearing & seeding courses and curriculum...");
  
  await prisma.syllabusModule.deleteMany();
  await prisma.course.deleteMany();

  const coursesData: Array<{
    slug: string;
    name: string;
    category: CourseCategory;
    duration: string;
    fee: number | null;
    blurb: string;
    description: string;
    seoTitle: string;
    seoDescription: string;
    syllabus: Array<{ title: string; description: string; practicalActivities: string; order: number }>;
  }> = [
    {
      slug: "one-month-foundation",
      name: "One-Month Foundation Program",
      category: CourseCategory.ACTING,
      duration: "1 Month Course",
      fee: 50000,
      blurb: "Acting Basics, Facial Expressions, Voice Modulation, Body Language, Dialogue Delivery, Improvisation & Basic Camera Acting.",
      description: "Discover Your Acting Potential",
      seoTitle: "One-Month Acting Foundation Program — Actverse Academy",
      seoDescription: "Join the 1-month acting foundation program at Actverse Academy. Learn voice, body language, and basic camera acting.",
      syllabus: [
        { title: "Week 1 – Break the Hesitation", description: "Confidence building, introduction to acting, expressions and acting games.", practicalActivities: "Icebreakers, acting games, roleplay, dialogue exercises and performance recording.", order: 1 },
        { title: "Week 2 – Find Your Voice", description: "Voice modulation, diction, dialogue delivery and body language.", practicalActivities: "Icebreakers, acting games, roleplay, dialogue exercises and performance recording.", order: 2 },
        { title: "Week 3 – Get Camera Ready", description: "Camera basics, improvisation, roleplay and short scenes.", practicalActivities: "Icebreakers, acting games, roleplay, dialogue exercises and performance recording.", order: 3 },
        { title: "Week 4 – Your First Performance", description: "Monologues, audition practice and recorded camera performance.", practicalActivities: "Icebreakers, acting games, roleplay, dialogue exercises and performance recording.", order: 4 }
      ]
    },
    {
      slug: "online-one-month-foundation",
      name: "Online One-Month Foundation Program",
      category: CourseCategory.ACTING,
      duration: "1 Month Course",
      fee: 30000,
      blurb: "Acting Basics, Facial Expressions, Voice Modulation, Body Language, Dialogue Delivery, Improvisation & Basic Camera Acting.",
      description: "Discover Your Acting Potential",
      seoTitle: "Online Acting Foundation Program — Actverse Academy",
      seoDescription: "Take our 1-month online acting foundation course from anywhere in the world with Actverse Academy.",
      syllabus: [
        { title: "Week 1 – Break the Hesitation", description: "Confidence building, introduction to acting, expressions and acting games.", practicalActivities: "Icebreakers, acting games, roleplay, dialogue exercises and performance recording.", order: 1 },
        { title: "Week 2 – Find Your Voice", description: "Voice modulation, diction, dialogue delivery and body language.", practicalActivities: "Icebreakers, acting games, roleplay, dialogue exercises and performance recording.", order: 2 },
        { title: "Week 3 – Get Camera Ready", description: "Camera basics, improvisation, roleplay and short scenes.", practicalActivities: "Icebreakers, acting games, roleplay, dialogue exercises and performance recording.", order: 3 },
        { title: "Week 4 – Your First Performance", description: "Monologues, audition practice and recorded camera performance.", practicalActivities: "Icebreakers, acting games, roleplay, dialogue exercises and performance recording.", order: 4 }
      ]
    },
    {
      slug: "foundation-certificate-in-acting",
      name: "Foundation Certificate In Acting",
      category: CourseCategory.ACTING,
      duration: "3 Months Course",
      fee: 120000,
      blurb: "Acting Techniques, Character Building, Emotional Expressions, Script Reading, Diction, Scene Performance, Dance & Camera Acting.",
      description: "From Beginner to Confident Performer",
      seoTitle: "3-Month Foundation Certificate in Acting — Actverse Academy",
      seoDescription: "Build a solid acting foundation over 3 months at Actverse Academy with scene work, dance, and camera training.",
      syllabus: [
        { title: "Month 1 – BUILD", description: "Acting fundamentals, voice, expressions, movement and confidence.", practicalActivities: "Partner scenes, group performances, mock auditions, camera exercises and feedback sessions.", order: 1 },
        { title: "Month 2 – EXPLORE", description: "Character building, emotions, script reading, improvisation and scene performance.", practicalActivities: "Partner scenes, group performances, mock auditions, camera exercises and feedback sessions.", order: 2 },
        { title: "Month 3 – PERFORM", description: "Camera acting, audition techniques, monologues and self-tape preparation.", practicalActivities: "Partner scenes, group performances, mock auditions, camera exercises and feedback sessions.", order: 3 }
      ]
    },
    {
      slug: "professional-diploma-in-acting",
      name: "Professional Diploma in Acting",
      category: CourseCategory.ACTING,
      duration: "6 Month Course",
      fee: 200000,
      blurb: "Method Acting, Character Development, Emotional Depth, Script Analysis, Voice & Movement, Scene Study, Dance, Screen Acting & Audition Techniques.",
      description: "Develop Your Craft. Own the Camera.",
      seoTitle: "6-Month Professional Diploma in Acting — Actverse Academy",
      seoDescription: "Earn your Professional Diploma in Acting at Actverse Academy in Mumbai. Master method acting and screen performance.",
      syllabus: [
        { title: "Month 1: Acting Foundations", description: "Acting foundations, voice, diction and body language.", practicalActivities: "Scene recreations, audition simulations, performance recordings and individual feedback.", order: 1 },
        { title: "Month 2: Character & Emotion", description: "Emotional expressions, improvisation and character development.", practicalActivities: "Scene recreations, audition simulations, performance recordings and individual feedback.", order: 2 },
        { title: "Month 3: Script & Scene Study", description: "Script analysis, scene study and dialogue delivery.", practicalActivities: "Scene recreations, audition simulations, performance recordings and individual feedback.", order: 3 },
        { title: "Month 4: Theatre Techniques", description: "Theatre techniques, monologues and performance skills.", practicalActivities: "Scene recreations, audition simulations, performance recordings and individual feedback.", order: 4 },
        { title: "Month 5: Screen Acting", description: "Screen acting, audition techniques and self-tape preparation.", practicalActivities: "Scene recreations, audition simulations, performance recordings and individual feedback.", order: 5 },
        { title: "Month 6: Final Showcase", description: "Film scenes, practical camera performances and final showcase.", practicalActivities: "Scene recreations, audition simulations, performance recordings and individual feedback.", order: 6 }
      ]
    },
    {
      slug: "advance-diploma-in-screen-acting",
      name: "Advance Diploma in Screen Acting",
      category: CourseCategory.ACTING,
      duration: "1 Year Course",
      fee: 500000,
      blurb: "Advanced Acting, Character Psychology, Emotional Memory, Method Acting, Script Interpretation, Theatre, Dance, Camera Techniques & Audition Preparation.",
      description: "Transform Your Passion into Performance Skills",
      seoTitle: "1-Year Advance Diploma in Screen Acting — Actverse Academy",
      seoDescription: "Master screen acting with our 1-year advanced diploma at Actverse Academy, featuring short-film projects and industry masterclasses.",
      syllabus: [
        { title: "Quarter 1 – DISCOVER", description: "Acting fundamentals, confidence, voice, movement and improvisation.", practicalActivities: "Guest sessions, industry interactions, camera assignments, production-based learning and performance assessments.", order: 1 },
        { title: "Quarter 2 – DEVELOP", description: "Character study, emotional depth, script analysis and scene work.", practicalActivities: "Guest sessions, industry interactions, camera assignments, production-based learning and performance assessments.", order: 2 },
        { title: "Quarter 3 – MASTER", description: "Camera acting, audition preparation, self-tapes and screen presence.", practicalActivities: "Guest sessions, industry interactions, camera assignments, production-based learning and performance assessments.", order: 3 },
        { title: "Quarter 4 – EXPERIENCE", description: "Short-film projects, practical shoots, advanced scenes and final showcase.", practicalActivities: "Guest sessions, industry interactions, camera assignments, production-based learning and performance assessments.", order: 4 }
      ]
    },
    {
      slug: "weekend-acting-workshop",
      name: "Weekend Acting WorkShop",
      category: CourseCategory.WORKSHOPS,
      duration: "1 Month",
      fee: 30000,
      blurb: "Acting Basics | Camera Acting | Voice & Diction | Expressions | Improvisation | Dance & Movement | Audition Techniques",
      description: "Perfect for working professionals and students looking to explore acting over weekends.",
      seoTitle: "Weekend Acting Workshop — Actverse Academy",
      seoDescription: "Join our weekend acting workshop in Mumbai for students and working professionals.",
      syllabus: [
        { title: "1st Week – Acting Fundamentals", description: "Introduction to acting, confidence building, facial expressions, body language and basic acting exercises.", practicalActivities: "Acting Games | Roleplay | Group Scenes | Dance Exercises | Camera Practice | Mock Auditions", order: 1 },
        { title: "2nd Week – Voice & Expressions", description: "Voice modulation, diction, dialogue delivery, emotional expressions and personality development.", practicalActivities: "Acting Games | Roleplay | Group Scenes | Dance Exercises | Camera Practice | Mock Auditions", order: 2 },
        { title: "3rd Week – Performance & Camera Acting", description: "Improvisation, character building, scene performance, camera confidence and basic dance movements.", practicalActivities: "Acting Games | Roleplay | Group Scenes | Dance Exercises | Camera Practice | Mock Auditions", order: 3 },
        { title: "4th Week – Audition & Final Performance", description: "Monologue practice, audition techniques, self-tape basics, camera performance and final performance showcase.", practicalActivities: "Acting Games | Roleplay | Group Scenes | Dance Exercises | Camera Practice | Mock Auditions", order: 4 }
      ]
    },
    {
      slug: "one-to-one-acting-classes",
      name: "One to One Workshop",
      category: CourseCategory.WORKSHOPS,
      duration: "On Request",
      fee: 120000,
      blurb: "Personal Attention. Individual Growth. Better Performance. A specially designed training programme with only 2 students per batch.",
      description: "4-Week Learning Programme ensuring personalised attention, individual guidance and focused skill development.",
      seoTitle: "One-to-One Acting Classes — Actverse Academy",
      seoDescription: "Book personalized 1-on-1 acting coaching and audition preparation at Actverse Academy.",
      syllabus: [
        { title: "1st Week – Understanding Your Potential", description: "Acting fundamentals, confidence building, expressions, body language and individual skill assessment.", practicalActivities: "Acting Techniques, Facial Expressions & Body Language.", order: 1 },
        { title: "2nd Week – Voice & Emotional Training", description: "Voice modulation, diction, dialogue delivery, emotional expressions and personality development.", practicalActivities: "Voice Modulation, Emotional Expressions & Character Building.", order: 2 },
        { title: "3rd Week – Performance & Camera Skills", description: "Character building, improvisation, scene performance, camera acting and dance movements.", practicalActivities: "Camera Acting, Screen Presence, Improvisation & Dance Training.", order: 3 },
        { title: "4th Week – Audition & Personal Development", description: "Monologue practice, audition techniques, self-tape preparation, camera performance and individual feedback.", practicalActivities: "Audition Techniques, Self-Tape Preparation & Confidence Building.", order: 4 }
      ]
    },
    {
      slug: "corporate-workshop",
      name: "Corporate Workshop",
      category: CourseCategory.WORKSHOPS,
      duration: "On Request",
      fee: null,
      blurb: "From Classroom to Corporate – Get Ready for the Professional World!",
      description: "A practical, skill-based programme designed to prepare students for corporate careers. Develop professional confidence, communication, technical and digital skills, interview techniques and workplace management abilities.",
      seoTitle: "Corporate Training & Workshops — Actverse Academy",
      seoDescription: "Enhance team communication, personality development, and public speaking with Actverse Academy's corporate workshops.",
      syllabus: [
        { title: "1. Personality Development & Communication", description: "Confidence, Grooming & Personal Branding. Body Language, Public Speaking & Presentation.", practicalActivities: "Mock Interviews | Group Discussions | Presentations | Resume Workshop | Roleplay | Digital Assignments", order: 1 },
        { title: "2. Interview Preparation & Technical Skills", description: "HR Interviews, Mock Interviews & Resume Building. Computer Basics, MS Office & Workplace Tools.", practicalActivities: "Mock Interviews | Group Discussions | Presentations | Resume Workshop | Roleplay | Digital Assignments", order: 2 },
        { title: "3. Digital Skills & Corporate Etiquette", description: "Personal Branding & Online Presence. Professional Behaviour, Teamwork & Leadership.", practicalActivities: "Mock Interviews | Group Discussions | Presentations | Resume Workshop | Roleplay | Digital Assignments", order: 3 },
        { title: "4. Workplace Management & Career Development", description: "Time Management, Target Setting & Problem Solving. Goal Setting, Stress Management & Career Planning.", practicalActivities: "Mock Interviews | Group Discussions | Presentations | Resume Workshop | Roleplay | Digital Assignments", order: 4 }
      ]
    },
    {
      slug: "dance-training-special",
      name: "Pick Any Dance Form – 1-Month Special Training",
      category: CourseCategory.DANCE,
      duration: "1 Month Course",
      fee: 20000,
      blurb: "Contemporary, Hip-hop, Western, Bollywood, Kathak, Jazz, Semiclassical, Aerobics, Yoga, Garba.",
      description: "Acting + Dance Training. Enhance your acting skills with dance and movement training. Develop rhythm, coordination, body language and expressions to become a more confident and versatile performer.",
      seoTitle: "Dance & Movement Training for Actors — Actverse Academy",
      seoDescription: "Learn Hip-Hop, Contemporary, Bollywood and classical dance training specially tailored for actors at Actverse Academy.",
      syllabus: [
        { title: "Rhythm, Expression & Movement", description: "Enhance your acting skills with professional dance and movement training. Develop rhythm, coordination, and expression for on-screen performance.", practicalActivities: "Dance routines, rhythm drills, body language exercises.", order: 1 }
      ]
    }
  ];

  for (const c of coursesData) {
    const { syllabus, ...courseInfo } = c;
    await prisma.course.create({
      data: {
        ...courseInfo,
        isActive: true,
        syllabusModules: {
          create: syllabus
        }
      }
    });
  }

  console.log(`Successfully seeded ${coursesData.length} courses in exact document order with their respective curriculum modules!`);
  console.log("Full database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });