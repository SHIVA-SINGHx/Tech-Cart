import React, { use, useState } from "react";

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
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';


const SignUp = () => {
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-200">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-center">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to signup to your account

          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="text">First Name</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="John"
                  required
                  value={formData.firstName}
                  onClick={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Last Name</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Doe"
                  required
                  value={formData.lastName}
                  onClick={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                 value={formData.email}
                  onClick={handleChange}
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
                {/* make parent relative so icon can be placed over input */}
                
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
                    onClick={handleChange}
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
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            SignUp
          </Button>
          <p>Already have an account? <Link to={'/login'} className="hover:underline cursor-pointer text-pink-400 ">login</Link></p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
