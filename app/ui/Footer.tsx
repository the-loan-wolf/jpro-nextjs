import Link from "next/link";
import { Instagram, Music, Twitter, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Films Section */}
          <div>
            <h3 className="font-semibold text-black mb-4 tracking-wide">
              Resumes
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-black transition-colors text-sm"
                >
                  All
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-black transition-colors text-sm"
                >
                  Featured
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-black transition-colors text-sm"
                >
                  Latest posted
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop Section */}
          <div>
            <h3 className="font-semibold text-black mb-4 tracking-wide">
              Profile
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-black transition-colors text-sm"
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-black transition-colors text-sm"
                >
                  Post your resume
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-black transition-colors text-sm"
                >
                  Generate PDF Resume
                </Link>
              </li>
            </ul>
          </div>

          {/* Neon Section */}
          <div>
            <h3 className="font-semibold text-black mb-4 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-black transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-black transition-colors text-sm"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-black transition-colors text-sm"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-black transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-black transition-colors text-sm"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-black transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="flex flex-col items-start md:items-end gap-6">
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-700 hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-black transition-colors"
                aria-label="TikTok"
              >
                <Music size={24} />
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-black transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-black transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-black transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={24} />
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-700 hover:text-black transition-colors"
                aria-label="freejobsearcher"
              >
                <h6 className="font-semibold text-2xl">
                  <span className="text-blue-500">Free</span>
                  <span className="text-blue-600">Job</span>
                  <span className="text-blue-700">Searcher</span>
                </h6>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
