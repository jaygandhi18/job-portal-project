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
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company)
  const [filterCompany, setFilterCompany] = useState(companies)
  const navigate = useNavigate()

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter(company => {
        if (!searchCompanyByText) return true
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
      })
    setFilterCompany(filteredCompany)
  }, [companies, searchCompanyByText])

  return (
    <div className="bg-[#111827] text-[#F8FAFC] rounded-lg">
      <Table>
        <TableCaption className="text-[#94A3B8]">A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-[#1E293B]">
            <TableHead className="text-[#CBD5E1]">Logo</TableHead>
            <TableHead className="text-[#CBD5E1]">Name</TableHead>
            <TableHead className="text-[#CBD5E1]">Date</TableHead>
            <TableHead className="text-right text-[#CBD5E1]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map(company => (
            <TableRow key={company._id} className="hover:bg-[#1E293B] transition-colors">
              <TableCell>
                <Avatar>
                  <AvatarImage src={company.logo} />
                </Avatar>
              </TableCell>
              <TableCell className="text-[#F8FAFC]">{company.name}</TableCell>
              <TableCell className="text-[#F1F5F9]">{company.createdAt.split('T')[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="text-[#94A3B8]" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 bg-[#1E293B] border border-[#334155] text-[#F8FAFC]">
                    <div
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer hover:text-[#3B82F6]"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
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

export default CompaniesTable
