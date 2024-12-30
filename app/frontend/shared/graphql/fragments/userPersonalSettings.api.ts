import * as Types from '#shared/graphql/types.ts';

import gql from 'graphql-tag';
export const UserPersonalSettingsFragmentDoc = gql`
    fragment userPersonalSettings on User {
  personalSettings {
    notificationConfig {
      groupIds
      matrix {
        create {
          channel {
            email
            online
          }
          criteria {
            no
            ownedByMe
            ownedByNobody
            subscribed
          }
        }
        escalation {
          channel {
            email
            online
          }
          criteria {
            no
            ownedByMe
            ownedByNobody
            subscribed
          }
        }
        reminderReached {
          channel {
            email
            online
          }
          criteria {
            no
            ownedByMe
            ownedByNobody
            subscribed
          }
        }
        update {
          channel {
            email
            online
          }
          criteria {
            no
            ownedByMe
            ownedByNobody
            subscribed
          }
        }
      }
    }
    notificationSound {
      enabled
      file
    }
  }
}
    `;