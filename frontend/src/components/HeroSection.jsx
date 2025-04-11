import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Search } from "lucide-react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setSearchedQuery } from "../redux/jobSlice"
import { motion, AnimatePresence } from "framer-motion"

const HeroSection = () => {
  const [query, setQuery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [bgColorIndex, setBgColorIndex] = useState(0)

  // Professional gradient backgrounds that will cycle
  const backgroundGradients = [
    "bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900",
    "bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950",
    "bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950",
    "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900",
  ]

  // Change background color every 8 seconds for a subtle transition
  useEffect(() => {
    const interval = setInterval(() => {
      setBgColorIndex((prevIndex) => (prevIndex + 1) % backgroundGradients.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query))
    navigate("/browse")
  }

  return (
    <motion.div
      className={`relative min-h-[90vh] overflow-hidden py-20 transition-colors duration-2000 ${backgroundGradients[bgColorIndex]}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Elegant background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-[0.03]"
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              scale: [Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              duration: Math.random() * 20 + 20,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 400 + 100}px`,
              height: `${Math.random() * 400 + 100}px`,
              filter: "blur(40px)",
            }}
          />
        ))}
      </div>


      <div className="absolute inset-0 opacity-10"></div>

      <div className="container relative z-10 mx-auto flex min-h-[70vh] items-center px-4 text-center">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8">
          {/* Badge with subtle animation */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 backdrop-blur-md"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.div
              className="h-2 w-2 rounded-full bg-[#F83002]"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
            />
            <span className="text-sm font-medium text-white">No.1 Job Finding Website</span>
          </motion.div>

          {/* Heading with elegant animation */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <motion.h1
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              Discover Opportunities
              <br className="hidden sm:block" />
              At Your{" "}
              <motion.span
                className="relative inline-block bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Fingertips
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            className="max-w-2xl text-lg text-gray-300"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            Find your dream job from thousands of curated listings. Your next career move is just a search away.
          </motion.p>

          {/* Search bar with elegant animation */}
          <motion.div
            className="mt-6 w-full max-w-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <motion.div
              className="group relative flex items-center overflow-hidden rounded-full border border-white/20 bg-white/10 shadow-lg backdrop-blur-md transition-all duration-300"
              whileHover={{
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.3)",
              }}
            >
              <div className="absolute left-5 text-gray-300">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Find your dream jobs"
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 border-none bg-transparent py-4 pl-12 pr-4 text-base text-white outline-none placeholder:text-gray-400"
                onKeyDown={(e) => e.key === "Enter" && searchJobHandler()}
              />
              <motion.div whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={searchJobHandler}
                  className="rounded-full bg-gradient-to-r from-[#6A38C2] to-indigo-600 px-8 py-6 font-medium text-white transition-all hover:from-indigo-600 hover:to-[#6A38C2]"
                >
                  <span className="flex items-center gap-2">Search Jobs</span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Popular searches with elegant animation */}
          <motion.div
            className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.1 }}
          >
            <span className="text-gray-400">Popular:</span>
            <AnimatePresence>
              {["Remote", "Full-time", "Developer", "Marketing", "Design"].map((term, index) => (
                <motion.button
                  key={term}
                  onClick={() => {
                    setQuery(term)
                    searchJobHandler()
                  }}
                  className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-gray-200 backdrop-blur-sm transition-all hover:bg-[#6A38C2] hover:text-white"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(106, 56, 194, 0.8)",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  {term}
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            {[
              { label: "Active Jobs", value: "10,000+" },
              { label: "Companies", value: "2,500+" },
              { label: "Job Seekers", value: "1M+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-sm text-gray-400">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Elegant bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
    </motion.div>
  )
}

export default HeroSection
