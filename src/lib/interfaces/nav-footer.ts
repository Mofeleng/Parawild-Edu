export interface ContactPage {
    offices: string;
    contactInformation: {
      html: string;
    };
    location: {
      html: string;
    };
    workingHours: {
      html: string;
    };
  }
  
  export interface GetContactPageResponse {
    contactPages: ContactPage[];
  }
  