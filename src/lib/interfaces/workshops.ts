// Define the structure of a workshop
export interface Workshop {
    id: string;
    title: string;
    slug: string;
    active: boolean;
    forVets: boolean;
    preview?: string; // `preview` is included in getWorkshops query
    coverPhoto?: {
        url: string;
    };
}

// Define the structure of the current workshop details
export interface CurrentWorkshop extends Workshop {
    dates: string;
    attending: boolean;
    secondWorkshopAttending: boolean;
    reservationFee: number;
    address: string;
    about: {
        html: string;
    };
}
