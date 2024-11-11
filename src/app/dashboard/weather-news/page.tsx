import React from "react";
import WeatherSection from "./_components/WeatherSection";
import NewsSection from "./_components/NewsSection";

const Weather = () => {
  return (
    <>
      <h1 className="bg-muted-2 font-bold text-2xl text-center pt-4 px-2 text-balance tracking-wide">
        MasterJi Live Dashboard
      </h1>
      <main className="grid grid-cols-1 xl:grid-cols-3 p-4 flex-grow bg-muted-2">
        <WeatherSection />
        <NewsSection classname="lg:col-span-2" />
      </main>
    </>
  );
};

export default Weather;
