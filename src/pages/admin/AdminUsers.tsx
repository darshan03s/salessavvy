import UsersTable from "./components/UsersTable";
import type { FullUserType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AdminUsers = () => {
    const [users, setUsers] = useState<FullUserType[] | null>(null)
    const adminUsersApiUrl = import.meta.env.VITE_API_URL + "/admin/users"

    function fetchUsers() {
        try {
            axios.get(adminUsersApiUrl, {
                withCredentials: true
            }).then(res => {
                console.log(res.data)
                setUsers(res.data)
            })
        } catch (err) {
            console.error(err)
            toast.error("Could not fetch users")
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    function updateUser(updatedUser: Omit<FullUserType, "createdAt" | "updatedAt">) {
        try {
            axios.put(
                adminUsersApiUrl + `/${updatedUser.id}`,
                {
                    username: updatedUser.username,
                    email: updatedUser.email,
                    role: updatedUser.role,
                },
                {
                    withCredentials: true,
                }
            ).then(res => {
                console.log(res)
                fetchUsers()
            })
        } catch (err) {
            console.error(err)
            toast.error("Could not update user")
        }
    }


    return (
        <div className="px-3 flex flex-col gap-2 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-center">Users Management</h1>

            <div className="users-table">
                {users ? <UsersTable users={users} updateUser={updateUser} /> : null}
            </div>
        </div>
    );
};

export default AdminUsers;