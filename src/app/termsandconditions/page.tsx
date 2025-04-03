import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms and Conditions</title>
        <meta name="description" content="Read our terms and conditions" />
      </Head>

      <section className="py-24">
        <div className="container mx-auto px-8">
          <Card className="max-w-6xl mx-auto bg-primary-accent">
            <CardHeader>
              <CardTitle className="text-4xl font-bold">Terms and Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Welcome to ParaWild! Before purchasing a workshop ticket and embarking on your journey to South Africa, please carefully read and understand the following terms and conditions.
              </p>
              <p>
                <strong>Booking and Payment:</strong> By purchasing a workshop ticket for 3000 US dollars, you agree to pay the specified amount for the workshop conducted by ParaWild. Payment must be made in full at the time of booking.
              </p>
              <p>
                <strong>Workshop Details:</strong> The workshop will take place in South Africa at the specified location and date as mentioned on the ticket.
              </p>
              <p>
                <strong>Travel Arrangements:</strong> Participants are responsible for booking their own flight tickets to South Africa, ensuring that their arrival aligns with the specified time on the workshop ticket. ParaWild is not responsible for any travel arrangements, including flights, accommodations, or transportation, aside from the workshop itself.
              </p>
              <p>
                <strong>Participant Requirements:</strong> Participants must ensure they meet any visa, passport, health, or other entry requirements for traveling to South Africa. It is the participant&apos;s responsibility to obtain any necessary travel documents.
              </p>
              <p>
                <strong>No Refund Policy:</strong> All workshop ticket purchases are non-refundable. Once purchased, tickets cannot be refunded or exchanged for any reason, including but not limited to personal circumstances, travel restrictions, or changes in plans.
              </p>
              <p>
                <strong>Workshop Changes:</strong> ParaWild reserves the right to make changes to the workshop schedule, itinerary, or content if necessary. In the event of any changes, participants will be notified as soon as possible.
              </p>
              <p>
                <strong>Participant Conduct:</strong> Participants are expected to conduct themselves in a respectful and appropriate manner during the workshop and any associated activities. ParaWild reserves the right to refuse participation or remove any participant from the workshop if their conduct is deemed disruptive or inappropriate, without offering a refund.
              </p>
              <p>
                <strong>Liability Waiver:</strong> While every effort is made to ensure the safety and enjoyment of participants during the workshop, ParaWild shall not be held liable for any loss, damage, injury, or expense incurred by participants during the workshop or related activities.
              </p>
              <p>
                <strong>Intellectual Property:</strong> All materials, content, and intellectual property provided during the workshop are owned by ParaWild or its affiliates and are for personal use only. Participants may not reproduce, distribute, or use any materials provided without prior written consent.
              </p>
              <p>
                <strong>Governing Law:</strong> These terms and conditions shall be governed by and construed in accordance with the laws of South Africa. Any disputes arising from these terms and conditions shall be subject to the exclusive jurisdiction of the courts of South Africa.
              </p>
              <p>
                By purchasing a workshop ticket and participating in the workshop, you acknowledge that you have read, understood, and agree to abide by these terms and conditions.
              </p>
              <p>
                If you have any questions or concerns regarding these terms and conditions, please contact us at{' '}
                <Link href="mailto:pienaarmarkus007@gmail.com" className="underline">
                  pienaarmarkus007@gmail.com
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
