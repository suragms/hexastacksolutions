import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog'
import { GradientLink } from '../ui/GradientLink'
import { site } from '../../data/site'

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem('hs_exit_intent_shown')) return

    // Don't show on admin or contact page
    if (pathname.startsWith('/admin') || pathname === '/contact') return

    const handleMouseLeave = (e: MouseEvent) => {
      // If mouse moves up towards the address bar/tabs
      if (e.clientY <= 0 || e.clientX <= 0 || (e.clientX >= window.innerWidth || e.clientY >= window.innerHeight)) {
        setIsOpen(true)
        sessionStorage.setItem('hs_exit_intent_shown', 'true')
      }
    }

    // Add a slight delay so it doesn't trigger immediately on fast accidental mouse movements
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 2000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [pathname])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md overflow-hidden p-0 border-orange-100/50 shadow-2xl">
        <div className="relative p-6 sm:p-8 bg-gradient-to-br from-orange-50/80 via-background to-amber-50/30">
          {/* Decorative blurs */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange-200/40 blur-2xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-amber-200/40 blur-2xl" aria-hidden />
          
          <div className="relative z-10 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand/10">
              <span className="text-2xl">🚀</span>
            </div>
            
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold tracking-tight text-text-primary text-center">
                Wait! Before you leave...
              </DialogTitle>
              <DialogDescription className="mt-3 text-base text-text-muted text-center">
                Get a <strong className="font-semibold text-text-primary">free website & software audit</strong> for your business. We'll show you exactly how to save time and generate more revenue.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-8 flex flex-col gap-3">
              <GradientLink to="/contact" className="w-full justify-center py-3.5 text-base" onClick={() => setIsOpen(false)}>
                Get a Quote
              </GradientLink>
              
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-text-primary shadow-sm transition hover:bg-muted"
              >
                Or Chat on WhatsApp 💬
              </a>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="mt-5 text-xs font-medium text-text-muted hover:text-text-primary underline underline-offset-2 transition-colors"
            >
              No thanks, I don't want to grow my business right now.
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
