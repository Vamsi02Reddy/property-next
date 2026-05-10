import "../assets/styles/globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToastProvider from "./components/ToastProvider";
import AuthProvider from "./components/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";
import 'photoswipe/dist/photoswipe.css';
import { GlobalProvider } from "../context/GlobalContext";
import { Inter, Poppins } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-poppins',
})

export const metadata = {
  title: "Property Platform",
  description: "Find and list rental properties easily.",
  keywords: ["rental", "properties", "apartments", "houses", "real estate"],
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <AuthProvider>
          <GlobalProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastProvider />
          </GlobalProvider>
        </AuthProvider>
      </body>
    </html>
  );
};
export default RootLayout;
