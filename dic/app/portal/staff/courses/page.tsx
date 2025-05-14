"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { staffService } from "@/services/staff.service";
import { TokenService } from "@/services/auth/tokenService";
import { useRouter } from "next/navigation";

// const staffCourses = [
//   {
//   id: 1,
//   course_code: "TME 761",
//   course_name: "Electricity and Power",
//   videos_no: 22,
//   students_no: 32,
//   course_time: '13:00',
//   course_day: 'Tomorrow'
//   },
//   {
//     id: 2,
//     course_code: "TME 661",
//     course_name: "Electricity and Power",
//     videos_no: 22,
//     students_no: 32,
//     course_time: '13:00',
//     course_day: 'Tomorrow'
//     }
//   ]

const Courses = () => {
  const router = useRouter();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const u = TokenService.getCachedUserData();
    setUser(u);
  }, []);

  const {
    data: staffCourses,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["staffCourses", user?.id],
    queryFn: () => staffService.getCourses({ id: user?.id }),
    enabled: Boolean(user?.id),
  });

  return (
    <div className="bg-slate-50">
      <div className="max-w-70vw mx-auto rounded bg-white">
        <div className="p-10">
          <div className="space-y-2">
            <h1 className="text-2xl font-medium">Courses</h1>
            <p className="text-base text-gray-700">
              View the courses you are taking
            </p>
          </div>
          {isLoading && (
            <div className="text-center text-lg my-5">Loading...</div>
          )}
          {error && (
            <div className="text-center text-lg my-5">
              Error loading courses
            </div>
          )}
          <div className="border-y-2 my-5 gap-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {staffCourses?.data.map((course) => (
              <div
                className="border-e-2 border-b-2 border-gray-100 min-w-[350px] p-5"
                key={course.course_id}
              >
                <div className="flex flex-col space-y-3 my-2">
                  <div className="flex flex-col gap-y-2">
                    <h1 className="text-xl font-semibold">
                      {course.course_code}
                    </h1>
                    <p>{course.course_name}</p>
                  </div>
                  <div className="flex justify-between">
                    <span>Videos:</span>
                    <span>{course.total_videos} videos</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Students:</span>
                    <span>{course.total_students} students</span>
                  </div>
                </div>
                <hr />

                <div className="w-full flex justify-end items-center my-3">
                  {/* <p className='space-x-2 flex'> <Clock/> <span>{course.course_time}</span></p>
                      <p className='space-x-2 flex'><Calendar/> <span>{course.course_day}</span></p> */}
                  <p
                    onClick={() => router.push(`courses/${course.course_id}`)}
                    className="space-x-2 flex font-medium"
                  >
                    <span>Details</span> <ArrowRight />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
