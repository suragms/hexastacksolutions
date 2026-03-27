import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BellRing, CalendarDays, ChevronRight, MessageCircle, Minimize2, Phone, X } from 'lucide-react';

type NotificationAction = {
    label: string;
    href: string;
    tone?: 'primary' | 'secondary';
    external?: boolean;
};

type NotificationItem = {
    id: string;
    label: string;
    title: string;
    description: string;
    icon: typeof CalendarDays;
    actions: NotificationAction[];
};

const STORAGE_KEY = 'hexastack-hide-notifications';

const notifications: NotificationItem[] = [
    {
        id: 'book-now',
        label: 'Project booking',
        title: 'New enquiry slot open for your project discussion',
        description: 'Book a quick call for websites, POS, billing software, AI tools, or custom software work.',
        icon: CalendarDays,
        actions: [
            { label: 'Book Now', href: '/contact', tone: 'primary' },
            { label: 'Call +91 75919 99365', href: 'tel:+917591999365', tone: 'secondary', external: true },
        ],
    },
    {
        id: 'contact-lines',
        label: 'Contact lines',
        title: 'Direct founder contact numbers are available now',
        description: 'Call the primary number for quick enquiries or use the second line when you need another direct contact.',
        icon: Phone,
        actions: [
            { label: '+91 75919 99365', href: 'tel:+917591999365', tone: 'primary', external: true },
            { label: '+91 70127 14150', href: 'tel:+917012714150', tone: 'secondary', external: true },
        ],
    },
    {
        id: 'whatsapp-fast',
        label: 'WhatsApp reply',
        title: 'WhatsApp support is active and replies are fast',
        description: 'Send your business name and requirement. The team replies within 2 hours on WhatsApp.',
        icon: MessageCircle,
        actions: [
            {
                label: 'WhatsApp Us',
                href: 'https://wa.me/917591999365?text=Hi%20HexaStack%2C%20I%20want%20to%20discuss%20a%20project.',
                tone: 'primary',
                external: true,
            },
            { label: 'Open Contact Page', href: '/contact', tone: 'secondary' },
        ],
    },
];

function NotificationActionLink({ action }: { action: NotificationAction }) {
    const className = [
        'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors',
        action.tone === 'primary'
            ? 'bg-[var(--primary)] text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] hover:opacity-95'
            : 'border border-[var(--border)] bg-white text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)]',
    ].join(' ');

    if (action.external) {
        return (
            <a
                href={action.href}
                className={className}
                target={action.href.startsWith('http') ? '_blank' : undefined}
                rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
                {action.label}
                <ChevronRight className="h-4 w-4" />
            </a>
        );
    }

    return (
        <Link to={action.href} className={className}>
            {action.label}
            <ChevronRight className="h-4 w-4" />
        </Link>
    );
}

export default function WebsiteNotifications() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [dismissed, setDismissed] = useState(false);
    const [minimized, setMinimized] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setMounted(true);

        try {
            if (window.sessionStorage.getItem(STORAGE_KEY) === '1') {
                setDismissed(true);
                return;
            }
        } catch {}

        const showTimer = window.setTimeout(() => {
            setVisible(true);
        }, 1400);

        return () => window.clearTimeout(showTimer);
    }, []);

    useEffect(() => {
        if (!mounted || dismissed || !visible) return undefined;

        const timer = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % notifications.length);
        }, 9000);

        return () => window.clearInterval(timer);
    }, [dismissed, mounted, visible]);

    const activeItem = useMemo(() => notifications[activeIndex], [activeIndex]);

    const dismissNotifications = () => {
        setDismissed(true);
        try {
            window.sessionStorage.setItem(STORAGE_KEY, '1');
        } catch {}
    };

    if (!mounted || dismissed) {
        return null;
    }

    const ActiveIcon = activeItem.icon;

    return (
        <div className="pointer-events-none fixed inset-x-4 bottom-24 z-40 sm:inset-x-auto sm:right-6 sm:w-[380px]">
            <AnimatePresence mode="wait">
                {!minimized && visible ? (
                    <motion.section
                        key={activeItem.id}
                        initial={{ opacity: 0, y: 24, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 18, scale: 0.98 }}
                        transition={{ duration: 0.24, ease: 'easeOut' }}
                        aria-label="Website notifications"
                        className="pointer-events-auto overflow-hidden rounded-[30px] border border-[var(--border)] bg-white/96 shadow-[0_28px_70px_rgba(15,23,42,0.16)] backdrop-blur-xl"
                    >
                        <div className="border-b border-[var(--border)] bg-[linear-gradient(180deg,rgba(248,251,255,0.96),rgba(255,255,255,0.96))] px-5 py-4">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--secondary)] text-[var(--primary)]">
                                        <BellRing className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--secondary)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
                                                <ActiveIcon className="h-3.5 w-3.5" />
                                                {activeItem.label}
                                            </span>
                                            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                                                Live notification
                                            </span>
                                        </div>
                                        <h2 className="mt-3 text-base font-semibold text-[var(--foreground)]">{activeItem.title}</h2>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setMinimized(true)}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--muted-foreground)] transition-colors hover:text-[var(--primary)]"
                                        aria-label="Minimize notifications"
                                    >
                                        <Minimize2 className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={dismissNotifications}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--muted-foreground)] transition-colors hover:text-[var(--primary)]"
                                        aria-label="Dismiss notifications"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5 px-5 py-5">
                            <p className="text-sm leading-7 text-[var(--muted-foreground)]">{activeItem.description}</p>

                            <div className="flex items-center gap-1.5">
                                {notifications.map((item, index) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setActiveIndex(index)}
                                        className={[
                                            'h-2.5 rounded-full transition-all',
                                            index === activeIndex ? 'w-7 bg-[var(--primary)]' : 'w-2.5 bg-[var(--border)]',
                                        ].join(' ')}
                                        aria-label={`Show ${item.label} notification`}
                                    />
                                ))}
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                {activeItem.actions.map((action) => (
                                    <NotificationActionLink key={`${activeItem.id}-${action.label}`} action={action} />
                                ))}
                            </div>
                        </div>
                    </motion.section>
                ) : (
                    visible && (
                        <motion.button
                            key="notification-pill"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 12 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            type="button"
                            onClick={() => setMinimized(false)}
                            className="pointer-events-auto ml-auto inline-flex min-h-[48px] items-center gap-3 rounded-full border border-[var(--border)] bg-white/96 px-4 py-3 text-sm font-semibold text-[var(--foreground)] shadow-[0_18px_40px_rgba(15,23,42,0.14)] backdrop-blur-xl"
                            aria-label="Open notifications"
                        >
                            <BellRing className="h-4 w-4 text-[var(--primary)]" />
                            Notification Center
                        </motion.button>
                    )
                )}
            </AnimatePresence>
        </div>
    );
}
