import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experience: '',
    position: 0,
    companyId: ''
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { companies } = useSelector(store => store.company)

  const changeEventHandler = e => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const selectChangeHandler = value => {
    const selectedCompany = companies.find(
      company => company.name.toLowerCase() === value
    )
    setInput({ ...input, companyId: selectedCompany._id })
  }

  const submitHandler = async e => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/admin/jobs')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#0F172A] min-h-screen text-[#F8FAFC]">
      <Navbar />
      <div className="flex items-center justify-center w-screen my-10 px-4">
        <form
          onSubmit={submitHandler}
          className="p-8 w-full max-w-4xl border border-[#334155] bg-[#1E293B] shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Title', name: 'title' },
              { label: 'Description', name: 'description' },
              { label: 'Requirements', name: 'requirements' },
              { label: 'Salary', name: 'salary' },
              { label: 'Location', name: 'location' },
              { label: 'Job Type', name: 'jobType' },
              { label: 'Experience Level', name: 'experience' },
              { label: 'No of Position', name: 'position', type: 'number' }
            ].map(({ label, name, type }) => (
              <div key={name}>
                <Label className="text-[#CBD5E1]">{label}</Label>
                <Input
                  type={type || 'text'}
                  name={name}
                  value={input[name]}
                  onChange={changeEventHandler}
                  className="my-1 bg-[#1E293B] border border-[#334155] text-[#F8FAFC] placeholder:text-[#64748B] focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            ))}

            {/* Select Company Dropdown */}
            {companies.length > 0 && (
              <div className="col-span-2">
                <Label className="text-[#CBD5E1]">Select a Company</Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full mt-1 bg-[#1E293B] border border-[#334155] text-[#F8FAFC]">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E293B] text-[#F8FAFC] border-[#334155]">
                    <SelectGroup>
                      {companies.map(company => (
                        <SelectItem
                          key={company._id}
                          value={company?.name?.toLowerCase()}
                          className="hover:bg-[#334155] focus:bg-[#334155]"
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-6 bg-[#3B82F6] hover:bg-[#2563EB]" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-6 bg-[#3B82F6] hover:bg-[#2563EB] text-white">
              Post New Job
            </Button>
          )}

          {/* Warning Text */}
          {companies.length === 0 && (
            <p className="text-xs text-red-500 font-semibold text-center mt-2">
              *Please register a company first before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default PostJob
