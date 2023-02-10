import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import {
  Environment,
  OrbitControls,
  Stats,
  ContactShadows,
} from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";

import { useControls } from "leva";

const Env = () => {
  const { height, radius, scale } = useControls("Ground", {
    height: { value: 10, min: 0, max: 100, step: 1 },
    radius: { value: 115, min: 0, max: 1000, step: 1 },
    scale: { value: 100, min: 0, max: 1000, step: 1 },
  });
  return (
    <Environment
      files="./img/shanghai_bund_1k.hdr"
      background
      ground={{ height: height, radius: radius, scale: scale }}
    />
  );
};

const Model = () => {
  const { scene } = useLoader(GLTFLoader, "./models/scene.glb");

  const {
    x,
    y,
    z,
    visible,
    color,
    metalness,
    roughness,
    clearcoat,
    clearcoatRoughness,
    transmission,
    ior,
    thickness,
  } = useControls("Suzanne", {
    x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    visible: true,
    color: { value: "#ffbc85" },
    metalness: { value: 0, min: 0, max: 1.0, step: 0.01 },
    roughness: { value: 0, min: 0, max: 1.0, step: 0.01 },
    clearcoat: { value: 1, min: 0, max: 1.0, step: 0.01 },
    clearcoatRoughness: { value: 0, min: 0, max: 1.0, step: 0.01 },
    transmission: { value: 1.0, min: 0, max: 1.0, step: 0.01 },
    ior: { value: 1.74, min: 1, max: 5, step: 0.01 },
    thickness: { value: 3.12, min: 0, max: 5, step: 0.01 },
  });

  return (
    <primitive
      object={scene}
      children-0-rotation={[x, y, z]}
      children-0-visible={visible}
      children-0-material-color={color}
      children-0-material-metalness={metalness}
      children-0-material-roughness={roughness}
      children-0-material-clearcoat={clearcoat}
      children-0-material-clearcoatRoughness={clearcoatRoughness}
      children-0-material-transmission={transmission}
      children-0-material-ior={ior}
      children-0-material-thickness={thickness}
    />
  );
};

const App = () => {
  return (
    <Canvas shadows camera={{ position: [-8, 5, 8], fov: 40 }}>
      <Env />
      {/* <directionalLight position={[3.3, 1.0, 4.4]} intensity={4} /> */}

      <Model />
      <ContactShadows
        scale={150}
        position={[0.33, -0.33, 0.33]}
        opacity={1.5}
      />
      <OrbitControls target={[0, 1, 0]} maxPolarAngle={Math.PI / 2} />
      <axesHelper args={[5]} />
      <Stats />
    </Canvas>
  );
};

export default App;
