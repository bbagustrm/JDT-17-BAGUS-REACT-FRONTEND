import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Card, CardContent} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {
    ArrowLeftIcon,
    CircleIcon,
    EnvelopeIcon,
    GithubLogoIcon,
    LinkedinLogoIcon,
    SignOutIcon
} from '@phosphor-icons/react';
import profilePhoto from '@/assets/profile.webp';
import { useAuth } from '@/context/AuthContext'
import {ROUTES} from "@/constants/routes.ts";

const languages = [
    {name: 'Indonesia', level: 'Native'},
    {name: 'English', level: 'Professional'},
];

const skills = [
    {
        id: 'frontend',
        label: 'Frontend',
        items: [
            {
                name: 'React',
                note: 'Digunakan untuk membangun aplikasi web modern dengan pendekatan component-based architecture dan integrasi REST API.',
            },
            {
                name: 'Next.js',
                note: 'Membangun website company profile, dashboard, dan e-commerce dengan dukungan SSR, routing, dan optimasi SEO.',
            },
            {
                name: 'Svelte',
                note: 'Mempelajari framework frontend modern dengan pendekatan reactive programming dan performa yang ringan.',
            },
            {
                name: 'TypeScript',
                note: 'Digunakan untuk meningkatkan maintainability dan keamanan kode pada project React maupun Next.js.',
            },
            {
                name: 'Tailwind CSS',
                note: 'Framework CSS utama yang digunakan untuk mempercepat pengembangan UI dan menjaga konsistensi desain.',
            },
            {
                name: 'Figma',
                note: 'Merancang wireframe, prototype, design system, dan antarmuka pengguna untuk berbagai kebutuhan aplikasi web.',
            },
        ],
    },
    {
        id: 'backend',
        label: 'Backend',
        items: [
            {
                name: 'Laravel',
                note: 'Mengembangkan sistem absensi perusahaan, fitur Daily Activity Progress, serta integrasi API internal.',
            },
            {
                name: 'NestJS',
                note: 'Digunakan sebagai backend pada project fullstack dengan implementasi REST API dan autentikasi pengguna.',
            },
            {
                name: 'Spring Boot',
                note: 'Mempelajari pengembangan REST API menggunakan ekosistem Java serta penerapan arsitektur backend modern.',
            },
            {
                name: 'Java',
                note: 'Memahami konsep OOP, collection, multithreading dasar, dan pengembangan aplikasi menggunakan Spring Boot.',
            },
            {
                name: 'MySQL',
                note: 'Database utama yang digunakan pada berbagai project Laravel dan aplikasi manajemen data.',
            },
            {
                name: 'PostgreSQL',
                note: 'Digunakan pada aplikasi fullstack untuk menangani data transaksi dan relasi kompleks.',
            },
            {
                name: 'MongoDB',
                note: 'Memahami konsep document database dan penggunaannya pada aplikasi berbasis NoSQL.',
            },
            {
                name: 'Redis',
                note: 'Digunakan sebagai cache dan penyimpanan data sementara untuk meningkatkan performa aplikasi.',
            },
            {
                name: 'Supabase',
                note: 'Digunakan sebagai backend-as-a-service untuk autentikasi, database, dan manajemen konten.',
            },
        ],
    },
    {
        id: 'tools',
        label: 'Tools',
        items: [
            {
                name: 'Git & GitHub',
                note: 'Terbiasa menggunakan branching, pull request, code review, dan workflow kolaborasi tim.',
            },
            {
                name: 'Nginx',
                note: 'Melakukan deployment aplikasi pada VPS dengan konfigurasi reverse proxy, domain, dan SSL.',
            },
            {
                name: 'Cloudflare',
                note: 'Mengelola DNS, SSL, keamanan website, serta optimasi performa melalui CDN dan caching.',
            },
            {
                name: 'Obsidian',
                note: 'Digunakan untuk dokumentasi pembelajaran, knowledge management, dan pencatatan project.',
            },
        ],
    },
    {
        id: 'design',
        label: 'Design',
        items: [
            {
                name: 'Figma',
                note: 'Merancang wireframe, prototype, user flow, dan design system untuk aplikasi web maupun mobile. Berpengalaman membuat UI/UX untuk aplikasi pembelajaran, sistem kasir, dan website perusahaan.',
            },
            {
                name: 'Adobe Photoshop',
                note: 'Digunakan untuk membuat banner, konten media sosial, katalog produk, manipulasi gambar, dan berbagai kebutuhan desain promosi.',
            },
            {
                name: 'Adobe Illustrator',
                note: 'Membuat desain kemasan, branding, ilustrasi vector, logo, dan kebutuhan desain untuk media cetak maupun digital.',
            },
            {
                name: 'Affinity Designer',
                note: 'Mempelajari dan menggunakan alternatif Adobe Illustrator untuk desain vector dengan workflow yang lebih ringan dan efisien.',
            },
            {
                name: 'Canva',
                note: 'Membuat desain presentasi, media sosial, poster, dan materi pemasaran dengan proses yang cepat dan kolaboratif.',
            },
        ],
    }
];

