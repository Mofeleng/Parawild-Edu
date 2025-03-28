import { recievedEmailTemplate } from "@/lib/templates/emailTemplates";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req:Request) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY_MARKUS);
        const devEmail = (process.env.EMAIL_TO_SEND_TO as string);

        const { name, email } = await req.json()

        const { data, error } = await resend.emails.send({
            from: 'newslettersubscriptions@parawild.org',
            to: devEmail,
            subject: `New newsletter subscription from ${name}`,
            html: recievedEmailTemplate(
                email,
                name,
                `Name: ${name},Email: ${email}`,
                `New newsletter subscription from:`,
                `See more newsletter subscriptions on your Hygraph dashboard.`)
          });
        
        if ( error ) {
            return NextResponse.json({ error: `Something went wrong ${error.message}`}, { status: 400})
        }
        return NextResponse.json({ message: "Success" }, { status: 200 })
    } catch (error:any) {
        return NextResponse.json({ error: `Something went wrong ${error.message}`}, { status: 400})
    }
}