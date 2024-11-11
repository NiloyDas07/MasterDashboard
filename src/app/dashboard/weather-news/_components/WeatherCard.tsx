import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";

// Function to format time to 'HH:MM:SS AM/PM' if the locale is English
const formatTime = (time: number) => {
  const locale = navigator.language;
  const date = new Date(time);

  if (!locale.startsWith("en")) {
    return new Date(time).toLocaleTimeString();
  }

  return new Date(time)
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
    .replace("am", "AM")
    .replace("pm", "PM");
};

interface Props {
  city?: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const WeatherCard: React.FC<Props> = ({ city, setLoading }) => {
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [weatherDetails, setWeatherDetails] = useState<any>(null);

  const { toast } = useToast();

  useEffect(() => {
    if (city) return;

    // Try to get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    const getWeatherDetails = async () => {
      try {
        let response: AxiosResponse<ApiResponse>;
        if (!city && !coords) {
          response = await axios.get(`/api/getWeather?city=New Delhi`);
        } else if (!city) {
          response = await axios.get(
            `/api/getWeather?latitude=${coords?.latitude}&longitude=${coords?.longitude}`
          );
        } else {
          response = await axios.get(`/api/getWeather?city=${city}`);
        }

        setWeatherDetails(response.data?.data);
      } catch (error) {
        let errorMessage =
          "Something went wrong while fetching weather details.";

        if (error instanceof AxiosError) {
          const axiosError = error as AxiosError<ApiError>;

          if (axiosError.response?.data?.message === "city not found") {
            errorMessage = `City ${city} not found. Please check the city name.`;
          }
        }
        
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    getWeatherDetails();
  }, [coords, city]);

  return (
    <Card className="h-full">
      <CardHeader>
        {/* Location */}
        <CardTitle className=" text-2xl text-center text-balance">
          {`${weatherDetails?.city}, ${weatherDetails?.country}`}
        </CardTitle>

        {/* Weather */}
        <CardDescription className="text-center text-balance text-lg">
          {weatherDetails?.weather}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-6">
        {/* Weather Icon */}
        <div>
          <img src={weatherDetails?.iconUrl} alt="Weather Icon" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 justify-between w-full gap-4 text-center">
          {/* Current temperature */}
          <div className="text-center text-balance shadow p-4 rounded">
            <p className="text-xl font-bold ">
              {weatherDetails?.currentTemperature}
            </p>

            <p className="text-muted-foreground drop-shadow-sm">
              Current Temperature
            </p>
          </div>

          {/* Feels like temperature */}
          <div className="text-center text-balance shadow p-4 rounded">
            <p className="text-xl font-bold ">
              {weatherDetails?.feelsLikeTemperature}
            </p>

            <p className="text-muted-foreground drop-shadow-sm">Feels like</p>
          </div>

          {/* Humidity */}
          <div className="text-center text-balance shadow p-4 rounded">
            <p className="text-xl font-bold ">{weatherDetails?.humidity}</p>

            <p className="text-muted-foreground drop-shadow-sm">Humidity</p>
          </div>

          {/* Wind Speed */}
          <div className="text-center text-balance shadow p-4 rounded">
            <p className="text-xl font-bold ">{weatherDetails?.windSpeed}</p>

            <p className="text-muted-foreground drop-shadow-sm">Wind Speed</p>
          </div>
        </div>

        {/* Sunrise, Sunset */}
        <div className="grid grid-cols-2 text-lg gap-2 py-4">
          <p className="font-bold justify-self-end">Sunrise:</p>
          <p>{formatTime(weatherDetails?.sunrise)}</p>

          <p className="font-bold justify-self-end pr-1 items-center">
            Sunset:
          </p>
          <p>{formatTime(weatherDetails?.sunset)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
