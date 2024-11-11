// utils/asyncHandler.ts
import { handleApiError } from "@/utils/errorHandler";
import { ApiError } from "./ApiError";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const asyncHandler = (fn: Function) => {
  return async (req: NextRequest, res: NextResponse) => {
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
