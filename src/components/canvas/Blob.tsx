import { useState } from 'react'
import { useRouter } from 'next/router'
import { useCursor, MeshDistortMaterial, OrbitControls } from '@react-three/drei'

export default function Blob({ route, ...props }) {
  const router = useRouter()
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  return (
    <>
      <directionalLight intensity={0.75} />
      <ambientLight intensity={0.75} />
      <OrbitControls />
      <mesh
        onClick={() => router.push(route)}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        {...props}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial roughness={0} color={hovered ? 'hotpink' : '#1fb2f5'} />
      </mesh>
    </>
  )
}
