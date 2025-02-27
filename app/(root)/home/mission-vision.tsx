import Image from "next/image";
import mission from '@/public/IMG-20250212-WA0005.jpg';
import vision from '@/public/group.jpg';
const MisionVision = () => {
  return (
    <div className="min-h-screen lg:min-h-full xl:max-h-[1000px] relative bg-[url('/misionvision-bg.jpg')] bg-cover bg-center">
        <div className="absolute bg-gray-50/80 inset-0 opacity-10"></div>
        <div className="max-w-[80vw] mx-auto relative z-1 py-5">

            <h1 className="text-[1.5rem] text-center md:text-[2.5rem] font-semibold my-10"> Mision & Vision </h1>

            <div className="flex flex-col md:flex-row gap-x-10 items-center justify-center">
                <div className="max-w-[500px] flex flex-col justify-center opacity-100 md:opacity-50  md:hover:opacity-100 hover:border-2 p-4">
                    <div className="max-w-[500px] max-h-[500px]">
                    <Image src={mission} width={900} alt="" className="w-full h-auto mx-auto" />
                    </div>
                    <div className="text-center my-5">
                        <h1 className="text-xl font-semibold mx-2">Mision Statement</h1>
                        <p className="text-base font-normal">Provide security and intelligence training for all categories of DIA staff, personnel of the Nigerian Armed Forces and other security agencies, in order to enable them perform optimally wherever they may be deployed</p>
                    </div>
                </div>
                <div className="max-w-[500px] flex flex-col justify-center opacity-100 md:opacity-50 md:hover:opacity-100 hover:border-2 p-4">
                    <div className="max-w-[500px] max-h-[500px]">
                    <Image src={vision} alt="" className="w-full h-auto mx-auto"/>
                    </div>
                    <div className="text-center my-5">
                        <h1 className="text-xl font-semibold mx-2">Vision Statement</h1>
                        <p className="text-base font-normal">Well trained, patriotic and highly motivated manpower working with cutting edge technology under an effective leadership in collaboration with friendly forces that will provide comprehensive and timely defence intelligence in support of national security strategy</p>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
  )
}

export default MisionVision;