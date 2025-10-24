import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

  }

  const submitHandler = async (e)=>{
    e.preventDefault()
    console.log(formData);
    
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-200">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-center">Login your account</CardTitle>
          <CardDescription>
            Enter your email and password to login your account
          </CardDescription>
        </CardHeader>

    
        <form onSubmit={submitHandler}>
          <CardContent>
              <div className="flex flex-col gap-6">

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      placeholder="Create your password"
                      required
                      type={showPassword ? "text" : "password"}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                      value={formData.password}
                      onChange={handleChange}
                    />
                    
                    {passwordFocused && (
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 w-5 h-5 flex items-center justify-center"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    )}
                  </div>
                </div>
              </div>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              SignUp
            </Button>
            <p>Already have an account? <Link to={'/login'} className="hover:underline cursor-pointer text-pink-400 ">login</Link></p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
