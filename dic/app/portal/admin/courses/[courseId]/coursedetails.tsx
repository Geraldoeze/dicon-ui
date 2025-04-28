'use client'

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { adminService } from '@/services/admin.service';
import { ProfileView } from '@/components/ui/reusable-table-and-profile';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Key } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';

type courseDetailProps = {
    courseId: string;
};

const CourseDetails = ({ courseId }: courseDetailProps) => {
    const router = useRouter();

    const {
        data: course,
        isLoading,
        error
    } = useQuery({
        queryKey: ['course', courseId],
        queryFn: () => adminService.getCourse(courseId),
        enabled: Boolean(courseId),
        staleTime: 5 * 60 * 1000
    });

    // Handle loading state
    if (isLoading) {
        return (
            <div className="p-8 flex justify-center items-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto" />
                    <p className="mt-2">Loading course details...</p>
                </div>
            </div>
        );
    }
    console.log(course)
    // Handle error state
    if (error) {
        return (
            <div className="p-8">
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <h3 className="text-red-800 font-medium">Error Loading Course</h3>
                    <p className="text-red-600 mt-1">
                        Unable to load course details. Please try again later.
                    </p>
                </div>
            </div>
        );
    }

    // Handle case where no data is available
    if (!course?.data) {
        return (
            <div className="p-8">
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <h3 className="text-yellow-800 font-medium">No Data Available</h3>
                    <p className="text-yellow-600 mt-1">
                        The requested staff member could not be found.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className='flex items-center justify-end gap-5'>
                <Button size="2" className='py-2 px-4 my-5 bg-blue-600'>
                    Edit Course
                </Button>
                <Button size="2" className='py-2 px-4 my-5 bg-red-600'>
                    Delete Course
                </Button>
            </div>
            <Card className="md:max-w-[80vw] mx-auto md:p-7 py-5">
                <div className="mb-6 flex items-center justify-between">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>


                </div>

                <div className="flex justify-between flex-col lg:flex-row">
                    <CardContent className="flex-1 flex sm:flex-row items-start gap-4">

                        <div className="flex-1 items-center">
                            <h2 className="text-2xl font-semibold">{course?.data?.name}</h2>

                            <p className="text-gray-500">{course?.data?.course_code}</p>


                        </div>
                    </CardContent>
                    <div className="p-8 md:min-w-[40vw] max-w-[80vw] mx-auto">



                        <div className="">
                            <CardContent>
                                <div className="space-y-4">
                                    <div className='space-y-3'>
                                        <div className="flex items-center gap-2">

                                            <span>Description</span>
                                        </div>
                                        <h1 className='text-base md:text-lg font-semibold'>{course.data?.description}</h1>
                                        <hr />
                                    </div>
                                    <div className='space-y-3'>
                                        <div className="flex items-center gap-2">

                                            <span>Lecturer in Charge</span>
                                        </div>
                                        <h1 className='text-base md:text-lg font-semibold'>{course?.data?.lecturer_in_charge}</h1>
                                        <hr />
                                    </div>
                                </div>
                            </CardContent>




                            {/* Additional staff-specific sections */}
                            {/* <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Assigned Courses</h2> */}
                            {/* Add courses list here */}
                            {/* </div> */}

                            {/* <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2> */}
                            {/* Add activity list here */}
                            {/* </div>  */}
                        </div>

                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CourseDetails;