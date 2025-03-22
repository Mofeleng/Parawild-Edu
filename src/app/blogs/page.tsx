"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GraphQLClient, gql } from "graphql-request";
import PageLoader from "@/components/page-loader";
import FetchError from "@/components/fetch-error";
import BlogCardPreview from "@/components/blog-card-preview";

export default function Blog() {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [fetchError, setFetchError] = useState<null|string>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const blogsPerPage:number = 10;
    const featuredPostsToShow:number = 2;

    const ENDPOINT = process.env.NEXT_PUBLIC_GRAPHCMS_MAIN_ENDPOINT;

    useEffect(() => {
        const fetchData = async () => {
          try {
            const gqlClient = new GraphQLClient(ENDPOINT!, {
              method: 'GET',
              jsonSerializer: {
                parse: JSON.parse,
                stringify: JSON.stringify
              }
            });
    
            const query = gql`
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
    
            const variables = {
              first: blogsPerPage,
              skip: (currentPage - 1) * blogsPerPage
            };
    
            const result = await gqlClient.request(query, variables);
            const response:any = await result;
            setData(response.posts);
            console.log(response)
    
            // Sort the data by publication date in descending order
            setData(response.blogs.sort((a:any, b:any) => new Date(b.published).getTime() - new Date(a.published).getTime()));
    
            setLoading(false);
          } catch (err) {
            setFetchError('Error fetching blog posts' + ` ${err}`);
            setLoading(false);
          }
        };
        fetchData();
      }, [currentPage]);
    
      const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
      };
    
      const handleNextPage = () => {
        if (data.length > blogsPerPage) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      };

      if ( loading) {
        return <PageLoader />
      }

      if (fetchError) {
        return <FetchError error={fetchError} />
      }
    
      const featuredPosts:any = data.filter((post:any) => post.featured).slice(0, featuredPostsToShow);
    return (
    <>
    <section className="bg-primary-accent py-16 relative min-h-screen w-full flex items-center">
      <div className="container mx-auto px-4">
        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center mb-12 mt-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Welcome to Our Blog
          </h1>
          <p className="text-lg text-gray-200 mb-12">
            Discover insights, stories and expert knowledge about wildlife management, conservation
            and the natural world. Join us as we explore the fascinating realm of wildlife.
          </p>

          {/* Featured Posts Section */}
          <h2 className="text-2xl font-semibold text-white mb-4">
            Featured Posts
          </h2>
          <hr className="border-white/20 mb-8" />

          {/* Featured Posts Grid */}
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {/* Featured Post 1 */}
            {featuredPosts.map((featuredPost:any) => {
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
          
          {/* Blog Post 1 */}
          <article className="bg-white/5 rounded-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/blog-1.jpg"
                alt="Wildlife tracking techniques"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="text-sm text-gray-300 mb-2">Wildlife Management</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Essential Wildlife Tracking Techniques
              </h3>
              <p className="text-gray-300 mb-4">
                Learn about the fundamental tracking methods used by wildlife experts in the field...
              </p>
              <Button
                variant="link"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Read more about wildlife tracking techniques"
              >
                Read More →
              </Button>
            </div>
          </article>

          {/* Blog Post 2 */}
          <article className="bg-white/5 rounded-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/blog-2.jpg"
                alt="Conservation challenges"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="text-sm text-gray-300 mb-2">Conservation</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Current Challenges in Wildlife Conservation
              </h3>
              <p className="text-gray-300 mb-4">
                Exploring the major obstacles facing wildlife conservation efforts today...
              </p>
              <Button
                variant="link"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Read more about conservation challenges"
              >
                Read More →
              </Button>
            </div>
          </article>

          {/* Blog Post 3 */}
          <article className="bg-white/5 rounded-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/blog-3.jpg"
                alt="Wildlife photography tips"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="text-sm text-gray-300 mb-2">Photography</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Wildlife Photography: Tips and Techniques
              </h3>
              <p className="text-gray-300 mb-4">
                Master the art of capturing wildlife in their natural habitat...
              </p>
              <Button
                variant="link"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Read more about wildlife photography"
              >
                Read More →
              </Button>
            </div>
          </article>

          {/* Blog Post 4 */}
          <article className="bg-white/5 rounded-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/blog-4.jpg"
                alt="Animal behavior study"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="text-sm text-gray-300 mb-2">Research</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Understanding Animal Behavior Patterns
              </h3>
              <p className="text-gray-300 mb-4">
                Insights into how animals behave and adapt in their environments...
              </p>
              <Button
                variant="link"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Read more about animal behavior"
              >
                Read More →
              </Button>
            </div>
          </article>

          {/* Blog Post 5 */}
          <article className="bg-white/5 rounded-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/blog-5.jpg"
                alt="Ecosystem preservation"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="text-sm text-gray-300 mb-2">Ecosystem</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Preserving Natural Ecosystems
              </h3>
              <p className="text-gray-300 mb-4">
                The importance of maintaining balanced and healthy ecosystems...
              </p>
              <Button
                variant="link"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Read more about ecosystem preservation"
              >
                Read More →
              </Button>
            </div>
          </article>

          {/* Blog Post 6 */}
          <article className="bg-white/5 rounded-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/blog-6.jpg"
                alt="Wildlife education"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="text-sm text-gray-300 mb-2">Education</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                The Future of Wildlife Education
              </h3>
              <p className="text-gray-300 mb-4">
                How modern education is shaping wildlife conservation awareness...
              </p>
              <Button
                variant="link"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Read more about wildlife education"
              >
                Read More →
              </Button>
            </div>
          </article>

        </div>
      </div>
    </section>
    </>
    )
}