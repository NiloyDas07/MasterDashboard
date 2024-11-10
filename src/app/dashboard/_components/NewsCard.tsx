import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

interface Props {
  article: {
    source: {
      id: string;
      name: string;
    };
    author: null | string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  };
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

const NewsCard: React.FC<Props> = ({ article }) => {
  const [articleOpen, setArticleOpen] = React.useState(false);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="rounded-md">
          <img
            src={article.urlToImage}
            alt="Article Image"
            className="truncate rounded-md"
          />
        </div>

        <CardTitle className="text-xl">{article.title}</CardTitle>

        <div className="text-sm text-muted-foreground">
          By {article.author || article.source.name} -{" "}
          {formatDate(article.publishedAt)}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div
          className={`text-base text-card-foreground ${
            !articleOpen && "line-clamp-2"
          }`}
        >
          {article.description}
        </div>

        <button
          className="text-sky-600 self-start"
          onClick={() => setArticleOpen((prev) => !prev)}
        >
          {articleOpen ? "Read Less" : "Read More"}
        </button>

        <Link href={article.url} className="text-sky-600 self-center text-lg">
          View Full Article
        </Link>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
