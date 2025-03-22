"use client"

import { headingFont } from "@/lib/constants/fonts";
import { contactFormSchema } from "@/lib/constants/zodschemas";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useState } from "react";

export default function ContactUsSection() {
  const [ success, setSuccess ] = useState<boolean>(false)
  const [ error, setError ] = useState<any>(null)
  const [ loading, setLoading ] = useState<boolean>(false)

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullname: "",
      email: "",
      message: ""
    },
  })

  const handleFormReset = () => {
    form.reset()
    setSuccess(false)
    setError(null)
  }

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    try {
      setLoading(true)
      const req = await fetch('/api/contact', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(values)
      })

      const res = await req.json()
      setSuccess(true)
      setLoading(false)
    } catch (error:any) {
      setError(`Something went wrong ${error.message}`)
      setLoading(false)
    }
  }


    return (
        <section className="py-24">
        <div className="container mx-auto px-4">
          <div>
            <h3 className={cn(headingFont.className, "text-sm uppercase text-secondary-accent text-center mx-auto mb-8")}>Get in Touch</h3>
            <h2 className={cn(headingFont.className, "text-3xl md:text-4xl font-bold text-white text-center mb-16")}>
            We’d love to hear from you. Get in touch with us!
            </h2>
          </div>
        <Card className="max-w-3xl mx-auto p-8 bg-primary-accent">
          <CardContent>
            {
              success ? (
                <div className="bg-green-400 text-white p-4 rounded-md cursor-pointer" onClick={() => handleFormReset()}>
                  <div>Thank you! Your submission has been received!</div>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="fullname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Hello, I would like to talk about..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" variant="secondary"
                    size="lg" disabled={loading}>Submit</Button>
                  </form>
                </Form>
              )
            }

            {
              error && (
                <div className="bg-red-400 text-white p-4 rounded-md cursor-pointer mt-10" onClick={() => handleFormReset()}>
                  <div>Something went wrong. Please contact pienaarmarkus007@gmail.com if error persists</div>
                </div>
              )
            }
          
          </CardContent>
        </Card>
          

        </div>
      </section>
    )
}