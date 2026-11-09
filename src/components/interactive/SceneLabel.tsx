import React from 'react';
import { Billboard, RoundedBox, Text } from '@react-three/drei';

export const SceneLabel: React.FC<{
  position: [number, number, number];
  title: string;
  detail?: string;
  accent?: string;
  width?: number;
}> = ({ position, title, detail, accent = '#fbbf24', width = 1.55 }) => (
  <Billboard position={position}>
    <RoundedBox args={[width, detail ? 0.62 : 0.38, 0.04]} radius={0.07}>
      <meshBasicMaterial color="#1c1917" />
    </RoundedBox>
    <Text position={[0, detail ? 0.12 : 0, 0.026]} fontSize={0.18} color="#fafaf9" anchorX="center" anchorY="middle" maxWidth={width - 0.12}>
      {title}
    </Text>
    {detail && <Text position={[0, -0.15, 0.026]} fontSize={0.135} color={accent} anchorX="center" anchorY="middle" maxWidth={width - 0.12}>{detail}</Text>}
  </Billboard>
);
