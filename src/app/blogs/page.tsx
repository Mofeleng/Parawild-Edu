"use client"

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { graphQlClientWithSerializer } from "@/lib/constants/graph-ql";
import PageLoader from "@/components/page-loader";
import FetchError from "@/components/fetch-error";
import BlogCardPreview from "@/components/blog-card-preview";
import BlogPreview from "@/components/blog-preview";
import { cn } from "@/lib/utils";
import { headingFont } from "@/lib/constants/fonts";
import { getBlogPosts } from "@/lib/graphQL/blogs";
import { BlogPost, BlogResponse } from "@/lib/interfaces/blogs";

export default function Blog() {
    const [data, setData] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [fetchError, setFetchError] = useState<null|string>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const blogsPerPage:number = 10;
    const featuredPostsToShow:number = 2;

    useEffect(() => {
        const fetchData = async () => {
          try {
            const variables = {
              first: blogsPerPage,
              skip: (currentPage - 1) * blogsPerPage
            };
            const result:BlogResponse = await graphQlClientWithSerializer.request(getBlogPosts, variables);
            // Sort the data by publication date in descending order
            setData(result.blogs.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()));
            setLoading(false);
          } catch (err) {
            setFetchError('Error fetching blog posts' + ` ${err}`);
            setLoading(false);
          }
        };
        fetchData();
      }, [currentPage]);

      if ( loading) {
        return <PageLoader />
      }

      if (fetchError) {
        return <FetchError error={fetchError} />
      }
    
      const featuredPosts:BlogPost[] = data.filter((post) => post.featured).slice(0, featuredPostsToShow);
      const hasMore = data.length === blogsPerPage;
    return (
    <>
    <section className="bg-primary-accent py-16 relative min-h-screen w-full flex items-center">
      <div className="container mx-auto px-4">
        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center mb-12 mt-10">
          <h1 className={cn(headingFont.className, "text-4xl md:text-5xl font-bold text-white mb-6")}>
            Welcome to Our Blog
          </h1>
          <p className="text-lg text-gray-200 mb-12">
            Discover insights, stories and expert knowledge about wildlife management, conservation
            and the natural world. Join us as we explore the fascinating realm of wildlife.
          </p>

          <h2 className={cn(headingFont.className, "text-2xl font-semibold text-white mb-4")}>
            Featured Posts
          </h2>
          <hr className="border-white/20 mb-8" />
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {featuredPosts.map((featuredPost) => {
                return <BlogCardPreview key={featuredPost.id} post={featuredPost} />;
            })}
          </div>

        </div>
      </div>
    </section>
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((post) => {
                return <BlogPreview post={post} key={post.id} />;
            })}
        </div>
      </div>
    </section>
    <section className="py-8">
      <div className="container mx-auto px-4 flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="text-white hover:text-gray-300 disabled:opacity-50"
        >
          Previous Page
        </Button>

        <Button
          variant="outline" 
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={!hasMore}
          className="text-white hover:text-gray-300 disabled:opacity-50"
        >
          Next Page
        </Button>
      </div>
    </section>
    </>
    )
}