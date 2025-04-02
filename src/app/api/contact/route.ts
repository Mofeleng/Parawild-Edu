import { recievedEmailTemplate } from "@/lib/templates/emailTemplates";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY_MARKUS);
        const devEmail = process.env.EMAIL_TO_SEND_TO;
        const { fullname, email, message } = await req.json()

        const { data, error } = await resend.emails.send({
            from: 'customeremails@parawild.org',
            to: devEmail!,
            subject: `New message from ${fullname}`,
            html: recievedEmailTemplate(email, fullname, message, `Here's what ${fullname} wrote`, `Don't forget to reply to ${fullname} in time on their email address: ${email} `)
          });
          if (error) throw new Error(error.message)
          return NextResponse.json({ message: data}, { status: 200})

    } catch (error:unknown) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
    }
}