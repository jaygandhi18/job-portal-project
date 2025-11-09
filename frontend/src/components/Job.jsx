import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    return (
        <div className="p-5 rounded-md shadow-xl bg-[#1E293B] border border-[#334155] text-[#E2E8F0]">
            <div className="flex items-center justify-between">
                <p className="text-sm text-[#94A3B8]">
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button variant="outline" className="rounded-full border-[#475569] text-black" size="icon">
                    <Bookmark />
                </Button>
            </div>

            <div className="flex items-center gap-2 my-4">
                <Button className="p-6 bg-[#0F172A] border border-[#334155]" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-medium text-lg text-white">{job?.company?.name}</h1>
                    <p className="text-sm text-[#94A3B8]">India</p>
                </div>
            </div>

            <div>
                <h1 className="font-bold text-xl my-2 text-white">{job?.title}</h1>
                <p className="text-sm text-[#CBD5E1]">{job?.description}</p>
            </div>

            <div className="flex items-center gap-2 mt-4 flex-wrap">
                <Badge className="text-blue-400 font-bold border border-blue-500" variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className="text-[#F97316] font-bold border border-[#F97316]" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="text-[#38BDF8] font-bold border border-[#38BDF8]" variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>

            <div className="flex items-center gap-4 mt-4">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="border-[#475569] text-black"
                >
                    Details
                </Button>
                <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white">Save For Later</Button>
            </div>
        </div>
    );
};

export default Job;
