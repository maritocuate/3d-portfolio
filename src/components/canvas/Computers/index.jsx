import React, { Suspense, useEffect, useState, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Preload, useGLTF } from "@react-three/drei"

import CanvasLoader from "../../Loader"

const Computers = ({ isMobile, scrollY }) => {
  const computer = useGLTF("./old_computer/scene.gltf");
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      const rotationSpeed = -0.002;
      modelRef.current.rotation.y = scrollY * rotationSpeed;
    }
  }, [scrollY]);

  return (
    <mesh ref={modelRef}>
      <hemisphereLight intensity={0.7} groundColor='black' />
      <spotLight
        position={[-20, 10, 10]}
        angle={0.5}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={10} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 1 : 1.3}
        position={isMobile ? [0, -2, 0.5] : [0, -2, 0.5]}
        rotation={[0, 2.1, 0]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    window.addEventListener("scroll", handleScroll);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [7, 0, 0], fov: 60 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <Computers isMobile={isMobile} scrollY={scrollY} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas