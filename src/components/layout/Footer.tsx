export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-white/5 backdrop-blur-md mt-auto">
      <div className="mx-auto px-4 py-6 text-sm text-gray-400 text-center">
        © {new Date().getFullYear()} VIBRANT | Connected care & medical rentals
      </div>
    </footer>
  );
}
