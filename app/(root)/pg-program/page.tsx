import ProgramCard from './program-card';
import {programs} from '../home/mock';
import Link from 'next/link';

const page = () => {
  return (
    <div>

<div className="relative min-h-screen lg:min-h-full lg:max-h-[1200px] w-full overflow-hidden">
      {/* Background with Overlay */}
      <div 
        className={`absolute inset-0 bg-[url('/IMG_0040.JPG')] bg-cover bg-center`}
      >
        <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs" />
      </div>

      {/* Main Content Container */}
      <div className="relative h-screen lg:max-h-[1000px] max-w-[85vw] mx-auto">
        
        {/* Center Content Section */}
        <div className="absolute top-[80%] -translate-y-1/2  
          max-w-2xl md:max-w-3xl">
          {/* Title Section */}
          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl 
            font-semibold text-white my-2">
            PG Program
          </h1>

          {/* Subtitle Section */}
            <p className="hero-subtitle text-base sm:text-lg md:text-xl lg:text-2xl 
              text-white/90 max-w-xl">
              Checkout our post graduate programs.
            </p>
          
    </div>
    </div>
    </div>

    <div className="min-h-screen lg:min-h-full lg:max-h-[1800px] relative mx-auto max-w-[85vw] py-10">

    <div className="flex items-center justify-center flex-col my-5">
      <h1 className='text-center text-[1.5rem] md:text-[2.5rem] font-semibold my-5'> Centre for Strategic Resources </h1>
      <div className="flex items-center flex-col md:flex-row gap-x-5 my-5 max-w-7xl">
        <p className='text-start text-base max-w-lg'>
        AVM MS Usman Centre for Strategic Studies (CSS) is a multi-disciplinary academic and research centre designed to initiate programmes in strategic studies and undertake security related research. The CSS anchors the Advanced Defence Intelligence Officers&apos; Course (ADIOC) which is designed to broaden officers&apos; knowledge in determination of intelligence in policy and conflict situations.
        </p>
        <p className='text-start text-base max-w-lg'>
        AVM MS Usman Centre for Strategic Studies (CSS) is a multi-disciplinary academic and research centre designed to initiate programmes in strategic studies and undertake security related research. The CSS anchors the Advanced Defence Intelligence Officers&apos; Course (ADIOC) which is designed to broaden officers&apos; knowledge in determination of intelligence in policy and conflict situations.
        </p>
      </div>
      <div className="my-5">
      <Link 
              href="/"
              className="bg-[#2D2F93] text-white px-10 py-2 rounded-md hover:bg-blue-900 
                transition-colors duration-300"
            >
              Apply
            </Link>
      </div>
    </div>
      <div className="mt-10">
{programs.map(program => (
        <ProgramCard 
          key={program.id} 
          program={program}
        />
      ))}
      </div>


      <div className="my-5 py-5">
        <div className="text-center">
          <h1 className='text-[1.5rem] md:text-[2.5rem] font-semibold'>Tuition</h1>
          <p className='text-base md:text-lg'>Generally, candidates can pay fully for their choice programme at once before academic activities.</p>
        </div>

        <div className="my-5 flex items-center gap-x-5 flex-col lg:flex-row">
          <div className="p-4 w-full flex-1">
            <div className="flex justify-between items-center w-full my-2">
            <h1 className='font-medium text-xl'>Degree Level</h1>
            <p className='rounded-full p-1 bg-gray-200'>PGD</p>
            </div>
            <hr className='text-gray-600' />
            <p className='text-gray-800 text-base my-2 mb-5'>Full payment required</p>

            <hr className='text-gray-600'/>
            <div className="flex justify-between items-center my-2">
            <h1 className='font-medium text-base'>2 Semesters</h1>
            <p className='lg:text-base font-bold'>#1,200,000</p>
            </div>

          </div>
          <div className="p-4 flex-1">
          <div className="flex justify-between items-center my-2">
            <h1 className='font-medium text-xl'>Degree Level</h1>
            <p className='rounded-full p-1 bg-gray-200'>M.Sc</p>
            </div>
            <hr className='text-gray-600' />
            <p className='text-gray-800 text-base my-2 mb-5'>75% paid by 1st semester to be completed in second semester</p>

            <hr className='text-gray-600'/>
            <div className="flex justify-between items-center my-2">
            <h1 className='font-medium text-base'>3 Semesters</h1>
            <p className='text-base font-bold'>#2,100,000</p>
            </div>

          </div>
          <div className="p-4 flex-1">
          <div className="flex justify-between items-center my-2">
            <h1 className='font-medium text-xl'>Degree Level</h1>
            <p className='rounded-full p-1 bg-gray-200'>Ph.D</p>
            </div>
            <hr className='text-gray-600' />
            <p className='text-gray-800 text-base my-2 mb-5'>To be completed within 4 semesters starting with 50% before commencement of the 1st semester</p>

            <hr className='text-gray-600'/>
            <div className="flex justify-between items-center my-2">
            <h1 className='font-medium text-base'>6 Semesters</h1>
            <p className='text-base font-bold'>#1,200,000</p>
            </div>

          </div>
        </div>

        <div className="my-5 flex justify-center">
      <Link 
              href="/"
              className="bg-[#2D2F93] text-white px-10 py-2 rounded-md hover:bg-blue-900 
                transition-colors duration-300"
            >
              Apply Now
            </Link>
      </div>
      </div>
    </div>
    </div>
  )
}

export default page