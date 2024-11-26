import { ClipboardX, PanelLeft, UserX2 } from 'lucide-react';
import { Edit, Trash2, UserPlus, PlusCircle } from 'lucide-react'
import { Button, Avatar, TextInput, Text } from '@mantine/core'
import { Card } from '@mantine/core'
import { useState } from 'react'
import { Collapse, Group, Loader } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { useEditPositionMutation, useGetPositionByIdQuery } from '../store/apiPosition';
import { notifications } from "@mantine/notifications";
import { z } from 'zod'
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import PositionTable from './positionTable';
import ModalComponent from './modalComponent';
import { Employee, Position, RequestType, Task } from '../types';
import Link from 'next/link';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime)


export const PositionSchema = z.object({
    id: z.string(),
    name: z.string().min(2),
    description: z
        .string()
        .min(3)
        .max(200),
    parent_id: z.string()
});

export type PositionSchemaType = z.infer<typeof PositionSchema>;


type PositionInfoProps = {
    positionId: string
}

export default function PositionInfo({ positionId }: PositionInfoProps) {
    const { data: position, isLoading } = useGetPositionByIdQuery(positionId);
    const [opened, { toggle }] = useDisclosure(false);
    const [openedModal, { open, close }] = useDisclosure(false);
    const [action, setAction] = useState(RequestType.POST)
    const [selectedPosition, setPosition] = useState<Position>(position)

    const showModal = (actionType: RequestType, position: Position) => {
        if (position.name === "CEO" && (actionType === "PUT" || actionType === "DELETE")) {
            notifications.show({
                title: 'Warning',
                message: 'Cannot delete CEO',
                color: 'orange',
            });
            return
        }
        setAction(actionType)
        setPosition(position)
        open()
    }

    const [editPosition, { isLoading: isEditing, error: editError }] = useEditPositionMutation();
    const [editForm, setEditForm] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<PositionSchemaType>({
        resolver: zodResolver(PositionSchema),
    });
    const toggleEditForm = () => {
        if (position.name == "CEO" && editForm === false) {
            return notifications.show({
                title: 'Warning',
                message: 'Cannot edit CEO',
                color: 'orange',
            });
        }
        setEditForm(() => (!editForm))
        reset(position)
    }
    const onSubmit: SubmitHandler<PositionSchemaType> = async (data) => {

        const updatedPosition = data
        await editPosition({ id: updatedPosition.id, updatedPosition })


        if (editError) {
            return notifications.show({
                title: 'Error',
                message: 'Failed to edit position. Please try again.',
                color: 'red',
            });
        }
        reset()
        toggleEditForm()
        notifications.show({
            title: 'Edit Position',
            message: 'Position edited! 🌟',
        })
    };


    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    return (
        <div>

            {isLoading ? (
                <div className='w-screen h-screen flex items-center justify-center'>
                    <Loader size={22} color="rgba(0, 0, 0, 1)"></Loader> We're testing your patience
                </div>) : (
                <div className='ml-14 mr-10 justify-self-center overflow-scroll'>
                    <ModalComponent opened={openedModal} close={close} action={action} position={position}></ModalComponent>

                    <div className="text-2xl font-bold flex justify-between items-center">
                        {position.name}
                        <div>
                            <Button variant="light" className="bg-transparent" size="icon" onClick={() => toggleEditForm()}>
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="light" className="bg-transparent" size="icon" onClick={() => showModal(RequestType.DELETE, position)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div><Text c="dimmed">{position.description}</Text></div>
                    <div className="mt-4 text-sm text-muted-foreground flex justify-start gap-8">
                        <p>Created: {dayjs(position.createdAt).fromNow()}</p>
                        <p>Last modified: {dayjs(position.modifiedAt).fromNow()}</p>
                    </div>

                    <div>
                        {editForm ? (

                            <form className="grid grid-cols-2 gap-4 mb-4" onSubmit={handleSubmit(onSubmit)}>

                                <TextInput
                                    label="Position Name"
                                    readOnly={!editForm}
                                    {...register("name")}
                                    error={errors.name?.message}
                                />
                                <TextInput
                                    label="Position Name"
                                    readOnly={!editForm}
                                    {...register("description")}
                                    error={errors.description?.message}
                                />

                                <TextInput
                                    label="Created"
                                    value={dayjs(position.createdAt).fromNow()}
                                    disabled
                                />

                                <TextInput
                                    label="Modified"
                                    placeholder="Input placeholder"
                                    value={dayjs(position.modifiedAt).fromNow()}
                                    disabled
                                />

                                {isEditing ? <Loader size={22} color="rgba(0, 0, 0, 1)" /> : (editForm && <Button type="submit">Edit</Button>)}


                            </form>
                        ) : (
                            <>

                                <Group className="mt-8 mb-4">
                                    <h3 className="text-lg font-semibold my-2">Employees</h3>
                                    <Button variant="light" onClick={toggle}>View Assigned Tasks</Button>
                                </Group>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-20 max-h-[40vh] overflow-x-scroll">
                                    {position.employee.length > 0 ? (
                                        position.employee.map((employee: Employee) => (
                                            <Card key={employee.id} className='md:w-[25vw] sm:w-full'>
                                                <div className="flex items-center p-4">
                                                    <Avatar className="h-12 w-12 mr-4">
                                                    </Avatar>
                                                    <div>
                                                        <h4 className="font-semibold">{`${capitalize(employee.firstName)} ${capitalize(employee.lastName)}`}</h4>
                                                        <p className="text-sm text-muted-foreground">{employee.title}</p>
                                                        <p className="text-sm text-muted-foreground">{employee.email}</p>
                                                        <Collapse in={opened}>
                                                            {employee.task.length === 0 ? (
                                                                <div className='flex gap-2'>
                                                                    <ClipboardX color='gray' /><Text c="dimmed">no Task assigned</Text>
                                                                </div>

                                                            ) : (
                                                                <div>
                                                                    {
                                                                        employee.task.map((task: Task) => {
                                                                            return (
                                                                                <div className="flex justify-around items-center p-2 mb-2 bg-gray-100 rounded mt-2">
                                                                                    <Text>{task.title}</Text>
                                                                                    <span className={`px-2 py-1 rounded-full text-sm ${task.status === 'Todo' ? 'bg-yellow-200 text-yellow-800' :
                                                                                        task.status === 'In Progress' ?
                                                                                            'bg-blue-200 text-blue-800' :
                                                                                            'bg-green-200 text-green-800'
                                                                                        }`}>
                                                                                        {task.status}
                                                                                    </span>
                                                                                </div>)
                                                                        })
                                                                    }
                                                                </div>
                                                            )}
                                                        </Collapse>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))
                                    ) : (
                                        <div className='flex gap-2'>
                                            <UserX2 color='gray' /><Text c="dimmed">no Employee under {position.name}</Text>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 flex justify-start gap-5">

                                    <Link href={`/employee/add/${position.id}`}>
                                        <Button>
                                            <UserPlus className="mr-2 h-4 w-4" />
                                            Add Employee
                                        </Button>
                                    </Link>

                                    <Button onClick={() => showModal(RequestType.POST, position)}>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Add Child Position
                                    </Button>

                                </div>
                                <h3 className="text-lg font-semibold my-4 mt-8">Child Positions</h3>
                                <div className="max-h-[50%] overflow-y-auto">
                                    <PositionTable position={position} />
                                </div>
                            </>
                        )}

                    </div>
                </div>
            )}
        </div>
    )
}