/** Bucket traffic into marketing sources. */
export function bucketSource(utmSource?: string | null, referrer?: string | null): string {
    const utm = (utmSource || '').toLowerCase().trim();
    if (utm) {
        if (utm.includes('google_maps') || utm === 'maps' || utm === 'gmb') return 'google_maps';
        if (utm.includes('instagram') || utm === 'ig') return 'instagram';
        if (utm.includes('facebook') || utm === 'fb') return 'facebook';
        if (utm === 'x' || utm.includes('twitter')) return 'x';
        if (utm.includes('youtube') || utm === 'yt') return 'youtube';
        if (utm.includes('whatsapp') || utm === 'wa') return 'whatsapp';
        if (utm.includes('referral')) return 'referral';
        if (utm.includes('organic') || utm.includes('google')) return utm.includes('organic') ? 'organic' : 'google';
        if (utm === 'direct') return 'direct';
        return utm.slice(0, 40);
    }
    if (!referrer) return 'direct';
    const ref = referrer.toLowerCase();
    try {
        const host = new URL(referrer).hostname.toLowerCase();
        if (host.includes('google.') || host.includes('googleusercontent')) return 'google';
        if (host.includes('instagram') || host.includes('l.instagram')) return 'instagram';
        if (host.includes('facebook') || host.includes('fb.com') || host.includes('m.facebook')) return 'facebook';
        if (host.includes('twitter') || host.includes('t.co') || host.includes('x.com')) return 'x';
        if (host.includes('youtube') || host.includes('youtu.be')) return 'youtube';
        if (host.includes('whatsapp') || host.includes('wa.me')) return 'whatsapp';
        if (host.includes('bing.') || host.includes('yahoo.')) return 'organic';
        return 'other';
    } catch {
        if (ref.includes('instagram')) return 'instagram';
        if (ref.includes('facebook')) return 'facebook';
        return 'other';
    }
}
