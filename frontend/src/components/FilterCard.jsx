import { RadioGroup } from "@radix-ui/react-radio-group";
import React, { useEffect, useState } from "react";
import { RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from 'react-redux';
import  {setSearchedQuery} from '../redux/jobSlice'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bangalore", "Hydreabad", "Mumbai", "Kolkata"],
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
    },[selectedValue])

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div>
            <h1 className="font-bold text-lg mt-5">{data.filterType}</h1>
            {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId}/>
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
