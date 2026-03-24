import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { API_URL } from '@/lib/utils';

const CLIENT_TOKEN_KEY = 'client_token';
const CLIENT_USER_KEY = 'client_user';

export interface ClientUser {
    id: string;
    name: string;
    email: string;
    company?: string | null;
    whatsapp?: string | null;
    status: string;
}

interface AuthContextType {
    user: ClientUser | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<{ error?: string }>;
    logout: () => void;
    setUser: (u: ClientUser | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<ClientUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem(CLIENT_TOKEN_KEY);
        const stored = sessionStorage.getItem(CLIENT_USER_KEY);
        if (token && stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                sessionStorage.removeItem(CLIENT_TOKEN_KEY);
                sessionStorage.removeItem(CLIENT_USER_KEY);
            }
        }
        setLoading(false);
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        const res = await fetch(API_URL + '/api/client/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) return { error: data.error || 'Login failed' };
        if (data.token && data.client) {
            sessionStorage.setItem(CLIENT_TOKEN_KEY, data.token);
            sessionStorage.setItem(CLIENT_USER_KEY, JSON.stringify(data.client));
            setUser(data.client);
        }
        return {};
    }, []);

    const logout = useCallback(() => {
        sessionStorage.removeItem(CLIENT_TOKEN_KEY);
        sessionStorage.removeItem(CLIENT_USER_KEY);
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();
    if (loading) {
        return (
            <div className="min-h-[40vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-[var(--primary)] border-t-transparent" />
            </div>
        );
    }
    if (!user) {
        window.location.href = '/login';
        return null;
    }
    return <>{children}</>;
}
