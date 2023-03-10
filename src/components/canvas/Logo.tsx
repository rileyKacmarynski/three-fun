import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useFrame } from '@react-three/fiber'
import { Line, OrbitControls, useCursor } from '@react-three/drei'
import { useControls } from 'leva'

export default function Logo({ route, ...props }) {
  const router = useRouter()
  const mesh = useRef(null)
  const [hovered, hover] = useState(false)
  const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), [])

  const color = useControls({
    logoColor: '#1fb2f5',
  })

  useCursor(hovered)
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    // mesh.current.rotation.y += delta
    // mesh.current.rotation.x += Math.cos(t) * 0.03
    // mesh.current.rotation.z -= delta / 4
  })

  return (
    <>
      <directionalLight intensity={0.75} />
      <ambientLight intensity={0.75} />
      <OrbitControls />
      <group ref={mesh} {...props}>
        {/* @ts-ignore */}
        <Line worldUnits points={points} color={color.logoColor} lineWidth={0.15} />
        {/* @ts-ignore */}
        <Line worldUnits points={points} color={color.logoColor} lineWidth={0.15} rotation={[0, 0, 0.25 * Math.PI]} />
        {/* @ts-ignore */}
        <Line worldUnits points={points} color={color.logoColor} lineWidth={0.15} rotation={[0, 0, -0.25 * Math.PI]} />
        <mesh onClick={() => router.push(route)} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
          <sphereGeometry args={[0.55, 64, 64]} />
          <meshPhysicalMaterial roughness={0} color={hovered ? 'hotpink' : color.logoColor} />
        </mesh>
      </group>
    </>
  )
}
