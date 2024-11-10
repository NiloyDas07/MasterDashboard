// utils/asyncHandler.ts
import { NextApiRequest, NextApiResponse } from "next";
import { handleApiError } from "@/utils/errorHandler";
import { ApiError } from "./ApiError";
import axios from "axios";

export const asyncHandler = (fn: Function) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await fn(req, res);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.message || "An error occurred with the API.";
        return handleApiError(new ApiError(error.response.status, errorMessage));
      }
      return handleApiError(error);
    }
  };
};
