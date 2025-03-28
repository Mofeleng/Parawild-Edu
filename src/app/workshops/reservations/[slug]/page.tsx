"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { GraphQLClient, gql } from "graphql-request";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

// Shadcn UI components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useDateConvertToString from "@/lib/hooks/useDateConvertToString";
import { cn } from "@/lib/utils";
import FetchError from "@/components/fetch-error";
import PageLoader from "@/components/page-loader";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

// Define the form schema with Zod (including some cross-field validations)
const registrationSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    institution: z.string().optional(),
    degree: z.string().optional(),
    yearOfStudy: z.string().optional(),
    dateSelected: z.string().min(1, "Please select a date"),
    applicationMotivation: z.string().optional(),
    knowledgeApplication: z.string().optional(),
    attendedWorkshops: z.boolean(),
    attendedWorkshopContext: z.string().optional(),
    specificExpectedSkills: z.string().optional(),
    emergencyName: z.string().min(1, "Emergency contact name is required"),
    emergencyRelationship: z.string().min(1, "Relationship is required"),
    emergencyEmail: z.string().email("Invalid emergency email"),
    healthRequirements: z.boolean(),
    explainedHealthRequirements: z.string().optional(),
    accepted: z.boolean(),
  })
  .refine(
    (data) =>
      !data.healthRequirements ||
      (data.healthRequirements &&
        data.explainedHealthRequirements?.trim() !== ""),
    {
      message: "Please provide details about your health requirements",
      path: ["explainedHealthRequirements"],
    }
  )
  .refine(
    (data) =>
      !data.attendedWorkshops ||
      (data.attendedWorkshops &&
        data.attendedWorkshopContext?.trim() !== ""),
    {
      message: "Please provide details about your previous workshops",
      path: ["attendedWorkshopContext"],
    }
  )
  .refine((data) => data.accepted === true, {
    message: "You must accept the terms and conditions",
    path: ["accepted"],
  });

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const Registration = () => {
  const router = useRouter();
  const params = useParams() as { slug: string };
  const { slug } = params;

  // Local state for workshop info and submission
  const [workshop, setWorkshop] = useState<any>(null);
  const [toPayFor, setToPayFor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [counterDate, setCounterDate] = useState<number>(0);
  const [ showPayPalButtons, setShowPayPalButtons ] = useState<boolean>(false)
  const [ attendee, setAttendee ] = useState<any>(null)
  const [ error, setError ] = useState<any>(null)


  const ENDPOINT = process.env.NEXT_PUBLIC_GRAPHCMS_MAIN_ENDPOINT;
  const WORKSHOP_ATENDEE_MANAGER_AUTH = process.env.NEXT_PUBLIC_WORKSHOP_ATENDEE_MANAGER_AUTH;

  // Initialize react-hook-form with shadcn Form integration
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      attendedWorkshops: false,
      healthRequirements: false,
      accepted: false,
    },
  });

  // Fetch workshop details on mount
  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const graphqlClient = new GraphQLClient(ENDPOINT as string);
        const query = gql`
          query GetWorkshop($slug: String!) {
            workshop(where: { slug: $slug }) {
              title
              slug
              id
              reservationFee
              attending
              secondWorkshopAttending
              dates
              address
            }
          }
        `;
        const variables = { slug };
        const result: any = await graphqlClient.request(query, variables);
        if (result.workshop) {
          setWorkshop(result.workshop);
          setToPayFor(result.workshop);
        } else {
          setFetchError("Workshop not found. Please go back home.");
        }
      } catch (err) {
        setFetchError("Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshop();
  }, [slug]);

  // Helper to convert dates using your custom hook
  const startDate = workshop ? useDateConvertToString(workshop.dates[0], false) : "";
  const endDate = workshop ? useDateConvertToString(workshop.dates[1], false) : "";
  const startDate_2 = workshop ? useDateConvertToString(workshop.dates[2], false) : "";
  const endDate_2 = workshop ? useDateConvertToString(workshop.dates[3], false) : "";

  // onSubmit function for form submission
  const onSubmit = async (data: RegistrationFormValues) => {
    const { 
      firstName, lastName, email, phoneNumber, degree, institution,
      yearOfStudy, attendedWorkshops, attendedWorkshopContext, specificExpectedSkills,
      emergencyName, emergencyEmail, emergencyRelationship, explainedHealthRequirements,
      healthRequirements, dateSelected, applicationMotivation, knowledgeApplication
     } = data

    try {
      //submit data to hygraph
      const graphQLClient = new GraphQLClient((ENDPOINT as string), {
        headers: {
            authorization: `Bearer ${WORKSHOP_ATENDEE_MANAGER_AUTH!}`
          }
      })

      const mutation = `
        mutation CreateNewAttendee($fn: String!, $ln: String!, $em: String!, $pn: String!, $in: String!, $d: String!, $yos: String!, $wid: String!, $w: String!, $appm: String!, $attw: String!, $attwc: String!, $ssk: String!, $en: String!, $er: String!, $eea: String!, $hr: String!, $hre: String!, $paid: String!, $ds: String!) {
            createAttendee(
                data: {firstName: $fn, lastName: $ln, email: $em, phoneNumber: $pn, degree: $d, educationalInstitution:$in,  yearCompleted: $yos, workshopAttending: $w, workshopId: $wid, motivation: $appm, experience: $attw, experienceInfo: $attwc, expectedKnowledge: $ssk, emergencyContactName: $en, emergencyContactRelationship: $er, emergencyContactEmailAddress: $eea, healthRequirements: $hr, healthRequirementsExplained: $hre, paid: $paid, dateAttending: $ds}
              ) {
                    id,
                    firstName,
                    lastName, 
                    email,
                    phoneNumber,
                    degree,
                    educationalInstitution,
                    yearCompleted,
                    workshopAttending,
                    workshopId,
                    motivation,
                    experience,
                    experienceInfo,
                    expectedKnowledge,
                    emergencyContactName,
                    emergencyContactRelationship, 
                    emergencyContactEmailAddress,
                    healthRequirements,
                    healthRequirementsExplained,
                    paid,
                    dateAttending
              }
        } 
        `;
           /* workshop_to_payfor = workshop;
            console.log("w: ", workshop_to_payfor);
            console.log(toPayFor); */

            const variables = {
              fn: firstName || '',
              ln: lastName || '',
              em: email || '',
              pn: phoneNumber || '',
              in: institution || '',
              d: degree || '',
              yos: yearOfStudy || '',
              wid: workshop.id || '',
              w: workshop.title || '',
              appm: applicationMotivation || '',
              kapp: knowledgeApplication || '',
              attw: attendedWorkshops || '',
              attwc: attendedWorkshopContext || '',
              ssk: specificExpectedSkills || '',
              en: emergencyName || '',
              eea: emergencyEmail || '',
              er: emergencyRelationship || '',
              hr: healthRequirements || '',
              hre: explainedHealthRequirements || '',
              paid: "false",
              ds: dateSelected || ''
            };
            

        console.log(variables)
    
        const result = await graphQLClient.request(mutation, variables);
        console.log("Submit", result)
        const response:any = await result;
        const workshopAttendee = response.createAttendee || null;
        
        if (workshopAttendee) {
            setError(null);
            setShowPayPalButtons(true)
            setAttendee(workshopAttendee);
            console.log(`Successfully created an attendee for workshop: ${workshop.title}, `, attendee)
        } else {
          console.log("Something went wrong")
           setError("Failed to upload information, please refresh and retry");
        }


      //if successful show paypal button

      //if paypal successful:
      //1. Update paymemt status

      //2. Create an attendee for the workshop

      //on success redirect to the success page

    } catch (error) {
      //Output an error
    }
  };

  const onCreateOrder = async (data:any, actions:any):Promise<any> => {
    return actions.order.create({
      purchase_units: [
          {
              amount: {
                  value: 0.1
              },
          },
      ],
    });
  }

  const onApprove = async (data:any, actions:any):Promise<any> => {
    return actions.order.capture().then( async (details:any) => {
      console.log("Approved", data, "Details: ", details)

    })
  }

  if (loading) return <PageLoader />;
  if (fetchError) return <FetchError error={fetchError} />;

  return (
    <section className="py-24 px-8">
      <div className="container mx-auto">
        <Card className="max-w-3xl mx-auto bg-primary-accent">
          <CardHeader>
            <CardTitle>{workshop?.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Phone Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Educational Background */}
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="institution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Educational Institution</FormLabel>
                        <FormControl>
                          <Input placeholder="Institution" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="degree"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Input placeholder="Degree" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="yearOfStudy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year of Completion</FormLabel>
                        <FormControl>
                          <Input placeholder="Year" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Workshop and Date Selection */}
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="dateSelected"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>When would you like to attend?</FormLabel>
                        <FormControl>
                          <Controller
                            control={form.control}
                            name="dateSelected"
                            render={({ field: { onChange, value } }) => (
                              <Select
                                value={value}
                                onValueChange={(val) => {
                                  
                                  if (val === `${startDate_2} to ${endDate_2}`) {
                                    setCounterDate(1);
                                  } else {
                                    setCounterDate(0);
                                  }
                                  onChange(val);
                                }}
                              >
                                <SelectTrigger className={cn("w-full")}>
                                  <SelectValue placeholder="Select a date" />
                                </SelectTrigger>
                                <SelectContent>
                                  {toPayFor?.attending > 0 && (
                                    <SelectItem value={`${startDate} to ${endDate}`}>
                                      {startDate} to {endDate}
                                    </SelectItem>
                                  )}
                                  {toPayFor?.secondWorkshopAttending > 0 && (
                                    <SelectItem value={`${startDate_2} to ${endDate_2}`}>
                                      {startDate_2} to {endDate_2}
                                    </SelectItem>
                                  )}
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Motivation and Knowledge Application */}
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="applicationMotivation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Motivation for attending (optional)
                        </FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your motivation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="knowledgeApplication"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          How do you envision applying the knowledge?
                        </FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your answer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Previous Experience */}
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="attendedWorkshops"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Have you attended similar workshops before?
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-4">
                            <label className="flex items-center space-x-2">
                              <Input
                                type="radio"
                                value="true"
                                checked={field.value === true}
                                onChange={() => field.onChange(true)}
                              />
                              <span>Yes</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <Input
                                type="radio"
                                value="false"
                                checked={field.value === false}
                                onChange={() => field.onChange(false)}
                              />
                              <span>No</span>
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="attendedWorkshopContext"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          If yes, please provide details
                        </FormLabel>
                        <FormControl>
                          <Textarea placeholder="Details..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Expected Skills */}
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="specificExpectedSkills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          What specific skills or knowledge do you hope to gain? (optional)
                        </FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your answer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Emergency Contact */}
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="emergencyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Contact Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Contact Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emergencyRelationship"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relationship to You</FormLabel>
                        <FormControl>
                          <Input placeholder="Relationship" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emergencyEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Contact Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Health Requirements */}
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="healthRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Do you have any medical or dietary restrictions?
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-4">
                            <label className="flex items-center space-x-2">
                              <Input
                                type="radio"
                                value="true"
                                checked={field.value === true}
                                onChange={() => field.onChange(true)}
                              />
                              <span>Yes</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <Input
                                type="radio"
                                value="false"
                                checked={field.value === false}
                                onChange={() => field.onChange(false)}
                              />
                              <span>No</span>
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="explainedHealthRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          If yes, please provide details
                        </FormLabel>
                        <FormControl>
                          <Textarea placeholder="Details..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-center space-x-2">
                  <FormField
                    control={form.control}
                    name="accepted"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            id="accepted"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormLabel htmlFor="accepted" className="cursor-pointer">
                    I have read and accept the&nbsp;
                    <Link
                      href="/termsandconditions"
                      target="_blank"
                      className="underline"
                    >
                      terms and conditions
                    </Link>
                  </FormLabel>
                </div>
                <FormMessage
                  className="!ml-10"
                  // This FormMessage could also be rendered inside the FormField if needed.
                />
                {
                  !showPayPalButtons ? (
                    <Button type="submit">Submit</Button>
                  ) : (
                    <PayPalScriptProvider options={{"client-id": (process.env.NEXT_PUBLIC_PAYPAL_CLIENTID as string), currency: "USD", intent: "capture"}}>
                      <PayPalButtons
                        createOrder={(data, actions) => onCreateOrder(data, actions)}
                        onApprove={(data, actions) => onApprove(data, actions)}
                      >
                      </PayPalButtons>
                  </PayPalScriptProvider>
                  )
                }
               
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Registration;
