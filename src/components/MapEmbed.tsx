interface MapEmbedProps {
    title?: string;
    height?: number;
    className?: string;
}

const MAP_QUERY = 'Vadanappally, Thrissur, Kerala 680614, India';
const OPEN_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

/** Google Maps embed (maps.google.com) — query-based embed for consistent framing */
const DEFAULT_MAP_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=14&output=embed`;

export default function MapEmbed({
    title = 'HexaStack Solutions office location in Thrissur, Kerala',
    height = 320,
    className = '',
}: MapEmbedProps) {
    return (
        <div className={className}>
            <div
                className="overflow-hidden rounded-[12px] border border-[var(--border)] bg-white shadow-sm"
                style={{ borderRadius: 12 }}
            >
                <iframe
                    title={title}
                    src={DEFAULT_MAP_SRC}
                    width="100%"
                    height={height}
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    aria-label={title}
                />
            </div>
            <p className="mt-3 text-center text-sm">
                <a
                    href={OPEN_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[var(--primary)] underline-offset-2 hover:underline"
                >
                    Open in Google Maps
                </a>
            </p>
        </div>
    );
}
