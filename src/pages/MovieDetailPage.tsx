import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, StarIcon, ClockIcon, CalendarBlankIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useMovieDetail } from '@/hooks/useMovieDetail'
import { TMDB_IMAGE_URL, BACKDROP_SIZE, POSTER_SIZE } from '@/constants/movies'

export const MovieDetailPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { detail, trailer, isLoading, error } = useMovieDetail(Number(id))

    const backdropUrl = detail?.backdrop_path
        ? `${TMDB_IMAGE_URL}/${BACKDROP_SIZE.lg}${detail.backdrop_path}`
        : null

    const posterUrl = detail?.poster_path
        ? `${TMDB_IMAGE_URL}/${POSTER_SIZE.lg}${detail.poster_path}`
        : null

    const trailerUrl = trailer
        ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=1&rel=0`
        : null

    const year = detail?.release_date?.split('-')[0] ?? '—'
    const runtime = detail?.runtime
        ? `${Math.floor(detail.runtime / 60)}h ${detail.runtime % 60}m`
        : '—'

    if (error) {
        return (
            <div className="p-6">
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
                <Button className="mt-4" onClick={() => navigate('/movies')}>
                    Back to Movies
                </Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero: Trailer atau Backdrop */}
            <div className="relative w-full aspect-video bg-black">
                {isLoading ? (
                    <Skeleton className="w-full h-full" />
                ) : trailerUrl ? (
                    <iframe
                        src={trailerUrl}
                        title="Movie Trailer"
                        className="w-full h-full"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                    />
                ) : backdropUrl ? (
                    <img
                        src={backdropUrl}
                        alt={detail?.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-sm">
                        No video available
                    </div>
                )}

                {/* Back button overlay */}
                <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-4 left-4 gap-2 bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm border-0"
                    onClick={() => navigate('/movies')}
                >
                    <ArrowLeftIcon size={16} />
                    Back
                </Button>
            </div>

            {/* Detail content */}
            <div className="max-w-5xl mx-auto px-4 py-8">
                {isLoading ? (
                    <div className="flex gap-6">
                        <Skeleton className="w-40 h-60 rounded-lg shrink-0" />
                        <div className="flex-1 space-y-3">
                            <Skeleton className="h-8 w-2/3" />
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-20 w-full" />
                        </div>
                    </div>
                ) : detail ? (
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Poster */}
                        {posterUrl && (
                            <img
                                src={posterUrl}
                                alt={detail.title}
                                className="w-40 rounded-xl shadow-lg shrink-0 self-start hidden md:block"
                            />
                        )}

                        {/* Info */}
                        <div className="flex-1 space-y-4">
                            <div>
                                <h1 className="text-3xl font-bold">{detail.title}</h1>
                                {detail.tagline && (
                                    <p className="text-muted-foreground italic mt-1">
                                        "{detail.tagline}"
                                    </p>
                                )}
                            </div>

                            {/* Meta badges */}
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <StarIcon size={15} weight="fill" className="text-yellow-400" />
                  <span className="font-semibold text-foreground">
                    {detail.vote_average.toFixed(1)}
                  </span>
                  <span>({detail.vote_count.toLocaleString()} votes)</span>
                </span>

                                <Separator orientation="vertical" className="h-4" />

                                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <CalendarBlankIcon size={15} />
                                    {year}
                </span>

                                <Separator orientation="vertical" className="h-4" />

                                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <ClockIcon size={15} />
                                    {runtime}
                </span>
                            </div>

                            {/* Genres */}
                            <div className="flex flex-wrap gap-2">
                                {detail.genres.map(genre => (
                                    <Badge key={genre.id} variant="secondary">
                                        {genre.name}
                                    </Badge>
                                ))}
                            </div>

                            <Separator />

                            {/* Overview */}
                            <div>
                                <h2 className="font-semibold mb-2">Overview</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {detail.overview}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}