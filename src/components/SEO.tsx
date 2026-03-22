import { useEffect } from 'react';

interface SEOMetaTag {
    name?: string;
    property?: string;
    content: string;
}

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
    ogType?: string;
    noindex?: boolean;
    canonical?: string;
    schema?: object | object[];
    ogImageAlt?: string;
    locale?: string;
    localeAlternates?: string[];
    meta?: SEOMetaTag[];
}

const CANONICAL_BASE = 'https://www.hexastacksolutions.com';
const DEFAULT_OG_IMAGE = `${CANONICAL_BASE}/logo-full-white.png`;
const DEFAULT_OG_ALT = 'HexaStack Solutions website preview';
const SCHEMA_SCRIPT_ID = 'hexastack-structured-data';

export default function SEO({
    title,
    description,
    keywords,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = 'website',
    noindex = false,
    canonical,
    schema,
    ogImageAlt = DEFAULT_OG_ALT,
    locale = 'en_IN',
    localeAlternates = [],
    meta = [],
}: SEOProps) {
    const schemaJson = schema ? JSON.stringify(schema) : '';

    useEffect(() => {
        document.title = title;

        const canonicalUrl = canonical
            ? (canonical.startsWith('http') ? canonical : `${CANONICAL_BASE}${canonical === '/' ? '' : canonical}`)
            : `${CANONICAL_BASE}${window.location.pathname || ''}`;

        const updateNamedMeta = (name: string, content: string) => {
            let tag = document.querySelector(`meta[name="${name}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('name', name);
                document.head.appendChild(tag);
            }
            tag.setAttribute('content', content);
        };

        const updatePropertyMeta = (property: string, content: string) => {
            let tag = document.querySelector(`meta[property="${property}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('property', property);
                document.head.appendChild(tag);
            }
            tag.setAttribute('content', content);
        };

        const cleanupManagedMeta = (selector: string) => {
            document.querySelectorAll(selector).forEach((tag) => tag.remove());
        };

        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', canonicalUrl);

        if (schema) {
            let script = document.getElementById(SCHEMA_SCRIPT_ID) as HTMLScriptElement | null;
            if (!script) {
                script = document.createElement('script');
                script.id = SCHEMA_SCRIPT_ID;
                script.setAttribute('type', 'application/ld+json');
                document.head.appendChild(script);
            }
            script.textContent = schemaJson;
        } else {
            document.getElementById(SCHEMA_SCRIPT_ID)?.remove();
        }

        updateNamedMeta('description', description);
        updateNamedMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow');
        updateNamedMeta('author', 'HexaStack Solutions');
        updateNamedMeta('theme-color', '#0f172a');
        updateNamedMeta('twitter:card', 'summary_large_image');
        updateNamedMeta('twitter:title', title);
        updateNamedMeta('twitter:description', description);
        updateNamedMeta('twitter:image', ogImage);
        updateNamedMeta('twitter:image:alt', ogImageAlt);
        updateNamedMeta('twitter:url', canonicalUrl);

        if (keywords) {
            updateNamedMeta('keywords', keywords);
        } else {
            document.querySelector('meta[name="keywords"]')?.remove();
        }

        updatePropertyMeta('og:site_name', 'HexaStack Solutions');
        updatePropertyMeta('og:locale', locale);
        updatePropertyMeta('og:title', title);
        updatePropertyMeta('og:description', description);
        updatePropertyMeta('og:type', ogType);
        updatePropertyMeta('og:image', ogImage);
        updatePropertyMeta('og:image:alt', ogImageAlt);
        updatePropertyMeta('og:url', canonicalUrl);

        cleanupManagedMeta('meta[data-hexastack-locale-alt="true"]');
        localeAlternates.forEach((alternate) => {
            const tag = document.createElement('meta');
            tag.setAttribute('property', 'og:locale:alternate');
            tag.setAttribute('content', alternate);
            tag.setAttribute('data-hexastack-locale-alt', 'true');
            document.head.appendChild(tag);
        });

        cleanupManagedMeta('meta[data-hexastack-extra-meta="true"]');
        meta.forEach((entry) => {
            if (!entry.content || (!entry.name && !entry.property)) {
                return;
            }

            const tag = document.createElement('meta');
            if (entry.name) {
                tag.setAttribute('name', entry.name);
            }
            if (entry.property) {
                tag.setAttribute('property', entry.property);
            }
            tag.setAttribute('content', entry.content);
            tag.setAttribute('data-hexastack-extra-meta', 'true');
            document.head.appendChild(tag);
        });
    }, [title, description, keywords, ogImage, ogType, noindex, canonical, schema, schemaJson, ogImageAlt, locale, localeAlternates, meta]);

    return null;
}
