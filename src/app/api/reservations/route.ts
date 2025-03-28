import { NextResponse } from "next/server";
import { workshopEmailTemplate } from "@/lib/templates/workshopEmailTemplate";
import { Resend } from "resend";

export async function POST(req: Request) {
    try {
        const devEmail = (process.env.EMAIL_TO_SEND_TO as string);
        const { to, subject, customer_name, workshop_title, workshop_date, address, email } = await req.json();

        const resend = new Resend(process.env.RESEND_API_KEY_MARKUS);

        const { data, error } = await resend.emails.send({
            from: 'noreply@parawild.org',
            to: to,
            subject: subject,
            html: workshopEmailTemplate(
                customer_name,
                'Thank you for reserving your spot',
                `Thank you for purchasing a ticket for our upcoming workshop '${workshop_title}' We're thrilled to have you join us! </br> </br> Here are the details of your purchase:`,
                `Please keep this email for your records. If you have any questions or need further assistance, feel free to contact our customer support team at pienaarmarkus007@gmail.com .`,
                address,
                workshop_date,
                null,
                null),
        });

        if (error) {
            return NextResponse.json({ error: `Something went wrong ${error.message}`}, { status: 400})
        }

        const { data:mod_data, error:mod_error } = await resend.emails.send({
            from: 'reservations@parawild.org',
            to: devEmail,
            subject: `New ticket sale for workshop [${workshop_title}]`,
            html: workshopEmailTemplate(
                'Markus',
                'Congratulations you just sold a ticket',
                `Congratulations on your new sale on the workshop ${workshop_title}. </br></br> Here are the purchaser's details: `,
                `Remember to get in touch with the client ASAP and check more information on their application on Hygraph`,
                null,
                null,
                email,
                customer_name)
        });
        
        if (mod_error) {
            return NextResponse.json({ error: `Something went wrong ${mod_error.message}`}, { status: 400 })
        }

        return NextResponse.json({ message: "Success"}, { status: 200 })

    } catch (error:any) {
        return NextResponse.json({error: `Something went wrong ${error.message}`}, { status: 400})
    }
}