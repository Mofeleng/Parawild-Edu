
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

export default function NewsletterForm() {
    const form = useForm<z.infer<typeof newsletterSchema>>({
        resolver: zodResolver(newsletterSchema),
        defaultValues: {
          email: "",
        },
      })
    
      const handleSubmit = async (values: z.infer<typeof newsletterSchema>) => {
        // Handle newsletter signup
        console.log(values)
      }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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