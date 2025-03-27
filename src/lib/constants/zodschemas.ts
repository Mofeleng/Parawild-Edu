import { z } from "zod";

export const contactFormSchema = z.object({
    fullname: z.string().min(2, "Your name must be at least 2 charecters").max(255, "Your name cannot exceed 255 charecters"),
    email: z.string().email("Please enter a valid email"),
    message: z.string().min(2, "Your message must be more than 2 charecters")
})

export const registerFormSchema = z.object({
    // Personal Information
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phoneNumber: z.string().min(10, "Please enter a valid phone number"),

    // Education Information (Optional)
    institution: z.string().optional(),
    degree: z.string().optional(),
    yearOfStudy: z.string().optional(),

    // Workshop Selection
    workshopSelected: z.string().min(1, "Please select a workshop"),
    dateSelected: z.string().min(1, "Please select a workshop date"),

    // Motivation & Expectations (Optional)
    applicationMotivation: z.string().optional(),
    knowledgeApplication: z.string().optional(),
    specificExpectedSkills: z.string().optional(),

    // Previous Workshop Experience
    attendedWorkshops: z.boolean(),
    attendedWorkshopContext: z.string().optional().nullable(),

    // Emergency Contact
    emergencyName: z.string().min(2, "Emergency contact name is required"),
    emergencyRelationShip: z.string().min(2, "Please specify the relationship"),
    emergencyEmail: z.string().email("Please enter a valid emergency contact email"),

    // Health Information
    healthRequirements: z.boolean(),
    explainedHealthRequirements: z.string().optional().nullable(),

    // Terms and Conditions
    paymentAcknowledged: z.boolean().refine(val => val === true, {
        message: "You must acknowledge the payment terms"
    }),
    termsAcknowledged: z.boolean().refine(val => val === true, {
        message: "You must accept the terms and conditions"
    })
});

