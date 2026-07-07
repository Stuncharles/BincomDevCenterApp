import { doc, writeBatch, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const SEED_DATA = {
  profiles: [
    {
      id: "admin-1",
      email: "hadekunleabdulwally@gmail.com",
      username: "hadekunle",
      fullName: "Adewale Kunle",
      education: "B.Sc. Computer Engineering",
      occupation: "Platform Director / Tech Mentor",
      techExperience: "Advanced",
      track: "All",
      role: "admin",
      status: "admin",
      score: 100,
      joinedAt: "2026-06-01T08:00:00Z"
    },
    {
      id: "u-1782201053272",
      email: "stuncharles@gmail.com",
      username: "stuncharles",
      fullName: "Izuchukwu Charles",
      education: "Bachelor's Degree",
      occupation: "Employed",
      techExperience: "1-2 years",
      track: "Infrastructure/DevOps",
      role: "admin",
      status: "admin",
      joinedAt: "2026-06-23T07:50:53.272Z",
      learningLevel: "Admin",
      previousCourseCompleted: true
    }
  ],
  meetings: [
    {
      id: "meet_1",
      title: "Morning Alignment & Accountability Standup",
      type: "Knowledge Track",
      timeString: "09:45 AM",
      trackId: "All",
      jitsiUrl: "https://meet.jit.si/BincomDailyMorningStandup",
      scheduleDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      meetingDates: ["2026-07-07"],
      isActive: true
    },
    {
      id: "meet_2",
      title: "Knowledge Development (KD) Deep Dive Session",
      type: "Microservices",
      timeString: "09:00 AM",
      trackId: "All",
      jitsiUrl: "https://us02web.zoom.us/j/89297167866?pwd=bENIbWRVMHZOWjNOL0xqNDZhdkFWZz09",
      scheduleDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      meetingDates: ["2026-07-07"],
      isActive: true
    },
    {
      id: "meet_3",
      title: "Dev Master Project Scrum Sync",
      type: "Project",
      timeString: "02:00 PM",
      trackId: "All",
      jitsiUrl: "https://meet.jit.si/BincomDevMasterSync",
      projectId: "proj_1",
      scheduleDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      meetingDates: ["2026-07-07"],
      isActive: true
    },
    {
      id: "meet_4",
      title: "Evening Achievement Review & Wrap-up",
      type: "Knowledge Track",
      timeString: "05:00 PM",
      trackId: "All",
      jitsiUrl: "https://meet.jit.si/BincomEveningAchievementsReview",
      scheduleDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      meetingDates: ["2026-07-07"],
      isActive: true
    }
  ],
  weeklyDrills: [
    {
      id: "drill_1",
      title: "Interactive Responsive CSS Layout Challenge",
      description: "Design a clean 3-tier grid dashboard display relying purely on tailwind CSS utility parameters. Must use proper media queries, adequate flex wrapping, and strict forest green aesthetics.",
      link: "https://github.com/bincom-drills/responsive-css-forest-green",
      postedAt: "2026-06-02T10:00:00Z"
    },
    {
      id: "drill_2",
      title: "Relational CRM Schema Layout & Querying",
      description: "Formulate a relational database structure featuring profiles, track assignments, and attendance logs. Draft query lines calculating student punctuality ratings based on 09:00 AM margins.",
      link: "https://github.com/bincom-drills/relational-crm-schemas",
      postedAt: "2026-06-03T11:00:00Z"
    }
  ],
  projects: [
    {
      id: "proj_1",
      name: "Bincom Dev Master Tracker",
      description: "A centralized command control hub tracking student compliance, attendance algorithms, daily drills, and performance metrics across tracks.",
      status: "Active",
      members: [],
      githubUrl: "https://github.com/bincom-devs/dev-master-tracker",
      meetings: [
        {
          id: "m_p1",
          title: "Dev Master Progress Sync",
          time: "02:00 PM",
          jitsiUrl: "https://meet.jit.si/BincomDevMasterSync"
        }
      ]
    },
    {
      id: "proj_2",
      name: "eMigr8 Visa Pathway Portal",
      description: "Globally accessible advisory platform mapping talent immigration prospects through digital tech skill assessments and legal pathways.",
      status: "Active",
      members: [],
      githubUrl: "https://github.com/bincom-devs/emigr8-portal",
      meetings: [
        {
          id: "m_p2",
          title: "eMigr8 Architecture Refinement",
          time: "03:00 PM",
          jitsiUrl: "https://meet.jit.si/BincomEMigr8Refinement"
        }
      ]
    },
    {
      id: "proj_3",
      name: "Bincom Smart Academy LMS",
      description: "Automated learning management platform supporting digital orientation assets, interactive PDF reading logs, and course reviews for students.",
      status: "Hold",
      members: [],
      githubUrl: "https://github.com/bincom-devs/academy-lms",
      meetings: []
    }
  ],
  meetingAssignments: [
    { meetingId: "meet_1", userId: "admin-1" },
    { meetingId: "meet_1", userId: "u-1782201053272" },
    { meetingId: "meet_2", userId: "admin-1" },
    { meetingId: "meet_2", userId: "u-1782201053272" },
    { meetingId: "meet_4", userId: "admin-1" },
    { meetingId: "meet_4", userId: "u-1782201053272" }
  ],
  meetingHistory: [
    {
      id: "m-hist-meet_1-2026-07-07",
      meetingId: "meet_1",
      title: "Morning Alignment & Accountability Standup",
      type: "Knowledge Track",
      date: "2026-07-07",
      scheduledStartTime: "09:45 AM",
      scheduledEndTime: "10:15 AM",
      duration: "30 minutes",
      organizer: "System Admin",
      userLevels: ["All"],
      targetTeamTrackEligibility: ["All"]
    },
    {
      id: "m-hist-meet_2-2026-07-07",
      meetingId: "meet_2",
      title: "Knowledge Development (KD) Deep Dive Session",
      type: "Microservices",
      date: "2026-07-07",
      scheduledStartTime: "09:00 AM",
      scheduledEndTime: "09:30 AM",
      duration: "30 minutes",
      organizer: "System Admin",
      userLevels: ["All"],
      targetTeamTrackEligibility: ["All"]
    }
  ],
  metadata: [
    {
      id: "app_config",
      meetingTypes: ["Knowledge Track", "Microservices", "Project"],
      kdCounts: {},
      microserviceOwners: {}
    }
  ]
};

export async function seedDatabase(force = false) {
  try {
    if (!force) {
      // Check if already seeded by seeing if we have any profiles
      const snapshot = await getDocs(collection(db, "profiles"));
      if (!snapshot.empty) {
        console.log("Database already seeded. Skipping...");
        return false;
      }
    }

    console.log("Seeding database...");

    // Seed profiles
    const batch = writeBatch(db);
    for (const p of SEED_DATA.profiles) {
      batch.set(doc(db, "profiles", p.id), p);
    }
    // Seed meetings
    for (const m of SEED_DATA.meetings) {
      batch.set(doc(db, "meetings", m.id), m);
    }
    // Seed weeklyDrills
    for (const d of SEED_DATA.weeklyDrills) {
      batch.set(doc(db, "weeklyDrills", d.id), d);
    }
    // Seed projects
    for (const pr of SEED_DATA.projects) {
      batch.set(doc(db, "projects", pr.id), pr);
    }
    // Seed meetingAssignments
    for (let i = 0; i < SEED_DATA.meetingAssignments.length; i++) {
      const ma = SEED_DATA.meetingAssignments[i];
      batch.set(doc(db, "meetingAssignments", `ma_${i}`), ma);
    }
    // Seed meetingHistory
    for (const h of SEED_DATA.meetingHistory) {
      batch.set(doc(db, "meetingHistory", h.id), h);
    }
    // Seed metadata config
    for (const meta of SEED_DATA.metadata) {
      batch.set(doc(db, "metadata", meta.id), meta);
    }

    await batch.commit();
    console.log("Database successfully seeded!");
    return true;
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}
