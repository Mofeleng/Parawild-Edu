"use client"

import { useParams } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { CalendarDays, MapPin, Info } from "lucide-react";
import Image from "next/image";
import { headingFont } from "@/lib/constants/fonts";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import useDateConvertToString from "@/lib/hooks/useDateConvertToString";
import FetchError from "@/components/fetch-error";
import PageLoader from "@/components/page-loader";
import { graphQlClientWithSerializer } from "@/lib/constants/graph-ql";
import Link from "next/link";
import { getCurrentWorkshop } from "@/lib/graphQL/workshops";

export default function WorkshopView() {
    const { slug } = useParams();
    const [ workshop, setWorkshop ] = useState<any>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<null|string>(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const variables = {
                    slug: slug,
                }
                const result = await graphQlClientWithSerializer.request(getCurrentWorkshop, variables);
                const response:any = await result;
                const workshopData = response.workshop || [];

                setWorkshop(workshopData);
                setLoading(false);
            } catch (error:any) {
                setError(error.message);
                setLoading(false);
            }
        }
        fetchData();
    }, [slug]);
    
    if (loading) {
        return (
          <PageLoader />
      )
      }
      if (!workshop || workshop.length === 0) {
        return (
          <div>
            <section className="section">
              <div className="container centered">
                <h3>Workshop is not available.</h3>
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

    //converting dates to string dates 
    const startDate = useDateConvertToString(workshop.dates[0], false);//formatDate(workshop.dates[0]);
    const endDate = useDateConvertToString(workshop.dates[1], false); //formatDate(workshop.dates[1]);
    const startDate_2 = useDateConvertToString(workshop.dates[2], false);
    const endDate_2 = useDateConvertToString(workshop.dates[3], false);

    return (
        <div className="min-h-screen bg-primary-accent">
            {/* Hero Section */}
            <div className="relative h-[80vh] w-full">
                <Image
                    src={workshop.coverPhoto.url}
                    alt="Workshop cover image"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <h1 className={cn(
                            headingFont.className,
                            "text-4xl md:text-5xl font-bold text-secondary mb-8"
                        )}>
                            {workshop.title}
                        </h1>

                        {/* Date Section */}
                        <div className="bg-white/5 rounded-lg p-6 mb-8">
                            <div className="flex items-center gap-2 text-white mb-4">
                                <CalendarDays className="h-5 w-5" />
                                <h2 className="text-xl font-semibold">Date and time</h2>
                            </div>
                            <div className="mb-4">
                                <p className="text-white/90">{startDate} - {endDate}</p>
                                <p className="text-green-400">({workshop.attending} SPOTS LEFT)</p>
                                {startDate_2 && endDate_2 && (
                                    <>
                                        <p className="text-white/60 my-2">OR</p>
                                        <div className="mb-4 last:mb-0">
                                            <p className="text-white/90">{startDate_2} - {endDate_2}</p>
                                            <p className="text-green-400">({workshop.secondWorkshopAttending} SPOTS LEFT)</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Location Section */}
                        <div className="bg-white/5 rounded-lg p-6 mb-8">
                            <div className="flex items-center gap-2 text-white mb-4">
                                <MapPin className="h-5 w-5" />
                                <h2 className="text-xl font-semibold">Location</h2>
                            </div>
                            <p className="text-white/90">{workshop.address}</p>
                        </div>

                        {/* About Section */}
                        <div className="bg-white/5 rounded-lg p-6">
                            <div className="flex items-center gap-2 text-white mb-4">
                                <Info className="h-5 w-5" />
                                <h2 className="text-xl font-semibold">About this workshop</h2>
                            </div>
                            <div 
                                className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-white/90 prose-strong:text-white prose-ul:text-white/90 prose-li:marker:text-white"
                                dangerouslySetInnerHTML={{ __html: workshop.about.html }} 
                            />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-5 bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                            <div className="text-center mb-6">
                                <p className="text-4xl font-bold text-white">${workshop.reservationFee}</p>
                                <p className="text-white/60">Registration fee</p>
                            </div>
                            {workshop.attending == 0 && workshop.secondWorkshopAttending == 0 ? (
                                <p className="paragraph">Sorry, this workshop is currently not accepting any applications</p>

                            ):(
                                <Link href={`../reservations/${slug}`} className={cn(
                                    buttonVariants({
                                        size: 'lg'
                                    }), "w-full bg-secondary hover:bg-secondary text-white uppercase")
                                }>Book now</Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}