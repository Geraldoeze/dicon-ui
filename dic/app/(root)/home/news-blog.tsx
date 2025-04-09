/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from 'react';
import { Clock, Calendar } from 'lucide-react';
import {Card, CardContent, CardHeader} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useApiLoader } from '@/hooks/use-api-loader';
import { useQuery } from '@tanstack/react-query';
import { strapiService } from '@/services/strapiService';

interface BlogGridProps {
  columns?: number;
  visible: boolean;
}

type NewsArticle = {
  article_id: string;
  title: string;
  link: string;
  description: string;
  content: string;
  pubDate: string;
  source_name: string;
};

type StrapiNewsItem = {
  id: number;
  documentId: string;
  title: string;
  content: { type: string; children: { type: string; text: string }[] }[];
  published_date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

const NewsBlog = ({ columns = 3, visible }: BlogGridProps) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [combinedArticles, setCombinedArticles] = useState<Array<NewsArticle | StrapiNewsItem>>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://newsdata.io/api/1/news?country=ng&apikey=pub_682707a1153f9ab3d18cd21f27a3acdc339bb');
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }

        const data = await response.json();
        
        if (Array.isArray(data.results)) {
          setArticles(data.results.slice(0, 9));
        } else {
          throw new Error('Invalid data format received');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch news');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useApiLoader(loading);

  const { data: strapiNews, isLoading: strapiLoading } = useQuery({
    queryKey: ['news'],
    queryFn: strapiService.getNews,
    enabled: !loading,
  });

  useEffect(() => {
    if (articles.length > 0 && strapiNews?.data) {
      // Combine both data sources
      const allArticles = [
        ...strapiNews.data.map((item: StrapiNewsItem) => ({
          ...item,
          isStrapi: true // Flag to identify Strapi items
        })),
        ...articles
      ];
      
      // Sort by date if needed
      const sortedArticles = allArticles.sort((a: any, b: any) => {
        const dateA = a.isStrapi ? new Date(a.published_date) : new Date(a.pubDate);
        const dateB = b.isStrapi ? new Date(b.published_date) : new Date(b.pubDate);
        return dateB.getTime() - dateA.getTime(); // Most recent first
      });
      
      setCombinedArticles(sortedArticles);
    }
  }, [articles, strapiNews]);

  const getContentText = (content: any) => {
    if (Array.isArray(content)) {
      return content
        .map(block => 
          block.children
            .map((child: any) => child.text)
            .join('')
        )
        .join(' ');
    }
    return content;
  };

  const renderCard = (article: any) => {
    // Determine if it's a Strapi item or News API item
    const isStrapi = article.isStrapi;
    
    return (
      <Card 
        key={isStrapi ? `strapi-${article.id}` : article.article_id}
        className="group hover:-translate-y-1 transition-all duration-300 ease-in-out"
      >
        <CardHeader className="space-y-2 p-4">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {article.title}
          </h3>
        </CardHeader>

        <CardContent className="p-4 pt-0 space-y-4">
          <p className="text-gray-600 line-clamp-3 text-sm">
            {isStrapi 
              ? getContentText(article.content)
              : article.description}
          </p>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <span className="text-yellow-500">▲</span>
              {isStrapi ? 'DIC' : article.source_name.toUpperCase()}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 pt-2 border-t">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time dateTime={isStrapi ? article.published_date : article.pubDate} className="text-sm">
                {new Date(isStrapi ? article.published_date : article.pubDate).toLocaleDateString()}
              </time>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <time className="text-sm">
                {new Date(isStrapi ? article.published_date : article.pubDate).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </time>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading || strapiLoading) {
    return (
      <div className="min-h-screen lg:min-h-full xl:min-h-[1200px] xl:max-h-[1200px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen lg:min-h-full xl:min-h-[1200px] xl:max-h-[1200px] flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="md:min-h-screen lg:min-h-full xl:min-h-[1200px] xl:max-h-[1600px] relative bg-[url('/misionvision-bg.jpg')] bg-cover bg-center">
      <div className="absolute bg-gray-50/80 inset-0 opacity-10"></div>

      <div className="max-w-[80vw] mx-auto relative z-1 py-5">
        <h1 className="text-[1.5rem] text-center md:text-[2.5rem] font-semibold my-2"> News & Blog </h1>
        <p className="text-[1.25rem] text-center my-2"> Stay up to date with the latest info</p>

        {visible && (
          <div className="flex justify-center items-center my-10">
            {/* Featured content could go here */}
          </div>
        )}
        
        <div className="w-full py-12">
          <div className="container mx-auto px-4">
            {/* Desktop Grid */}
            <div className={`md:grid hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
              {combinedArticles.map(renderCard)}
            </div>
          </div>

          {/* Mobile Carousel */}
          <div className="block md:hidden px-4">
            <Carousel>
              <CarouselContent>
                {combinedArticles.map((article, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    {renderCard(article)}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsBlog;