import {useState} from 'react'
import {ListIcon, XIcon, MagnifyingGlassIcon, SignOutIcon} from '@phosphor-icons/react'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {Skeleton} from '@/components/ui/skeleton'
import {Alert, AlertDescription} from '@/components/ui/alert'
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import {MovieCard} from '@/components/MovieCard'
import {useMovies} from '@/hooks/useMovies'
import {useDebounce} from '@/hooks/useDebounce'
import {MOVIE_CATEGORIES} from '@/constants/movies'
import type {MovieCategory} from '@/types/movie.types.ts'
import {cn} from '@/lib/utils'
import {useAuth} from '@/context/AuthContext'
import {ROUTES} from '@/constants/routes'
import {useNavigate} from 'react-router-dom'

const SidebarContent = ({active, onSelect}: {
    active: MovieCategory
    onSelect: (cat: MovieCategory) => void
}) => (
    <nav className="flex flex-col gap-1 p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
            Categories
        </p>
        {MOVIE_CATEGORIES.map(({key, label, icon: Icon}) => (
            <button
                key={key}
                onClick={() => onSelect(key)}
                className={cn(
                    'cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-left w-full',
                    active === key
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
            >
                <Icon size={18} weight={active === key ? 'fill' : 'regular'}/>
                {label}
            </button>
        ))}
    </nav>
)

// Helper: generate nomor halaman yang ditampilkan
const getPageNumbers = (currentPage: number, totalPages: number): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = []
    const clamped = Math.min(totalPages, 500) // TMDB max 500 pages

    if (clamped <= 7) {
        return Array.from({length: clamped}, (_, i) => i + 1)
    }

    pages.push(1)

    if (currentPage > 3) pages.push('ellipsis')

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(clamped - 1, currentPage + 1)

    for (let i = start; i <= end; i++) pages.push(i)

    if (currentPage < clamped - 2) pages.push('ellipsis')

    pages.push(clamped)

    return pages
}

export const MoviesPage = () => {
    const [category, setCategory] = useState<MovieCategory>('now_playing')
    const [searchInput, setSearchInput] = useState('')
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const debouncedSearch = useDebounce(searchInput, 500)
    const {movies, isLoading, error, currentPage, totalPages, setPage} = useMovies(category, debouncedSearch)
    const {logout} = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate(ROUTES.HOME)
    }

    const activeLabel = MOVIE_CATEGORIES.find(c => c.key === category)?.label ?? 'Movies'

    const handleCategorySelect = (cat: MovieCategory) => {
        setCategory(cat)
        setSearchInput('')
        setSidebarOpen(false)
    }

    const handlePageChange = (page: number) => {
        const maxPage = Math.min(totalPages, 500)
        if (page < 1 || page > maxPage) return
        setPage(page)
        // Scroll ke atas saat ganti halaman
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    const maxPage = Math.min(totalPages, 500)
    const pageNumbers = getPageNumbers(currentPage, maxPage)

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Sidebar — desktop */}
            <aside className="hidden md:flex w-56 flex-col border-r bg-card shrink-0">
                <div className="p-3.5 border-b">
                    <h2 className="font-bold text-lg">🎬 JDT Movies</h2>
                </div>
                <div className="flex-1">
                    <SidebarContent active={category} onSelect={handleCategorySelect}/>
                </div>
                <div className="p-3 border-t">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={handleLogout}
                    >
                        <SignOutIcon size={18}/>
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Topbar */}
                <header className="flex items-center gap-3 border-b bg-card px-4 py-3 shrink-0">
                    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <ListIcon size={20}/>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-56 p-0">
                            <div className="p-4 border-b">
                                <h2 className="font-bold text-lg">🎬 Movies</h2>
                            </div>
                            <SidebarContent active={category} onSelect={handleCategorySelect}/>
                        </SheetContent>
                    </Sheet>

                    <h1 className="font-semibold text-base hidden md:block">
                        {debouncedSearch ? `Search: "${debouncedSearch}"` : activeLabel}
                    </h1>

                    <div className="relative flex-1 sm:max-w-xs ml-auto">
                        <MagnifyingGlassIcon
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                            placeholder="Search movies..."
                            className="pl-9 pr-8"
                            value={searchInput}
                            onChange={e => setSearchInput(e.target.value)}
                            onKeyDown={e => e.key === 'Escape' && setSearchInput('')}
                        />
                        {searchInput && (
                            <button
                                onClick={() => setSearchInput('')}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <XIcon size={14}/>
                            </button>
                        )}
                    </div>
                </header>

                {/* Grid + Pagination */}
                <main className="flex-1 overflow-y-auto p-4">
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Movie Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {isLoading
                            ? Array.from({length: 10}).map((_, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <Skeleton className="aspect-2/3 w-full rounded-lg"/>
                                    <Skeleton className="h-4 w-3/4"/>
                                    <Skeleton className="h-3 w-1/4"/>
                                </div>
                            ))
                            : movies.map(movie => <MovieCard key={movie.id} movie={movie}/>)
                        }
                    </div>

                    {/* Empty state */}
                    {!isLoading && movies.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                            <MagnifyingGlassIcon size={48} weight="thin" className="mb-3"/>
                            <p className="text-sm">No movies found</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {!isLoading && movies.length > 0 && (
                        <div className="mt-8 pb-4">
                            {/* Info halaman */}
                            <p className="text-center text-xs text-muted-foreground mb-3">
                                Page {currentPage} of {maxPage.toLocaleString()}
                            </p>

                            <Pagination>
                                <PaginationContent>
                                    {/* Previous */}
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className={cn(
                                                'cursor-pointer',
                                                currentPage === 1 && 'pointer-events-none opacity-50'
                                            )}
                                        />
                                    </PaginationItem>

                                    {/* Page numbers */}
                                    {pageNumbers.map((page, idx) =>
                                        page === 'ellipsis' ? (
                                            <PaginationItem key={`ellipsis-${idx}`}>
                                                <PaginationEllipsis/>
                                            </PaginationItem>
                                        ) : (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    isActive={page === currentPage}
                                                    onClick={() => handlePageChange(page)}
                                                    className="cursor-pointer"
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        )
                                    )}

                                    {/* Next */}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            className={cn(
                                                'cursor-pointer',
                                                currentPage === maxPage && 'pointer-events-none opacity-50'
                                            )}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}