import { COMPANY_API_END_POINT } from '@/components/utils/constant';
import { setAllJobs } from '@/redux/jobSlice';
import React from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { useEffect } from 'react';
import { setSingleCompany } from '@/redux/companySlice';

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  useEffect(()=> {
    const fetchSingleCompany = async() => {
        try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {withCredentials: true});
            if(res.data.success) {
                dispatch(setSingleCompany(res.data.company));
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchSingleCompany();
  },[companyId, dispatch]);
}

export default useGetCompanyById;