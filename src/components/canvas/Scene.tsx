import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { useRouter } from 'next/router'
import { Leva } from 'leva'

export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  const { query } = useRouter()

  return (
    <>
      <Canvas {...props}>
        {children}
        <Preload all />
      </Canvas>
      <Leva hidden={!Boolean(query.gui)} />
    </>
  )
}
