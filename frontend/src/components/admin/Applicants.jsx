import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { applicants } = useSelector(store => store.application)

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
          withCredentials: true
        })
        dispatch(setAllApplicants(res.data.job))
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllApplicants()
  }, [])

  return (
    <div className="min-h-screen bg-[#111827] text-[#F8FAFC]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="font-bold text-xl my-6">
          Applicants <span className="text-[#3B82F6]">({applicants?.applications?.length || 0})</span>
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  )
}

export default Applicants
