import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

const ThreejsSphere = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // const width = window.innerWidth;
    // const height = window.innerHeight;


    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // renderer.setSize(width, height);

    let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, .01, 10);
    let controls = new OrbitControls(camera, renderer.domElement);

    if (mountRef.current) {
      const { clientWidth, clientHeight } = mountRef.current;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.position.z = 1;
      camera.updateProjectionMatrix();
    }

    if (mountRef.current) {
      mountRef.current.innerHTML = "";
      mountRef.current.appendChild(renderer.domElement)
    }

    ////////////////////////////////////////////////////////////
    // Create geometry
    ////////////////////////////////////////////////////////////

    const baseGeometry = new THREE.IcosahedronGeometry(0.2, 12);
    const geometry = BufferGeometryUtils.mergeVertices(baseGeometry);
    geometry.computeVertexNormals();


    ////////////////////////////////////////////////////////////
    // Setup material
    ////////////////////////////////////////////////////////////

    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xff0000),
      roughness: 0.5
    }
    );

    ////////////////////////////////////////////////////////////
    // Create mesh
    ////////////////////////////////////////////////////////////

    const mesh = new THREE.Mesh(geometry, material);

    ////////////////////////////////////////////////////////////
    // Add elements to scene
    ////////////////////////////////////////////////////////////

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.02);
    const pointLight = new THREE.PointLight(0xffffff, 30, 10);

    pointLight.position.set(3.0, 3, 3);

    scene.add(mesh);
    scene.add(pointLight);
    scene.add(ambientLight);

    ////////////////////////////////////////////////////////////
    // Animation
    ////////////////////////////////////////////////////////////

    function animate(time: number) {
      renderer.render(scene, camera);
      controls.update();
    }
    renderer.setAnimationLoop(animate);

    ////////////////////////////////////////////////////////////
    // Handle window resizing
    ////////////////////////////////////////////////////////////

    const onResize = () => {
      if (!mountRef.current) return;
      const { clientWidth, clientHeight } = mountRef.current;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", onResize);

    // Force resize on initial mount
    onResize();

    ////////////////////////////////////////////////////////////
    // Cleanup
    ////////////////////////////////////////////////////////////

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      controls?.dispose();

      // Dispose scene objects
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.Line) {
          if (obj.geometry) {
            obj.geometry.dispose();
          }
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        }
      });

      mountRef.current?.removeChild(renderer.domElement);
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full" />;
}

export default ThreejsSphere;
