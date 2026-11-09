import React from 'react';
import { ProjectedLabel } from './ProjectedLabel';

export const SceneLabel: React.FC<{
  position: [number, number, number];
  title: string;
  detail?: string;
  accent?: string;
  width?: number;
}> = ({ position, title, detail }) => (
  <ProjectedLabel position={position} title={title} detail={detail} />
);
