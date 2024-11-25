import Link from 'next/link'
import { TaskManagement } from '../components/tasksComponent/taskManagment'
import { Button } from '@mantine/core'

export default function TasksPage() {
  return (
    <div className="space-y-8 bg-gray-100">
      <Link href='/positions' className="text-lg font-bold m-4"><Button>Show Job Positions</Button></Link>
      <TaskManagement />
    </div>
  )
}
