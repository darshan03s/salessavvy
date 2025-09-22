import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "../../../components/ui/button"
import { Pencil } from "lucide-react"
import type { FullUserType } from "@/types"
import { useEffect, useState } from "react"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { updateUserSchema } from "@/zodSchemas"

type UpdateFormData = z.infer<typeof updateUserSchema>

const UsersTable = ({ users, updateUser }: { users: FullUserType[], updateUser: (updatedUser: Omit<FullUserType, "createdAt" | "updatedAt">) => void }) => {
    const [isModifyModalOpen, setIsModifyModalOpen] = useState<boolean>(false)
    const [currentlyModifyingUser, setCurrentlyModifyingUser] = useState<FullUserType | null>(null)

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset
    } = useForm<UpdateFormData>({
        resolver: zodResolver(updateUserSchema),
        mode: 'onSubmit',
    })

    useEffect(() => {
        if (currentlyModifyingUser) {
            reset({
                username: currentlyModifyingUser.username,
                email: currentlyModifyingUser.email,
                role: currentlyModifyingUser.role,
            })
        }
    }, [currentlyModifyingUser, reset])

    function handleModify(user: FullUserType) {
        setIsModifyModalOpen(true)
        setCurrentlyModifyingUser(user)
    }

    const onSubmit = async (data: UpdateFormData) => {
        updateUser({ id: currentlyModifyingUser!.id, ...data })
        setIsModifyModalOpen(false)
        setCurrentlyModifyingUser(null)
    }

    const ModifyUserModal = () => {
        return <Dialog onOpenChange={setIsModifyModalOpen} open={isModifyModalOpen}>
            <form>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>Edit username, email, role</DialogDescription>
                    </DialogHeader>
                    <form method='POST' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4' >
                        <div className='flex flex-col gap-1'>
                            <Input
                                type='text'
                                placeholder='Username'
                                required
                                className='w-full'
                                {...register('username')}
                            />
                            {errors.username && (
                                <p className="text-sm text-red-500">{errors.username.message}</p>
                            )}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Input
                                type='email'
                                placeholder='Email'
                                required
                                className='w-full'
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <Controller
                                name="role"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ADMIN">Admin</SelectItem>
                                            <SelectItem value="CUSTOMER">Customer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.role && (
                                <p className="text-sm text-red-500">{errors.role.message}</p>
                            )}
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isSubmitting} className='disabled:opacity-50'>
                                {
                                    isSubmitting ?
                                        <span className='animate-spin rounded-full border-2 border-border border-t-transparent h-3 w-3'></span> : null
                                }
                                {isSubmitting ? 'Updating...' : 'Update'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </form>
        </Dialog>
    }

    return (
        <>
            {isModifyModalOpen ? <ModifyUserModal /> : null}
            <Table className="w-full">
                <TableHeader>
                    <TableRow className="[&_th]:text-center">
                        <TableHead >Username</TableHead>
                        <TableHead >Email</TableHead>
                        <TableHead >Role</TableHead>
                        <TableHead >Created At</TableHead>
                        <TableHead >Updated At</TableHead>
                        <TableHead >Modify</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users.map((user) => {
                        return <TableRow key={user.id} className="[&_td]:text-center">
                            <TableCell className="font-medium">{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                            <TableCell>{new Date(user.updatedAt).toLocaleString()}</TableCell>
                            <TableCell>
                                <Button
                                    onClick={() => {
                                        handleModify(user)
                                    }}
                                    variant={"ghost"} >
                                    <Pencil />
                                </Button>
                            </TableCell>
                        </TableRow>
                    })}

                </TableBody>
            </Table>
        </>
    )
}

export default UsersTable
