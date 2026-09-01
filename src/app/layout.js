import "./globals.css";

export const metadata = {
  title: "Internship Work Tracker",
  description: "Tracking my internship journey as an Automation Engineer Intern — showcasing projects, impact, and technical growth.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
