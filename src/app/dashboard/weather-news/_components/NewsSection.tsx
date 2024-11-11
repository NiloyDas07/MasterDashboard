"use client";

import { NewsResponse } from "@/app/api/getNews/route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosResponse } from "axios";
import { Grid3X3, List } from "lucide-react";
import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import { Button } from "@/components/ui/button";

interface Props {
  classname?: string;
}

interface NewsDetails extends NewsResponse {
  currentPage: number;
}

const ComponentName: React.FC<Props> = ({ classname }) => {
  const [isGridView, setIsListView] = useState<boolean>(false);

  const [newsDetails, setNewsDetails] = useState<NewsDetails>({
    currentPage: 1,
    previousPage: null,
    nextPage: null,
    articles: [],
  });

  const { toast } = useToast();

  const getNews = async (page: number) => {
    try {
      const response: AxiosResponse = await axios.get(
        `/api/getNews?page=${page}`
      );

      console.log(response.data);

      const data: NewsDetails = response.data.data;

      setNewsDetails(() => ({
        currentPage: page,
        previousPage: data.previousPage,
        nextPage: data.nextPage,
        articles: data.articles,
      }));

      console.log(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong while fetching news.",
      });
    }
  };

  const onPageClick = (page: number | null) => {
    if (!page) return;

    getNews(page);
  };

  // First news fetch
  useEffect(() => {
    getNews(1);
  }, []);

  return (
    <section className={`p-4 sm:h-auto ${classname}`} aria-label="News Section">
      <Card className="w-full min-h-full relative max-h-svh flex flex-col">
        <CardHeader className="flex-row justify-between flex flex-wrap text-heading-foreground">
          <CardTitle className="font-bold tracking-wide text-2xl">
            What's happening around the world?
          </CardTitle>

          <div className="flex gap-2 text-lg items-center font-semibold">
            <List size={19} />
            <span>List View</span>

            {/* Switch */}
            <Switch
              checked={isGridView}
              onCheckedChange={() => setIsListView((prev) => !prev)}
            />

            <Grid3X3 size={19} />
            <span>Grid View</span>
          </div>
        </CardHeader>

        <CardContent
          className={`grid ${
            isGridView ? "grid-cols-2" : "grid-cols-1"
          } gap-4 flex-1 overflow-y-scroll`}
        >
          {/* News Cards */}
          {newsDetails.articles.map((article: any) => (
            <NewsCard key={article.url} article={article} />
          ))}
        </CardContent>

        <div className="flex justify-between flex-wrap w-full bg-white py-4 items-center px-6">
          <Button
            variant="outline"
            disabled={!newsDetails.previousPage}
            onClick={() => onPageClick(newsDetails.previousPage)}
          >
            Previous Page
          </Button>

          {newsDetails.nextPage && (
            <Button
              disabled={!newsDetails.nextPage}
              onClick={() => onPageClick(newsDetails.nextPage)}
            >
              Next Page
            </Button>
          )}
        </div>
      </Card>
    </section>
  );
};

export default ComponentName;
