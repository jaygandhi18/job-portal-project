import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
  const navigate = useNavigate()
  const [companyName, setCompanyName] = useState()
  const dispatch = useDispatch()

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company))
        toast.success(res.data.message)
        const companyId = res?.data?.company?._id
        navigate(`/admin/companies/${companyId}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-[#0F172A] min-h-screen text-[#F8FAFC]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4">
        <div className="my-10">
          <h1 className="font-bold text-2xl text-[#F8FAFC]">Your Company Name</h1>
          <p className="text-[#94A3B8] mt-2">
            What would you like to give your company name? You can change this later.
          </p>
        </div>

        <Label className="text-[#CBD5E1]">Company Name</Label>
        <Input
          type="text"
          className="my-2 bg-[#1E293B] border border-[#334155] text-[#F8FAFC] placeholder:text-[#64748B]"
          placeholder="JobHunt, Microsoft etc."
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            className="border border-[#334155] text-[#94A3B8] hover:bg-[#1E293B]"
            onClick={() => navigate('/admin/companies')}
          >
            Cancel
          </Button>
          <Button onClick={registerNewCompany} className="bg-[#3B82F6] hover:bg-[#2563EB] text-white">Continue</Button>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate
