import NurseDirectory from "@/components/caregivers/NurseDirectory";
import Link from "next/link";

export default async function CaregiversPage() {
  const API = "http://10.11.7.87:5000";

  const res = await fetch(`${API}/api/nurse/list`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  let nurses = [];
  try {
    const json = await res.json();
    const raw = json.data || [];
console.log(raw);

nurses = raw.map((n: any) => {
  const skillsArray = n.caregiverProfile?.skills?.list || [];

  return {
    id: String(n.id),
    name: n.name,
    city: n.city || "Unknown",

    specialty: skillsArray[0] || "General Nurse",
    experience: n.caregiverProfile?.experienceYears || 0,
    hourlyRate: n.caregiverProfile?.hourlyRate || 0,

    rating: 4.9,
    reviews: 100,

    // --- FIX 1: focusTags always defined ---
    focusTags: skillsArray.slice(0, 3),

    // --- FIX 2: skills array always exists ---
    skills: skillsArray,

    // --- FIX 3: bio always defined ---
    bio: n.caregiverProfile?.bio || "",

    // --- FIX 4: availability ALWAYS array ---
    availability: [
      {
        slots: ["9am – 6pm"], // fallback / fake default because backend doesn't send it
      },
    ],

    photo:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=60",
  };
});

  } catch (err) {
    console.error("Nurse fetch failed:", err);
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white">
            Care team marketplace
          </p>
          <h1 className="text-3xl font-semibold text-white">
            Hire verified nurses & caregivers
          </h1>
        </div>

        <Link
          href="/dashboard"
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-white hover:border-pink-400"
        >
          Nurse dashboard →
        </Link>
      </header>

      <NurseDirectory nurses={nurses} />
    </div>
  );
}
