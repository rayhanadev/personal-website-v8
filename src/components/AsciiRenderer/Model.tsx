import { useLoader, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { Mesh, MeshStandardMaterial, DoubleSide } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

export function Model() {
    const ref = useRef<Mesh | null>(null);

    const result = useLoader(STLLoader, "/models/plant.stl");

    const material = useMemo(() => {
        const mat = new MeshStandardMaterial({
            flatShading: true,
            side: DoubleSide,
            color: 0xcccccc,
            roughness: 1,
            metalness: 0,
        });
        return mat;
    }, []);

    useFrame((_, delta) => {
        if (ref.current) {
            if (
                !window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ) {
                ref.current.rotation.z += delta / 5;
            }
        }
    });

    return (
        <group dispose={null}>
            <group rotation={[-Math.PI / 2, -0.35, 0.05]}>
                <group>
                    <mesh
                        ref={ref}
                        geometry={result}
                        material={material}
                        scale={0.013}
                        rotation={[-1.6, 0.016, -0.2]}
                        position={[2, -1, 0]}
                    />
                </group>
            </group>
        </group>
    );
}
