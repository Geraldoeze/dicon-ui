import Image from "next/image";
import commandant from '@/public/commandant.jpg'
import img from '@/public/22-24.jpg'
import img2 from '@/public/22.jpg'
import img3 from '@/public/20-22.jpg'
import  {ArrowUpRight} from "lucide-react";
const Commandants = () => {
  return (
    <div className="min-h-screen relative bg-[url('/commandants-bg.jpg')] bg-cover bg-center">
        <div className="absolute bg-slate-50/90 inset-0"></div>
        <div className="max-w-[80vw] mx-auto relative z-1 py-5">
            
                <h1 className="text-[1.5rem] text-center md:text-[2.5rem] font-semibold my-10">Commandants</h1>
                <div className="flex justify-center">
                <div className="p-4">
                    <div className="max-w-[300px] min-h-[300px]">
                    <Image src={commandant} alt="" className="w-full h-auto"/>
                    </div>
                    <div className="text-center flex flex-col gap-y-2">
                    <h2 className="text-lg font-semibold">R ADM. P.E EFFAH</h2>
                    <p className="text-gray-600 font-normal text-sm max-w-sm">DSS psc(+) nwc(+) fdc MSc MLC MIAD FIIPS </p>
                    <p className="text-gray-600 font-normal text-sm"> CURRENT COMMANDANT</p>
                    </div>
                </div>
              
            </div>

            
            <div className="flex flex-col md:flex-row justify-center gap-x-5">
                  <div className="p-4">
                  <div className="max-w-[300px] min-h-[200px]">
                    <Image src={img} width={900} alt="" className="w-full h-auto"/>
                    </div>
                    <div className="text-center flex flex-col gap-y-2">
                    <h2 className="text-lg font-semibold uppercase">cdre e.o jaiyeola</h2>
                    <p className="text-gray-600 font-normal text-sm max-w-sm"> DSS psc isc mni </p>
                    <p className="text-gray-600 font-normal text-sm"> sep 2016 - aug 2018</p>
                    </div>
                  </div>
                  <div className="p-4">
                  <div className="max-w-[300px] min-h-[200px]">
                    <Image src={img2} width={900} alt="" className="w-full h-auto"/>
                    </div>
                    <div className="text-center flex flex-col gap-y-2">
                    <h2 className="text-lg font-semibold uppercase">cdre m.a emuekpere</h2>
                    <p className="text-gray-600 font-normal text-sm max-w-sm"> DSS psc(+) nswc MSc </p>
                    <p className="text-gray-600 font-normal text-sm"> sep 2018 - aug 2020 </p>
                    </div>
                  </div>
                  <div className="p-4">
                  <div className="max-w-[300px] min-h-[200px]">
                    <Image src={img3} alt="" className="w-full h-auto"/>
                    </div>
                    <div className="text-center flex flex-col gap-y-2">
                    <h2 className="text-lg font-semibold uppercase">cdre e.o jaiyeola</h2>
                    <p className="text-gray-600 font-normal text-sm max-w-sm"> DSS aowc MSc </p>
                    <p className="text-gray-600 font-normal text-sm"> sep 2020 - aug 2022 </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center my-5">
                  <a href="/commandants" className="flex gap-3 items-center bg-gray-200 hover:bg-gray-400 border-gray-600 border-2 text-black font-semibold py-2 px-4 rounded-md">
                    <span className="text-[.8rem] md:text-[1rem] min-w-fit">View all Past Commandants</span> 
                    <ArrowUpRight/> 
                  </a>
                </div>
        </div>

    </div>
  )
}

export default Commandants