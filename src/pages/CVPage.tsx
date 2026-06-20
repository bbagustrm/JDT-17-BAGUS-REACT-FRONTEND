import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Card, CardContent} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {
    ArrowLeftIcon,
    CircleIcon,
    DownloadIcon,
    EnvelopeIcon,
    GithubLogoIcon,
    LinkedinLogoIcon
} from '@phosphor-icons/react';
import profilePhoto from '@/assets/profile.jpg';


const languages = [
    {name: 'Indonesia', level: 'Native'},
    {name: 'English', level: 'Professional'},
];

const skills = [
    {
        id: 'frontend',
        label: 'Frontend',
        items: [
            {name: 'Git', note: 'Enterprise workflow, rebase'},
            {name: 'Nginx', note: 'Reverse proxy, SSL'},
            {name: 'Cloudflare', note: 'DNS, WAF, R2'},
            {name: 'Obsidian', note: 'PKM, linked notes'},
            {name: 'Figma', note: 'UI design, prototyping'},
        ],
    },
    {
        id: 'backend',
        label: 'Backend',
        items: [
            {name: 'Git', note: 'Enterprise workflow, rebase'},
            {name: 'Nginx', note: 'Reverse proxy, SSL'},
            {name: 'Cloudflare', note: 'DNS, WAF, R2'},
            {name: 'Obsidian', note: 'PKM, linked notes'},
            {name: 'Figma', note: 'UI design, prototyping'},
        ],
    },
    {
        id: 'tools',
        label: 'Tools',
        items: [
            {name: 'Git', note: 'Enterprise workflow, rebase'},
            {name: 'Nginx', note: 'Reverse proxy, SSL'},
            {name: 'Cloudflare', note: 'DNS, WAF, R2'},
            {name: 'Obsidian', note: 'PKM, linked notes'},
            {name: 'Figma', note: 'UI design, prototyping'},
        ],
    },
];

const cta = [
    {
        label: 'Download CV',
        icon: DownloadIcon,
        variant: 'default' as const,
        href: '#',
    },
    {
        label: 'Email',
        icon: EnvelopeIcon,
        variant: 'outline' as const,
        href: 'mailto:bagus@example.com',
    },
    {
        label: 'GitHub',
        icon: GithubLogoIcon,
        variant: 'outline' as const,
        href: 'https://github.com',
    },
    {
        label: 'LinkedIn',
        icon: LinkedinLogoIcon,
        variant: 'outline' as const,
        href: 'https://linkedin.com',
    },
];

// ── COMPONENT ────────────────────────────────────────────────────────────────

export const CVPage = () => {
    const navigate = useNavigate();
    const [activeSkill, setActiveSkill] = useState(skills[0].id);

    const activeSkillData = skills.find((s) => s.id === activeSkill)!;

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto max-w-4xl px-4 py-10">
                {/* Back */}
                <div className="w-full flex justify-start">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="mb-8 gap-2 text-muted-foreground hover:text-foreground"
                        onClick={() => navigate('/')}
                    >
                        <ArrowLeftIcon className="h-4 w-4"/>
                        Kembali
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
                                    className="h-48 w-48 object-cover ring-2 ring-border"
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
