"use client"
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
import { contactFormSchema } from "@/lib/constants/zodschemas";

import { useState } from "react";
import FormSuccessMessage from "./form-success"
import FormErrorMessage from "./form-error"

export default function ContactForm () {
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
        <>
              {
              success ? (
                <FormSuccessMessage onClick={() => handleFormReset()} />
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
                <FormErrorMessage onClick={() => handleFormReset()} />
              )
            }
          
        </>
    )
}