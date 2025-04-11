import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import { setSingleJob } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/components/utils/constant'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { APPLICATION_API_END_POINT } from './utils/constant'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const [isApplied, setIsApplied] = useState(false)
    const params = useParams()
    const jobId = params.id
    const dispatch = useDispatch()

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true })
            if (res.data.success) {
                setIsApplied(true)
                const updateSingleJob = { 
                    ...singleJob, 
                    applications: [...singleJob.applications, { applicant: user?._id }]
                }
                dispatch(setSingleJob(updateSingleJob))
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Application failed')
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.job.applications.some(app => app.applicant === user?._id))
                }
            } catch (error) {
                toast.error('Failed to fetch job details')
            }
        }
        fetchSingleJob()
    }, [jobId, dispatch, user?._id])

    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-gray-700/30"
                >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">{singleJob?.title}</h1>
                            <div className="flex flex-wrap gap-3 mt-3">
                                <Badge className="bg-blue-900/30 text-blue-400 px-4 py-1 rounded-full">
                                    {singleJob?.position} Positions
                                </Badge>
                                <Badge className="bg-purple-900/30 text-purple-400 px-4 py-1 rounded-full">
                                    {singleJob?.jobType}
                                </Badge>
                                <Badge className="bg-emerald-900/30 text-emerald-400 px-4 py-1 rounded-full">
                                    {singleJob?.salary} LPA
                                </Badge>
                            </div>
                        </div>
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`text-lg px-8 py-4 rounded-xl transition-all ${
                                isApplied 
                                    ? 'bg-gray-600 cursor-not-allowed' 
                                    : 'bg-[#7209b7] hover:bg-[#5f32ad] hover:scale-105'
                            }`}
                        >
                            {isApplied ? '✓ Applied' : 'Apply Now'}
                        </Button>
                    </div>

                    <div className="border-b border-gray-700/50 my-8" />

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold text-gray-300 mb-4">Job Details</h2>
                            <DetailItem label="Role" value={singleJob?.title} />
                            <DetailItem label="Location" value={singleJob?.location} />
                            <DetailItem label="Experience" value={`${singleJob?.experience} years`} />
                            <DetailItem label="Salary" value={`${singleJob?.salary} LPA`} />
                            <DetailItem 
                                label="Total Applicants" 
                                value={singleJob?.applications?.length || 0} 
                            />
                            <DetailItem 
                                label="Posted Date" 
                                value={new Date(singleJob?.createdAt).toLocaleDateString()} 
                            />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold text-gray-300">Description</h2>
                            <p className="text-gray-400 leading-relaxed">
                                {singleJob?.description || 'No description provided'}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

const DetailItem = ({ label, value }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-700/30">
        <span className="text-gray-400 font-medium">{label}</span>
        <span className="text-gray-300">{value}</span>
    </div>
)

export default JobDescription