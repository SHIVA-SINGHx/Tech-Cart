import React from 'react'

const Verify = () => {
  return (
    <div className='relative w-full h-[760px] '>
        <div className='min-h-screen flex items-center justify-center px-4 bg-zinc-900'>
            <div className='bg-white rounded-2xl shadow-lg w-full max-w-md text-center'>
                <h1 className='text-2xl font-semibold text-green-700'>Check Your Email</h1>
                <p className='text-gray-700 text-sm'>
                    We've sent you an email to verify your account. Please check your inbox and click the verfication link
                </p>

            </div>

        </div>
    </div>
  )
}

export default Verify
