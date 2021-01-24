/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createResources = /* GraphQL */ `
  mutation CreateResources(
    $input: CreateResourcesInput!
    $condition: ModelResourcesConditionInput
  ) {
    createResources(input: $input, condition: $condition) {
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
export const updateResources = /* GraphQL */ `
  mutation UpdateResources(
    $input: UpdateResourcesInput!
    $condition: ModelResourcesConditionInput
  ) {
    updateResources(input: $input, condition: $condition) {
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
export const deleteResources = /* GraphQL */ `
  mutation DeleteResources(
    $input: DeleteResourcesInput!
    $condition: ModelResourcesConditionInput
  ) {
    deleteResources(input: $input, condition: $condition) {
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
export const createEvents = /* GraphQL */ `
  mutation CreateEvents(
    $input: CreateEventsInput!
    $condition: ModelEventsConditionInput
  ) {
    createEvents(input: $input, condition: $condition) {
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
export const updateEvents = /* GraphQL */ `
  mutation UpdateEvents(
    $input: UpdateEventsInput!
    $condition: ModelEventsConditionInput
  ) {
    updateEvents(input: $input, condition: $condition) {
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
export const deleteEvents = /* GraphQL */ `
  mutation DeleteEvents(
    $input: DeleteEventsInput!
    $condition: ModelEventsConditionInput
  ) {
    deleteEvents(input: $input, condition: $condition) {
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
export const createDisabledDates = /* GraphQL */ `
  mutation CreateDisabledDates(
    $input: CreateDisabledDatesInput!
    $condition: ModelDisabledDatesConditionInput
  ) {
    createDisabledDates(input: $input, condition: $condition) {
      id
      day
      month
      year
      createdAt
      updatedAt
    }
  }
`;
export const updateDisabledDates = /* GraphQL */ `
  mutation UpdateDisabledDates(
    $input: UpdateDisabledDatesInput!
    $condition: ModelDisabledDatesConditionInput
  ) {
    updateDisabledDates(input: $input, condition: $condition) {
      id
      day
      month
      year
      createdAt
      updatedAt
    }
  }
`;
export const deleteDisabledDates = /* GraphQL */ `
  mutation DeleteDisabledDates(
    $input: DeleteDisabledDatesInput!
    $condition: ModelDisabledDatesConditionInput
  ) {
    deleteDisabledDates(input: $input, condition: $condition) {
      id
      day
      month
      year
      createdAt
      updatedAt
    }
  }
`;
