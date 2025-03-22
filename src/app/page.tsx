"use client"
import { headingFont } from "@/lib/constants/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"

import { GraphQLClient, gql } from "graphql-request";
import TestimonialCard from "@/components/testimonial-card";

export default function Home() {
  const [ testimonials, setTestimonials ] = useState<any>([]);
  const [ error, setError ] = useState<boolean | string>(false);
  const [ loadingTestimonials, setLoadingTestimonials ] = useState<boolean>(true)
  const ENDPOINT = process.env.NEXT_PUBLIC_GRAPHCMS_MAIN_ENDPOINT

  useEffect(() => {
    const fetchTestimonials = async () => {
      const graphQLClient = new GraphQLClient(ENDPOINT!, {
        method: 'GET',
        jsonSerializer: {
          parse: JSON.parse,
          stringify: JSON.stringify
        }
      });

      const query = gql`
        query Testimonials {
          testimonials(first: 10) {
            id
            name
            proffession
            photo {
              url
            }
            testimonial
          }
        }
      `;
      const result:any = await graphQLClient.request(query);
      const response = result.testimonials || null;

      setTestimonials(response);
      setLoadingTestimonials(false);
    }
    fetchTestimonials();
  }, []);

  if (!testimonials) {
    setError("No testimonials to show");
    return;
  
  }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  
  return (
    <>
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
            <Button
              variant="secondary"
              size="lg"
              aria-label="Learn More"
              tabIndex={0}
              className="hover:bg-secondary-accent transition-colors"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
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
              <Button 
                variant="secondary"
                size="lg"
                className="hover:bg-secondary-accent transition-colors mt-4 uppercase"
              >
                See Workshops
              </Button>
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
              
              <Button 
                variant="secondary"
                size="lg"
                className="hover:bg-secondary-accent transition-colors mt-4"
              >
                SEE WORKSHOPS
              </Button>
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
                <Button 
                  variant="secondary"
                  size="lg"
                  className="hover:bg-secondary-accent transition-colors mt-4 uppercase"
                >
                  Learn More
                </Button>
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

      <section className="py-24 bg-primary-accent">
        <div className="container mx-auto px-4">
        <div>
            <h3 className={cn(headingFont.className, "text-sm uppercase text-secondary-accent text-center mx-auto mb-8")}>Client Testimonials</h3>
            <h2 className={cn(headingFont.className, "text-3xl md:text-4xl font-bold text-white text-center mb-16")}>
            Here is what some of our clients have to say about their experience with us.
            </h2>
          </div>
          <div className="">
            <Carousel 
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={5000}
              removeArrowOnDeviceType={["tablet", "mobile"]}
              itemClass="px-4"
            >
              {testimonials.map((testimonial: any) => (
                <TestimonialCard
                  key={testimonial.id}
                  name={testimonial.name}
                  photo={testimonial.photo.url}
                  testimonial={testimonial.testimonial}
                  profession={testimonial.proffession}
                />
              ))}
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
}
