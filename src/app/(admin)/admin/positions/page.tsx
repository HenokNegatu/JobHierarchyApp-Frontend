'use client'

import { Button } from '@mantine/core';
import { useDrawer } from '../../../lib/context/drawerContext';


export default function Positions() {
  
  const { open } = useDrawer();

    return (
      <div className='w-screen h-screen flex flex-col items-center justify-center'>
        <h1>select position to view</h1>
        <Button onClick={open}>Open Drawer</Button>   
      </div>
    )
}