import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import { Shirt, Shoe, Beanie } from './Clothes';

interface SceneProps {
  activeModel: number;
  color: string;
  lightIntensity: number;
}

export default function Scene({ activeModel, color, lightIntensity }: SceneProps) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
      <ambientLight intensity={0.5 * lightIntensity} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1 * lightIntensity} castShadow />
      
      <Suspense fallback={null}>
        <Environment preset="studio" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <group position={[0, 0, 0]} scale={0.75}>
             <Shirt color={color} visible={activeModel === 0} />
             <Shoe color={color} visible={activeModel === 1} />
             <Beanie color={color} visible={activeModel === 2} />
          </group>
        </Float>

        <ContactShadows position={[0, -3.0, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#000" />
      </Suspense>

      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        minPolarAngle={Math.PI / 3} 
        maxPolarAngle={Math.PI / 1.8} 
      />
    </Canvas>
  );
}
