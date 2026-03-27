import { useCallback, useRef } from 'react'

/**
 * Pointer drag to scroll horizontally (mouse); touch uses native overflow scroll.
 */
export function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 })

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = ref.current
    if (!el) return
    if (e.pointerType === 'touch') return
    el.setPointerCapture(e.pointerId)
    drag.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
    }
    el.style.cursor = 'grabbing'
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const el = ref.current
    if (!el || !drag.current.active) return
    if (e.pointerType === 'touch') return
    e.preventDefault()
    const dx = e.clientX - drag.current.startX
    el.scrollLeft = drag.current.scrollLeft - dx
  }, [])

  const endDrag = useCallback((e: React.PointerEvent) => {
    const el = ref.current
    if (!el) return
    if (drag.current.active && e.pointerType !== 'touch') {
      drag.current.active = false
      try {
        el.releasePointerCapture(e.pointerId)
      } catch {
        /* ignore */
      }
      el.style.cursor = 'grab'
    }
  }, [])

  return {
    ref,
    dragProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onPointerLeave: endDrag,
    },
  }
}
