import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
  const params = useParams()
  useGetCompanyById(params.id)

  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    file: null
  })
  const { singleCompany } = useSelector(store => store.company)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const changeEventHandler = e => setInput({ ...input, [e.target.name]: e.target.value })
  const changeFileHandler = e => setInput({ ...input, file: e.target.files?.[0] || null })

  const submitHandler = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', input.name)
    formData.append('description', input.description)
    formData.append('website', input.website)
    formData.append('location', input.location)
    if (input.file) formData.append('file', input.file)

    try {
      setLoading(true)
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      })
      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/admin/companies')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setInput({
      name: singleCompany.name || '',
      description: singleCompany.description || '',
      website: singleCompany.website || '',
      location: singleCompany.location || '',
      file: null
    })
  }, [singleCompany])

  return (
    <div className="bg-[#0F172A] min-h-screen text-[#F8FAFC]">
      <Navbar />
      <div className="max-w-xl mx-auto my-10 px-4">
        <form onSubmit={submitHandler}>
          {/* Header */}
          <div className="flex items-center gap-5 p-8">
            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2 border-[#334155] text-[#94A3B8] hover:bg-[#1E293B]"
              onClick={() => navigate('/admin/companies')}
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl text-[#F8FAFC]">Company Setup</h1>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Company Name', name: 'name', type: 'text' },
              { label: 'Description', name: 'description', type: 'text' },
              { label: 'Website', name: 'website', type: 'text' },
              { label: 'Location', name: 'location', type: 'text' }
            ].map(({ label, name, type }) => (
              <div key={name}>
                <Label className="text-[#CBD5E1]">{label}</Label>
                <Input
                  type={type}
                  name={name}
                  value={input[name]}
                  onChange={changeEventHandler}
                  className="mt-1 bg-[#1E293B] border border-[#334155] text-[#F8FAFC] placeholder:text-[#64748B]"
                />
              </div>
            ))}

            <div className="col-span-2">
              <Label className="text-[#CBD5E1]">Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="mt-1 bg-[#1E293B] border border-[#334155] text-[#F8FAFC]"
              />
            </div>
          </div>

          {/* Submit */}
          {loading ? (
            <Button className="w-full my-8 bg-[#3B82F6] hover:bg-[#2563EB]" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-8 bg-[#3B82F6] hover:bg-[#2563EB] text-white">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}

export default CompanySetup
