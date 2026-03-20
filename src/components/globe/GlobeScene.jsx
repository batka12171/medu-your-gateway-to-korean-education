import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// South Korea lat/lon → 3D position on unit sphere
function latLonToVec3(lat, lon, radius = 1) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// South Korea center: ~36.5°N, 127.9°E
const SK_LAT = 36.5;
const SK_LON = 127.9;

export default function GlobeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 3.5);
    camera.lookAt(0, 0, 0);

    // ── Stars ─────────────────────────────────────────────────
    const starGeo = new THREE.BufferGeometry();
    const starCount = 2000;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 200;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, sizeAttenuation: true });
    scene.add(new THREE.Points(starGeo, starMat));

    // ── Globe ─────────────────────────────────────────────────
    const globeGeo = new THREE.SphereGeometry(1, 64, 64);

    // Load earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthTex = textureLoader.load(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flat_earth_night.jpg/2560px-Flat_earth_night.jpg",
      () => {} // on load
    );
    // Fallback day texture
    const dayTex = textureLoader.load(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Land_ocean_ice_cloud_2048.jpg/2560px-Land_ocean_ice_cloud_2048.jpg"
    );

    const globeMat = new THREE.MeshPhongMaterial({
      map: dayTex,
      specular: new THREE.Color(0x333333),
      shininess: 15,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globe);

    // ── Atmosphere glow ───────────────────────────────────────
    const atmGeo = new THREE.SphereGeometry(1.02, 64, 64);
    const atmMat = new THREE.MeshPhongMaterial({
      color: 0x00c9a7,
      transparent: true,
      opacity: 0.08,
      side: THREE.FrontSide,
    });
    scene.add(new THREE.Mesh(atmGeo, atmMat));

    // Outer glow
    const outerGeo = new THREE.SphereGeometry(1.12, 64, 64);
    const outerMat = new THREE.MeshPhongMaterial({
      color: 0x00c9a7,
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(outerGeo, outerMat));

    // ── South Korea marker ────────────────────────────────────
    const skPos = latLonToVec3(SK_LAT, SK_LON, 1.02);
    const markerGeo = new THREE.SphereGeometry(0.015, 16, 16);
    const markerMat = new THREE.MeshBasicMaterial({ color: 0x00c9a7 });
    const marker = new THREE.Mesh(markerGeo, markerMat);
    marker.position.copy(skPos);
    globe.add(marker);

    // Pulse ring around marker
    const ringGeo = new THREE.RingGeometry(0.022, 0.030, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00c9a7,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(skPos);
    ring.lookAt(skPos.clone().multiplyScalar(2));
    globe.add(ring);

    // ── Lights ────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);
    const sun = new THREE.DirectionalLight(0xffffff, 1.2);
    sun.position.set(5, 3, 5);
    scene.add(sun);

    // ── Scroll animation targets ──────────────────────────────
    // We need to rotate the globe so SK faces the camera at scroll end
    // SK is at lon=127.9, so we need to rotate Y so that lon 127.9 aligns with +Z
    // Default globe has lon=0 at -Z (due to lat/lon math), so offset = lon + 180 in radians
    const skTargetRotY = -((SK_LON + 180) * Math.PI) / 180 + Math.PI;
    const skTargetRotX = -(SK_LAT * Math.PI) / 180;

    // Camera zoom: start far, end close to SK
    const startZ = 3.5;
    const endZ = 1.55;

    let currentRotY = 0;
    let currentRotX = 0;
    let currentCamZ = startZ;
    let pulsScale = 1;

    // ── Resize handler ────────────────────────────────────────
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Scroll handler ────────────────────────────────────────
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / (maxScroll * 0.85), 1); // use 85% of scroll

      currentRotY = progress * skTargetRotY;
      currentRotX = progress * skTargetRotX;
      currentCamZ = startZ - progress * (startZ - endZ);
    };
    window.addEventListener("scroll", onScroll);

    // ── Animation loop ────────────────────────────────────────
    let animId;
    let t = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.016;

      // Smooth lerp globe rotation toward scroll target
      globe.rotation.y += (currentRotY - globe.rotation.y) * 0.06;
      globe.rotation.x += (currentRotX - globe.rotation.x) * 0.06;

      // Auto slow spin when not scrolled much
      const scrollProgress = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1);
      if (scrollProgress < 0.05) {
        globe.rotation.y += 0.0008;
      }

      // Camera zoom
      camera.position.z += (currentCamZ - camera.position.z) * 0.06;

      // Pulse ring
      const pulse = 1 + 0.3 * Math.sin(t * 3);
      ring.scale.setScalar(pulse);
      ringMat.opacity = 0.5 + 0.4 * Math.abs(Math.sin(t * 3));

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}