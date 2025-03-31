import { gql } from "graphql-request";

export const getBlogPosts = gql`
    query Posts($first: Int, $skip: Int) {
    blogs(first: $first, skip: $skip) {
        id
        title
        slug
        featured
        published
        preview
        cover {
        url
        }
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