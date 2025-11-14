export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-white/5 backdrop-blur-md mt-auto">
      <div className="mx-auto px-4 py-6 text-sm text-gray-400 text-center">
        © {new Date().getFullYear()} MerilCare — crafted with 💖 for a hackathon MVP
      </div>
    </footer>
  );
}
