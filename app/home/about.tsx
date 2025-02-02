import Timeline from "./timeline"
import Image from "next/image";
import groupImg from '@/public/group.jpg'
const About = () => {
  return (
    <div className="min-h-screen">
        <div className="max-w-[80vw] mx-auto">
            <div className="">
                <h1 className="text-[2.5rem] font-semibold mt-20">About Us</h1>
                <p className="text-[1.25rem] mb-5">A lot of DIC history</p>
            </div>
            <div className="min-w-full min-h-full">
                <Image src={groupImg} alt="" width={1200} height={500} className='w-full h-auto' />
            </div>

            <div className="">
                <Timeline/>
            </div>

        </div>

    </div>
  )
}

export default About