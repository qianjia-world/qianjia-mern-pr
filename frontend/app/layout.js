import "./globals.css";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen w-full overflow-x-hidden bg-white text-black flex flex-col">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
