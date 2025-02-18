
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight } from 'lucide-react';
const Exams = () => {
  return (
    <div className='bg-slate-50 p-10'>
        <div className="bg-white rounded-md px-10 py-5">
            <div className="flex items-center justify-between my-5">
            <div className="">
                <h1 className='text-lg font-semibold'>Exams</h1>
                <p>Upload Student scores for each course you are taking.</p>
            </div>
            <div className="">
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="2023/2024" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">2022/2023</SelectItem>
                        <SelectItem value="2">2021/2022</SelectItem>
                        <SelectItem value="3">2020/2021</SelectItem>
                        <SelectItem value="4">2019/2020</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            </div>

            <hr />
            <div className="flex justify-end my-5">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-5 h-5" />
                </div>
                <Input type="text" placeholder="Search..." className="pl-10" />
            </div>
            </div>

            <div className="my-5">
                <Card className='max-w-[400px]'>
                    <CardContent className='space-y-7 py-5'>
                        <div className="flex justify-between items-center flex-col md:flex-row">
                        <div className="">
                        <h1 className='text-lg font-semibold'>PHY 101</h1>
                        <p>Physics</p>
                        </div>
                        <div className="">
                            <p>4 Units</p>
                        </div>
                        </div>

                        <div className="flex items-center justify-between w-full p-2 bg-gray-200">
                            <span>Students</span>
                            <span>70%</span>
                        </div>
                        <div className="">
                        <a href="/portal/staff/exams/1"><Button> Details <ArrowRight/></Button></a>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    </div>
  )
}

export default Exams;