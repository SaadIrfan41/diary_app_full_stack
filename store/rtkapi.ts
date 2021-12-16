import { createApi } from '@reduxjs/toolkit/query/react'
import { gql } from 'graphql-request'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'

export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: '/api/graphql',
  }),
  endpoints: (builder) => ({
    getEntries: builder.query({
      query: () => ({
        document: gql`
          query GetEntries {
            getEntries {
              description
              id
              tittle
            }
          }
        `,
      }),
    }),
    getSingleEntry: builder.query({
      query: (getEntryId) => ({
        document: gql`
          query GetSingleEntry($getEntryId: ID!) {
            getEntry(id: $getEntryId) {
              author {
                username
              }
              diaryid {
                tittle
              }
              tittle
              description
            }
          }
        `,
        variables: { getEntryId: getEntryId },
      }),
    }),
    getDiaries: builder.query({
      query: () => ({
        document: gql`
          query GetDiaries {
            getDiaries {
              id
              tittle
              privacy
              entries {
                tittle
              }
              author {
                _id

                email

                username

                image
              }
            }
          }
        `,
      }),
      //@ts-ignore
      providesTags: (result, error) => [{ type: 'NewDiary' }],
    }),
    getDiary: builder.query({
      query: (getDiaryId) => ({
        document: gql`
          query GetDiary($getDiaryId: ID!) {
            getDiary(id: $getDiaryId) {
              author {
                image
              }
              entries {
                id
                tittle
                description
              }
            }
          }
        `,
        variables: { getDiaryId: getDiaryId },
      }),
      //@ts-ignore
      providesTags: (result, error, id) => [{ type: 'Diary', id }],
      //@ts-ignore
      providesTags: (result, error, id) => [{ type: 'Diary', id }],
    }),
    newEntry: builder.mutation({
      //@ts-ignore
      query: (data) => ({
        document: gql`
          mutation NewEntry(
            $tittle: String!
            $description: String!
            $diaryid: ID!
            $author: ID!
          ) {
            newEntry(
              tittle: $tittle
              description: $description
              diaryid: $diaryid
              author: $author
            ) {
              tittle
            }
          }
        `,
        variables: data,
      }),
      //@ts-ignore
      invalidatesTags: (result, error, { data }) => [{ type: 'Diary', data }],
    }),
    updateEntry: builder.mutation({
      //@ts-ignore
      query: (data) => ({
        document: gql`
          mutation UpdateEntry(
            $tittle: String!
            $description: String!
            $updateEntryId: ID!
          ) {
            updateEntry(
              tittle: $tittle
              description: $description
              id: $updateEntryId
            ) {
              diaryid {
                id
              }
            }
          }
        `,
        variables: data,
      }),
      //@ts-ignore
      invalidatesTags: (result, error, { data }) => [{ type: 'Diary', data }],
    }),
    deleteEntry: builder.mutation({
      //@ts-ignore
      query: (data) => ({
        document: gql`
          mutation DeleteEntry($deleteEntryId: ID!) {
            deleteEntry(id: $deleteEntryId)
          }
        `,
        variables: data,
      }),
      //@ts-ignore
      invalidatesTags: (result, error, { data }) => [{ type: 'Diary', data }],
    }),
    newDiary: builder.mutation({
      //@ts-ignore
      query: (data) => ({
        document: gql`
          mutation NewDiary($tittle: String!, $privacy: String!, $author: ID!) {
            newDiary(tittle: $tittle, privacy: $privacy, author: $author) {
              tittle
            }
          }
        `,
        variables: data,
      }),
      //@ts-ignore
      invalidatesTags: (result, error, { data }) => [
        { type: 'NewDiary', data },
      ],
    }),
    getEntry: builder.query({
      query: (getEntryId) => ({
        document: gql`
          query GetEntry($getEntryId: ID!) {
            getEntry(id: $getEntryId) {
              tittle
              description
              diaryid {
                id
              }
            }
          }
        `,
        variables: { getEntryId: getEntryId },
      }),
      //@ts-ignore
      providesTags: (result, error, id) => [{ type: 'Diary', id }],
    }),
  }),
})

export const {
  useGetEntriesQuery,
  useGetDiariesQuery,
  useGetDiaryQuery,
  useNewEntryMutation,
  useGetEntryQuery,
  useUpdateEntryMutation,
  useNewDiaryMutation,
  useDeleteEntryMutation,
  useGetSingleEntryQuery,
} = api
