import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeCoffeeCupProps {
  className?: string;
  interactive?: boolean;
}

export const ThreeCoffeeCup: React.FC<ThreeCoffeeCupProps> = ({
  className = '',
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [steamActive, setSteamActive] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 3.8);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. Lighting (warm editorial café studio)
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffb870, 2.8);
    keyLight.position.set(2.5, 4, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xd4af37, 2.2, 10);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x75859b, 0.6);
    fillLight.position.set(-2, -1, 1);
    scene.add(fillLight);

    // 3. Coffee Cup & Saucer Group
    const cupGroup = new THREE.Group();
    scene.add(cupGroup);

    // Stoneware Matte Ceramic Material
    const ceramicMaterial = new THREE.MeshStandardMaterial({
      color: 0x1b1917, // Deep dark obsidian/charcoal clay
      roughness: 0.35,
      metalness: 0.08,
    });

    const saucerMaterial = new THREE.MeshStandardMaterial({
      color: 0x141210,
      roughness: 0.45,
      metalness: 0.05,
    });

    // Cup Body (Cylinder with curve)
    const cupPoints: THREE.Vector2[] = [];
    cupPoints.push(new THREE.Vector2(0.55, -0.45));
    cupPoints.push(new THREE.Vector2(0.72, -0.3));
    cupPoints.push(new THREE.Vector2(0.85, 0.1));
    cupPoints.push(new THREE.Vector2(0.88, 0.45));
    cupPoints.push(new THREE.Vector2(0.84, 0.45));
    cupPoints.push(new THREE.Vector2(0.78, 0.1));
    cupPoints.push(new THREE.Vector2(0.65, -0.35));
    cupPoints.push(new THREE.Vector2(0.0, -0.4));

    const cupGeometry = new THREE.LatheGeometry(cupPoints, 48);
    const cupMesh = new THREE.Mesh(cupGeometry, ceramicMaterial);
    cupMesh.castShadow = true;
    cupMesh.receiveShadow = true;
    cupGroup.add(cupMesh);

    // Saucer
    const saucerPoints: THREE.Vector2[] = [];
    saucerPoints.push(new THREE.Vector2(0.0, -0.6));
    saucerPoints.push(new THREE.Vector2(0.7, -0.6));
    saucerPoints.push(new THREE.Vector2(1.2, -0.52));
    saucerPoints.push(new THREE.Vector2(1.3, -0.44));
    saucerPoints.push(new THREE.Vector2(1.26, -0.42));
    saucerPoints.push(new THREE.Vector2(1.15, -0.5));
    saucerPoints.push(new THREE.Vector2(0.65, -0.57));
    saucerPoints.push(new THREE.Vector2(0.0, -0.57));
    const saucerGeometry = new THREE.LatheGeometry(saucerPoints, 48);
    const saucerMesh = new THREE.Mesh(saucerGeometry, saucerMaterial);
    saucerMesh.receiveShadow = true;
    cupGroup.add(saucerMesh);

    // Cup Handle (Torus segment)
    const handleGeometry = new THREE.TorusGeometry(0.32, 0.065, 18, 36, Math.PI * 1.05);
    const handleMesh = new THREE.Mesh(handleGeometry, ceramicMaterial);
    handleMesh.rotation.z = -Math.PI / 1.1;
    handleMesh.rotation.y = Math.PI / 2;
    handleMesh.position.set(0.92, 0.08, 0);
    handleMesh.castShadow = true;
    cupGroup.add(handleMesh);

    // Coffee Liquid (Dark espresso surface with golden crema rim)
    const liquidCanvas = document.createElement('canvas');
    liquidCanvas.width = 512;
    liquidCanvas.height = 512;
    const lCtx = liquidCanvas.getContext('2d')!;
    // Radial gradient: dark espresso center, golden caramel crema swirl
    const grad = lCtx.createRadialGradient(256, 256, 10, 256, 256, 250);
    grad.addColorStop(0, '#21130d');
    grad.addColorStop(0.55, '#3b2216');
    grad.addColorStop(0.85, '#9a6b3e');
    grad.addColorStop(0.96, '#d19854');
    grad.addColorStop(1, '#c08945');
    lCtx.fillStyle = grad;
    lCtx.fillRect(0, 0, 512, 512);

    // Subtle latte art heart/rosetta swirl
    lCtx.strokeStyle = 'rgba(240, 230, 215, 0.75)';
    lCtx.lineWidth = 14;
    lCtx.lineCap = 'round';
    lCtx.beginPath();
    lCtx.arc(256, 230, 60, 0.2 * Math.PI, 0.8 * Math.PI, false);
    lCtx.stroke();
    lCtx.beginPath();
    lCtx.arc(256, 260, 35, 0.1 * Math.PI, 0.9 * Math.PI, false);
    lCtx.stroke();
    lCtx.beginPath();
    lCtx.moveTo(256, 180);
    lCtx.lineTo(256, 310);
    lCtx.stroke();

    const liquidTexture = new THREE.CanvasTexture(liquidCanvas);
    const liquidMaterial = new THREE.MeshStandardMaterial({
      map: liquidTexture,
      roughness: 0.18,
      metalness: 0.1,
    });
    const liquidGeometry = new THREE.CircleGeometry(0.82, 48);
    const liquidMesh = new THREE.Mesh(liquidGeometry, liquidMaterial);
    liquidMesh.rotation.x = -Math.PI / 2;
    liquidMesh.position.y = 0.38;
    cupGroup.add(liquidMesh);

    // 4. Floating Roasted Coffee Bean Sculpture
    const beanGroup = new THREE.Group();
    const beanGeometry = new THREE.SphereGeometry(0.24, 24, 24);
    beanGeometry.scale(1.2, 0.75, 0.65);
    const beanMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d2014,
      roughness: 0.4,
      metalness: 0.15,
    });
    const beanMesh = new THREE.Mesh(beanGeometry, beanMaterial);
    beanMesh.castShadow = true;
    beanGroup.add(beanMesh);

    // Center crease on coffee bean
    const creaseGeom = new THREE.TorusGeometry(0.19, 0.02, 8, 24, Math.PI * 0.9);
    const creaseMat = new THREE.MeshStandardMaterial({ color: 0x140a06, roughness: 0.8 });
    const creaseMesh = new THREE.Mesh(creaseGeom, creaseMat);
    creaseMesh.rotation.x = Math.PI / 2;
    creaseMesh.position.y = 0.08;
    beanGroup.add(creaseMesh);

    beanGroup.position.set(1.4, 0.7, 0.4);
    beanGroup.rotation.set(0.4, 0.3, 0.8);
    scene.add(beanGroup);

    // 5. Steam Particle System
    const particleCount = 42;
    const steamGeometry = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(particleCount * 3);
    const steamAlphas = new Float32Array(particleCount);
    const steamVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      steamPositions[i * 3] = (Math.random() - 0.5) * 0.4;
      steamPositions[i * 3 + 1] = 0.4 + Math.random() * 1.2;
      steamPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      steamAlphas[i] = Math.random() * 0.4 + 0.1;
      steamVelocities.push({
        x: (Math.random() - 0.5) * 0.003,
        y: 0.006 + Math.random() * 0.007,
        z: (Math.random() - 0.5) * 0.003,
      });
    }

    steamGeometry.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

    // Particle Canvas Texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d')!;
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 30);
    pGrad.addColorStop(0, 'rgba(235, 215, 190, 0.6)');
    pGrad.addColorStop(0.5, 'rgba(215, 185, 150, 0.25)');
    pGrad.addColorStop(1, 'rgba(200, 180, 160, 0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 64, 64);

    const steamTexture = new THREE.CanvasTexture(pCanvas);
    const steamMaterial = new THREE.PointsMaterial({
      size: 0.35,
      map: steamTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.5,
    });

    const steamPointsMesh = new THREE.Points(steamGeometry, steamMaterial);
    cupGroup.add(steamPointsMesh);

    // 6. Interaction & Motion Physics
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
      targetRotationY = x * 0.8;
      targetRotationX = -y * 0.45;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Window Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp cup rotation
      cupGroup.rotation.y += (targetRotationY + elapsedTime * 0.12 - cupGroup.rotation.y) * 0.05;
      cupGroup.rotation.x += (targetRotationX + 0.15 - cupGroup.rotation.x) * 0.05;

      // Gentle floating bob
      cupGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.05;

      // Orbiting coffee bean
      beanGroup.position.x = Math.cos(elapsedTime * 0.8) * 1.35;
      beanGroup.position.z = Math.sin(elapsedTime * 0.8) * 0.9;
      beanGroup.position.y = 0.5 + Math.sin(elapsedTime * 2.2) * 0.15;
      beanGroup.rotation.x += 0.015;
      beanGroup.rotation.y += 0.02;

      // Steam animation
      if (steamActive) {
        const positions = steamGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += steamVelocities[i].y;
          positions[i * 3] += Math.sin(elapsedTime * 2 + i) * 0.002;
          // Reset when risen
          if (positions[i * 3 + 1] > 1.8) {
            positions[i * 3 + 1] = 0.4;
            positions[i * 3] = (Math.random() - 0.5) * 0.35;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.35;
          }
        }
        steamGeometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      cupGeometry.dispose();
      ceramicMaterial.dispose();
      saucerGeometry.dispose();
      saucerMaterial.dispose();
      handleGeometry.dispose();
      liquidGeometry.dispose();
      liquidMaterial.dispose();
      liquidTexture.dispose();
      beanGeometry.dispose();
      beanMaterial.dispose();
      creaseGeom.dispose();
      creaseMat.dispose();
      steamGeometry.dispose();
      steamMaterial.dispose();
      steamTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive, steamActive]);

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={containerRef}
        className="w-full h-full min-h-[320px] md:min-h-[460px] cursor-grab active:cursor-grabbing"
      />
      
      {/* Discreet 3D tactile interaction hint */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 text-[11px] text-[#a09a92] tracking-wider uppercase font-mono bg-[#141210]/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 pointer-events-auto">
        <span className="w-1.5 h-1.5 rounded-full bg-[#c99a6b] animate-pulse" />
        <span>3D Artisanal Stoneware · Drag to rotate</span>
        <button
          onClick={() => setSteamActive(!steamActive)}
          className="ml-2 pl-2 border-l border-white/20 text-[#dfa86a] hover:text-white transition-colors"
          title="Toggle steam physics"
        >
          {steamActive ? 'Steam On' : 'Steam Off'}
        </button>
      </div>
    </div>
  );
};
