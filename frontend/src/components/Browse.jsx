import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'

const Browse = () => {
  useGetAllJobs()
  const { allJobs } = useSelector(store => store.job)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''))
    }
  }, [])

  return (
    <div className="bg-[#0F172A] min-h-screen text-[#F8FAFC]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="font-bold text-2xl mb-6">
          Search Results <span className="text-[#38BDF8]">({allJobs.length})</span>
        </h1>

        {allJobs.length === 0 ? (
          <p className="text-[#94A3B8] text-lg">No jobs found. Try adjusting your filters.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.map(job => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Browse
