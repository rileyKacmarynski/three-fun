import {
  useCallback,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  RefObject,
} from 'react'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement,
>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element?: RefObject<T>,
  options?: AddEventListenerOptions,
) {
  const savedHandler = useRef(handler)

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const targetElement = element?.current
    if (!(targetElement && targetElement.addEventListener)) return

    const controller = new AbortController()
    targetElement.addEventListener(
      eventName,
      (event) => savedHandler.current(event),
      {
        ...options,
        signal: controller.signal,
      },
    )

    return () => controller.abort()
  }, [eventName, element, options])
}

export type Size = {
  width: number
  height: number
}

function useElementSize<T extends HTMLElement = HTMLDivElement>(): [
  (node: T | null) => void,
  Size,
] {
  // Mutable values like 'ref.current' aren't valid dependencies
  // because mutating them doesn't re-render the component.
  // Instead, we use a state as a ref to be reactive.
  const [ref, setRef] = useState<T | null>(null)
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  })

  // prevent too many rendering using useCallback
  const handleSize = useCallback(() => {
    setSize({
      width: ref?.offsetWidth || 0,
      height: ref?.offsetHeight || 0,
    })
  }, [ref?.offsetHeight, ref?.offsetWidth])

  useEventListener('resize', handleSize)

  useIsomorphicLayoutEffect(() => {
    handleSize()
  }, [ref?.offsetHeight, ref?.offsetWidth])

  return [setRef, size]
}

export default useElementSize
