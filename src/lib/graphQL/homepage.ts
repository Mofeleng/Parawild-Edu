import { gql } from "graphql-request"

export const getTestimonials = gql`
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