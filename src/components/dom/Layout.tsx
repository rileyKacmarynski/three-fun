import { useRef, forwardRef, MutableRefObject } from 'react'
import { mergeRefs } from 'react-merge-refs'
import NavMenu from '@/components/dom/NavMenu'

const Layout = forwardRef<undefined, { children: React.ReactNode }>(({ children, ...props }, ref) => {
  const localRef = useRef()
  return (
    <div
      ref={mergeRefs([ref, localRef])}
      className='absolute top-0 left-0 z-10 w-screen h-screen overflow-hidden dom bg-zinc-900 text-gray-50'
    >
      <NavMenu />
      {children}
    </div>
  )
})
Layout.displayName = 'Layout'

export default Layout
