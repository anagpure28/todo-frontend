import {configureStore} from "@reduxjs/toolkit"
import rootReducer from "./rootReducer"
import { authApi } from "../features/api/authApi"
import { taskApi } from "../features/api/taskApi"
export const appStore = configureStore({
    reducer: rootReducer,
    middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware,taskApi.middleware)
})