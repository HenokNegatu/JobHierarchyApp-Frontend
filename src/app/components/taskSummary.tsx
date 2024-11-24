import { Card, Text } from "@mantine/core"
import { DonutChart } from '@mantine/charts';

type TaskStatus = 'To Do' | 'In Progress' | 'Completed' | 'Discarded'

type Task = {
  id: string
  name: string
  description: string
  status: TaskStatus
  assignedEmployees: any[]
}

type TaskSummaryProps = {
  tasks: Task[]
}

export function TaskSummary({ tasks }: TaskSummaryProps) {
  const totalTasks = tasks.length
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length
  const completedTasks = tasks.filter(task => task.status === 'Completed').length
  const discardedTasks = tasks.filter(task => task.status === 'Discarded').length
  const todoTasks = totalTasks - inProgressTasks - completedTasks - discardedTasks

  const chartData = [
    { name: 'To Do', value: todoTasks, color: 'indigo.6' },
    { name: 'In Progress', value: inProgressTasks, color: 'yellow.6' },
    { name: 'Completed', value: completedTasks, color: 'teal.6' },
    { name: 'Discarded', value: discardedTasks, color: 'red.6' },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[15%_15%_15%_15%_30%] mx-5">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Text className="text-sm font-medium">Total Tasks</Text>
        </div>
        <div>
          <div className="text-2xl font-bold">{totalTasks}</div>
        </div>
      </Card>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Text className="text-sm font-medium">In Progress</Text>
        </div>
        <div>
          <div className="text-2xl font-bold">{inProgressTasks}</div>
        </div>
      </Card>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Text className="text-sm font-medium">Completed</Text>
        </div>
        <div>
          <div className="text-2xl font-bold">{completedTasks}</div>
        </div>
      </Card>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Text className="text-sm font-medium">Discarded</Text>
        </div>
        <div>
          <div className="text-2xl font-bold">{discardedTasks}</div>
        </div>
      </Card>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Text className="text-sm font-medium">Task Distribution</Text>
        </div>
        <div>
          <DonutChart
            data={chartData}
            className="h-32"
          />
        </div>
      </Card>
    </div>
  )
}

