/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getResources = /* GraphQL */ `
  query GetResources($id: ID!) {
    getResources(id: $id) {
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
export const listResourcess = /* GraphQL */ `
  query ListResourcess(
    $filter: ModelResourcesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResourcess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getEvents = /* GraphQL */ `
  query GetEvents($id: ID!) {
    getEvents(id: $id) {
      id
      userId
      date
      timeslot
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
export const listEventss = /* GraphQL */ `
  query ListEventss(
    $filter: ModelEventsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEventss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        date
        timeslot
        resourceId {
          id
          name
          resourceType
          locationName
          createdAt
          updatedAt
        }
        title
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDisabledDates = /* GraphQL */ `
  query GetDisabledDates($id: ID!) {
    getDisabledDates(id: $id) {
      id
      day
      month
      year
      createdAt
      updatedAt
    }
  }
`;
export const listDisabledDatess = /* GraphQL */ `
  query ListDisabledDatess(
    $filter: ModelDisabledDatesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDisabledDatess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        day
        month
        year
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
