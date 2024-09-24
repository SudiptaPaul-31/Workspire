import React from 'react'
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow, TableCell } from './ui/table'
import { Badge } from './ui/badge'

const AppliedJobTable = () => {
  return (
    <div>
        <Table>
            <TableCaption>A list of your applied jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Rate</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className='text-right'>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                [1, 2, 3, 4, 5].map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>24-09-2024</TableCell>
                        <TableCell>Frontend Developer</TableCell>
                        <TableCell>Google</TableCell>
                        <TableCell className='text-right'><Badge>Selected</Badge></TableCell>
                    </TableRow>
                ))
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobTable
