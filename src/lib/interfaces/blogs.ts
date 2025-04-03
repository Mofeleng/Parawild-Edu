export interface BlogPost {
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

export interface BlogResponse {
    blogs: BlogPost[];
}

export interface Category {
    category: string;
  }
  
export interface Content {
html: string;
}
  
export interface Author {
    name: string;
    bio: string;
    avatar: {
    url: string;
    };
}
  
export interface BlogData {
title: string;
published: string;
preview: string;
categories: Category[];
id: string;
content: Content;
author: Author;
}

export interface CurrentBlogResponse {
blog: BlogData;
}
