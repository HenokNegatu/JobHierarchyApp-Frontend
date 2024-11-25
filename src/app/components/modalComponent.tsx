
import { Button, Group, Modal, Loader, TextInput } from "@mantine/core";
import { notifications } from '@mantine/notifications';
import { Checkbox } from '@mantine/core';
import { useAddPositionMutation, useEditPositionMutation, useDeletePositionMutation } from "../store/apiPosition";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Position, RequestType } from "../types";


const PositionSchema = z.object({
    id: z.string(),
    name: z.string().min(2),
    description: z
        .string()
        .min(3)
        .max(200),
    parent_id: z.string()
});

export type PositionSchemaType = z.infer<typeof PositionSchema>;


export default function ModalComponent({ action, opened, close, position }: { action: RequestType, opened: boolean, close: () => void, position: Position, }) {

    const [addPosition, { isLoading: isAdding, error: addError }] = useAddPositionMutation();
    const [editPosition, { isLoading: isEditing, error: editError }] = useEditPositionMutation();
    const [deletePosition, { isLoading: isDeleting, error: deleteError }] = useDeletePositionMutation(); // Added delete mutation

    const [deleteChildren, setDeleteChildren] = useState(false); // Added state for deleteChildren

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<PositionSchemaType>({
        resolver: zodResolver(PositionSchema),
    });

    useEffect(() => {
        if (action === "PUT") {
            reset({
                name: position.name,
                description: position.description,
            })
        }else{
            reset({
                name: '',
                description: '',
            })
        }
    }, [position, action])

    const onSubmit: SubmitHandler<PositionSchemaType> = async (data) => {
        if (action === "POST") {
            const { id, ...newPosition } = { ...data, parent_id: position.id };
            await addPosition(newPosition);
        }
        else {
            const newPosition = { ...data, parent_id: position.parent_id, id: position.id };
            await editPosition({ id: newPosition.id, updatedPosition: newPosition })
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


    const handleDeletePosition = async (deleteChildren: boolean) => {
        
        await deletePosition({ id: position.id, deleteChildren });
        if (deleteError) {
            setDeleteChildren(!deleteChildren)
            close();
            return notifications.show({
                title: 'Error',
                message: 'Failed to delete position. Please try again.',
                color: 'red',
            });
        }
        setDeleteChildren(!deleteChildren)
        close();
        notifications.show({
            title: 'Delete Position',
            message: 'Position deleted! 🗑️',
        });
    };

    return (
        <div>
            <Modal opened={opened} onClose={close} title={action === "PUT" ? "Edit Position" : "Add Position"} centered>
                {
                    action === "DELETE" ? (
                        <>
                            <Group className="flex-col w-full">
                                <p className="text-red-600">Are you sure you want to delete {position.name}?</p>
                                <Checkbox
                                    checked={deleteChildren}
                                    onChange={(e) => setDeleteChildren(e.currentTarget.checked)}
                                    label={`Tick the box if you want to delete ${position.name} with its child positions`}
                                />
                                {(isDeleting) && <Loader size={30} />}
                                <Button className="self-start" onClick={() => handleDeletePosition(deleteChildren)} disabled={isDeleting}>Delete</Button>
                            </Group>
                        </>
                    ) : (
                        <>
                            {action === "POST" ?
                                <p className="text-gray-700">Add the Position under {position.name} here. Click Add when you are done</p> :
                                <p className="text-gray-700">Make changes to the position here. Click Edit when you are done</p>
                            }
                            <form className="flex flex-col w-full gap-2" onSubmit={handleSubmit(onSubmit)}>
                                <TextInput {...register("id")} type="hidden" />
                                <TextInput {...register("parent_id")} type="hidden" />
                                <TextInput placeholder="New Position" {...register("name")} error={errors.name?.message} />
                                <TextInput placeholder="Position description" {...register("description")} error={errors.description?.message} />
                                {(isAdding || isEditing) && <Loader size={30} />}
                                <div>
                                    <Button type="submit">{action === "PUT" ? "Edit" : "Add"}</Button>
                                </div>
                            </form>
                        </>
                    )
                }
            </Modal>
        </div>
    )
}