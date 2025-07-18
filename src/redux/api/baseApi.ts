import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_BASE_URL}` }),
    tagTypes: ["book"],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => "/books",
            providesTags: ["book"]
        }),
        getBook: builder.query({
            query: (id) => `/books/${id}`,
            providesTags:["book"]
        }),
        createBook: builder.mutation({
            query: (patch) => ({
                method: "POST",
                url: "/books",
                body: patch
            }),
            invalidatesTags: ["book"]
        }),
        updateBook: builder.mutation({
            query: (patch) => ({
                method: "PATCH",
                url: `/books/${patch?._id}`,
                body: patch
            }),
            invalidatesTags: ["book"]
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                method: "DELETE",
                url: `/books/${id}`,
            }),
            invalidatesTags: ["book"]
        }),
        borrowBook: builder.mutation({
            query: ({ quantity, dueDate, id }) => ({
                method: "POST",
                url: `/books/borrow/${id}`,
                body: { quantity, dueDate }
            }),
        }),
        borrowedSummary:builder.query({
            query: () => "/books/summary/borrowed"
        }),
    })
})


export const { useGetBooksQuery, useGetBookQuery, useCreateBookMutation, useUpdateBookMutation, useDeleteBookMutation, useBorrowBookMutation, useBorrowedSummaryQuery } = baseApi
