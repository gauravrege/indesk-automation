'use client';

export default function Footer() {
  return (
    <footer className="bg-[#f5f4f2] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-300 pt-8">
        <p className="text-sm font-medium text-gray-500">
          © {new Date().getFullYear()} Gaurav Rege.
        </p>
        <div className="flex gap-8">
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
            GitHub
          </a>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
