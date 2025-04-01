import { gql } from "graphql-request";

export const getCurrentWorkshop = gql`
    query Workshops($slug: String!) {
    workshop(where: {slug: $slug}) {
        title
        slug
        id
        active
        forVets
        dates
        attending
        secondWorkshopAttending
        reservationFee
        address
        coverPhoto {
        url
        }
        about {
        html
        }
    }
    }
`;

export const getWorkshops = gql`
    query Workshops {
        workshops(where: {active: true}) {
        title
        slug
        id
        active
        forVets
        preview
        coverPhoto {
                url
            }
        }
    }
`;

export const getBlogPosts = gql`
    query Posts() {
        blogs(first: 4) {
        id
        title
        slug
        featured
        published
        preview
        categories {
            category
        }
        author {
            name
            avatar {
                url
            }
        }
        }
    }
    `;
    