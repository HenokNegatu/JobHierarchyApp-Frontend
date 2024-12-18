import { ActionIcon, Group, Stack, Box } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { Position, RequestType } from "../types";
import { Edit, Plus } from "lucide-react";
import { Trash } from "lucide-react";
import { useState } from "react";
import ModalComponent from "./modalComponent";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'


dayjs.extend(relativeTime)

export default function PositionTable({ position }: { position: Position }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [action, setAction] = useState(RequestType.POST)
    const [selectedPosition, setPosition] = useState<Position>(position)

    const showModal = (actionType: RequestType, position: Position) => {
        setAction(actionType)
        setPosition(position)
        open()
    }
    return (
        <div>
                  <ModalComponent opened={opened} close={close} action={action} position={selectedPosition}></ModalComponent>

            <DataTable
            withTableBorder
            withColumnBorders
            striped
            highlightOnHover
            columns={[{
                accessor: 'name',
                title: 'position',
                textAlign: 'left',
            },
            {
                accessor: 'createdAt',
                title: 'created',
                textAlign: 'left',
                ellipsis: true
            },
            {
                accessor: 'modifiedAt',
                title: 'modified',
                textAlign: 'left',
            },
            {
                accessor: 'actions',
                title: <Box mr={6}>Row actions</Box>,
                textAlign: 'right',
                render: (childPosition) => (
                    <Group gap={4} justify="start" wrap="nowrap">
                        <ActionIcon
                            size="sm"
                            variant="subtle"
                            color="green"
                            onClick={() => showModal(RequestType.POST, childPosition)}
                        >
                            <Plus size={16} />
                        </ActionIcon>
                        <ActionIcon
                            size="sm"
                            variant="subtle"
                            color="blue"
                            onClick={() => showModal(RequestType.PUT, childPosition)}
                        >
                            <Edit size={16} />
                        </ActionIcon>
                        <ActionIcon
                            size="sm"
                            variant="subtle"
                            color="red"
                            onClick={() => showModal(RequestType.DELETE, childPosition)}
                        >
                            <Trash size={16} />
                        </ActionIcon>
                    </Group>
                ),
            }]}
            records={position.children}
            noRecordsText="No records to show"
            rowExpansion={{
                content: ({ record }) => (
                    <Stack className="details" p="xs" gap={6}>
                        <div className='flex flex-col gap-4 items-start'>
                            <div>
                                Description: {record.description}
                            </div>
                        </div>
                    </Stack>
                ),
            }}
            defaultColumnRender={(row, _, accessor) => {
                const data = row[accessor as keyof typeof row];
                if (accessor === 'createdAt' || accessor === 'modifiedAt') {
                  return dayjs(data as string).fromNow();
                }
                return typeof data === 'string' ? data : JSON.stringify(data); 
              }}
        />
        </div>
    )
}