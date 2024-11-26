// context/DrawerContext.tsx
import { createContext, useContext, ReactNode } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Loader } from '@mantine/core';
import PositionSideBar from '@/app/components/positionSideBar';
import { useGetPositionQuery } from '@/app/store/apiPosition';

interface DrawerContextType {
    open: () => void;
    close: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const useDrawer = (): DrawerContextType => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error('useDrawer must be used within a DrawerProvider');
    }
    return context;
};

interface DrawerProviderProps {
    children: ReactNode;
}

export const DrawerProvider = ({ children }: DrawerProviderProps) => {
    const { data: jobPositions, isLoading } = useGetPositionQuery({});
    const [drawerOpened, { open, close }] = useDisclosure(false);


    if (isLoading) return <div className='flex h-screen items-center justify-center'> <Loader size={22} color="rgba(0, 0, 0, 1)"/> We're testing your patience</div>;
    

    return (
        <DrawerContext.Provider value={{ open, close }}>
            
                <Drawer opened={drawerOpened} onClose={close} position="right" >
                    <PositionSideBar data={jobPositions} />
                </Drawer>
           
            {children}
        </DrawerContext.Provider>
    );
};
