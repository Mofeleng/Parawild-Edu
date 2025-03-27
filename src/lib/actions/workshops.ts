import { GraphQLClient, gql } from "graphql-request";

// Define proper types for the form data
interface WorkshopFormValues {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    institution: string;
    degree: string;
    yearOfStudy: string;
    workshopSelected: string;
    dateSelected: string;
    applicationMotivation: string;
    knowledgeApplication: string;
    attendedWorkshops: boolean;
    attendedWorkshopContext: string;
    specificExpectedSkills: string;
    emergencyName: string;
    emergencyRelationShip: string;
    emergencyEmail: string;
    healthRequirements: boolean;
    explainedHealthRequirements: string;
    termsAcknowledged: boolean;
  }
  
  interface Workshop {
    id: string;
    title: string;
    // Add other workshop properties if needed
  }
  
  // Type for the response
  interface AttendeeResponse {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    degree: string;
    educationalInstitution: string;
    yearCompleted: string;
    workshopAttending: string;
    workshopId: string;
    motivation: string;
    experience: string;
    experienceInfo: string;
    expectedKnowledge: string;
    emergencyContactName: string;
    emergencyContactRelationship: string;
    emergencyContactEmailAddress: string;
    healthRequirements: string;
    healthRequirementsExplained: string;
    paid: string;
    dateAttending: string;
  }

const ENDPOINT = process.env.NEXT_PUBLIC_GRAPHCMS_MAIN_ENDPOINT;
const WORKSHOP_ATENDEE_MANAGER_AUTH = process.env.NEXT_PUBLIC_WORKSHOP_ATENDEE_MANAGER_AUTH;

export async function fetchWorkshop(slug:string):Promise<any> {
    try {
        const graphqlClient = new GraphQLClient(ENDPOINT!, {
            method: 'GET',
            jsonSerializer: {
              parse: JSON.parse,
              stringify: JSON.stringify
            }
        });
        const query  = gql`
        query GetWorkshop($slug: String!) {
            workshop(where: { slug: $slug}) {
                title,
                slug,
                id,
                reservationFee,
                attending,
                secondWorkshopAttending,
                dates,
                address
            }
        }
        `;
        const variables = {
            slug: slug
        }
        const response:any = await graphqlClient.request(query, variables);
        return response
    } catch (error) {
        return new Error("Something went wrong")
    }
}

'use server'

export async function submitWorkshop(
  values: WorkshopFormValues,
  workshop: Workshop
): Promise<{ success: boolean; attendee?: AttendeeResponse; error?: string }> {
  try {
    if (!ENDPOINT || !WORKSHOP_ATENDEE_MANAGER_AUTH) {
      throw new Error('Missing required environment variables');
    }

    const graphQLClient = new GraphQLClient(ENDPOINT, {
      headers: {
        authorization: `Bearer ${WORKSHOP_ATENDEE_MANAGER_AUTH}`
      }
    });

    const mutation = `
      mutation CreateNewAttendee(
        $fn: String!, 
        $ln: String!, 
        $em: String!, 
        $pn: String!, 
        $in: String!, 
        $d: String!, 
        $yos: String!, 
        $wid: String!, 
        $w: String!, 
        $appm: String!, 
        $kapp: String!,
        $attw: String!, 
        $attwc: String!, 
        $ssk: String!, 
        $en: String!, 
        $er: String!, 
        $eea: String!, 
        $hr: String!, 
        $hre: String!, 
        $paid: String!, 
        $ds: String!
      ) {
        createAttendee(
          data: {
            firstName: $fn, 
            lastName: $ln, 
            email: $em, 
            phoneNumber: $pn, 
            degree: $d, 
            educationalInstitution: $in,  
            yearCompleted: $yos, 
            workshopAttending: $w, 
            workshopId: $wid, 
            motivation: $appm,
            knowledgeApplication: $kapp, 
            experience: $attw, 
            experienceInfo: $attwc, 
            expectedKnowledge: $ssk, 
            emergencyContactName: $en, 
            emergencyContactRelationship: $er, 
            emergencyContactEmailAddress: $eea, 
            healthRequirements: $hr, 
            healthRequirementsExplained: $hre, 
            paid: $paid, 
            dateAttending: $ds
          }
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

    const variables = {
      fn: values.firstName,
      ln: values.lastName,
      em: values.email,
      pn: values.phoneNumber,
      in: values.institution || '',
      d: values.degree || '',
      yos: values.yearOfStudy || '',
      wid: workshop.id,
      w: workshop.title,
      appm: values.applicationMotivation || '',
      kapp: values.knowledgeApplication || '',
      attw: values.attendedWorkshops ? 'Yes' : 'No',
      attwc: values.attendedWorkshopContext || '',
      ssk: values.specificExpectedSkills || '',
      en: values.emergencyName,
      eea: values.emergencyEmail,
      er: values.emergencyRelationShip,
      hr: values.healthRequirements ? 'Yes' : 'No',
      hre: values.explainedHealthRequirements || '',
      paid: 'false',
      ds: values.dateSelected
    };

    const data:any = await graphQLClient.request(mutation, variables);
    
    // Check the response structure and access the created attendee
    const attendee = data.createAttendee as AttendeeResponse;
    
    return {
      success: true,
      attendee
    };
  } catch (error) {
    console.error('Error submitting workshop registration:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}