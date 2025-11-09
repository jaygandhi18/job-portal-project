import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className="bg-[#0F172A] min-h-screen text-white">
            <Navbar />
            <div className='max-w-4xl mx-auto border border-gray-700 rounded-2xl my-5 p-8 bg-[#1E293B]'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p className='text-slate-300'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-black" variant="outline">
                        <Pen />
                    </Button>
                </div>

                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span className="text-slate-300">{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span className="text-slate-300">{user?.phoneNumber}</span>
                    </div>
                </div>

                <div className='my-5'>
                    <h1 className='font-bold mb-1'>Skills</h1>
                    <div className='flex items-center gap-1 flex-wrap'>
                        {
                            user?.profile?.skills.length !== 0
                                ? user?.profile?.skills.map((item, index) => (
                                    <Badge key={index} className="bg-[#334155] text-[#38BDF8]">{item}</Badge>
                                ))
                                : <span className="text-slate-300">NA</span>
                        }
                    </div>
                </div>

                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume
                            ? <a
                                target='_blank'
                                href={user?.profile?.resume}
                                className='text-[#38BDF8] hover:underline cursor-pointer'
                              >
                                {user?.profile?.resumeOriginalName}
                              </a>
                            : <span className='text-slate-300'>NA</span>
                    }
                </div>
            </div>

            <div className='max-w-4xl mx-auto bg-[#1E293B] rounded-2xl p-6'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
