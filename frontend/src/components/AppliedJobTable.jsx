import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector(store => store.job)

  return (
    <div className="bg-[#0F172A] text-[#F8FAFC] rounded-lg p-4 shadow-md">
      <Table>
        <TableCaption className="text-[#94A3B8] mt-2">A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-[#CBD5E1]">Date</TableHead>
            <TableHead className="text-[#CBD5E1]">Job Role</TableHead>
            <TableHead className="text-[#CBD5E1]">Company</TableHead>
            <TableHead className="text-right text-[#CBD5E1]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-[#94A3B8] py-4">
                You have not applied to any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map(appliedJob => (
              <TableRow key={appliedJob._id}>
                <TableCell className="text-[#E2E8F0]">
                  {appliedJob?.createdAt?.split('T')[0]}
                </TableCell>
                <TableCell className="text-[#E2E8F0]">{appliedJob.job?.title}</TableCell>
                <TableCell className="text-[#E2E8F0]">{appliedJob.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`text-white ${
                      appliedJob?.status === 'rejected'
                        ? 'bg-red-500'
                        : appliedJob?.status === 'pending'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
