import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { FileTextIcon, CheckSquareIcon, FilmSlateIcon } from '@phosphor-icons/react'
import { ROUTES } from '@/constants/routes'

export function HomePage() {
    const navigate = useNavigate()

    const pages = [
        {
            label: 'CV',
            icon: <FileTextIcon size={36} weight="duotone" />,
            route: ROUTES.CV,
        },
        {
            label: 'Todo List',
            icon: <CheckSquareIcon size={36} weight="duotone" />,
            route: ROUTES.TODOS,
        },
        {
            label: 'Movies',
            icon: <FilmSlateIcon size={36} weight="duotone" />,
            route: ROUTES.MOVIES,
        },
    ]

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
            <h1 className="text-4xl font-bold">Portfolio</h1>
            <p className="text-muted-foreground">Pilih halaman yang ingin dikunjungi</p>

            <div className="flex flex-col gap-3 w-full max-w-xs">
                {pages.map((page) => (
                    <Button
                        key={page.route}
                        variant="outline"
                        className="flex items-center gap-3 h-14 text-base"
                        onClick={() => navigate(page.route)}
                    >
                        {page.icon}
                        <div className="text-left">
                            <div className="font-semibold">{page.label}</div>
                        </div>
                    </Button>
                ))}
            </div>
        </div>
    )
}