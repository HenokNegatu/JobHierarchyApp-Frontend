import { Button } from '@mantine/core'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Company Management System</h1>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to your dashboard
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Choose an option to get started
          </p>
          <div className="mt-8 flex items-center justify-center gap-5">

            <Link href="/admin/positions" prefetch={true}>
              <Button >Manage Job Positions </Button>
            </Link>

            <Link href="/admin/tasks" prefetch={true}>
              <Button>Manage Task and Employees</Button>
            </Link>

          </div>
        </div>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2024 Company Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}