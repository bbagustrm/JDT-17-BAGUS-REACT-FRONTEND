export interface Movie {
    id: number
    title: string
    overview: string
    poster_path: string | null
    backdrop_path: string | null
    release_date: string
    vote_average: number
    vote_count: number
    popularity: number
    genre_ids: number[]
    adult: boolean
    original_language: string
    original_title: string
    video: boolean
}

export interface Genre {
    id: number
    name: string
}

export interface MovieDetail {
    id: number
    title: string
    tagline: string
    overview: string
    poster_path: string | null
    backdrop_path: string | null
    release_date: string
    vote_average: number
    vote_count: number
    runtime: number
    status: string
    genres: Genre[]
    homepage: string
    imdb_id: string
    popularity: number
    budget: number
    revenue: number
    original_language: string
    original_title: string
}

export interface MovieVideo {
    id: string
    key: string
    name: string
    site: string
    type: string
    official: boolean
    published_at: string
}

export interface MovieListResponse {
    page: number
    results: Movie[]
    total_pages: number
    total_results: number
}

export interface MovieVideoResponse {
    id: number
    results: MovieVideo[]
}

export type MovieCategory = 'now_playing' | 'popular' | 'top_rated' | 'upcoming'