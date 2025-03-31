"use client"

import React, { useState, useEffect } from "react"
import TestimonialCard from "@/components/testimonial-card"
import { headingFont } from "@/lib/constants/fonts"
import { cn } from "@/lib/utils"
import { GraphQLClient, gql } from "graphql-request"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [error, setError] = useState<boolean | string>(false)
  const [loadingTestimonials, setLoadingTestimonials] = useState<boolean>(true)
  const ENDPOINT = process.env.NEXT_PUBLIC_GRAPHCMS_MAIN_ENDPOINT

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const graphQLClient = new GraphQLClient(ENDPOINT!, {
          method: "GET",
          jsonSerializer: {
            parse: JSON.parse,
            stringify: JSON.stringify,
          },
        })

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
        `
        const result: any = await graphQLClient.request(query)
        const response = result.testimonials || null

        if (!response) {
          setError("No testimonials to show")
        } else {
          setTestimonials(response)
        }
      } catch (err) {
        setError("Error fetching testimonials")
      } finally {
        setLoadingTestimonials(false)
      }
    }
    fetchTestimonials()
  }, [ENDPOINT])

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  }

  if (loadingTestimonials) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <section className="py-24 bg-primary-accent">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h3
            className={cn(
              headingFont.className,
              "text-sm uppercase text-secondary-accent text-center mb-4"
            )}
          >
            Client Testimonials
          </h3>
          <h2
            className={cn(
              headingFont.className,
              "text-3xl md:text-4xl font-bold text-white text-center"
            )}
          >
            Here is what some of our clients have to say about their experience with us.
          </h2>
        </div>
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          containerClass="carousel-container"
          itemClass="px-4"
        >
          {testimonials.map((testimonial: any) => (
            <div key={testimonial.id} className="w-full">
              <TestimonialCard
                name={testimonial.name}
                photo={testimonial.photo.url}
                testimonial={testimonial.testimonial}
                profession={testimonial.proffession}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  )
}
