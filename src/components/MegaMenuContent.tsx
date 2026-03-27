import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Building2, FolderOpen } from 'lucide-react';

const serviceLinks = [
    { to: '/services#websites-seo', label: 'Web development' },
    { to: '/services#custom-apps', label: 'Mobile apps' },
    { to: '/services#automation', label: 'Automation' },
    { to: '/services#websites-seo', label: 'SEO' },
];

const workLinks = [{ to: '/work', label: 'Case studies' }];

const companyLinks = [
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
];

/** Mobile drawer — same destinations as mega menu (unique keys per row). */
export const megaMenuFlatLinks = [
    { to: '/services#websites-seo', label: 'Web development' },
    { to: '/services#custom-apps', label: 'Mobile apps' },
    { to: '/services#automation', label: 'Automation' },
    { to: '/services#websites-seo', label: 'SEO' },
    { to: '/work', label: 'Case studies' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
];

type ColumnProps = {
    icon: ReactNode;
    title: string;
    links: { to: string; label: string }[];
    onNavigate?: () => void;
};

function Column({ icon, title, links, onNavigate }: ColumnProps) {
    return (
        <div>
            <div className="mb-3 flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">{icon}</span>
                <span className="text-sm font-semibold text-[var(--foreground)]">{title}</span>
            </div>
            <ul className="space-y-2 border-t border-[var(--border)] pt-3">
                {links.map((item) => (
                    <li key={`${item.to}-${item.label}`}>
                        <Link
                            to={item.to}
                            onClick={() => onNavigate?.()}
                            className="text-sm leading-snug text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function MegaMenuContent({ onNavigate }: { onNavigate?: () => void }) {
    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            <Column icon={<Briefcase className="h-4 w-4" aria-hidden />} title="Services" links={serviceLinks} onNavigate={onNavigate} />
            <Column icon={<FolderOpen className="h-4 w-4" aria-hidden />} title="Work" links={workLinks} onNavigate={onNavigate} />
            <Column icon={<Building2 className="h-4 w-4" aria-hidden />} title="Company" links={companyLinks} onNavigate={onNavigate} />
        </div>
    );
}
