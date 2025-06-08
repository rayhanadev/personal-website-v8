import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { NoToneMapping } from "three";

import { Model } from "./Model";
import { Renderer } from "./Renderer";
import { Lights } from "./Lights";

export default function AsciiRenderer({ resolution }: { resolution: number }) {
    return (
        <Canvas
            camera={{ fov: 45, position: [0, 20, 0], near: 0.1, far: 1000 }}
            flat
            legacy
            gl={{
                toneMapping: NoToneMapping,
            }}
            // frameloop="demand"
            className="w-full"
        >
            <Suspense fallback={null}>
                <color attach="background" args={["white"]} />
                <ambientLight intensity={0.1} />

                <Lights />
                <Model />
                <Renderer
                    fgColor="var(--foreground)"
                    bgColor="transparent"
                    resolution={resolution}
                />
            </Suspense>
        </Canvas>
    );
}
