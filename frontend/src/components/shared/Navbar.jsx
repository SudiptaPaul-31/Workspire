"use client"

import { PopoverContent, Popover, PopoverTrigger } from "../ui/popover"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LogOut, User2, Menu, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { toast } from "sonner"
import { USER_API_END_POINT } from "../utils/constant"
import { setUser } from "@/redux/authSlice"
import { motion, AnimatePresence } from "framer-motion"

const Navbar = () => {
  const { user } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      })
      if (res.data.success) {
        dispatch(setUser(null))
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-slate-900/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/">
            <h1 className="text-2xl font-bold text-white">
              Work<span className="text-[#F83002]">Spire</span>
            </h1>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <motion.ul
            className="flex font-medium items-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {user && user.role === "recruiter" ? (
              <>
                <NavLink to="/admin/companies">Companies</NavLink>
                <NavLink to="/admin/jobs">Jobs</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/jobs">Jobs</NavLink>
                <NavLink to="/browse">Browse</NavLink>
              </>
            )}
          </motion.ul>

          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                    Login
                  </Button>
                </Link>

                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-[#6A38C2] to-indigo-600 hover:from-indigo-600 hover:to-[#6A38C2] text-white border-none">
                    Signup
                  </Button>
                </Link>
              </>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Avatar className="cursor-pointer border-2 border-white/20">
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || "User"} />
                    </Avatar>
                  </motion.div>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-slate-900/95 backdrop-blur-md border border-white/20 text-white shadow-xl">
                  <div>
                    <div className="flex gap-3 space-y-2">
                      <Avatar className="cursor-pointer border-2 border-white/20">
                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || "User"} />
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-white">{user?.fullname}</h4>
                        <p className="text-sm text-gray-300">{user?.profile?.bio}</p>
                      </div>
                    </div>

                    <div className="flex flex-col my-3 text-gray-200">
                      {user && user.role === "student" && (
                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                          <User2 className="text-indigo-400" />
                          <Button variant="link" className="text-gray-200 hover:text-white">
                            <Link to="/profile">View Profile</Link>
                          </Button>
                        </div>
                      )}

                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <LogOut className="text-indigo-400" />
                        <Button onClick={logoutHandler} variant="link" className="text-gray-200 hover:text-white">
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-slate-900/95 backdrop-blur-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-5 border-t border-white/10">
              <ul className="flex flex-col space-y-4">
                {user && user.role === "recruiter" ? (
                  <>
                    <MobileNavLink to="/admin/companies" onClick={() => setMobileMenuOpen(false)}>
                      Companies
                    </MobileNavLink>
                    <MobileNavLink to="/admin/jobs" onClick={() => setMobileMenuOpen(false)}>
                      Jobs
                    </MobileNavLink>
                  </>
                ) : (
                  <>
                    <MobileNavLink to="/" onClick={() => setMobileMenuOpen(false)}>
                      Home
                    </MobileNavLink>
                    <MobileNavLink to="/jobs" onClick={() => setMobileMenuOpen(false)}>
                      Jobs
                    </MobileNavLink>
                    <MobileNavLink to="/browse" onClick={() => setMobileMenuOpen(false)}>
                      Browse
                    </MobileNavLink>
                  </>
                )}
              </ul>

              {!user ? (
                <div className="flex flex-col gap-3 mt-5">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-[#6A38C2] to-indigo-600 hover:from-indigo-600 hover:to-[#6A38C2] text-white">
                      Signup
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="mt-5 pt-5 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <Avatar className="cursor-pointer border-2 border-white/20">
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || "User"} />
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white">{user?.fullname}</h4>
                      <p className="text-sm text-gray-300">{user?.profile?.bio}</p>
                    </div>
                  </div>

                  <div className="flex flex-col mt-4 gap-3">
                    {user && user.role === "student" && (
                      <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full justify-start border-white/20 text-white hover:bg-white/10"
                        >
                          <User2 className="mr-2 h-4 w-4" />
                          View Profile
                        </Button>
                      </Link>
                    )}

                    <Button
                      variant="outline"
                      className="w-full justify-start border-white/20 text-white hover:bg-white/10"
                      onClick={() => {
                        logoutHandler()
                        setMobileMenuOpen(false)
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Desktop Navigation Link component
const NavLink = ({ to, children }) => (
  <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link
      to={to}
      className="text-gray-200 hover:text-white relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#F83002] after:transition-all hover:after:w-full"
    >
      {children}
    </Link>
  </motion.li>
)

// Mobile Navigation Link component
const MobileNavLink = ({ to, children, onClick }) => (
  <motion.li whileTap={{ scale: 0.95 }} className="border-b border-white/10 pb-2">
    <Link to={to} className="text-gray-200 hover:text-white text-lg font-medium block" onClick={onClick}>
      {children}
    </Link>
  </motion.li>
)

export default Navbar
