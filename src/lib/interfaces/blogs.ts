interface BlogPost {
    id: string;
    title: string;
    slug: string;
    featured: boolean;
    published: string;
    preview: string;
    cover: {
        url: string;
    };
    categories: {
        category: string;
    }[];
    author: {
        name: string;
        avatar: {
            url: string;
        };
    };
}

interface BlogResponse {
    blogs: BlogPost[];
}

interface Category {
    category: string;
  }
  
  interface Content {
    html: string;
  }
  
  interface Author {
    name: string;
    bio: string;
    avatar: {
      url: string;
    };
  }
  
  interface BlogData {
    title: string;
    published: string;
    preview: string;
    categories: Category[];
    id: string;
    content: Content;
    author: Author;
  }
  
  interface GraphQLResponse {
    blog: BlogData;
  }
  