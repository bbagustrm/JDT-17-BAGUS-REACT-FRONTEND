import type { MovieCategory } from '@/types/movie.types.ts'
import {
    FilmSlateIcon,
    FireIcon,
    StarIcon,
    CalendarIcon,
} from '@phosphor-icons/react'

export const TMDB_BASE_URL = "https://api.themoviedb.org/3"
export const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzRlODI2ZDNjZDQ5OGRiMjdlZTMzNDZmNzE2ZjgyNyIsIm5iZiI6MTc4MTc4Njc4Mi40NCwic3ViIjoiNmEzM2U4OWU1OWI0YjdiNzRjODU4ZjQwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.oNvlAVT_y74DFNkUkR61YfSwq3n08GZ_GjdZWGA9X0s"
export const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p'

export const POSTER_SIZE = {
    sm: 'w185',
    md: 'w342',
    lg: 'w500',
    original: 'original',
} as const

export const BACKDROP_SIZE = {
    md: 'w780',
    lg: 'w1280',
    original: 'original',
} as const

export const MOVIE_CATEGORIES: {
    key: MovieCategory
    label: string
    icon: typeof FilmSlateIcon
}[] = [
    { key: 'now_playing', label: 'Now Playing', icon: FilmSlateIcon },
    { key: 'popular',     label: 'Popular',     icon: FireIcon },
    { key: 'top_rated',   label: 'Top Rated',   icon: StarIcon },
    { key: 'upcoming',    label: 'Upcoming',    icon: CalendarIcon },
]