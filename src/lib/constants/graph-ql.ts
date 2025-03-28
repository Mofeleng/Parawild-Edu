import { GraphQLClient } from "graphql-request";

const ENDPOINT = process.env.NEXT_PUBLIC_GRAPHCMS_MAIN_ENDPOINT;
const WORKSHOP_ATENDEE_MANAGER_AUTH = process.env.NEXT_PUBLIC_WORKSHOP_ATENDEE_MANAGER_AUTH;
const WORKSHOP_TOKEN = process.env.NEXT_PUBLIC_WORKSHOPTOKEN;

export const graphQLClient = new GraphQLClient(ENDPOINT as string)

export const graphQLClientWorkshopWithAuth = new GraphQLClient((ENDPOINT as string), {
    headers: {
        authorization: `Bearer ${WORKSHOP_ATENDEE_MANAGER_AUTH!}`
    }
})

export const graphQLClientWorkshopManagement = new GraphQLClient((ENDPOINT as string), {
    headers: {
      authorization: `Bearer ${WORKSHOP_TOKEN}`
    }
  });