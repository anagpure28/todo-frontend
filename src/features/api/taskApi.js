import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TASK_API = "http://localhost:8000/tasks";

export const taskApi = createApi({
  reducerPath: "taskApi",
  tagTypes: ["REFETCH_CREATOR_TODO","Refetch_Lecture"],
  baseQuery: fetchBaseQuery({
    baseUrl: TASK_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // createTaskTodo: builder.mutation({
    //   query: ({ name, description }) => ({
    //     url: "/create",
    //     method: "POST",
    //     body: { name, description },
    //     headers: {
    //         Authorization: `Bearer ${JSON.parse(localStorage.getItem("todo-token") || '""')}`, // Safely parse the token
    //         "Content-Type": "application/json",
    //       },
    //   }),
    //   invalidatesTags: ["REFETCH_CREATOR_TODO"],
    // }),

    // getTaskTodo: builder.query({
    //     query: ({ search = "", status = "", startDate = "", endDate = "", page = 1, limit = 10 }) => ({
    //       url: `/getTasks?search=${search}&status=${status}&startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`,
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${JSON.parse(localStorage.getItem("todo-token") || '""')}`,
    //         "Content-Type": "application/json",
    //       },
    //     }),
    //   }),
    createTaskTodo: builder.mutation({
      query: ({ name, description }) => ({
        url: "/create",
        method: "POST",
        body: { name, description },
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("todo-token") || '""')}`,
          "Content-Type": "application/json",
        },
      }),
      // Add onQueryStarted to handle the cache update
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Invalidate all existing task queries
          dispatch(
            taskApi.util.invalidateTags(['REFETCH_CREATOR_TODO'])
          );
        } catch (err) {
          console.error('Error creating task:', err);
        }
      },
      invalidatesTags: ['REFETCH_CREATOR_TODO'],
    }),
    
    // And update the getTaskTodo query to include the tag:
    getTaskTodo: builder.query({
      query: ({ search = "", status = "", startDate = "", endDate = "", page = 1, limit = 10 }) => ({
        url: `/getTasks?search=${search}&status=${status}&startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("todo-token") || '""')}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ['REFETCH_CREATOR_TODO'],
    }),
    deleteTaskTodo: builder.mutation({
        query: ({ _id }) => ({
          url: `/delete/${_id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("todo-token") || '""')}`,
            "Content-Type": "application/json",
          },
        }),
        invalidatesTags: ["REFETCH_CREATOR_TODO"], // Refresh task list after deletion
    }),
    updateTaskTodo: builder.mutation({
        query: ({ _id, name, description, status }) => ({
          url: `/update/${_id}`,
          method: "PUT",
          body: { name, description, status },
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("todo-token") || '""')}`,
            "Content-Type": "application/json",
          },
        }),
        invalidatesTags: ["REFETCH_CREATOR_TODO"],
      }),
  }),
});

export const {
  useCreateTaskTodoMutation,
  useGetTaskTodoQuery,
  useDeleteTaskTodoMutation,
  useUpdateTaskTodoMutation
} = taskApi;