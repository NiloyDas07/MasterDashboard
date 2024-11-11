import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

export interface userDetailsResponse {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: string;
}

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const page = req.nextUrl.searchParams.get("page") || 1;
  const searchQuery = req.nextUrl.searchParams.get("searchQuery") || "";

  const response: AxiosResponse = await axios.get(
    `https://6732341c2a1b1a4ae10f3d8b.mockapi.io/userDetails?page=${page}&search=${searchQuery}`
  );

  if (!response?.data) {
    throw new Error("Something went wrong while fetching user details.");
  }

  return NextResponse.json(
    new ApiResponse(200, true, "Users fetched successfully.", response.data),
    {
      status: 200,
    }
  );
};
