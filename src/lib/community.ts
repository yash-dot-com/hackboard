export const students = [
  {
    id: "ananya-rao",
    name: "Ananya Rao",
    bio: "I build tools that help students find their way around campus.",
    skills: ["React", "Product design"],
    achievements: ["Presented Campus Compass at the department demo night"],
  },
  {
    id: "dev-shah",
    name: "Dev Shah",
    bio: "I like building on-chain tools and making them easier to use.",
    skills: ["Solana", "TypeScript"],
    achievements: ["Built a Solana transaction viewer for the campus developer club"],
  },
];

export const demoStudent = students[1];

export const projects = [
  {
    id: "campus-compass",
    name: "Campus Compass",
    studentId: "ananya-rao",
    summary: "A searchable guide to labs, classrooms, and offices for students new to campus.",
    usage: "Search for a room, building, or department. Each result explains where to enter and how to get there from a familiar campus landmark.",
    feedback: "Try finding a lab you’ve never visited. Which directions or landmarks would make the route easier to follow?",
  },
  {
    id: "lab-queue",
    name: "Lab Queue",
    studentId: "ananya-rao",
    summary: "A shared queue that helps students see when lab equipment will be available.",
    usage: "Choose a lab station and add yourself to its queue. The queue gives students a common view of who is next.",
    feedback: "How would you want to be notified when a station becomes available?",
  },
  {
    id: "solana-viewer",
    name: "Solana Transaction Viewer",
    studentId: "dev-shah",
    summary: "A plain-language view of what happened in a Solana transaction.",
    usage: "Start with a transaction signature. The viewer groups transfers, fees, and program instructions into a summary.",
    feedback: "Which parts of the transaction still need more explanation?",
  },
];

export type Event = {
  createdAt?: number;
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  studentId: string;
};

export const sampleEvents: Event[] = [
  { id: "campus-build-night", name: "Campus Build Night", date: "2026-11-20", location: "Department project lab", description: "Bring an idea, find teammates, and spend the evening building something other students can try.", studentId: "ananya-rao" },
  { id: "student-demo-night", name: "Student Demo Night", date: "2026-12-04", location: "Department seminar hall", description: "Show what you’re working on and get feedback from students across the department.", studentId: "ananya-rao" },
];

export type Opening = { createdAt?: number; id: string; eventId: string; team: string; skill: string; description: string; studentId: string };
export const sampleOpenings: Opening[] = [
  { id: "build-night-solana", eventId: "campus-build-night", team: "Campus Credits", skill: "Solana", description: "We’re prototyping a rewards system for campus clubs and need someone who can design and test the on-chain portion.", studentId: "ananya-rao" },
];

export type Comment = { createdAt?: number; id: string; projectId: string; studentId: string; body: string };
export const sampleComments: Comment[] = [
  { id: "compass-feedback", projectId: "campus-compass", studentId: "dev-shah", body: "Could each route include the closest accessible entrance? That would make the guide more useful on the first visit." },
];

export function eventDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(date));
}
