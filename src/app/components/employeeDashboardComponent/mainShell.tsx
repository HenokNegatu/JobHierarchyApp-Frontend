'use client'

import { Button, Tabs } from '@mantine/core';
import { User2, ClipboardCheck } from 'lucide-react';
import { Employee } from '../../types';
import Profile from './profile';
import TaskSection from './task';
import { deleteSession } from '@/app/lib/session';



export default function MainShell({ data }: { data: Employee }) {

    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();   

    return (
        <Tabs defaultValue="Tasks">
            <Tabs.List justify="flex-end">
                <Tabs.Tab value="Tasks" leftSection={<ClipboardCheck />}>
                    Tasks
                </Tabs.Tab>
                <Tabs.Tab value="Profile" leftSection={<User2 />}>
                {`${capitalize(data.firstName)} ${capitalize(data.lastName)}`}
                </Tabs.Tab>
                <Tabs.Tab value="Logout">
                     <Button onClick={()=>deleteSession()}>Logout</Button>
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="Tasks">
                <TaskSection tasks={data.task}/>
            </Tabs.Panel>

            <Tabs.Panel value="Profile">
            <Profile employeeInfo={data}/>
            </Tabs.Panel>

        </Tabs>
    );
}