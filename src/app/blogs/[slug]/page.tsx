'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PageLoader from "@/components/page-loader";
import FetchError from "@/components/fetch-error";
import Link from "next/link";
import { graphQlClientWithSerializer } from "@/lib/constants/graph-ql";
import { getCurrentPost } from "@/lib/graphQL/blogs";
import { Card, CardContent } from "@/components/ui/card";
import convertDateToString from "@/lib/actions/convertDateToString";
import { BlogData, CurrentBlogResponse } from "@/lib/interfaces/blogs";

const BlogReader = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<BlogData | null>(null); // Fixed type
  const [loading, setLoading] = useState<boolean>(true);

  /*const [success, setSuccess] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);*/

  // Endpoints and API token from environment variables
  //const ENDPOINT_SECOND = process.env.NEXT_PUBLIC_API_KEY_GRAPHCMS_SECOND_ENDPOINT!;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const variables = { slug };
        const result = await graphQlClientWithSerializer.request<CurrentBlogResponse>(getCurrentPost, variables);
        setBlog(result.blog); // Fixed: Ensure we set the correct blog object
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

  if (!blog) { // Fixed: No need to check blog.blog, just check if blog exists
    return <FetchError error="Blog not found"/>;
  }

  const { title, published, categories, content, author } = blog;

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
            By <span className="font-medium">{author.name}</span> • {convertDateToString(published, true)}
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
