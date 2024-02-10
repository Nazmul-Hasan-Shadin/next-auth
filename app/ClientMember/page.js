 "use client"
import React from 'react';
import {useSession} from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils';

const ClientMember = () => {
    const {data:session}=useSession({
  required:true,
  onUnauthenticated(){
    redirect("/api/auth/signin?callbackUrl=/ClientMember")
  }
    })
    return (
        <div>
            <h2>member client session</h2>
           
        </div>
    );
};

export default ClientMember;