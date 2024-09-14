import React from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className='text-center'>

        <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No.1 Job Finding Website</span>
        <h1 className='text-5xl font-bold'>Discover Opportunities<br/> At Your <span className='text-[#6A38C2]'>Fingertips</span></h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, doloribus eos. At maxime mollitia sapiente unde id vel facere culpa ex incidunt? Asperiores perferendis doloremque placeat alias reiciendis eligendi sed.</p>
        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
            <input
             type="text"
             placeholder='Find your dream jobs'
             className='outline-none border-none w-full' 
             />
             <Button
             className="rounded-r-full bg-[#6A38C2] hover:bg-purple-900">
                <Search className='h-5 w-5'/>
             </Button>
        </div>
        </div>
        
    </div>
  )
}

export default HeroSection