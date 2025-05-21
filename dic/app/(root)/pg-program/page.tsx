"use client";

//import {programs} from '../home/mock';
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { strapiService } from "@/services/strapiService";
import { useApiLoader } from "@/hooks/use-api-loader";
import Image from "next/image";

const Page = () => {
  const { data: pg, isLoading } = useQuery({
    queryKey: ["pg"],
    queryFn: () => strapiService.getPG(),
  });

  useApiLoader(isLoading);

  return (
    <div>
      <div className="relative min-h-screen lg:min-h-full lg:max-h-[1200px] w-full overflow-hidden">
        {/* Background with Overlay */}
        <div
          className={`absolute inset-0 bg-[url('/photo_2025-04-07_08-34-18.jpg')] bg-cover bg-center`}
        >
          <div className="absolute inset-0 bg-slate-800/50 backdrop-blur-xs" />
        </div>

        {/* Main Content Container */}
        <div className="relative h-screen lg:max-h-[1000px] max-w-[85vw] mx-auto">
          {/* Center Content Section */}
          <div
            className="absolute top-[80%] -translate-y-1/2  
          max-w-2xl md:max-w-3xl"
          >
            {/* Title Section */}
            <h1
              className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl 
            font-semibold text-white my-2"
            >
              {/* PG Program */}
            </h1>

            {/* Subtitle Section */}
            <p
              className="hero-subtitle text-base sm:text-lg md:text-xl lg:text-2xl 
              text-white/90 font-semibold max-w-sm"
            >
              Checkout our post graduate programmes.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto my-12 p-2">
        <div className="flex flex-col lg:flex-row justify-center gap-10">
          <div className="w-full lg:w-[48%] relative">
            <Image
              alt=""
              src={"/pg-prom.jpeg"}
              width={200}
              height={200}
              style={{ width: "100%", height: "100%" }}
            />
          
          </div>
          <div className="w-full lg:w-[48%]">
            <h3 className="text-gray-900 font-bold text-4xl">
            FACULTY OF SOCIAL SCIENCES UNN IN AFFILIATION WITH DIC - LIST OF POSTGRADUATE PROGRAMMES.
            </h3>
            <div className="my-6">
              <h4 className="text-gray-900 text-lg underline font-semibold">
                Department of Geography and Environmental Sustainability M.Sc.
                and PhD
              </h4>
              <p className="text-gray-600 my-2 font-medium">
                Cartography <br />
                Remote Sensing& <br />
                Geographic Information System
              </p>
              <p className="text-gray-600 my-4 font-medium">
                Candidates applying for the M.Sc. degree in Geography should
                hold Bachelors degree with a minimum CGPA of 3.0 on a scale of
                5.0 in Geography, Education/Geography or related disciplines in
                the Social, Physical, Biological, Agricultural and Environmental
                Sciences or Engineering etc. While candidates applying for the
                PhD degree in Geography and Environmental Sustainability,
                Cartography and Remote Sensing should hold Master’s degree with
                a minimum CGPA of at least 3.5 on a scale of 5.0 in a relevant
                area of Geography or the related disciplines.
              </p>
            </div>
            <div className="my-6">
              <h4 className="text-gray-900 text-lg underline font-semibold">
                Department of Political Science PGD, M.Sc. and PhD
              </h4>
              <p className="text-gray-600 my-2 font-medium">
                International Relations and Diplomacy
                <br />
                Conflict, Peace and Strategic Studies
                <br />
                Human Security and Counter-Terrorism
                <br />
                Soft Protocol and Diplomacy
              </p>
              <p className="text-gray-600 my-4 font-medium">
                The basic entry qualification for admission into the M.Sc.
                programme is a Bachelor’s Degree with at least a Second-Class
                Lower Division with not less than 3.00 GPA or its equivalent.
                Also, candidates with appropriate Postgraduate Diploma of the
                University of Nigeria or of other recognized Universities with
                at least 3.50 GPA on a 5-point scale. In addition, the candidate
                must satisfy the Departmental O’Level and/or Direct Entry
                general entry requirements for degree programmes.
              </p>
            </div>
          </div>
        </div>
        <div className="my-2">
          <h4 className="text-gray-600 text-lg font-semibold">
            Political and Economic Intelligence:
          </h4>
          <p className="text-gray-600 my-2 font-medium">
            The basic entry qualification for admission into the PGD is HND in
            any academic field. M.Sc. programme is a Bachelor’s Degree with at
            least a Second-Class Lower Division with not less than 3.00 GPA or
            its equivalent in Social, Management Science or other related
            fields. Also, candidates with appropriate Postgraduate Diploma of
            the University of Nigeria or of other recognised Universities with
            at least 3.50 GPA on a 5-point scale. In addition, the candidate
            must satisfy the Departmental O’Level and/or Direct Entry general
            entry requirements for degree programmes. While the basic entry
            qualification for admission into the PhD programme is a Master's
            Degree in relevant areas from the University of Nigeria or other
            recognised universities with at least 3.50 CGPA on a 5-point scale.
            In addition, the candidate must satisfy the Departmental O'Level and
            /or Direct Entry general entry requirements for degree programmes.
          </p>
          <div className="my-6">
            <h4 className="text-gray-900 text-lg underline font-semibold">
              Department of Sociology/Anthropology M.Sc. and PhD
            </h4>
            <p className="text-gray-600 my-2 font-medium">
              Criminology, Conflict and Change:
              <br />
              The criteria for admission into the M.Sc programme will be as
              follows:
              <br />
              Matriculation requirement of the University, which is five (5)
              O-level Credit passes including English Language with either of
              the following:
              <br />
              A student with at least 3rd class degree in any area of study.
              <br />
              HND holders with a minimum of Upper Credit from recognized
              institution may also be considered.
              <br />
              BSc holders with pass degree with 5 years and above
              post-graduation experience.
            </p>
          </div>

          <div className="my-6">
            <h4 className="text-gray-900 text-lg underline font-semibold">
              Institute of Social Policy PGD, MSP, M.Sc. and PhD
            </h4>
            <p className="text-gray-600 my-2 font-medium">
              Social Policy:
              <br />
              The criteria for admission into M.Sc. Social Policy programme will
              be as follows:
              <br />
              Five (5) O-level credits passes including English;
              <br />
              Candidates with at least 2nd Class honours Lower Division in
              Social or Management Science;
              <br />
              Candidates with a PGD in Social Policy with a CGPA of 3.5 on a
              5-point scale or its equivalent.
            </p>
            <p className="text-gray-600 my-4 font-medium">
              While Basic Admission Requirements for Ph.D programme and MSc/Ph.D
              Programme
            </p>
            <p className="text-gray-600 my-4 font-medium">
              Candidates for PhD programme must have academic Master’s degree in
              Social Policy with a minimum CGPA of 3.0/4.0 or 3.5/5.0 and
              Project score not lower than 60%
            </p>
            <p className="text-gray-600 my-4 font-medium">
              Candidates for PhD programme with the required CGPA of 3.0/4.0 or
              3.5/5.0 and Project score not lower than 60% but without Master’s
              degree in Social Policy will be admitted for M.Sc./PhD. The
              candidate will take relevant M.Sc. courses in Social Policy for
              one session before seeking for firm registration for Ph.D
              programme.
            </p>
            <p className="text-gray-600 my-4 font-medium">
              Candidates must demonstrate adequate intellectual capacity,
              maturity and effective decision making and problem solving
              potentials.
            </p>
            <p className="text-gray-600 my-4 font-medium">
              In addition to the above, the Candidates must have made at least
              2nd class honours lower division with a CPGA of not lower than 2.5
              plus the basic requirements in WASC/GCE O’Level for the first
              degree.
            </p>
          </div>
          <div className="my-6">
            <h4 className="text-gray-900 text-lg underline font-semibold">
              Department of Psychology M.Sc. and PhD
            </h4>
            <p className="text-gray-600 my-2 font-medium">
              Criminal Psychology and Forensic Studies:
            </p>
            <p className="text-gray-600 my-4 font-medium">
            The entry qualification for admission into the
              M.Sc. programme is a Bachelor’s Degree with at least a
              Second-Class Lower Division with not less than 3.00 GPA or its
              equivalent in Psychology or other related fields in Criminal and
              Forensic Science. Also, candidates with appropriate Postgraduate
              Diploma of the University of Nigeria or of other recognised
              Universities with at least 3.50 GPA on a 5-point scale. While the
              basic entry qualification for admission into the PhD programme is
              a Master's Degree in relevant areas from the University of Nigeria
              or other recognised universities with at least 3.50 CGPA on a
              5-point scale.
            </p>
          </div>
          <div className="my-6">
            <h4 className="text-gray-900 text-lg underline font-semibold">
              Department of Public Administration M.Sc and PhD
            </h4>
            <p className="text-gray-600 my-2 font-medium">
              Strategic Intelligence and Security Management:
            </p>
            <p className="text-gray-600 my-2 font-medium">
              
              The criteria for admission into M.Sc. Strategic
              Intelligence programme will be as follows:
            </p>
            <p className="text-gray-600 my-4 font-medium">
              Five (5) O-level credits passes including English;
              <br />
              Candidates with at least 2nd Class honours Lower Division in
              Social or Management Science or other related fields.
              <br />
              Candidates with a PGD in Social Policy with a CGPA of 3.5 on a 5
              point scale or its equivalent.
            </p>
            <p className="text-gray-600 my-4 font-medium">
              While the basic entry qualification for admission into the PhD
              programme is a Master's Degree in relevant areas from the
              University of Nigeria or other recognised universities with at
              least 3.50 CGPA on a 5-point scale. In addition, the candidate
              must satisfy the Departmental O'Level and /or Direct Entry general
              entry requirements for degree programmes.
            </p>
          </div>

          <div className="my-5 flex justify-center">
            <Link
              href="/apply"
              className="bg-[#2D2F93] text-white px-10 py-2 rounded-md hover:bg-blue-900 
                transition-colors duration-300"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>

      {/* {pg?.data.map((pg) => (
        <div
          key={pg.id}
          className="min-h-screen lg:min-h-full relative mx-auto max-w-[85vw] py-10"
        >
          <div className="flex items-center justify-center flex-col my-5">
            <Image src="/unn.png" width={100} height={100} alt="logo"></Image>

            <div className="flex flex-col items-center">
              <h1 className="text-center text-[1.5rem] md:text-[2.5rem] font-semibold my-5">
                {" "}
                Centre for Strategic Resources{" "}
              </h1>
              <div className="flex items-center flex-col md:flex-row gap-5 my-5 max-w-7xl">
                <p className="text-start text-base max-w-lg">{pg.css_text}</p>
                <p className="text-start text-base max-w-lg">{pg.css_text}</p>
              </div>
              <div className="my-5">
                <Link
                  href="/apply"
                  className="bg-[#2D2F93] text-white px-10 py-2 rounded-md hover:bg-blue-900 
                transition-colors duration-300"
                >
                  Apply
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-10">
            {pg.departments.map((department) => (
              <ProgramCard
                key={department.id}
                program={{
                  id: department.id,
                  name: department.name,
                  courses: department.courses,
                  degrees: department.degrees,
                }}
              />
            ))}
          </div>

          <div className="my-5 py-5">
            <div className="text-center">
              <h1 className="text-[1.5rem] md:text-[2.5rem] font-semibold">
                Tuition
              </h1>
              <p className="text-base md:text-lg">
                Generally, candidates can pay fully for their choice programme
                at once before academic activities.
              </p>
            </div>

            <div className="my-5 flex items-center gap-x-5 flex-col lg:flex-row">
              {pg.tuition.map((item) => (
                <div key={item.id} className="p-4 w-full flex-1">
                  <div className="flex justify-between items-center w-full my-2">
                    <h1 className="font-medium text-xl">Degree Level</h1>
                    <p className="rounded-full p-1 bg-gray-200">
                      {item.degree_level}
                    </p>
                  </div>
                  <hr className="text-gray-600" />
                  <p className="text-gray-800 text-base my-2 mb-5">
                    {item.degree_agreement}
                  </p>

                  <hr className="text-gray-600" />
                  <div className="flex justify-between items-center my-2">
                    <h1 className="font-medium text-base">
                      {item.semesters} Semesters
                    </h1>
                    <p className="lg:text-base font-bold">₦{item.fee}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="my-5 flex justify-center">
              <Link
                href="/apply"
                className="bg-[#2D2F93] text-white px-10 py-2 rounded-md hover:bg-blue-900 
                transition-colors duration-300"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default Page;
