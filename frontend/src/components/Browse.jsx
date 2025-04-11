import React from 'react'
import { motion } from 'framer-motion'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { setSearchedQuery } from '../redux/jobSlice';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const childVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 gap-5">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold mb-8 text-white"
                >
                    Search Results ({allJobs.length})
                </motion.h1>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {allJobs.map((job) => (
                        <motion.div
                            key={job._id}
                            variants={childVariants}
                            whileHover={{ scale: 1.02 }}
                            className="transform transition-all duration-300"
                        >
                            <Job job={job} />
                        </motion.div>
                    ))}
                </motion.div>

                {allJobs.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-2xl font-semibold text-gray-300 mb-2">
                            No Jobs Found
                        </h3>
                        <p className="text-gray-400">
                            Try adjusting your search criteria
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default Browse;