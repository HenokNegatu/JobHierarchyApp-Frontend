import { TaskManagement } from '../components/taskManagment'

export default function TasksPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <TaskManagement />
    </div>
  )
}
