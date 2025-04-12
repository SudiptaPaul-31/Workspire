"use client"

import { useEffect, useState } from "react"
import Navbar from "../shared/Navbar"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Button } from "../ui/button"
import axios from "axios"
import { toast } from "sonner"
import { Link, useNavigate } from "react-router-dom"
import { USER_API_END_POINT } from "../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { Loader2 } from "lucide-react"
import { setLoading, setUser } from "@/redux/authSlice"

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  })

  const { loading, user } = useSelector((store) => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navbar />
      <div className="pt-24 pb-10 px-4">
        <div className="max-w-md mx-auto">
          <form
            onSubmit={submitHandler}
            className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700/30 p-6"
          >
            <h1 className="text-2xl font-bold text-white mb-6 text-center">Login</h1>

            <div className="space-y-4">
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
                  Login
                </Button>
              )}
            </div>

            <p className="text-sm mt-4 text-center text-gray-300">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:underline transition-all">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
