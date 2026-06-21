import { useNavigate } from 'react-router-dom'
import { StarIcon } from '@phosphor-icons/react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TMDB_IMAGE_URL, POSTER_SIZE } from '@/constants/movies'
import type { Movie } from '@/types/movie'

interface MovieCardProps {
    movie: Movie
}

const PLACEHOLDER = 'https://placehold.co/342x513?text=No+Image'

export const MovieCard = ({ movie }: MovieCardProps) => {
    const navigate = useNavigate()
    const posterUrl = movie.poster_path
        ? `${TMDB_IMAGE_URL}/${POSTER_SIZE.md}${movie.poster_path}`
        : PLACEHOLDER

    const year = movie.release_date?.split('-')[0] ?? '—'
    const rating = movie.vote_average.toFixed(1)

    return (
        <Card
            className="group cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl p-0"
            onClick={() => navigate(`/movies/${movie.id}`)}
        >
            <div className="relative aspect-[2/3] overflow-hidden">
                <img
                    src={posterUrl}
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
                {/* Rating badge */}
                <Badge
                    className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 text-white backdrop-blur-sm"
                    variant="secondary"
                >
                    <StarIcon size={12} weight="fill" className="text-yellow-400" />
                    {rating}
                </Badge>
            </div>
            <CardContent className="p-3">
                <p className="line-clamp-1 font-semibold text-sm">{movie.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{year}</p>
            </CardContent>
        </Card>
    )
}