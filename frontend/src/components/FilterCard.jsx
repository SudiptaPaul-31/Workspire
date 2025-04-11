import { RadioGroup } from "@radix-ui/react-radio-group";
import React, { useEffect, useState } from "react";
import { RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import { motion } from "framer-motion";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bangalore", "Hyderabad", "Mumbai", "Kolkata"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Fullstack Developer", "Machine Learning"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "41-1lakh", "1-10lakh"],
  },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    
    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue, dispatch])

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
    };

  return (
    <div className="w-full bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-gray-700/30">
      <h1 className="font-bold text-2xl text-white mb-6">Filter Jobs</h1>
      
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <motion.div 
            key={data.filterType}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            variants={itemVariants}
          >
            <h1 className="font-semibold text-lg text-gray-300 mb-4 mt-5">
              {data.filterType}
            </h1>
            {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
              return (
                <motion.div 
                  key={itemId}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 my-3 p-3 rounded-lg hover:bg-gray-700/30 transition-colors"
                >
                  <RadioGroupItem 
                    value={item} 
                    id={itemId}
                    className="w-5 h-5 border-2 border-gray-400 text-blue-400"
                  />
                  <Label 
                    htmlFor={itemId} 
                    className="text-gray-300 hover:text-white cursor-pointer transition-colors"
                  >
                    {item}
                  </Label>
                </motion.div>
              );
            })}
          </motion.div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;