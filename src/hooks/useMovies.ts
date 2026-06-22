import { useState, useEffect } from 'react'
import { movieService } from '@/services/movies.service'
import type { MovieTypes, MovieCategory } from '@/types/movie.types.ts'

interface UseMoviesResult {
    movies: MovieTypes[]
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
    const [movies, setMovies] = useState<MovieTypes[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    // Reset ke page 1 setiap kali kategori atau search berubah
    // Tidak pakai useEffect tersendiri untuk menghindari setState-in-effect warning
    const [prevCategory, setPrevCategory] = useState(category)
    const [prevSearch, setPrevSearch] = useState(searchQuery)

    if (prevCategory !== category || prevSearch !== searchQuery) {
        setPrevCategory(category)
        setPrevSearch(searchQuery)
        setCurrentPage(1)
    }

    useEffect(() => {
        const controller = new AbortController()

        const fetchMovies = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const res = searchQuery
                    ? await movieService.search(searchQuery, currentPage)
                    : await movieService.getByCategory(category, currentPage)

                // Jangan update state kalau request sudah di-cancel
                if (!controller.signal.aborted) {
                    setMovies(res.results)
                    setTotalPages(res.total_pages)
                }
            } catch (err) {
                if (!controller.signal.aborted) {
                    setError(err instanceof Error ? err.message : 'Something went wrong')
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false)
                }
            }
        }

        fetchMovies()

        // Cleanup — cancel request lama saat dependency berubah
        return () => controller.abort()
    }, [category, searchQuery, currentPage])

    return { movies, isLoading, error, totalPages, currentPage, setPage: setCurrentPage }
}