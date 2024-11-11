import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

interface weatherDetailsResponse {
  city: string;
  country: string;
  weather: string;
  iconUrl: string;
  currentTemperature: string;
  feelsLikeTemperature: string;
  humidity: string;
  windSpeed: string;
  sunrise: number;
  sunset: number;
}

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const latitude = req.nextUrl.searchParams.get("latitude");
  const longitude = req.nextUrl.searchParams.get("longitude");
  const city = req.nextUrl.searchParams.get("city");

  // If both latitude and longitude are not provided and city is also not provided.
  if (!(latitude && longitude) && !city) {
    return NextResponse.json(
      new ApiResponse(
        400,
        false,
        "Please provide either city or coordinates.",
        null
      ),
      {
        status: 400,
      }
    );
  }

  let response: AxiosResponse;

  if (latitude && longitude) {
    response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`
    );
  } else {
    response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`
    );
  }

  const weatherDetails: weatherDetailsResponse = {
    city: response.data.name,
    country: response.data.sys.country,
    weather: response.data.weather[0].main,
    iconUrl: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    currentTemperature: `${response.data.main.temp}°C`,
    feelsLikeTemperature: `${response.data.main.feels_like}°C`,
    humidity: `${response.data.main.humidity}%`,
    windSpeed: `${response.data.wind.speed} m/s`,
    sunrise: response.data.sys.sunrise * 1000,
    sunset: response.data.sys.sunset * 1000,
  };

  return NextResponse.json(
    new ApiResponse(
      200,
      true,
      "Weather details fetched successfully.",
      weatherDetails
    ),
    {
      status: 200,
    }
  );
};
