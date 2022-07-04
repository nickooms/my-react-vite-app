import { FC, useRef } from 'react';
import * as React from 'react';
import { Feature, Polygon } from 'geojson';
import {
  BufferGeometry,
  BufferAttribute,
  Curve,
  DoubleSide,
  Vector2,
  Vector3,
  CatmullRomCurve3,
  MeshBasicMaterial,
  Shape,
  Mesh,
  MeshPhongMaterial,
} from 'three';
import { BBox2 } from '../../../BBox2';
import type { Vec2 } from '../../../BBox2';
import { randomColor } from '../../../random-color';

export interface BuildingProps {
  feature: Feature;
}

export const Building: FC<BuildingProps> = ({ feature }) => {
  const ref = useRef<Mesh>(null);
  const [_, ...coordinates] = (feature.geometry as Polygon).coordinates[0];
  // coordinates.pop();
  const bbox = new BBox2(...(coordinates as Vec2[]));
  const { center } = bbox;
  const { length } = coordinates;
  const geometry = new BufferGeometry();
  const positions = new Float32Array(length * 3 * 2);
  const indices = new Uint16Array(length * 3 * 2);
  coordinates.forEach(([z, x], i) => {
    const offset = i * 6;
    // const offsetRight = offsetLeft + length*3 ;
    positions[offset] = x;
    positions[offset + 1] = 0;
    positions[offset + 2] = z;
    positions[offset + 3] = x;
    positions[offset + 4] = 10;
    positions[offset + 5] = z;
    indices[offset] = i % (length * 2);
    indices[offset + 1] = (i + 1) % (length * 2);
    indices[offset + 2] = (i + 2) % (length * 2);
    indices[offset + 3] = (i + 3) % (length * 2);
    indices[offset + 4] = (i + 2) % (length * 2);
    indices[offset + 5] = (i + 1) % (length * 2);
  });
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setIndex(new BufferAttribute(indices, 1));
  const material = new MeshPhongMaterial({
    color: randomColor(),
    specular: randomColor(),
    shininess: 30,
    flatShading: true,
  });
  const mesh = new Mesh(geometry, material);
  // console.log(mesh);
  return <primitive object={mesh} position={[0, 0, 0]} />;

  const shape = new Shape();
  const [first, ...rest] = coordinates;
  shape.moveTo(first[1], first[1]);
  rest.forEach(([z, x]) => shape.lineTo(x, z));
  React.useEffect(() => {
    // ref.current && ref.current.rotateX(-Math.PI / 2);
  }, []);

  return (
    <mesh position={[center[1], 0, center[0]]} ref={ref}>
      <extrudeBufferGeometry
        attach="geometry"
        args={[
          shape,
          {
            curveSegments: 1,
            steps: 1,
            depth: 1,
            bevelEnabled: false,
          },
        ]}
      />
      <meshStandardMaterial color={randomColor()} side={DoubleSide} />
    </mesh>
  );
  /* const ribbonBase = new CatmullRomCurve3(
    coordinates.map(([z, x]) => new Vector3(x, 0, z)),
    true,
    'chordal',
    0
  );
  const hh = 0.1;
  const hw = 6;
  const profile = new Shape([
    new Vector2(-hw, -hh),
    new Vector2(-hw, hh),
    new Vector2(hw, hh),
    new Vector2(hw, -hh),
    new Vector2(-hw, -hh),
  ]);
  const color = randomColor();
  return (
    <mesh>
      <extrudeGeometry
        args={[
          profile,
          {
            steps: 20,
            bevelEnabled: true,
            extrudePath: ribbonBase,
          },
        ]}
      />
      <meshLambertMaterial color={color} side={DoubleSide} />
    </mesh>
  ); */
};
