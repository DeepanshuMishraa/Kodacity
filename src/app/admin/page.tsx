'use client'

import { useSession } from "next-auth/react";
import RestrictedPage from "~/components/Restricted";

const AdminDashboard = () => {

    const {data:session} = useSession();
    if(session?.user.role != 'ADMIN'){
        return (
            <RestrictedPage/>
        )
    }
  return (
    <div>
        Welcome to Admin page
    </div>
  )
}

export default AdminDashboard;
