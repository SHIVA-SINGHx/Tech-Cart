import React from 'react'

import { AppWindowIcon, CodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"



const Profile = () => {
  return (
    <div className='pt-20 min-h-screen bg-gray-100 flex items-center justify-center'>
            <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
            <div>
                <div className='flex flex-col justify-center items-center bg-gray-100'>
                    <h1 className='font-bold mb-7 text-2xl text-gray-800'>Update Profile</h1>
                    <div className='w-full flex gap-10 justify-between items-start px-7 max-w-2xl'>
                        {/* profile image */}
                        <div className='flex flex-col items-center'>
                            <img src="/main2.jpg" alt="profile" className='w-32 h-32 rounded-full object-cover border-4 border-blue-500'/>
                            <Label className='mt-4 cursor-pointer bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-700 '> Change Picture
                                <input type="file" accept='image/*' className='hidden' />
                            </Label>
                        </div>
                        {/* profile form */}
                        <form className='space-y-4 shadow-lg p-5 rounded-lg bg-white'>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <Label className='block text-sm font-medium'>First Name</Label>
                                    <input 
                                    type="text" 
                                    name='firstName' 
                                    placeholder='John'
                                    className='w-full border rounded-lg px-3 py-2 mt-1' />
                                </div>
                                <div>
                                    <Label className='block text-sm font-medium'>Last Name</Label>
                                    <input 
                                    type="text" 
                                    name='lastName' 
                                    placeholder='Doe'
                                    className='w-full border rounded-lg px-3 py-2 mt-1' />
                                </div>
                                <div>
                                    <Label className='block text-sm font-medium'>Email</Label>
                                    <input 
                                    type="email" 
                                    name='email' 
                                    placeholder='john@gmail.com'
                                    className='w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed' />
                                </div>
                                <div>
                                    <Label className='block text-sm font-medium'>Phone Number</Label>
                                    <input 
                                    type="text" 
                                    name='phoneNo' 
                                    placeholder='+91'
                                    className='w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed' />
                                </div>
    
                                <div>
                                    <Label className='block text-sm font-medium'>Address</Label>
                                    <input 
                                    type="text" 
                                    name='address' 
                                    placeholder = 'Enter your Address' className='w-full border rounded-lg px-3 py-2 mt-1' />
                                </div>
                                <div>
                                    <Label className='block text-sm font-medium'>City</Label>
                                    <input 
                                    type="text" 
                                    name='city' 
                                    placeholder = 'Enter your City' className='w-full border rounded-lg px-3 py-2 mt-1' />
                                </div>
                                <div>
                                    <Label className='block text-sm font-medium'>Zip Code</Label>
                                    <input 
                                    type="text" 
                                    name='zipCode' 
                                    placeholder = 'Enter your ZipCode' className='w-full border rounded-lg px-3 py-2 mt-1' />
                                </div>

                            </div>
                                <Button type='submit' className='w-full mt-4 bg-pink-500 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg'>
                                    Update Profile
                                </Button>
                        </form>
                    </div>
                </div>
            </div>
        </TabsContent>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Profile
