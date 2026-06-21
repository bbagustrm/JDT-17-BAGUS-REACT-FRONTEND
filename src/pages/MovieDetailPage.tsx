import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    ArrowLeftIcon,
    StarIcon,
    ClockIcon,
    CalendarBlankIcon,
    PlayIcon,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { useMovieDetail } from '@/hooks/useMovieDetail'
import { TMDB_IMAGE_URL, BACKDROP_SIZE, POSTER_SIZE } from '@/constants/movies'

export const MovieDetailPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [trailerOpen, setTrailerOpen] = useState(false)
    const { detail, trailer, isLoading, error } = useMovieDetail(Number(id))

    const backdropUrl = detail?.backdrop_path
        ? `${TMDB_IMAGE_URL}/${BACKDROP_SIZE.lg}${detail.backdrop_path}`
        : null

    const posterUrl = detail?.poster_path
        ? `${TMDB_IMAGE_URL}/${POSTER_SIZE.lg}${detail.poster_path}`
        : null

    const trailerUrl = trailer
        ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&controls=1&rel=0`
        : null

    const year = detail?.release_date?.split('-')[0] ?? '—'
    const runtime = detail?.runtime
        ? `${Math.floor(detail.runtime / 60)}h ${detail.runtime % 60}m`
        : '—'

    if (error) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <div className="w-full max-w-md space-y-4">
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                    <Button className="w-full" onClick={() => navigate('/movies')}>
                        <ArrowLeftIcon size={16} className="mr-2" />
                        Back to Movies
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">

            {/* ── Hero ── */}
            <div className="relative w-full h-[40vh] md:h-[60vh] bg-muted overflow-hidden">
                {isLoading ? (
                    <Skeleton className="w-full h-full rounded-none" />
                ) : backdropUrl ? (
                    <>
                        <img
                            src={backdropUrl}
                            alt={detail?.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay gradients pakai warna background shadcn */}
                        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
                        <div className="absolute inset-0 bg-linear-to-r from-background/50 via-transparent to-transparent" />
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <p className="text-muted-foreground text-sm">No image available</p>
                    </div>
                )}

                {/* Back button */}
                <div className="absolute top-4 left-4 z-20">
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-background/80 backdrop-blur-sm"
                        onClick={() => navigate('/movies')}
                    >
                        <ArrowLeftIcon size={15} />
                        Back
                    </Button>
                </div>

                {/* Play button — hanya muncul kalau ada trailer */}
                {!isLoading && trailer && (
                    <button
                        onClick={() => setTrailerOpen(true)}
                        aria-label="Watch trailer"
                        className="absolute inset-0 flex flex-col items-center justify-center gap-3 group cursor-pointer"
                    >
                        {/* Ring pulse */}
                        <div className="relative flex items-center justify-center">
                            <div className="relative flex items-center justify-center h-12 w-12 rounded-full bg-primary/25 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/80">
                                <PlayIcon
                                    size={18}
                                    weight="fill"
                                    className="text-primary-foreground "
                                />
                            </div>
                        </div>
                        <span className="text-sm font-semibold tracking-widest uppercase text-foreground/80 group-hover:text-foreground transition-colors">
                        </span>
                    </button>
                )}
            </div>

            {/* ── Detail Content ── */}
            <div className="max-w-5xl mx-auto px-4 py-8">
                {isLoading ? (
                    <div className="flex gap-6">
                        <Skeleton className="w-36 h-52 rounded-xl shrink-0 hidden md:block" />
                        <div className="flex-1 space-y-3">
                            <Skeleton className="h-9 w-2/3" />
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-5 w-1/2" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                    </div>
                ) : detail ? (
                    <div className="flex flex-col md:flex-row gap-8">

                        {/* Poster */}
                        {posterUrl && (
                            <div className="shrink-0 hidden md:block">
                                <img
                                    src={posterUrl}
                                    alt={detail.title}
                                    className="w-36 rounded-xl shadow-md border border-border"
                                />
                            </div>
                        )}

                        {/* Info */}
                        <div className="flex-1 space-y-5">

                            {/* Title & Tagline */}
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                                    {detail.title}
                                </h1>
                                {detail.tagline && (
                                    <p className="text-muted-foreground italic mt-1 text-sm">
                                        "{detail.tagline}"
                                    </p>
                                )}
                            </div>

                            {/* Meta */}
                            <Card className="bg-muted/50 p-0">
                                <CardContent className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 text-sm">
                                    <span className="flex items-center gap-1.5">
                                        <StarIcon size={14} weight="fill" className="text-yellow-500" />
                                        <span className="font-semibold text-foreground">
                                            {detail.vote_average.toFixed(1)}
                                        </span>
                                        <span className="text-muted-foreground">
                                            ({detail.vote_count.toLocaleString()} votes)
                                        </span>
                                    </span>

                                    <Separator orientation="vertical" className="h-4 hidden sm:block" />

                                    <span className="flex items-center gap-1.5 text-muted-foreground">
                                        <CalendarBlankIcon size={14} />
                                        <span className="text-foreground font-medium">{year}</span>
                                    </span>

                                    <Separator orientation="vertical" className="h-4 hidden sm:block" />

                                    <span className="flex items-center gap-1.5 text-muted-foreground">
                                        <ClockIcon size={14} />
                                        <span className="text-foreground font-medium">{runtime}</span>
                                    </span>
                                </CardContent>
                            </Card>

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
                                <h2 className="font-semibold text-foreground mb-2">Overview</h2>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    {detail.overview}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>

            {/* ── Trailer Dialog ── */}
            <Dialog open={trailerOpen} onOpenChange={setTrailerOpen}>
                  <DialogTrigger>
                  </DialogTrigger>
                <DialogContent className="max-w-[90vw] sm:max-w-[50vw] w-[90vw] sm:w-[50vw] p-0 overflow-hidden bg-black border-border">
                    <DialogTitle className="sr-only">
                        {detail?.title} — Trailer
                    </DialogTitle>
                    {trailerOpen && trailerUrl && (
                        <div className="aspect-video w-full">
                            <iframe
                                src={trailerUrl}
                                title={`${detail?.title} trailer`}
                                className="w-full h-full"
                                allow="autoplay; encrypted-media; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}