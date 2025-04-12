"use client"

import { useEffect, useState } from "react"
import Navbar from "../shared/Navbar"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Button } from "../ui/button"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "sonner"
import { USER_API_END_POINT } from "../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { Loader2 } from "lucide-react"
import { setLoading } from "@/redux/authSlice"

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: "",
  })

  const { loading, user } = useSelector((store) => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    formData.append("password", input.password)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("role", input.role)
    if (input.file) {
      formData.append("file", input.file)
    }

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })

      if (res.data.success) {
        navigate("/login")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "Registration failed")
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navbar />
      <div className="pt-24 pb-10 px-4">
        <div className="max-w-md mx-auto">
          <form
            onSubmit={submitHandler}
            className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700/30 p-6"
          >
            <h1 className="text-2xl font-bold text-white mb-6 text-center">Sign Up</h1>

            <div className="space-y-4">
              <div>
                <Label htmlFor="fullname" className="text-base mb-1 block">
                  Full Name
                </Label>
                <Input
                  id="fullname"
                  type="text"
                  name="fullname"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  placeholder="Enter your full name"
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phoneNumber" className="text-base mb-1 block">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  placeholder="Enter your phone number"
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-base mb-1 block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="example@email.com"
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-base mb-1 block">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  placeholder="Enter your password"
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div>
                <Label className="text-base mb-2 block">Account Type</Label>
                <RadioGroup
                  name="role"
                  value={input.role}
                  onValueChange={(value) => setInput({ ...input, role: value })}
                  className="flex justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="student" value="student" />
                    <Label htmlFor="student" className="cursor-pointer">
                      Student
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="recruiter" value="recruiter" />
                    <Label htmlFor="recruiter" className="cursor-pointer">
                      Recruiter
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="profilePic" className="text-base mb-1 block">
                  Profile Picture
                </Label>
                <Input
                  id="profilePic"
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="bg-gray-700/50 border-gray-600 text-white file:bg-gray-600 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 cursor-pointer"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              {loading ? (
                <Button
                  className="w-full bg-gradient-to-r from-[#6A38C2] to-indigo-600 hover:from-indigo-600 hover:to-[#6A38C2] text-white border-none"
                  disabled
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#6A38C2] to-indigo-600 hover:from-indigo-600 hover:to-[#6A38C2] text-white border-none"
                >
                  Sign Up
                </Button>
              )}
            </div>

            <p className="text-sm mt-4 text-center text-gray-300">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:underline transition-all">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
