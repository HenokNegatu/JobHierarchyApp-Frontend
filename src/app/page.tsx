import { Button } from '@mantine/core'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Job Hierarchy App</h1>
      <div className="flex space-x-4">
        <Link href="/positions">
          <Button>View Job Positions</Button>
        </Link>
        <Link href="/tasks">
          <Button>View Tasks</Button>
        </Link>
      </div>
    </div>
  )
}