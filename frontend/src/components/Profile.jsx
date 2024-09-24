import React from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'

const skills = ['Html', 'css', 'javascript','Reactjs'];

const Profile = () => {

    const isResume = true;
  return (
    <div>
        <Navbar />
        <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
            <div className="flex justify-between">
            <div className='flex items-center gap-4'>
            <Avatar className='h-24 w-24'>
            <AvatarImage src="https://st3.depositphotos.com/43745012/44906/i/450/depositphotos_449066958-stock-photo-financial-accounting-logo-financial-logo.jpg" alt='profile'></AvatarImage>
            </Avatar>
            <div>
                <h1 className='font-medium
                 text-xl'>Full Name</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto quae, vitae temporibus assumenda soluta molestias. Recusandae accusamus illo voluptatum dolorum.</p>
            </div>
            </div>
            <Button className='text-right' variant="outline"><Pen/></Button>   
            </div>
            <div className='my-5'>
                <div className="flex items-center gap-3">
                    <Mail/>
                    <span>sudi@gmail.com</span>
                </div>
                
                <div className="flex items-center gap-3">
                    <Contact/>
                    <span>+91 1234567890</span>
                </div> 
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className="flex items-center gap-1">
                    {
                       skills.length != 0 ? skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                    }
                    </div>  
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-mdfont-bold">Resume</Label>

                    {
                        isResume? <a target='blank' href='https://youtube.com' className='text-blue-500 w-full hover:underline cursor-pointer'>Youtube</a> : <span>NA</span>
                    }
                </div>
                <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                    <h1 className='font-bold my-5 text-2xl'>Applied Jobs</h1>
                    <AppliedJobTable />
                    </div>                 
        </div>
    </div>
  )
}

export default Profile