import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface ClothProps {
  color: string;
  visible?: boolean;
}

export function Shirt({ color, visible = true }: ClothProps) {
  const { scene } = useGLTF('https://raw.githubusercontent.com/adrianhajdin/project_threejs_ai/main/client/public/shirt_baked.glb');
  const ref = useRef<THREE.Group>(null);
  const targetScale = visible ? 5 : 0.001;

  // Clone scene so we can mutate materials safely
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = child.material.clone();
      }
    });
    return clone;
  }, [scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material) {
           child.material.color = new THREE.Color(color);
        }
      }
    });
  }, [color, clonedScene]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
      ref.current.rotation.y += delta * 0.15;
      if (!visible) ref.current.rotation.y = 0;
    }
  });

  return (
    <group ref={ref} visible={visible || (ref.current?.scale.x || 0) > 0.01} position={[0, 0.2, 0]}>
       <primitive object={clonedScene} />
    </group>
  );
}

export function Shoe({ color, visible = true }: ClothProps) {
  const { scene } = useGLTF('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb');
  const ref = useRef<THREE.Group>(null);
  const targetScale = visible ? 15 : 0.001;

  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = child.material.clone();
      }
    });
    return clone;
  }, [scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // MaterialsVariantsShoe has different parts, we tint the base material
        if (child.material) {
           child.material.color = new THREE.Color(color);
        }
      }
    });
  }, [color, clonedScene]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
      ref.current.rotation.y += delta * 0.15;
      if (!visible) ref.current.rotation.y = 0;
    }
  });

  return (
    <group ref={ref} visible={visible || (ref.current?.scale.x || 0) > 0.01} position={[0, -0.5, 0]}>
       <primitive object={clonedScene} />
    </group>
  );
}

let fabricBumpMap: THREE.CanvasTexture | null = null;
function getFabricBumpMap() {
  if (fabricBumpMap) return fabricBumpMap;
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const imgData = ctx.createImageData(512, 512);
    for (let x = 0; x < 512; x++) {
      for (let y = 0; y < 512; y++) {
        // Knit pattern approximation
        const nx = x / 512;
        const ny = y / 512;
        
        // Horizontal ribbing
        const rib = Math.sin(ny * Math.PI * 180) * 0.5 + 0.5;
        // Vertical zig-zag/knit
        const knit = Math.sin(nx * Math.PI * 90 + Math.sin(ny * Math.PI * 60) * 1.5) * 0.5 + 0.5;
        
        const noise = (Math.random() - 0.5) * 0.2;
        
        const bump = Math.floor(((rib * 0.6 + knit * 0.4 + noise) ) * 255);
        
        const idx = (y * 512 + x) * 4;
        imgData.data[idx] = bump;
        imgData.data[idx + 1] = bump;
        imgData.data[idx + 2] = bump;
        imgData.data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }
  fabricBumpMap = new THREE.CanvasTexture(canvas);
  fabricBumpMap.wrapS = THREE.RepeatWrapping;
  fabricBumpMap.wrapT = THREE.RepeatWrapping;
  fabricBumpMap.repeat.set(4, 2); // Stretch horizontally
  fabricBumpMap.anisotropy = 4;
  return fabricBumpMap;
}

export function Beanie({ color, visible = true }: ClothProps) {
  const ref = useRef<THREE.Group>(null);
  const targetScale = visible ? 1.6 : 0.001;
  const normalMap = useTexture('https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/fabric_pattern_07/fabric_pattern_07_nor_gl_1k.jpg');
  
  const mat = useMemo(() => {
    const tex = normalMap.clone();
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    
    return new THREE.MeshPhysicalMaterial({ 
      roughness: 0.8, 
      metalness: 0.05,
      sheenColor: new THREE.Color('#ffffff'),
      sheen: 0.6,
      normalMap: tex,
      normalScale: new THREE.Vector2(0.8, 0.8),
    });
  }, [normalMap]);

  useEffect(() => {
    mat.color = new THREE.Color(color);
  }, [color, mat]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
      ref.current.rotation.y += delta * 0.15;
      if (!visible) ref.current.rotation.y = 0;
    }
  });

  return (
    <group ref={ref} visible={visible || (ref.current?.scale.x || 0) > 0.01} position={[0, -0.6, 0]}>
      {/* Sleek Skull Cap Form without cylinder seams */}
      <mesh position={[0, 0.8, 0]} scale={[1, 1.15, 1]} castShadow receiveShadow>
        <sphereGeometry args={[0.9, 64, 48, 0, Math.PI * 2, 0, Math.PI / 2 + 0.3]} />
        <primitive object={mat} attach="material" />
      </mesh>
    </group>
  );
}

// Preload models for performance
useGLTF.preload('https://raw.githubusercontent.com/adrianhajdin/project_threejs_ai/main/client/public/shirt_baked.glb');
useGLTF.preload('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb');
useTexture.preload('https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/fabric_pattern_07/fabric_pattern_07_nor_gl_1k.jpg');


