'use client';

export default function Footer() {
  return (
    <footer className="bg-black py-8 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Gaurav Rege. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            GitHub
          </a>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
