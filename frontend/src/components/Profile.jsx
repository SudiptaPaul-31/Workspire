import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from './../hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-20">
      <Navbar />
      <div className="max-w-4xl mx-auto p-8 bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700/30">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-5">
            <Avatar className="h-24 w-24 ring-2 ring-gray-600">
              <AvatarImage
                src="https://st3.depositphotos.com/43745012/44906/i/450/depositphotos_449066958-stock-photo-financial-accounting-logo-financial-logo.jpg"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold text-white">{user?.fullname}</h1>
              <p className="text-sm text-gray-400">{user?.profile?.bio || "No bio added"}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="hover:bg-gray-700 text-white border border-gray-600"
            variant="outline"
          >
            <Pen className="w-4 h-4 mr-1" /> Edit
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3 text-gray-300">
            <Mail className="w-4 h-4" />
            <span>{user?.email}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-300">
            <Contact className="w-4 h-4" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-6">
          <h2 className="text-lg font-bold text-white mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="bg-blue-900/30 text-blue-400 rounded-full text-sm px-3 py-1"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-400">NA</span>
            )}
          </div>
        </div>

        <div className="mb-6">
          <Label className="text-md font-bold text-white mb-1 block">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              href={user?.profile?.resume}
              className="text-blue-400 hover:underline transition-all"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-400">NA</span>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Applied Jobs</h2>
          <div className="bg-gray-800/40 p-4 rounded-xl border border-gray-700/30">
            <AppliedJobTable />
          </div>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Profile;
