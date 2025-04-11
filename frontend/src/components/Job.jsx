import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';

const Job = ({ job }) => {
  return (
    <div className="h-full p-6 bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700/30 hover:border-gray-600/50 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white">{job.title}</h3>
          <p className="text-sm text-gray-400 mt-1">{job.company.name}</p>
        </div>
        <button className="text-gray-400 hover:text-blue-400 transition-colors">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      <p className="text-gray-300 text-sm mb-6 line-clamp-3">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm">
          {job.location}
        </span>
        <span className="px-3 py-1 bg-purple-900/30 text-purple-400 rounded-full text-sm">
          {job.salary} LPA
        </span>
        <span className="px-3 py-1 bg-emerald-900/30 text-emerald-400 rounded-full text-sm">
          {job.jobType}
        </span>
      </div>

      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-400">
          {new Date(job.createdAt).toLocaleDateString()}
        </span>
        <button className="text-blue-400 hover:text-blue-300 transition-colors">
          View Details →
        </button>
      </div>
    </div>
  );
};

export default Job;