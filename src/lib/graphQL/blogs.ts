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

export const getCurrentPost = gql`
query Posts($slug: String!) {
  blog(where: { slug: $slug }) {
    title
    published
    preview
    categories {
      category
    }
    id
    content {
      html
    }
    author {
      name
      bio
      avatar {
        url
      }
    }
  }
}
`;