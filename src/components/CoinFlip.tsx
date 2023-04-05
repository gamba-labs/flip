import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { Suspense, useEffect, useMemo, useRef } from 'react'
import { BufferGeometry, CanvasTexture, Group, MeshStandardMaterial } from 'three'
import { GLTF } from 'three-stdlib'
import { OPTIONS } from '../constants'

type GLTFResult = GLTF & {
  nodes: {
    Coin: THREE.Mesh<BufferGeometry, MeshStandardMaterial>
  }
}

/** Creates label textures for HEADS / TAILS */
function useCoinTextures(size = 300) {
  const halfSize = size / 2
  return useMemo(() => {
    return OPTIONS.map(({ label }) => {
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const texture = new CanvasTexture(canvas)
      const ctx = canvas.getContext('2d')!
      const image = document.createElement('img')
      image.src = '/logo.png'
      image.onload = () => {
        // Draw image
        ctx.save()
        ctx.beginPath()
        ctx.arc(halfSize, halfSize, halfSize, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, size, size)

        // Draw text
        ctx.font = 'bold 50px Arial'
        ctx.fillStyle = 'white'
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 10
        ctx.strokeText(label.toUpperCase(), halfSize, halfSize)
        ctx.fillText(label.toUpperCase(), halfSize, halfSize)
        texture.needsUpdate = true
      }
      return texture
    })
  }, [])
}

function CoinModel() {
  const coin = useGLTF('/Coin.glb') as GLTFResult
  const [heads, tails] = useCoinTextures()
  return (
    <>
      <primitive object={coin.nodes.Coin}>
        <primitive
          object={coin.nodes.Coin.material}
          color="#ffd630"
          emissive="#ffd630"
          emissiveIntensity={.2}
          roughness={0.3}
        />
      </primitive>
      <group>
        <mesh position-z={.26}>
          <planeGeometry args={[1.3, 1.3, 1.3]} />
          <meshBasicMaterial transparent map={heads} />
        </mesh>
      </group>
      <group rotation-y={Math.PI}>
        <mesh position-z={.26}>
          <planeGeometry args={[1.3, 1.3, 1.3]} />
          <meshBasicMaterial transparent map={tails} />
        </mesh>
      </group>
    </>
  )
}

interface CoinFlipProps {
  flipping: boolean
  result: number | null
}

export function CoinFlip({ flipping, result }: CoinFlipProps) {
  const group = useRef<Group>(null!)
  const speed = useRef(0)
  const target = useRef(0)

  useEffect(() => {
    if (flipping) {
      speed.current = 1
    }
    if (!flipping && result !== null) {
      const fullTurns = Math.floor(group.current.rotation.y / (Math.PI * 2))
      target.current = (fullTurns + 2) * Math.PI * 2 + result * Math.PI
      speed.current = 0
    }
  }, [flipping, result])

  useFrame((_, dt) => {
    if (flipping) {
      if (speed.current > .5)
        speed.current *= .99
    } else {
      group.current.rotation.y += (target.current - group.current.rotation.y) * .01
    }
    group.current.rotation.y += dt * speed.current * 30
  })

  return (
    <>
      <ambientLight color="#ffffff" intensity={.5} />
      <directionalLight position={[0, 5, 5]} intensity={.5} />
      <hemisphereLight color="black" groundColor="red" intensity={1} />
      <group ref={group}>
        <Suspense fallback={null}>
          <CoinModel />
        </Suspense>
      </group>
    </>
  )
}
