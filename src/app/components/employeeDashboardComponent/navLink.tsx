'use client'

import { Tabs } from '@mantine/core';
import { User2, ClipboardCheck, LogOut } from 'lucide-react';
import { Employee } from '../../types';
import Profile from './profile';
import TaskSection from './task';



export default function NavigationBar({ data }: { data: Employee }) {

    return (
        <Tabs defaultValue="Tasks">
            <Tabs.List justify="flex-end">
                <Tabs.Tab value="Tasks" leftSection={<ClipboardCheck />}>
                    Tasks
                </Tabs.Tab>
                <Tabs.Tab value="Profile" leftSection={<User2 />}>
                    Profile
                </Tabs.Tab>
                <Tabs.Tab value="Logout" leftSection={<LogOut />}>
                    Logout
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="Tasks">
                <TaskSection tasks={data.task}/>
            </Tabs.Panel>

            <Tabs.Panel value="Profile">
            <Profile employeeInfo={data}/>
            </Tabs.Panel>

            <Tabs.Panel value="Logout">
                Settings tab content
            </Tabs.Panel>
        </Tabs>
    );
}