import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes'
import {Toaster} from "@/components/ui/sonner.tsx";

function App() {
    return (
        <>
            <RouterProvider router={router} />
            <Toaster position="bottom-right" richColors />
        </>
    )
}

export default App