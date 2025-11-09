import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'

const shortlistingStatus = ['Accepted', 'Rejected']

const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application)

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status })
      if (res.data.success) {
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="bg-[#111827] text-[#F8FAFC] rounded-md shadow-md">
      <Table>
        <TableCaption className="text-[#F8FAFC]">A list of your recent applied users</TableCaption>
        <TableHeader className="bg-[#1E293B]">
          <TableRow>
            <TableHead className="text-[#F8FAFC]">Full Name</TableHead>
            <TableHead className="text-[#F8FAFC]">Email</TableHead>
            <TableHead className="text-[#F8FAFC]">Contact</TableHead>
            <TableHead className="text-[#F8FAFC]">Resume</TableHead>
            <TableHead className="text-[#F8FAFC]">Date</TableHead>
            <TableHead className="text-[#F8FAFC] text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map(item => (
            <TableRow key={item._id} className="hover:bg-[#1E293B] transition-colors">
              <TableCell>{item?.applicant?.fullname}</TableCell>
              <TableCell>{item?.applicant?.email}</TableCell>
              <TableCell>{item?.applicant?.phoneNumber}</TableCell>
              <TableCell>
                {item.applicant?.profile?.resume ? (
                  <a
                    className="text-[#3B82F6] hover:underline"
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  <span>NA</span>
                )}
              </TableCell>
              <TableCell>{item?.applicant.createdAt.split('T')[0]}</TableCell>
              <TableCell className="float-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="text-[#F8FAFC]" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 bg-[#1E293B] text-[#F8FAFC]">
                    {shortlistingStatus.map((status, index) => (
                      <div
                        key={index}
                        onClick={() => statusHandler(status, item?._id)}
                        className="flex w-fit items-center my-2 cursor-pointer hover:text-[#3B82F6]"
                      >
                        <span>{status}</span>
                      </div>
                    ))}
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

export default ApplicantsTable
