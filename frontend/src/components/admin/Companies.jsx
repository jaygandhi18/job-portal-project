import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
  useGetAllCompanies()
  const [input, setInput] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchCompanyByText(input))
  }, [input])

  return (
    <div className="bg-[#111827] min-h-screen text-[#F8FAFC]">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10">
        <div className="flex items-center justify-between my-6">
          <Input
            className="w-fit bg-[#1E293B] text-[#F8FAFC] placeholder:text-[#94A3B8] border border-[#334155]"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white" onClick={() => navigate('/admin/companies/create')}>
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  )
}

export default Companies
