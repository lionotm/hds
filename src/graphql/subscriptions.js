/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateResources = /* GraphQL */ `
  subscription OnCreateResources {
    onCreateResources {
      id
      name
      resourceType
      locationName
      events {
        items {
          id
          userId
          date
          timeslot
          timeslotId
          title
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateResources = /* GraphQL */ `
  subscription OnUpdateResources {
    onUpdateResources {
      id
      name
      resourceType
      locationName
      events {
        items {
          id
          userId
          date
          timeslot
          timeslotId
          title
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteResources = /* GraphQL */ `
  subscription OnDeleteResources {
    onDeleteResources {
      id
      name
      resourceType
      locationName
      events {
        items {
          id
          userId
          date
          timeslot
          timeslotId
          title
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateEvents = /* GraphQL */ `
  subscription OnCreateEvents {
    onCreateEvents {
      id
      userId
      date
      timeslot
      timeslotId
      resourceId {
        id
        name
        resourceType
        locationName
        events {
          nextToken
        }
        createdAt
        updatedAt
      }
      title
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateEvents = /* GraphQL */ `
  subscription OnUpdateEvents {
    onUpdateEvents {
      id
      userId
      date
      timeslot
      timeslotId
      resourceId {
        id
        name
        resourceType
        locationName
        events {
          nextToken
        }
        createdAt
        updatedAt
      }
      title
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteEvents = /* GraphQL */ `
  subscription OnDeleteEvents {
    onDeleteEvents {
      id
      userId
      date
      timeslot
      timeslotId
      resourceId {
        id
        name
        resourceType
        locationName
        events {
          nextToken
        }
        createdAt
        updatedAt
      }
      title
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDisabledDates = /* GraphQL */ `
  subscription OnCreateDisabledDates {
    onCreateDisabledDates {
      id
      day
      month
      year
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDisabledDates = /* GraphQL */ `
  subscription OnUpdateDisabledDates {
    onUpdateDisabledDates {
      id
      day
      month
      year
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDisabledDates = /* GraphQL */ `
  subscription OnDeleteDisabledDates {
    onDeleteDisabledDates {
      id
      day
      month
      year
      createdAt
      updatedAt
    }
  }
`;
