"use client"

import TestimonialCard from "@/components/testimonial-card";
import { headingFont } from "@/lib/constants/fonts";
import { cn } from "@/lib/utils";
import { GraphQLClient, gql } from "graphql-request";
import { useState, useEffect } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"

export default function TestimonialsSection() {
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
    )
}