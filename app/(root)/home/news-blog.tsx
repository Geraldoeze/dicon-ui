"use client"

// type BlogPost = {
//   id: string;
//   title: string;
//   content: string;
//   source: string;
//   date: string;
//   time: string;
// }
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, Calendar } from 'lucide-react';
import {Card, CardContent, CardHeader} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image';

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

const NewsBlog = ({ columns = 3, visible }: BlogGridProps) => {

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  
  const renderCard = (article: NewsArticle) => (
    <Card 
      key={article.article_id}
      className="group hover:-translate-y-1 transition-all duration-300 ease-in-out"
    >
      <CardHeader className="space-y-2 p-4">
        <Link 
          href={`/blog/${article.article_id}`}
          className="inline-block"
        >
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-4">
        <p className="text-gray-600 line-clamp-3 text-sm">
          {article.description}
        </p>

        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <span className="text-yellow-500">▲</span>
            {article.source_name.toUpperCase()}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-500 pt-2 border-t">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <time dateTime={article.pubDate} className="text-sm">
              {new Date(article.pubDate).toLocaleDateString()}
            </time>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <time className="text-sm">
              {new Date(article.pubDate).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </time>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="md:min-h-screen relative bg-[url('/misionvision-bg.jpg')] bg-cover bg-center">
         <div className="absolute bg-gray-50/80 inset-0 opacity-10"></div>

    <div className="max-w-[80vw] mx-auto relative z-1 py-5">
    <h1 className="text-[1.5rem] text-center md:text-[2.5rem] font-semibold my-2"> News & Blog </h1>
    <p className="text-[1.25rem] text-center my-2"> Stay up to date with the latest info</p>

    {visible && (
      <div className="flex justify-center items-center my-10">
      <div className="max-w-4xl">
          <Image src="/image 184.png" alt="" width={750} height={500} />
          <div className="my-5">
            <h1 className='text-xl font-semibold'>Inauguration of Defence Intelligence Agency New Office Complex</h1>
            <p className='text-base max-w-3xl'>AVM MS Usman Centre for Strategic Studies (CSS) is a multi-disciplinary academic and research centre designed to initiate programmes in strategic studies and undertake security related research. The CSS anchors the Advanced Defence Intelligence Officers&apos; Course (ADIOC) which is designed to broaden officers&apos; knowledge in determination of intelligence in policy and conflict situations.</p>
          </div>
          <div className="flex items-center my-1">
                <span className="text-yellow-500 mr-1">▲</span>
                <span>TVC News</span>
          </div>
          <hr />
          <div className="flex items-center space-x-4 my-3">
              <div className="flex gap-2">
               <Calendar/>
               <time>24th, Jan 2025</time>
              </div>
              <div className="flex gap-2">
              <Clock/>
              <time> 20:00</time>
              </div>
          </div>
      </div>
      </div>
    )}
     <div className="w-full py-12">
      <div className="container mx-auto px-4">
        {/* Desktop Grid */}
        <div className={`md:grid hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
          {articles.map(renderCard)}
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="block md:hidden px-4">
        <Carousel>
          <CarouselContent>
            {articles.map((article) => (
              <CarouselItem key={article.article_id} className="md:basis-1/2 lg:basis-1/3">
                {renderCard(article)}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
    {/* <div className="w-full py-12">


      <div className="container mx-auto px-4">
      <div className={`md:grid hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
      {posts.map((post) => (
        <Card 
          key={post.id}
          className="group hover:-translate-y-1 transition-all duration-300 ease-in-out"
        >
          
          <CardHeader className="space-y-2 p-4">
            <Link 
              href={`/blog/${post.id}`}
              className="inline-block"
            >
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
            </Link>
            
          </CardHeader>

          <CardContent className="p-4 pt-0 space-y-4">
            <p className="text-gray-600 line-clamp-3 text-sm">
              {post.content}
            </p>

            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <span className="text-yellow-500">▲</span>
                {post.source}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500 pt-2 border-t">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date} className="text-sm">
                  {post.date}
                </time>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <time className="text-sm">
                  {post.time}
                </time>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
      </div>

      <div className="block md:hidden">
      
<Carousel>
  <CarouselContent>
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
    {posts.map((post) => (
        <Card 
          key={post.id}
          className="group hover:-translate-y-1 transition-all duration-300 ease-in-out"
        >
          
          <CardHeader className="space-y-2 p-4">
            <Link 
              href={`/blog/${post.id}`}
              className="inline-block"
            >
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
            </Link>
            
          </CardHeader>

          <CardContent className="p-4 pt-0 space-y-4">
            <p className="text-gray-600 line-clamp-3 text-sm">
              {post.content}
            </p>

            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <span className="text-yellow-500">▲</span>
                {post.source}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500 pt-2 border-t">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date} className="text-sm">
                  {post.date}
                </time>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <time className="text-sm">
                  {post.time}
                </time>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

      </div>
    </div> */}
    </div>
    </div>
  );
};

export default NewsBlog;