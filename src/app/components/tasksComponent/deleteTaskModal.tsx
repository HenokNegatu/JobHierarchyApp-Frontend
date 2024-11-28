import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Fieldset, Modal, TextInput } from "@mantine/core";
import { z } from "zod";
import { notifications } from "@mantine/notifications";
import { useDeleteTaskMutation } from "@/app/store/apiTask";


export default function DeleteTaskModal({ taskId, taskTitle, close, opened }: { taskId: string, taskTitle: string, opened: boolean, close: () => void }) {

    const [deleteTask, { isLoading: isDeleting, error: deleteError }] = useDeleteTaskMutation()

    const onSubmit = async (id: string) => {

        await deleteTask(id);

        if (deleteError) {
            close()
            return notifications.show({
                title: 'Error',
                message: 'Failed to delete task. Please try again.',
                color: 'red',
            });
        }
        close()
        notifications.show({
            title: 'Delte Task',
            message: `Task deleted!`,
        })
    };

    return (
        <div>
            <Modal opened={opened} onClose={close} title={`delete ${taskTitle}`}centered>
                <Fieldset legend={`are you sure you want to delete ${taskTitle}`}>
                    <Button onClick={() => onSubmit(taskId)}>Delete</Button>
                </Fieldset>
            </Modal>
        </div>
    )
}