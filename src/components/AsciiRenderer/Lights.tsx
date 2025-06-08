import { useRef } from "react";

export function Lights() {
    const groupRef = useRef(null);

    return (
        <group ref={groupRef}>
            <pointLight position={[100, 100, 400]} intensity={1} />
            <pointLight position={[-500, 100, -400]} intensity={0.9} />
        </group>
    );
}
