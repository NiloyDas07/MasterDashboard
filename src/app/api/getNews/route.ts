import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

export interface NewsResponse {
  previousPage: number | null;
  nextPage: number | null;
  articles: any;
}

const getNews = async (req: NextRequest): Promise<NextResponse> => {
  const page: number = Number(req.nextUrl.searchParams.get("page")) || 1;

  const response: AxiosResponse = await axios.get(
    `https://newsapi.org/v2/top-headlines?q=World&pageSize=10&page=${page}`,
    {
      headers: {
        Authorization: process.env.NEWSAPI_API_KEY,
      },
    }
  );

  if (!response?.data) {
    throw new ApiError(
      500,
      "Something went wrong while fetching news.",
      "NewsApiError"
    );
  }

  const newsDetails: NewsResponse = {
    previousPage: page > 1 ? page - 1 : null,
    nextPage:
      page < response.data.totalResults / 10 && page < 10 ? page + 1 : null,
    articles: response.data.articles,
  };

  return NextResponse.json(
    new ApiResponse(
      200,
      true,
      "News Articles Fetched Successfully",
      newsDetails
    ),
    { status: 200 }
  );
};

export const GET = asyncHandler(getNews);
