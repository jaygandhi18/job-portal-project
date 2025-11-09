import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer"
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="bg-[#0F172A] py-10">
      <Carousel className="w-full max-w-xl mx-auto my-10">
        <CarouselContent>
          {
            category.map((cat, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 flex justify-center"
              >
                <Button
                  onClick={() => searchJobHandler(cat)}
                  variant="outline"
                  className="rounded-full border-[#38BDF8] text-[#38BDF8] hover:bg-[#1E293B] hover:text-white"
                >
                  {cat}
                </Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious className="text-[#38BDF8] hover:bg-[#1E293B]" />
        <CarouselNext className="text-[#38BDF8] hover:bg-[#1E293B]" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
