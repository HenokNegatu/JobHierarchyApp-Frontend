'use client'

import { DrawerProvider, useDrawer } from "../../../lib/context/drawerContext";

export default function PositionsLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {

    
    
    return (
      
        <section className="w-screen h-screen bg-gray-100">
        <DrawerProvider>  
        {children}
      </DrawerProvider>
      </section>
    )
  }