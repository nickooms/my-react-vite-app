import { MeshBasicMaterialProps } from '@react-three/fiber';
import { ReactElement } from 'react';
import { DoubleSide, MeshBasicMaterial } from 'three';
import { randomColor } from '../../random-color';

export const MeshBasicRandomMaterial: React.FC<MeshBasicMaterialProps> = ({
  color = randomColor(),
  side = DoubleSide,
  ...props
}): ReactElement<MeshBasicMaterial> => <meshBasicMaterial color={color} side={side} {...props} />;
