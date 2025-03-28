
"use client"

import Link from "next/link"
import NewsletterForm from "./newsletter-form"


export default function Footer() {
  return (
    <footer className="bg-[#0e0e0e] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Address Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Address</h3>
            <address className="text-gray-300 not-italic">
              <p>Parawild Edu</p>
              <p>123 Nature Street</p>
              <p>Wilderness Park</p>
              <p>South Africa</p>
            </address>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/workshops" className="text-gray-300 hover:text-white transition-colors">
                  Workshops
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Join Our Newsletter</h3>
            <NewsletterForm />
          </div>
        </div>

        <hr className="border-white/10 my-8" />
        
        <div className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Parawild Edu Capture. All rights reserved.
        </div>
      </div>
    </footer>
  )
}