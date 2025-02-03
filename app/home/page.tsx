import Hero from './hero';
import About from './about';
import Commandants from './commandants';
import MisionVision from './mission-vision';
import NewsBlog from './news-blog';
import Gallery from './gallery';
import { blogPosts, galleryImages } from './mock';

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