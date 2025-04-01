'use client';

import { useState, useEffect, FormEvent } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";
import { GraphQLClient, gql } from "graphql-request";
import useDateConvertToString from "@/lib/hooks/useDateConvertToString";
import PageLoader from "@/components/page-loader";
import FetchError from "@/components/fetch-error";
import Link from "next/link";
import { graphQlClientWithSerializer } from "@/lib/constants/graph-ql";
import { getCurrentPost } from "@/lib/graphQL/blogs";
import { Card, CardContent } from "@/components/ui/card";

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

const BlogReader = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<GraphQLResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Endpoints and API token from environment variables
  const ENDPOINT = process.env.NEXT_PUBLIC_GRAPHCMS_MAIN_ENDPOINT!;
  const ENDPOINT_SECOND = process.env.NEXT_PUBLIC_API_KEY_GRAPHCMS_SECOND_ENDPOINT!;
  const GRAPH_CMS_TOKEN = process.env.NEXT_PUBLIC_GRAPHCMS_API_TOKEN!;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const variables = { slug };
        const result = await graphQlClientWithSerializer.request<GraphQLResponse>(getCurrentPost, variables);
        setBlog(result);
      } catch (err) {
        // Error handling can be extended as needed
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (loading) {
    return <PageLoader />;
  }

  if (!blog || !blog.blog) {
    return <FetchError error="Blog not found"/>
  }


  const { title, published, categories, content, author } = blog.blog;

  return (
<section className="py-24">
  <div className="px-8 container mx-auto max-w-4xl">
    <div className="text-center space-y-3  mb-10">
      <div className=" text-sm text-muted-foreground">
        {categories.map((cat, index) => (
          <span key={index} className="inline-block">
            {cat.category}{index < categories.length - 1 && ", "}
          </span>
        ))}
      </div>
      <h1 className="text-4xl font-extrabold leading-tight mb-3">{title}</h1>
      <div className="text-sm text-muted-foreground">
        By <span className="font-medium">{author.name}</span> • {useDateConvertToString(published, true)}
      </div>
    </div>

    {/* Blog Content */}
    <Card className="bg-primary-accent shadow-lg rounded-lg">
      <CardContent className="p-10">
      <div 
      className="prose lg:prose-lg prose-invert mx-auto leading-relaxed"
      dangerouslySetInnerHTML={{ 
        __html: content.html.replace(/<p>/g, '<p class="mb-6">')
                             .replace(/<img/g, '<img class="my-6 rounded-lg shadow-md"')
                             .replace(/<ul>/g, '<ul class="pl-5 list-disc">')
                             .replace(/<ol>/g, '<ol class="pl-5 list-decimal">')
                             .replace(/<h1>/g, '<h1 class="mb-4 font-bold text-3xl">')
                             .replace(/<h2>/g, '<h2 class="mb-4 font-semibold text-2xl">')
                             .replace(/<h3>/g, '<h3 class="mb-3 font-semibold text-xl">')
                             .replace(/<blockquote>/g, '<blockquote class="border-l-4 pl-4 italic">')
      }} 
    />
      </CardContent>
    </Card>

    {/* Back to Blogs Link */}
    <div className="mt-12 text-center">
      <Link href="/blogs" className="text-accent font-medium hover:underline">
        ← Back to Blogs
      </Link>
    </div>
  </div>
</section>
  );
};

export default BlogReader;
