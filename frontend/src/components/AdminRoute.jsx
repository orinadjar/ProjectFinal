import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => { // for the toast
        if (!userInfo || !userInfo.isAdmin) {
          toast.error("You don't have the permissions!");
        }
    }, [userInfo]);

    return userInfo && userInfo.isAdmin ? <Outlet/> : (<Navigate to='/login' replace />);
};

export default AdminRoute;