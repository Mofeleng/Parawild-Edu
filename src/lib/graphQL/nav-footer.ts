import { gql } from "graphql-request";

export const getContactPage = gql`
            query GetContactPage {
              contactPages(first: 1) {
                offices
                contactInformation {
                  html
                }
                location {
                  html
                }
                workingHours {
                  html
                }
              }
            }
          `;
