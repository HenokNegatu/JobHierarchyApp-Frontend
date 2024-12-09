import { useEditEmployeeTaskMutation } from "@/app/store/apiEmployee";
import { TaskStatusType } from "@/app/types";
import { Task } from "@/app/types";
import { notifications } from "@mantine/notifications";
import { Select, Switch, Text, TextInput } from "@mantine/core";
import { Card, Loader, Button } from "@mantine/core";
import { Filter, ClipboardCheck, AlertCircle } from "lucide-react";

import { z } from "zod";
import { Controller, SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { TaskSchemaType } from "../tasksComponent/taskForm";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime)


type TaskItemProps = {
    task: Task
}

const TaskSchema = z.object({
    status: z.nativeEnum(TaskStatusType),
})



const TaskItem = ({ task }: TaskItemProps) => {

    const [editEmployeeTask, { isLoading: isEditing, error }] = useEditEmployeeTaskMutation()

    const {
        handleSubmit,
        formState: { errors },
        reset, control
    } = useForm<TaskSchemaType>({
        resolver: zodResolver(TaskSchema),
    });

    const onSubmit: SubmitHandler<TaskSchemaType> = async (data) => {

        await editEmployeeTask({ taskId: task.id, taskStatus: data })

        if (error) {
            return notifications.show({
                title: 'Error',
                message: 'Failed to Edit Task Status. Please try again.',
                color: 'red',
            });
        }
        reset()
        notifications.show({
            title: 'Edit Status',
            message: 'Status Edited! 🌟',
            color: 'green'
        })
    };

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder className={`mb-4`}>
            <div>
                <div className="text-xl flex justify-between items-center">
                    <div className="flex gap-2">
                        {task.title}
                        {task.isPriority && (
                            <span className={`flex items-center gap-1 px-1 rounded-full text-xs bg-red-200 text-red-800
                }`}>
                                <AlertCircle className="h-3 w-3" />
                                Priority
                            </span>
                        )}
                    </div>
                    <div>
                        <form className='flex items-end gap-2' onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                control={control}
                                name="status"
                                render={({
                                    field: { onChange, value, name },

                                }) => (
                                    <Select
                                        label="Set  Status"
                                        name={name}
                                        value={value}
                                        placeholder="Pick status"
                                        data={["Todo", "In Progress", "Completed", "Cancelled"]}
                                        onChange={onChange}
                                        error={errors.status?.message}
                                    />
                                )}
                            />
                            {isEditing ? <Loader /> : <Button type='submit'>Set</Button>}

                        </form>
                    </div>
                </div>
                <Text c="dimmed">{task.description}</Text>
            </div>
            <div>
                <div className="mb-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${task.status === 'Todo' ? 'bg-yellow-200 text-yellow-800' :
                        task.status === 'In Progress' ?
                            'bg-blue-200 text-blue-800' : task.status === 'Completed' ?
                                'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                        }`}>
                        {task.status}
                    </span>
                </div>
                <div className='flex justify-start gap-5'>
                    <Text size='sm' c="dimmed">Created: {dayjs(task.createdAt).fromNow()}</Text>
                    <Text size='sm' c="dimmed">last Modified: {dayjs(task.modifiedAt).fromNow()}</Text>
                </div>
            </div>

        </Card>
    )
}

export default function TaskSection({ tasks }: { tasks: Task[] }) {
    const [filterTitle, setFilterTitle] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterPriority, setFilterPriority] = useState(false)


    const filteredTasks = tasks.filter((task: Task) => {
        const matchesTitle = task.title.toLowerCase().includes(filterTitle.toLowerCase());
        const matchesStatus = filterStatus ? task.status === filterStatus : true;
        const matchesPriority = filterPriority ? task.isPriority === filterPriority : true;
        return matchesTitle && matchesStatus && matchesPriority;
    });
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder className='m-5 h-[90vh]'>
            <div className="w-full flex gap-2 justify-center items-center h-fit">
                <TextInput
                    placeholder='Task Name'
                    rightSection={<Filter />}
                    value={filterTitle}
                    onChange={(event) => setFilterTitle(event.currentTarget.value)}
                />
                <Select
                    placeholder='Status'
                    value={filterStatus}
                    onChange={(_value, option) => setFilterStatus(option.value)}
                    data={[
                        { value: "Todo", label: "Todo" },
                        { value: "In Progress", label: "InProgress" },
                        { value: "Completed", label: "Completed" },
                        { value: "Cancelled", label: "Cancelled" },
                        { value: "", label: 'All' }
                    ]}
                />
                <Switch
                    checked={filterPriority}
                    onChange={(e) => setFilterPriority(e.currentTarget.checked)}
                    label="Prior"
                />
            </div>
            <div className='flex items-center mt-5 mb-2'>
                <ClipboardCheck />
                <Text size='lg' fw="700">Tasks</Text>
                <Text size='lg' className='ml-1'>{filteredTasks.length}</Text>
            </div>
            <div className='h-[80vh] overflow-y-scroll'>
                {filteredTasks.map((task: Task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                    />
                ))}
            </div>
        </Card>
    )
}