"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import { GraphQLClient, gql } from "graphql-request";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Shadcn UI components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// Custom components and hooks
import PageLoader from "@/components/page-loader";
import FetchError from "@/components/fetch-error";
import useDateConvertToString from "@/lib/hooks/useDateConvertToString";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

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
    // We’ll use the workshop title from the fetched data.
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
      !data.healthRequirements || (data.healthRequirements && data.explainedHealthRequirements?.trim() !== ""),
    {
      message: "Please provide details about your health requirements",
      path: ["explainedHealthRequirements"],
    }
  )
  .refine(
    (data) =>
      !data.attendedWorkshops || (data.attendedWorkshops && data.attendedWorkshopContext?.trim() !== ""),
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

  const [showPayPalButtons, setShowPayPalButtons] = useState<boolean>(false);

  // Local state for workshop info and submission
  const [workshop, setWorkshop] = useState<any>(null);
  const [toPayFor, setToPayFor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [attendee, setAttendee] = useState<any>(null);
  const [counterDate, setCounterDate] = useState<number>(0);

  const ENDPOINT = process.env.NEXT_PUBLIC_GRAPHCMS_MAIN_ENDPOINT;
  const WORKSHOP_ATENDEE_MANAGER_AUTH = process.env.NEXT_PUBLIC_WORKSHOP_ATENDEE_MANAGER_AUTH;
  const WORKSHOP_TOKEN = process.env.NEXT_PUBLIC_WORKSHOPTOKEN;
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      attendedWorkshops: false,
      healthRequirements: false,
      accepted: false,
    },
  });

  // Watch some fields for conditional logic
  const watchedDate = watch("dateSelected");

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

  // When workshop is not found or error occurred, redirect or show error
  useEffect(() => {
    if (!loading && (!workshop || fetchError)) {
      // If no workshop data, you might want to navigate back
      // router.push("/");
    }
  }, [loading, workshop, fetchError, router]);

  // Helper to convert dates using your custom hook
  const startDate = workshop ? useDateConvertToString(workshop.dates[0], false) : "";
  const endDate = workshop ? useDateConvertToString(workshop.dates[1], false) : "";
  const startDate_2 = workshop ? useDateConvertToString(workshop.dates[2], false) : "";
  const endDate_2 = workshop ? useDateConvertToString(workshop.dates[3], false) : "";

  // onSubmit function for form submission
  const onSubmit = async (data: RegistrationFormValues) => {
    // Set dateSelected if not already set based on workshop availability
    if (!data.dateSelected) {
      if (toPayFor.attending > 0) {
        data.dateSelected = `${startDate} to ${endDate}`;
      } else if (toPayFor.secondWorkshopAttending > 0) {
        data.dateSelected = `${startDate_2} to ${endDate_2}`;
        setCounterDate(1);
      }
    }

    try {
      const graphQLClient = new GraphQLClient(ENDPOINT as string, {
        headers: {
          authorization: `Bearer ${WORKSHOP_ATENDEE_MANAGER_AUTH}`,
        },
      });
      const mutation = gql`
        mutation CreateNewAttendee(
          $fn: String!
          $ln: String!
          $em: String!
          $pn: String!
          $in: String!
          $d: String!
          $yos: String!
          $wid: String!
          $w: String!
          $appm: String!
          $attw: Boolean!
          $attwc: String!
          $ssk: String!
          $en: String!
          $er: String!
          $eea: String!
          $hr: Boolean!
          $hre: String!
          $paid: String!
          $ds: String!
        ) {
          createAttendee(
            data: {
              firstName: $fn
              lastName: $ln
              email: $em
              phoneNumber: $pn
              degree: $d
              educationalInstitution: $in
              yearCompleted: $yos
              workshopAttending: $w
              workshopId: $wid
              motivation: $appm
              experience: $attw
              experienceInfo: $attwc
              expectedKnowledge: $ssk
              emergencyContactName: $en
              emergencyContactRelationship: $er
              emergencyContactEmailAddress: $eea
              healthRequirements: $hr
              healthRequirementsExplained: $hre
              paid: $paid
              dateAttending: $ds
            }
          ) {
            id
            firstName
            lastName
            email
            dateAttending
          }
        }
      `;

      const variables = {
        fn: data.firstName,
        ln: data.lastName,
        em: data.email,
        pn: data.phoneNumber,
        in: data.institution || "",
        d: data.degree || "",
        yos: data.yearOfStudy || "",
        wid: toPayFor.id,
        w: toPayFor.title,
        appm: data.applicationMotivation || "",
        attw: data.attendedWorkshops,
        attwc: data.attendedWorkshopContext || "",
        ssk: data.specificExpectedSkills || "",
        en: data.emergencyName,
        er: data.emergencyRelationship,
        eea: data.emergencyEmail,
        hr: data.healthRequirements,
        hre: data.explainedHealthRequirements || "",
        paid: "false",
        ds: data.dateSelected,
      };

      const result: any = await graphQLClient.request(mutation, variables);
      const workshopAttendee = result.createAttendee;
      if (workshopAttendee) {
        setConfirmed(true);
        setAttendee(workshopAttendee);
      } else {
        // Optionally set an error state
        alert("Failed to upload information, please refresh and retry");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  // Paypal on create order and onApprove functions are omitted for brevity

  if (loading) {
    return <PageLoader />;
  }

  if (fetchError) {
    return <FetchError error={fetchError} />;
  }

  // If no available seats for both sessions, redirect back to workshop page
  if (toPayFor && toPayFor.attending === 0 && toPayFor.secondWorkshopAttending === 0) {
    router.push(`/workshop/${toPayFor.slug}`);
    return null;
  }

  return (
    <>
      <Head>
        <title>Registration for {workshop.title}</title>
      </Head>
      <section className="py-8">
        <div className="container mx-auto">
          <h3 className="text-center text-2xl font-bold mb-6">Register for the workshop</h3>
          {/* Wrapped the form in a shadcn Card with bg-primary-accent */}
          <Card className="max-w-3xl mx-auto bg-primary-accent">
            <CardHeader>
              <CardTitle>{workshop.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {!confirmed ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" {...register("firstName")} />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" {...register("lastName")} />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" {...register("email")} />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input id="phoneNumber" type="tel" {...register("phoneNumber")} />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Educational Background */}
                  <div className="space-y-2">
                    <Label htmlFor="institution">Educational Institution</Label>
                    <Input id="institution" {...register("institution")} />
                    <Label htmlFor="degree">Degree</Label>
                    <Input id="degree" {...register("degree")} />
                    <Label htmlFor="yearOfStudy">Year of Completion</Label>
                    <Input id="yearOfStudy" {...register("yearOfStudy")} />
                  </div>

                  {/* Workshop and Date Selection */}
                  <div className="space-y-2">
                    <Label>Workshop</Label>
                    <Input value={workshop.title} disabled />
                    <Label htmlFor="dateSelected">When would you like to attend?</Label>
                    
                    <select
                      id="dateSelected"
                      className={cn("w-full border rounded p-2 bg-primary")}
                      {...register("dateSelected")}
                      onChange={(e) => {
                        // Optionally update counterDate based on selection
                        const selected = e.target.value;
                        if (selected === `${startDate_2} to ${endDate_2}` && toPayFor.attending === 0) {
                          setCounterDate(1);
                        } else {
                          setCounterDate(0);
                        }
                      }}
                    >
                      {toPayFor.attending > 0 && (
                        <option value={`${startDate} to ${endDate}`}>
                          {startDate} to {endDate}
                        </option>
                      )}
                      {toPayFor.secondWorkshopAttending > 0 && (
                        <option value={`${startDate_2} to ${endDate_2}`}>
                          {startDate_2} to {endDate_2}
                        </option>
                      )}
                    </select>
                    {errors.dateSelected && (
                      <p className="text-red-500 text-sm">{errors.dateSelected.message}</p>
                    )}
                  </div>

                  {/* Motivation and Knowledge Application */}
                  <div className="space-y-2">
                    <Label htmlFor="applicationMotivation">
                      Motivation for attending (optional)
                    </Label>
                    <Textarea id="applicationMotivation" {...register("applicationMotivation")} />
                    <Label htmlFor="knowledgeApplication">
                      How do you envision applying the knowledge?
                    </Label>
                    <Textarea id="knowledgeApplication" {...register("knowledgeApplication")} />
                  </div>

                  {/* Previous Experience */}
                  <div className="space-y-2">
                    <Label>Have you attended similar workshops before?</Label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <Input
                          type="radio"
                          value="true"
                          {...register("attendedWorkshops", { setValueAs: (v) => v === true })}
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Input
                          type="radio"
                          value="false"
                          {...register("attendedWorkshops", { setValueAs: (v) => v === true })}
                        />
                        <span>No</span>
                      </label>
                    </div>
                    <Label htmlFor="attendedWorkshopContext">If yes, please provide details</Label>
                    <Textarea id="attendedWorkshopContext" {...register("attendedWorkshopContext")} />
                    {errors.attendedWorkshopContext && (
                      <p className="text-red-500 text-sm">{errors.attendedWorkshopContext.message}</p>
                    )}
                  </div>

                  {/* Expected Skills */}
                  <div className="space-y-2">
                    <Label htmlFor="specificExpectedSkills">
                      What specific skills or knowledge do you hope to gain? (optional)
                    </Label>
                    <Textarea id="specificExpectedSkills" {...register("specificExpectedSkills")} />
                  </div>

                  {/* Emergency Contact */}
                  <div className="space-y-2">
                    <Label htmlFor="emergencyName">Emergency Contact Name</Label>
                    <Input id="emergencyName" {...register("emergencyName")} />
                    {errors.emergencyName && (
                      <p className="text-red-500 text-sm">{errors.emergencyName.message}</p>
                    )}
                    <Label htmlFor="emergencyRelationship">Relationship to You</Label>
                    <Input id="emergencyRelationship" {...register("emergencyRelationship")} />
                    {errors.emergencyRelationship && (
                      <p className="text-red-500 text-sm">{errors.emergencyRelationship.message}</p>
                    )}
                    <Label htmlFor="emergencyEmail">Emergency Contact Email</Label>
                    <Input id="emergencyEmail" type="email" {...register("emergencyEmail")} />
                    {errors.emergencyEmail && (
                      <p className="text-red-500 text-sm">{errors.emergencyEmail.message}</p>
                    )}
                  </div>

                  {/* Health Requirements */}
                  <div className="space-y-2">
                    <Label>Do you have any medical or dietary restrictions?</Label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <Input
                          type="radio"
                          value="true"
                          {...register("healthRequirements", { setValueAs: (v) => v === true })}
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Input
                          type="radio"
                          value="false"
                          {...register("healthRequirements", { setValueAs: (v) => v === true })}
                        />
                        <span>No</span>
                      </label>
                    </div>
                    <Label htmlFor="explainedHealthRequirements">If yes, please provide details</Label>
                    <Textarea id="explainedHealthRequirements" {...register("explainedHealthRequirements")} />
                    {errors.explainedHealthRequirements && (
                      <p className="text-red-500 text-sm">{errors.explainedHealthRequirements.message}</p>
                    )}
                  </div>

                  {/* Terms & Conditions using shadcn Checkbox */}
                  <div className="flex items-center space-x-2">
                    <Checkbox id="accepted" {...register("accepted")} />
                    <Label htmlFor="accepted" className="flex items-center">
                      I have read and accept the&nbsp;
                      <Link href="/termsandconditions" target="_blank" className="underline">
                        terms and conditions
                      </Link>
                    </Label>
                  </div>
                  {errors.accepted && (
                    <p className="text-red-500 text-sm">{errors.accepted.message}</p>
                  )}

                  <Button type="submit">Submit</Button>
                </form>
              ) : (
                /* Render PayPal component if registration was successful */
                <></>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Registration;
