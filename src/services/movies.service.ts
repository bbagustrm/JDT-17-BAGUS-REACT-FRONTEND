import { TMDB_BASE_URL } from '@/constants/movies'
import type {
    MovieListResponse,
    MovieDetail,
    MovieVideoResponse,
    MovieCategory,
} from '@/types/movie'

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN as string

const fetcher = async <T>(endpoint: string, params?: Record<string, string>): Promise<T> => {
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`)
    url.searchParams.set('language', 'en-US')
    if (params) {
        Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
    }

    const res = await fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
        },
    })

    if (!res.ok) throw new Error(`TMDB Error: ${res.status}`)
    return res.json() as Promise<T>
}

// ... sisa kode sama seperti sebelumnya
export const movieService = {
    getByCategory: (category: MovieCategory, page = 1) =>
        fetcher<MovieListResponse>(`/movie/${category}`, { page: String(page) }),

    search: (query: string, page = 1) =>
        fetcher<MovieListResponse>('/search/movie', {
            query,
            page: String(page),
            include_adult: 'false',
        }),

    getDetail: (id: number) =>
        fetcher<MovieDetail>(`/movie/${id}`),

    getVideos: (id: number) =>
        fetcher<MovieVideoResponse>(`/movie/${id}/videos`),
}