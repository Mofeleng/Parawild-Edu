"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { newsletterSchema } from "@/lib/constants/zodschemas"
import { useState } from "react"
import FormSuccessMessage from "./form-success"
import FormErrorMessage from "./form-error"

export default function NewsletterForm() {

    const [ loading, setLoading ] = useState<boolean>(false)
    const [ success, setSuccess ] = useState<boolean>(false)
    const [ error, setError ] = useState<string|null>(null)

    const form = useForm<z.infer<typeof newsletterSchema>>({
        resolver: zodResolver(newsletterSchema),
        defaultValues: {
          name: "",
          email: ""
        },
      })
    
      const handleSubmit = async (values: z.infer<typeof newsletterSchema>) => {
        try {
            setLoading(true)
            const req = await fetch('/api/subscribe', {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(values)
    
            })

            setSuccess(true)
            setLoading(false)
            setError(null)
        } catch (error:any) {
            console.log(`Something went wrong, ${error.message}`)
            setError('Something went wrong.')
        }
        
      }

      const handleFormReset = () => {
        form.reset()
        setSuccess(false)
        setError(null)
      }
    return (
        <>
            {
                success ? (
                    <>
                        <FormSuccessMessage onClick={() => handleFormReset()} />
                    </>
                ): (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input 
                                placeholder="Enter your name" 
                                {...field}
                                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                            />
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
                            <FormControl>
                            <Input 
                                placeholder="Enter your email" 
                                {...field}
                                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                        )}
                    />
                    <Button type="submit" variant="secondary">
                        Subscribe
                    </Button>
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