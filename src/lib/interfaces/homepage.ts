// Interface for the GraphQL response
export interface Testimonial {
    id: string;
    name: string;
    proffession: string;
    photo: {
      url: string;
    };
    testimonial: string;
  }
  
  export interface GetTestimonialsResponse {
    testimonials: Testimonial[];
  }
  