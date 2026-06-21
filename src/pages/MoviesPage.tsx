import { useState } from 'react'
import { ListIcon, XIcon, MagnifyingGlassIcon } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MovieCard } from '@/components/MovieCard'
import { useMovies } from '@/hooks/useMovies'
import { useDebounce } from '@/hooks/useDebounce'
import { MOVIE_CATEGORIES } from '@/constants/movies'
import type { MovieCategory } from '@/types/movie'
import { cn } from '@/lib/utils'

const SidebarContent = ({
                            active,
                            onSelect,
                        }: {
    active: MovieCategory
    onSelect: (cat: MovieCategory) => void
}) => (
    <nav className="flex flex-col gap-1 p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
            Categories
        </p>
        {MOVIE_CATEGORIES.map(({ key, label, icon: Icon }) => (
            <button
                key={key}
                onClick={() => onSelect(key)}
                className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-left w-full',
                    active === key
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
            >
                <Icon size={18} weight={active === key ? 'fill' : 'regular'} />
                {label}
            </button>
        ))}
    </nav>
)

export const MoviesPage = () => {
    const [category, setCategory] = useState<MovieCategory>('now_playing')
    const [searchInput, setSearchInput] = useState('')
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const debouncedSearch = useDebounce(searchInput, 500)
    const { movies, isLoading, error } = useMovies(category, debouncedSearch)

    const activeLabel =
        MOVIE_CATEGORIES.find(c => c.key === category)?.label ?? 'Movies'

    const handleCategorySelect = (cat: MovieCategory) => {
        setCategory(cat)
        setSearchInput('')
        setSidebarOpen(false)
    }

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Sidebar — desktop */}
            <aside className="hidden md:flex w-56 flex-col border-r bg-card shrink-0">
                <div className="p-4 border-b">
                    <h2 className="font-bold text-lg">🎬 Movies</h2>
                </div>
                <SidebarContent active={category} onSelect={handleCategorySelect} />
            </aside>

            {/* Main content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Topbar */}
                <header className="flex items-center gap-3 border-b bg-card px-4 py-3 shrink-0">
                    {/* Hamburger — mobile */}
                    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <ListIcon size={20} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-56 p-0">
                            <div className="p-4 border-b">
                                <h2 className="font-bold text-lg">🎬 Movies</h2>
                            </div>
                            <SidebarContent active={category} onSelect={handleCategorySelect} />
                        </SheetContent>
                    </Sheet>

                    <h1 className="font-semibold text-base hidden md:block">
                        {debouncedSearch ? `Search: "${debouncedSearch}"` : activeLabel}
                    </h1>

                    {/* Search */}
                    <div className="relative flex-1 max-w-sm ml-auto">
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
                                <XIcon size={14} />
                            </button>
                        )}
                    </div>
                </header>

                {/* Grid */}
                <main className="flex-1 overflow-y-auto p-4">
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {isLoading
                            ? Array.from({ length: 10 }).map((_, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <Skeleton className="aspect-[2/3] w-full rounded-lg" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-3 w-1/4" />
                                </div>
                            ))
                            : movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                    </div>

                    {!isLoading && movies.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                            <MagnifyingGlassIcon size={48} weight="thin" className="mb-3" />
                            <p className="text-sm">No movies found</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}