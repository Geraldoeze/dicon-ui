import React from 'react'

const forgotPassword = () => {
  return (
    <div>
        <div className="min-w-screen min-h-screen p-10 flex">
                <div className="w-1/2 min-h-full bg-slate-50">
                <div className="flex flex-col items-center justify-center max-w-md h-full m-auto space-y-5">
                    <div className="">
                    <h1 className="text-[2rem] md:text-[2.5rem] text-start font-semibold"> Enter your E-mail </h1>
                    <p>You will receive your mail to reset your password</p>
                    </div>
                    <form action="" className="space-y-10 mt-10">
                        <input type="text" placeholder="Enter your E-mail" className="w-full p-2 border-b shadow-none outline-none rounded-md focus:ring-2 focus:ring-blue-500" />
                        <input type="submit" value="Submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" />
                    </form>
                </div>
                </div>
                <div className="w-1/2 bg-[url('/11074101.jpg')] bg-cover bg-center">
                  
                </div>
            </div>


    </div>
  )
}

export default forgotPassword