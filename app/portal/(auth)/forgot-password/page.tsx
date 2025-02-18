import Image from "next/image"

const forgotPassword = () => {
  return (
    <div>
        <div className="min-w-screen min-h-screen flex">
                <div className="w-full min-h-full bg-[#080825]">
                <div className="flex flex-col items-center justify-center max-w-md h-full m-auto space-y-5">
                    <div className="text-white space-y-3">
                    <div className="flex justify-center">
                    <Image src="/logo.png" alt="" width={100} height={100} className=""/>
                    </div>
                    <h1 className="text-[2rem] md:text-[2.5rem] text-start font-semibold"> Enter your E-mail </h1>
                    <p>You will receive your mail to reset your password</p>
                    </div>
                    <form action="" className="space-y-10 mt-10">
                        <input type="text" placeholder="Enter your E-mail" className="w-full p-2 border-b shadow-none outline-none rounded-md focus:ring-2 focus:ring-blue-500" />
                        <input type="submit" value="Submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" />
                    </form>
                </div>
                </div>
                {/* <div className="w-1/2 bg-[url('/11074101.jpg')] bg-cover bg-center"></div> */}
                  
                
            </div>


    </div>
  )
}

export default forgotPassword