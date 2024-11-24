import { Button, Card, Select, TextInput, Text, Collapse, Box, Group } from "@mantine/core";
import { Filter, Plus, User } from "lucide-react";
import { useGetEmployeeQuery } from "../store/apiEmployee";
import { Employee, Task } from "../types";
import { useDisclosure } from "@mantine/hooks";

const EmployeeBar = ({ employee }: { employee: Employee }) => {
    const [opened, { toggle }] = useDisclosure(false);
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
           
            <Box maw={400} mx="auto" className="w-full">
                <Group className="flex justify-between" mb={5}>
                    <User />
                    <Text>{`${capitalize(employee.firstName)} ${capitalize(employee.lastName)}`}</Text>
                    <Text> {employee.position.name}</Text>
                    <Button onClick={toggle}>Assigned Tasks</Button>
                </Group>

                <Collapse in={opened}>
                    <Text c='dimmed'>Assigned Tasks:</Text>
                    {employee.task.map((task: Task) => {
                        return (
                            <div className="bg-gray-100 rounded my-1">
                                <Text>{`${capitalize(task.title)}`}</Text>
                            </div>
                        )
                    })}
                </Collapse>
            </Box>
        </Card>
    )
}


export default function EmployeeManagment() {

    const { data: employees, error, isLoading } = useGetEmployeeQuery({})

    const icon = <Filter />;

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder className='m-5'>

            <div className='w-full flex gap-2 justify-center items-center'>
                <Button className="mb-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Employee
                </Button>
                <TextInput
                    placeholder='Employee Name'
                    rightSection={icon}
                />
                <Select
                    placeholder='Job Position'
                />

            </div>
            <Text size='lg' fw="700" className='mt-5 mb-2'>Filter and view employees</Text>
            <div>
                {
                    isLoading ? (
                        <p>loading</p>
                    ) : (
                        <div>
                            {employees.map((employee: Employee) => {
                                return <EmployeeBar employee={employee} />
                            })}
                        </div>
                    )
                }
            </div>
        </Card >
    )
}