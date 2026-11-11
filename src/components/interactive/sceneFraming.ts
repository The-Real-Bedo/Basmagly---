import { Box3, PerspectiveCamera, Vector3 } from 'three';

/** Fit the actual bounds, including off-centre layouts, with room for annotations. */
export function fitSceneCamera(
  camera: PerspectiveCamera,
  bounds: Box3,
  direction: Vector3,
  width: number,
  height: number,
) {
  const target = bounds.getCenter(new Vector3());
  const outward = direction.clone().normalize();
  const right = new Vector3().crossVectors(camera.up, outward).normalize();
  const up = new Vector3().crossVectors(outward, right).normalize();
  const vertical = Math.tan(camera.fov * Math.PI / 360) * 0.80;
  const horizontal = Math.tan(camera.fov * Math.PI / 360) * (width / height) * 0.82;
  let distance = 4;
  for (const x of [bounds.min.x, bounds.max.x])
    for (const y of [bounds.min.y, bounds.max.y])
      for (const z of [bounds.min.z, bounds.max.z]) {
        const corner = new Vector3(x, y, z).sub(target);
        distance = Math.max(distance, corner.dot(outward) + Math.max(
          Math.abs(corner.dot(right)) / horizontal,
          Math.abs(corner.dot(up)) / vertical,
        ));
      }
  camera.position.copy(target).addScaledVector(outward, distance);
  camera.lookAt(target);
  camera.updateMatrixWorld();
  return target;
}
