import { NextResponse } from "next/server";
import { ApiError } from "./ApiError";

export const handleApiError = (error: any): NextResponse => {
  let apiError: ApiError;

  // Check if the error is an instance of ApiError, otherwise create a new one
  if (error instanceof ApiError) {
    apiError = error;
  } else {
    apiError = new ApiError(500, error.message || "Internal Server Error");
  }

  console.error(apiError.message);

  return NextResponse.json(apiError, {
    status: apiError.statusCode,
  });
};
