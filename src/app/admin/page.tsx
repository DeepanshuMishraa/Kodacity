'use client'

import { useSession } from "next-auth/react";
import AdminDashboardComponent from "~/components/AdminDashComponent";
import RestrictedPage from "~/components/Restricted";

const AdminDashboard = () => {

    const {data:session} = useSession();
    if(session?.user.role != 'ADMIN'){
        return (
            <RestrictedPage/>
        )
    }
  return (
    <AdminDashboardComponent/>
  )
}

export default AdminDashboard;
