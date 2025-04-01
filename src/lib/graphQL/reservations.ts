import { gql } from "graphql-request";

export const getCurrentWorkshop = gql`
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

export const createAttendeeMutation = `
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

export const updateAttendeeMutation = gql`
    mutation UpdateAttendee($id: ID!) {
    updateAttendee(data: {paid: "true"}, where: {id: $id}) {
        paid
    }
}
`;

export const updateWorkshopMutation = gql`
    mutation UpdateWorkshop($id: ID!, $attending: Int!, $secondWorkshopAttending: Int!) {
        updateWorkshop(data: {attending: $attending, secondWorkshopAttending: $secondWorkshopAttending}, where: {id: $id}) {
        attending,
        secondWorkshopAttending
    }
}
`;

export const publishWorkshopMutation = gql`
    mutation PublishWorkshop($id: ID!) {
        publishWorkshop(where: {id: $id}, to: PUBLISHED) {
        attending
        secondWorkshopAttending
        }
    }
`;

