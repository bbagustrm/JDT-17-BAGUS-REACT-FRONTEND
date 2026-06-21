import { useState, useEffect } from 'react'
import { movieService } from '@/services/movies.service'
import type { Movie, MovieCategory } from '@/types/movie'

interface UseMoviesResult {
    movies: Movie[]
    isLoading: boolean
    error: string | null
    totalPages: number
    currentPage: number
    setPage: (page: number) => void
}

export const useMovies = (
    category: MovieCategory,
    searchQuery: string
): UseMoviesResult => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentPage(1)
    }, [category, searchQuery])

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const res = searchQuery
                    ? await movieService.search(searchQuery, currentPage)
                    : await movieService.getByCategory(category, currentPage)

                setMovies(res.results)
                setTotalPages(res.total_pages)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Something went wrong')
            } finally {
                setIsLoading(false)
            }
        }

        fetchMovies()
    }, [category, searchQuery, currentPage])

    return { movies, isLoading, error, totalPages, currentPage, setPage: setCurrentPage }
}