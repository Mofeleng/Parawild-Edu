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