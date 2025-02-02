
type BlogPost = {
  id: string;
  title: string;
  content: string;
  source: string;
  date: string;
  time: string;
}

import Link from 'next/link';

interface BlogGridProps {
  posts: BlogPost[];
  columns?: number;
}

const NewsBlog = ({ posts, columns = 3 }: BlogGridProps) => {
  return (
    <div className="min-h-screen relative bg-[url('/misionvision-bg.jpg')] bg-cover bg-center">
         <div className="absolute bg-gray-50/80 inset-0 opacity-10"></div>

    <div className="max-w-[80vw] mx-auto relative z-1 py-5">
    <h1 className="text-[1.5rem] text-center md:text-[2.5rem] font-semibold my-5"> News & Blog </h1>
    <p className="text-[1.25rem] text-center mb-5"> Stay up to date with the latest info</p>
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
          {posts.map((post) => (
            <article 
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  <Link href={`/blog/${post.id}`} className="hover:text-blue-600">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.content}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">▲</span>
                    <span>{post.source}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <time dateTime={post.date}>{post.date}</time>
                    <time>{post.time}</time>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default NewsBlog;