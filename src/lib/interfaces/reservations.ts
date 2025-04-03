export interface Attendee {
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

export interface CreateAttendeeResponse {
createAttendee: Attendee;
}