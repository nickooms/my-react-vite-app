import React, { useState, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
// import _ from 'lodash'
// import { Spring } from 'simple-spring'

extend({ MeshLine, MeshLineMaterial });

export function Line({ points, width, color }) {
  const [p, setP] = useState(points);

  const meshLine = new MeshLine();
  meshLine.points = p;

  const meshLineMaterial = new MeshLineMaterial();
  meshLineMaterial.useMap = false;
  meshLineMaterial.color = color;
  meshLineMaterial.opacity = 1;
  meshLineMaterial.resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
  meshLineMaterial.sizeAttenuation = false;
  meshLineMaterial.lineWidth = width;

  return (
    <mesh
      raycast={MeshLineRaycast}
      onPointerOver={(e) => {
        var newLine = new Float32Array(600);
        for (var j = 0; j < 200 * 3; j += 3) {
          newLine[j] = 0.1 * j;
          newLine[j + 1] = e.point.x * Math.cos(0.01 * j);
          newLine[j + 2] = p[j + 2];
        }
        setP(newLine);
      }}
      geometry={meshLine}
      material={meshLineMaterial}
    >
      {/* <meshLine attach="geometry" points={p} />
      <meshLineMaterial
        useMap={false}
        color={color}
        opacity={1}
        resolution={new THREE.Vector2(window.innerWidth, window.innerHeight)}
        sizeAttenuation={false}
        lineWidth={width}
      /> */}
    </mesh>
  );
}
