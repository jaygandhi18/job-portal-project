import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-[#0F172A] p-4 rounded-md text-[#E2E8F0]">
      <h1 className="font-bold text-lg mb-2">Filter Jobs</h1>
      <hr className="border-[#1E293B] mb-4" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
          fitlerData.map((data, index) => (
            <div key={index} className="mb-4">
              <h2 className="font-semibold text-base text-[#CBD5E1] mb-2">{data.fitlerType}</h2>
              {
                data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`;
                  return (
                    <div key={itemId} className="flex items-center space-x-2 my-2">
                      <RadioGroupItem className="h-4 w-4 rounded-full border border-gray-400 bg-transparent data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" value={item} id={itemId} />
                      <Label htmlFor={itemId} className="text-[#94A3B8]">{item}</Label>
                    </div>
                  );
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
