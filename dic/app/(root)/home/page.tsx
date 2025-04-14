import Hero from './hero';
import About from './about';
import Commandants from './commandants';
import MisionVision from './mission-vision';
import NewsBlog from './news-blog';
import Gallery from './gallery';
// import { blogPosts } from './mock';

export default function Home() {
 
  return (
    <main className='overflow-x-hidden scroll-smooth scroll-none'>
      <Hero />
      <About/>
      <Commandants/>
      {/* <MisionVision/> */}
      {/* <NewsBlog 
       columns={3}
      visible = {false}
      /> */}
      {/* <Gallery/> */}
      {/* images={galleryImages}
      title="Gallery"
      subtitle="Take a look at some of our shots" */}
    </main>
  );
}