"use client"

import { useState, useEffect } from "react";
import { GraphQLClient, gql } from "graphql-request";
import PageLoader from "@/components/page-loader";
import FetchError from "@/components/fetch-error";
import { headingFont } from "@/lib/constants/fonts";
import { cn } from "@/lib/utils";
import WorkshopPreviewCard from "@/components/vet-card-preview";

export default function Workshops() {
    const [ workshops, setWorkshops ] = useState<any>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<null|string>(null);
    
    const [posts, setPosts] = useState<any>([]);
    const [postLoading, setPostLoading] = useState<boolean>(true);
    const [postError, setPostError] = useState<null|string>(null);

    const ENDPOINT = process.env.NEXT_PUBLIC_GRAPHCMS_MAIN_ENDPOINT;

    useEffect(() => {
        const fetchData = async () => {
          try {
            const graphQLClient = new GraphQLClient(ENDPOINT!, {
              method: 'GET',
              jsonSerializer: {
                parse: JSON.parse,
                stringify: JSON.stringify
              }
            });
            const query = gql`
            query Workshops {
              workshops(where: {active: true}) {
              title
              slug
              id
              active
              forVets
              preview
              coverPhoto {
                url
              }
            }
            }
            `;
      
            const result = await graphQLClient.request(query);
            const response:any = await result;
      
            const workshopData = response.workshops || [];
            setWorkshops(workshopData);
    
            setLoading(false);
    
            const postQuery = gql`
            query Posts() {
              blogs(first: 4) {
                id
                title
                slug
                featured
                published
                preview
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
    
            const postResult = await graphQLClient.request(postQuery);
            const postResponse:any = await postResult;
    
            const postsData = postResponse.blogs || [];
            
            setPosts(postsData);
            setPostLoading(false)
    
          } catch (error) {
            setError("Error Loading Workshops");
            setLoading(false);
          }
        }
        fetchData();
      }, [])

      if (loading || postLoading) {
        return (
          <PageLoader />
      )
      }
      if (!workshops || workshops.length === 0) {
        // Handle the case where workshops is empty or not an array
        return (
          <div>
            <section className="py-16">
              <div className="container text-center">
                <h3>No workshops available.</h3>
              </div>
            </section>
          </div>
        );
      }
      if (error) {
        return (
          <FetchError error="" />
      )
      }
    
      //separate vet workshops and non vet workshops
      const vetWorkshops = workshops.filter((i:any) => (i.forVets));
      const nonVetWorkshops = workshops.filter((i:any) => (!i.forVets));
    

    return (
        <section className="py-24 bg-primary">
            <div className="container mx-auto px-4 space-y-10">
                <div>
                    <h3 className={cn(headingFont.className, "text-sm uppercase text-secondary-accent text-center mx-auto mb-8")}>Workshop</h3>
                    <h2 className={cn(headingFont.className, "text-3xl md:text-4xl font-bold text-white text-center mb-16")}>
                    Learn more about our upcoming workshops and save your spot to be part of the excitement.
                    </h2>
                </div>

                <h3 className={cn(headingFont.className, "text-sm uppercase text-secondary-accent text-center mx-auto mb-8")}>For veterinary students</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    { vetWorkshops.map((workshop:any) => (
                        <WorkshopPreviewCard key={workshop.id} workshop={workshop}/>
                    ))}
                    { vetWorkshops.length === 0 && (
                        <div className="">
                            <p className="">No workshops currently available</p>
                        </div>
                    )}
                </div>

                <h3 className={cn(headingFont.className, "text-sm uppercase text-secondary-accent text-center mx-auto mb-8")}>For non-veterinary students</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    { nonVetWorkshops.map((workshop:any) => (
                        <WorkshopPreviewCard key={workshop.id} workshop={workshop} />
                    ))}
                    { nonVetWorkshops.length === 0 && (
                        <div className="">
                            <p className="">No workshops currently available</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}