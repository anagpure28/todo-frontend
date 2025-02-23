import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const COURSE_API = "https://lms-backend-2-mohq.onrender.com/api/v1/course";
// const COURSE_API = "http://localhost:8080/api/v1/course";
// const COURSE_API = "https://lms-backend-1-5bg8.onrender.com/api/v1/course";

const TASK_API = "http://localhost:8000/tasks";

export const taskApi = createApi({
  reducerPath: "taskApi",
  tagTypes: ["REFETCH_CREATOR_TODO","Refetch_Lecture"],
  baseQuery: fetchBaseQuery({
    baseUrl: TASK_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createTaskTodo: builder.mutation({
      query: ({ name, description }) => ({
        url: "/create",
        method: "POST",
        body: { name, description },
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("todo-token") || '""')}`, // Safely parse the token
            "Content-Type": "application/json",
          },
      }),
      invalidatesTags: ["REFETCH_CREATOR_TODO"],
    }),
    // getTaskTodo: builder.query({
    //   query: () => ({
    //     url: "/getTasks",
    //     method: "GET",
    //     headers: {
    //         Authorization: `Bearer ${JSON.parse(localStorage.getItem("todo-token") || '""')}`, // Safely parse the token
    //         "Content-Type": "application/json",
    //       },
    //   }),
    // }),

    getTaskTodo: builder.query({
        query: ({ search = "", status = "", startDate = "", endDate = "", page = 1, limit = 10 }) => ({
          url: `/getTasks?search=${search}&status=${status}&startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("todo-token") || '""')}`,
            "Content-Type": "application/json",
          },
        }),
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