'use client';

import { useEffect, useState } from 'react';
import ContactForm from '@/components/contact-form';

import { GraphQLClient, gql } from 'graphql-request';
import { graphQLClient } from '@/lib/constants/graph-ql';
import FetchError from '@/components/fetch-error';
import PageLoader from '@/components/page-loader';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getContactPage } from '@/lib/graphQL/nav-footer';

const ENDPOINT = process.env.NEXT_PUBLIC_GRAPHCMS_MAIN_ENDPOINT as string;

export default function Contact() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchContactInfo = async () => {
      try {
        const result:any = await graphQLClient.request(getContactPage);
        setData(result.contactPages[0]);
      } catch (error) {
        console.error('Error fetching contact data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  if (loading) return <PageLoader />;
  if (!data) return <FetchError error='No data found' />;

  return (
    <>
      <div className="container mx-auto px-4 py-24">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="text-lg text-muted-foreground mt-2">Get in touch with us for more information.</p>
        </section>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className='bg-primary-accent'>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
          <Card className='bg-primary-accent'>
            <CardHeader>
              <CardTitle>Office Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Our Offices</h3>
                <p className="text-muted-foreground">{data.offices}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Location</h3>
                <div className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: data.location.html }} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Working Hours</h3>
                <div className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: data.workingHours.html }} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Contact</h3>
                <div className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: data.contactInformation.html }} />
              </div>
            </CardContent>
          </Card>
        </div>
        <section className="text-center py-12 rounded-lg mt-12 border border-secondary bg-primary-accent ">
          <h2 className="text-2xl font-bold text-white">Join one of our workshops</h2>
          <p className="text-white text-lg mt-2">
            Learn more about wildlife management by joining one of our workshops. Available for vets and non-vets.
          </p>
          <Link href="/workshops" passHref>
            <Button variant="secondary" className="mt-4">See Workshops</Button>
          </Link>
        </section>
      </div>
    </>
  );
}
