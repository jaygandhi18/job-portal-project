import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
  const [filterJobs, setFilterJobs] = useState(allAdminJobs)
  const navigate = useNavigate()

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter(job => {
      if (!searchJobByText) return true
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      )
    })
    setFilterJobs(filteredJobs)
  }, [allAdminJobs, searchJobByText])

  return (
    <div className="bg-[#111827] text-[#F8FAFC] rounded-lg shadow-md">
      <Table>
        <TableCaption className="text-[#94A3B8]">A list of your recently posted jobs</TableCaption>
        <TableHeader className="bg-[#1E293B] text-[#F8FAFC]">
          <TableRow>
            <TableHead className="text-[#F8FAFC]">Company Name</TableHead>
            <TableHead className="text-[#F8FAFC]">Role</TableHead>
            <TableHead className="text-[#F8FAFC]">Date</TableHead>
            <TableHead className="text-right text-[#F8FAFC]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map(job => (
            <TableRow key={job._id} className="hover:bg-[#1E293B] transition">
              <TableCell className="text-[#F8FAFC]">{job?.company?.name}</TableCell>
              <TableCell className="text-[#F8FAFC]">{job?.title}</TableCell>
              <TableCell className="text-[#F8FAFC]">{job?.createdAt.split('T')[0]}</TableCell>
              <TableCell className="text-right text-[#3B82F6]">
                <Popover>
                  <PopoverTrigger className="hover:text-[#60A5FA]">
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="bg-[#1E293B] text-[#F8FAFC] border border-[#334155] w-36">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 cursor-pointer hover:text-[#3B82F6]"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className="flex items-center gap-2 cursor-pointer mt-2 hover:text-[#3B82F6]"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobsTable
