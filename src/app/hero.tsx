import { Button, buttonVariants } from "@/components/ui/button";
import { headingFont } from "@/lib/constants/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="relative min-h-screen w-full flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/Banner.jpg"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl">
            <h1 className={cn(headingFont.className, "text-4xl md:text-5xl font-bold text-white mb-6 capitalize")}>
              Interested in working with wildlife?
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Providing professional wildlife management and educational services in Hoedspruit and surrounding areas.
            </p>
            <Link href='/workshops' className={cn(buttonVariants({
                variant: 'secondary',
                size: 'lg'
              }), "uppercase")}>
                See Workshops
            </Link>
          </div>
        </div>
      </div>
    )
}