import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAddTaskMutation, useEditTaskMutation } from "../../store/apiTask";
import { useEffect, useState } from "react";
import { RequestType, Task, TaskStatusType } from "../../types";
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { notifications } from "@mantine/notifications";
import { Loader, Text, TextInput, Button, Select, Switch, Fieldset } from "@mantine/core";
import { DateInput } from "@mantine/dates";

type TaskFormProp = {
    action: RequestType
    task?: Task
}

const taskStatusValues = Object.values(TaskStatusType);

const TaskSchema = z.object({
    id: z.string(),
    title: z.string().min(2),
    description: z
        .string()
        .min(3)
        .max(200),
    dueDate: z.date(),
    isPriority: z.boolean(),
    status: z.enum(taskStatusValues as [string, ...string[]])

});

export type TaskSchemaType = z.infer<typeof TaskSchema>;


export default function TaskForm({ action, task }: TaskFormProp) {
    const [addTask, { isLoading: isAdding, error: addError }] = useAddTaskMutation();
    const [editTask, { isLoading: isEditing, error: editError }] = useEditTaskMutation();

    const [priority, setPriority] = useState({priority: task?.isPriority || false})

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control
    } = useForm<TaskSchemaType>({
        resolver: zodResolver(TaskSchema),
    });

    useEffect(() => {
        if (action === "PUT") {
            reset({
                title: task?.title,
                description: task?.description,
                dueDate: task?.dueDate ? new Date(task.dueDate) : undefined,
                isPriority: priority.priority,
                status: task?.status
            })
        } else {
            reset({
                title: '',
                description: '',
            })
        }
    }, [task, action])

    const onSubmit: SubmitHandler<TaskSchemaType> = async (data) => {
        console.log("called")
        if (action === "POST") {
            const { id, ...newTask } = { ...data, parent_id: task?.id };
            await addTask(newTask);
        }
        else {
            const newTask = { ...data, id: task?.id };
            await editTask({ id: newTask.id, updatedTask: newTask })
        }
        if (addError || editError) {
            close()
            return notifications.show({
                title: 'Error',
                message: `Failed to ${addError ? "add" : "edit"} position. Please try again.`,
                color: 'red',
            });
        }
        reset()
        close()
        notifications.show({
            title: `${action === "POST" ? "Add" : "Edit"} Position`,
            message: `Position ${action === "POST" ? "added" : "edited"}! 🌟`,
        })
    };


    return (
        <div>
            
            <Fieldset legend={action === "POST" ?
                "Add new Task" :
                "Make changes to the Task here"
            }>
                <form className="flex flex-col w-[40vw] gap-2" onSubmit={handleSubmit(onSubmit)}>
                    <TextInput label="Task title" placeholder="New Task" {...register("title")} error={errors.title?.message} />
                    <TextInput label="Description" placeholder="Task description" {...register("description")} error={errors.description?.message} />
                    <Controller
                        control={control}
                        name="dueDate"
                        render={({
                            field: { onChange, onBlur, value, name, ref },

                        }) => (

                            <DateInput
                                name={name}
                                label="due date"
                                placeholder="pick date"
                                onChange={onChange}
                                value={value ?? undefined}
                                error={errors.dueDate?.message}
                            />
                        )}
                    />

                    <Switch
                        label="Priority"
                        size="md"
                        {...register("isPriority")}
                        error={errors.isPriority?.message}
                    />

                    <Controller
                        control={control}
                        name="status"
                        render={({
                            field: { onChange, onBlur, value, name, ref },

                        }) => (

                            <Select
                                name={name}
                                label="status"
                                placeholder="pick status"
                                onChange={onChange}
                                data={['Todo', 'In Progress', 'Completed', 'Cancelled']}
                                value={value ?? undefined}
                                error={errors.status?.message}
                            />
                        )}
                    />
                    {(isAdding || isEditing) ? <Loader size={30} /> : <Button type="submit">{action === "PUT" ? "Edit" : "Add"}</Button>}

                </form>
            </Fieldset>
        </div>
    )
}