const cta = [
    {
        label: 'Email',
        icon: EnvelopeIcon,
        variant: 'outline' as const,
        href: 'mailto:bbagustrm@gmail.com',
    },
    {
        label: 'GitHub',
        icon: GithubLogoIcon,
        variant: 'outline' as const,
        href: 'https://github.com/bbagustrm',
    },
    {
        label: 'LinkedIn',
        icon: LinkedinLogoIcon,
        variant: 'outline' as const,
        href: 'https://www.linkedin.com/in/bbagustrm/',
    },
];

// ── COMPONENT ────────────────────────────────────────────────────────────────

export const CVPage = () => {
    const navigate = useNavigate();
    const [activeSkill, setActiveSkill] = useState(skills[0].id);
    const { logout } = useAuth()

    const handleLogout = () => {
        logout()
        navigate(ROUTES.HOME)
    }

    const activeSkillData = skills.find((s) => s.id === activeSkill)!;

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto max-w-4xl px-4 py-10">
                {/* Back + Logout */}
                <div className="w-full flex items-center justify-between mb-8">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-muted-foreground hover:text-foreground"
                        onClick={() => navigate('/')}
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                        Kembali
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={handleLogout}
                    >
                        <SignOutIcon size={16} />
                        Logout
                    </Button>
                </div>
                {/* ── HERO ── */}
                <Card className="mb-6 overflow-hidden">
                    <CardContent className="p-0">
                        <div className="flex flex-col items-center gap-8 p-8 sm:flex-row sm:items-start">
                            {/* Photo */}
                            <div className="shrink-0">
                                <img
                                    src={profilePhoto}
                                    alt="Profile"
                                    className="h-36 w-36 object-cover ring-2 ring-border"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex flex-1 flex-col gap-4 text-center sm:text-left">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                                        Curriculum Vitae
                                    </p>
                                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                                        Bagus Atmojo
                                    </h1>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Full-stack Developer · Jakarta, Indonesia
                                    </p>
                                </div>

                                {/* Language badges */}
                                <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                                    {languages.map((lang) => (
                                        <Badge key={lang.name} variant="secondary" className="gap-1.5 px-3 py-1">
                                            <span className="font-medium">{lang.name}</span>
                                            <span className="text-muted-foreground">·</span>
                                            <span className="text-xs text-muted-foreground">{lang.level}</span>
                                        </Badge>
                                    ))}
                                </div>

                                {/* CTA buttons */}
                                <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                                    {cta.map(({label, icon: Icon, href}) => (
                                        <Button key={label} size="sm" className="gap-2" asChild>
                                            <a href={href} target="_blank" rel="noopener noreferrer">
                                                <Icon className="h-3.5 w-3.5"/>
                                                {label}
                                            </a>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* ── SKILL SPECIFIC ── */}
                <Card>
                    <CardContent className="p-0">
                        <div className="flex min-h-72 flex-col sm:flex-row">
                            {/* Left — category buttons */}
                            <div
                                className="flex shrink-0 flex-row gap-1 border-b p-3 sm:w-44 sm:flex-col sm:border-b-0 sm:border-r sm:p-4">
                                <p className="mb-1 hidden w-full text-xs font-medium uppercase tracking-widest text-muted-foreground sm:block">
                                    Skills
                                </p>
                                <div className="sm:mt-4 mb-2 flex sm:flex-col gap-2 justify-center items-center w-full">
                                    {skills.map((skill) => (
                                        <button
                                            key={skill.id}
                                            onClick={() => setActiveSkill(skill.id)}
                                            className={ ` w-full px-3 py-2 text-sm font-medium transition-colors
                                              ${
                                                  activeSkill === skill.id
                                                      ? 'bg-primary text-primary-foreground'
                                                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                              }
                                            `}
                                        >
                                            {skill.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Right — skill detail */}
                            <div className="flex-1 p-6">
                                <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                                    {activeSkillData.label}
                                </p>

                                <div className="space-y-1">
                                    {activeSkillData.items.map((item, index) => (
                                        <div className="flex gap-4 items-center w-full">
                                            <CircleIcon size="16"/>
                                            <div key={item.name} className="w-full">
                                                <div className="flex flex-col py-2.5 items-start">
                                                    <span
                                                        className="text-sm font-medium text-foreground">{item.name}</span>
                                                    <span className="text-xs text-muted-foreground">{item.note}</span>
                                                </div>
                                                {index < activeSkillData.items.length - 1 && <Separator/>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
