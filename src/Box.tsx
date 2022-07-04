import * as THREE from 'three';
import * as React from 'react';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

export function Box(props: JSX.IntrinsicElements['mesh']) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));

  const A = [-1, 1, 1];
  const B = [1, 1, 1];
  const C = [1, -1, 1];
  const D = [-1, -1, 1];
  const E = [-1, 1, -1];
  const F = [1, 1, -1];
  const G = [1, -1, -1];
  const H = [-1, -1, -1];
  const points = [];
  points.push(...A, ...B, ...C, ...C, ...D, ...A, ...E, ...F, ...G, ...G, ...H, ...E);
  const vertices = new Float32Array(points);
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={vertices.length / 3} array={vertices} itemSize={3} />
      </bufferGeometry>
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} side={THREE.DoubleSide} />
    </mesh>
  );
  /*  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  ) */
}
