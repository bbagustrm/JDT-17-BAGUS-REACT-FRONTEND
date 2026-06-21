import { useState, useEffect } from 'react'
import { movieService } from '@/services/movies.service'
import type { MovieDetail, MovieVideo } from '@/types/movie'

interface UseMovieDetailResult {
    detail: MovieDetail | null
    trailer: MovieVideo | null
    isLoading: boolean
    error: string | null
}

export const useMovieDetail = (id: number): UseMovieDetailResult => {
    const [detail, setDetail] = useState<MovieDetail | null>(null)
    const [trailer, setTrailer] = useState<MovieVideo | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchDetail = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const [detailRes, videoRes] = await Promise.all([
                    movieService.getDetail(id),
                    movieService.getVideos(id),
                ])

                setDetail(detailRes)

                // Prioritas: Official Trailer → Trailer → video pertama
                const officialTrailer = videoRes.results.find(
                    v => v.site === 'YouTube' && v.type === 'Trailer' && v.official
                )
                const anyTrailer = videoRes.results.find(
                    v => v.site === 'YouTube' && v.type === 'Trailer'
                )
                const anyVideo = videoRes.results.find(v => v.site === 'YouTube')

                setTrailer(officialTrailer ?? anyTrailer ?? anyVideo ?? null)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Something went wrong')
            } finally {
                setIsLoading(false)
            }
        }

        fetchDetail()
    }, [id])

    return { detail, trailer, isLoading, error }
}