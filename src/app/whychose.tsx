import { Button, buttonVariants } from "@/components/ui/button";
import { headingFont } from "@/lib/constants/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function WhyChoseUsSection() {
    return (
        <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 space-y-20">
          <div>
            <h3 className={cn(headingFont.className, "text-sm uppercase text-secondary-accent text-center mx-auto mb-8")}>Why choose us?</h3>
            <h2 className={cn(headingFont.className, "text-3xl md:text-4xl font-bold text-white text-center mb-16")}>
              Here are some of the benefits you get from working with Parawild Edu.
            </h2>
          </div>
          
          {/* Workshops Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className={cn(headingFont.className, "text-sm uppercase text-secondary-accent")}>Workshops</h3>
                <h4 className={cn(headingFont.className, "text-3xl text-white font-bold")}>Join one of our 10 day immersive workshops</h4>
              </div>
              <p className="text-white/90 text-md">
                Parawild aims to give you the experience of a lifetime and during your Workshop you will meet
                at least two Wildlife Veterinarians, Specialists in Herpetology, Epidemiology and Rehabilitation of
                Wildlife.
              </p>
              <p className="text-white/90 text-md">
                Lecture include Animal Handling, Pharmacology, History of Capture Methodology, Capture
                Techniques, Husbandry, Relocation, Application Devises (Helicopter Exercise) and much more...
              </p>
              
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/image-1.jpg"
                alt="Workshop with wildlife"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/image-2.jpg"
                  alt="Experience all that South Africa has to offer"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
              <div className="space-y-2">
                <h3 className={cn(headingFont.className, "text-sm uppercase text-secondary-accent")}>Experience</h3>
                <h4 className={cn(headingFont.className, "text-3xl text-white font-bold")}>Experience all that South Africa offers</h4>
              </div>
              <p className="text-white/90 text-md">
                Parawild will give you the opportunity to experience all that South Africa has to offer, 
                including the beauty of the landscapes, history, cultural traditions, 
                the excitement of capturing wild animals and fulfilling your desire to contribute to Wildlife Conservation.
              </p>

            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className={cn(headingFont.className, "text-sm uppercase text-secondary-accent")}>Wildlife emmersion</h3>
                  <h4 className={cn(headingFont.className, "text-3xl text-white font-bold")}>Wildlife Management</h4>
                </div>
                <p className="text-white/90 text-md">
                This is an opportunity to see live – in action – wild animal relocation in their natural habitat. 
                Do you need continual education credits in your summer holidays or are you just wild at heart? 
                Parawild will introduce you to some of the worlds' wildest places and animals…
                </p>
                <Link href='/blogs' className={cn(buttonVariants({
                variant: 'secondary',
                size: 'lg'
              }), "uppercase")}>
                Learn more
              </Link>
              </div>
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/image-3.jpg"
                  alt="Workshop with wildlife"
                  fill
                  className="object-cover"
                />
              </div>
          </div>
        </div>
      </section>
    )
}