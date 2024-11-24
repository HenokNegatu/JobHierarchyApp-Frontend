import { Stack } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { Position } from "../types";

export default function PositionTable({position}: {position: Position}){
    return(
        <DataTable
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
                                          },]}
                                        records={position.children}
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
                                    />
    )
}