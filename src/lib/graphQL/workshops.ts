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
