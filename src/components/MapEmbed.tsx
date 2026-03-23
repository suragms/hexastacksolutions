interface MapEmbedProps {
    title?: string;
    height?: number;
    className?: string;
}

const DEFAULT_MAP_SRC =
    'https://www.google.com/maps?q=Vadanappally%2C%20Thrissur%2C%20Kerala%20680614%2C%20India&z=14&output=embed';

export default function MapEmbed({
    title = 'HexaStack Solutions office location in Thrissur, Kerala',
    height = 280,
    className = '',
}: MapEmbedProps) {
    return (
        <div className={`overflow-hidden rounded-[24px] border border-[var(--border)] bg-white shadow-sm ${className}`.trim()}>
            <iframe
                title={title}
                src={DEFAULT_MAP_SRC}
                width="100%"
                height={height}
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label={title}
            />
        </div>
    );
}
