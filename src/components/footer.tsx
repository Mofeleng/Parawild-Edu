
"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address")
})

export default function Footer() {
  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  })

  const handleSubmit = async (values: z.infer<typeof newsletterSchema>) => {
    // Handle newsletter signup
    console.log(values)
  }

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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Enter your email" 
                          {...field}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" variant="secondary">
                  Subscribe
                </Button>
              </form>
            </Form>
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