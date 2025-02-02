import Hero from './home/hero';
import About from './home/about';
import Commandants from './home/commandants';
import MisionVision from './home/mission-vision';
import NewsBlog from './home/news-blog';
import Gallery from './home/gallery';
import { blogPosts, galleryImages } from './home/mock';

export default function Home() {
 
  return (
    <main>
      <Hero />
      <About/>
      <Commandants/>
      <MisionVision/>
      <NewsBlog 
      posts={blogPosts} columns={3}
      />
      <Gallery 
      images={galleryImages}
      title="Gallery"
      subtitle="Take a look at some of our shots"
      />
    </main>
  );
}