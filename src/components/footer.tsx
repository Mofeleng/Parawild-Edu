
"use client"

import Link from "next/link"
import NewsletterForm from "./newsletter-form"
import { useEffect, useState } from "react";
import { graphQlClientWithSerializer } from "@/lib/constants/graph-ql";
import PageLoader from "./page-loader";
import FetchError from "./fetch-error";
import { getContactPage } from "@/lib/graphQL/nav-footer";
import { ContactPage, GetContactPageResponse } from '@/lib/interfaces/nav-footer';

export default function Footer() {
  const [ res, setRes ] = useState<ContactPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => 
    {
      const fetchContactInfo = async () => {
        try {
          const result = await graphQlClientWithSerializer.request<GetContactPageResponse>(getContactPage);
          //const response:any = await result;
          
          setRes(result.contactPages)
          setLoading(false)
        } catch (error) {
          console.log("Something went wrong: ", error)
        }
      }

      fetchContactInfo();
    }, [])

    if (loading) {
      return (
        <PageLoader />
    )
    }
    if (!res) {
      return (
          <FetchError error="Something went wrong while fetching the contact details" />
      )
    } 

  return (
    <footer className="bg-[#0e0e0e] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Address Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Address</h3>
            <address className="text-gray-300 not-italic">
              <div className="listitem" dangerouslySetInnerHTML={{__html: res[0].location.html}}></div>
            </address>
            <h3 className="text-xl font-bold text-white mt-2 mb-1">Contact</h3>
            <div className="text-gray-300 not-italic">
              <div className="listitem" dangerouslySetInnerHTML={{__html: res[0].contactInformation.html}}></div>
            </div>
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
                <Link href="/termsandconditions" className="text-gray-300 hover:text-white transition-colors">
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