import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center text-[#E2E8F0]">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-[#1E293B] text-[#3B82F6] font-medium">
          Your #1 Destination for Dream Jobs{" "}
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply & <br /> Seize Your{" "}
          <span className="text-[#3B82F6]">Dream Career</span>
        </h1>
        <p className="text-[#94A3B8]">
        Search effortlessly,
          apply instantly, and build the future you deserve.
        </p>
        <div className="flex w-[40%] bg-[#1E293B] border border-[#334155] pl-3 rounded-full items-center gap-4 mx-auto shadow-md">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent text-[#E2E8F0] placeholder-[#64748B] outline-none border-none w-full"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#3B82F6] text-white hover:bg-[#2563EB]"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
