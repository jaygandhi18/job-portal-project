import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="max-w-7xl mx-auto my-10 px-4 text-[#F8FAFC] bg-[#0F172A] min-h-screen">
            <div className="flex items-center justify-between bg-[#1E293B] border border-[#334155] p-6 rounded-lg shadow-md">
                <div>
                    <h1 className="font-bold text-2xl text-white">{singleJob?.title}</h1>
                    <div className="flex items-center gap-2 mt-4 flex-wrap">
                        <Badge className="text-blue-400 font-bold border border-blue-500 bg-transparent" variant="ghost">
                            {singleJob?.position} Positions
                        </Badge>
                        <Badge className="text-[#F97316] font-bold border border-[#F97316] bg-transparent" variant="ghost">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className="text-[#6366F1] font-bold border border-[#6366F1] bg-transparent" variant="ghost">
                            {singleJob?.salary} LPA
                        </Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg text-white ${
                        isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#6366F1] hover:bg-[#4F46E5]'
                    }`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            <h1 className="border-b-2 border-[#334155] font-semibold py-4 mt-6 text-lg text-white">Job Description</h1>

            <div className="my-6 space-y-3 text-[#CBD5E1] bg-[#1E293B] p-6 rounded-lg border border-[#334155] shadow-md">
                <h1>
                    <span className="font-bold text-white">Role:</span>
                    <span className="pl-4">{singleJob?.title}</span>
                </h1>
                <h1>
                    <span className="font-bold text-white">Location:</span>
                    <span className="pl-4">{singleJob?.location}</span>
                </h1>
                <h1>
                    <span className="font-bold text-white">Description:</span>
                    <span className="pl-4">{singleJob?.description}</span>
                </h1>
                <h1>
                    <span className="font-bold text-white">Experience:</span>
                    <span className="pl-4">{singleJob?.experience} yrs</span>
                </h1>
                <h1>
                    <span className="font-bold text-white">Salary:</span>
                    <span className="pl-4">{singleJob?.salary} LPA</span>
                </h1>
                <h1>
                    <span className="font-bold text-white">Total Applicants:</span>
                    <span className="pl-4">{singleJob?.applications?.length}</span>
                </h1>
                <h1>
                    <span className="font-bold text-white">Posted Date:</span>
                    <span className="pl-4">{singleJob?.createdAt?.split('T')[0]}</span>
                </h1>
            </div>
        </div>
    );
};

export default JobDescription;
