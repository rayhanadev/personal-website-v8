import { useThree, useFrame } from "@react-three/fiber";
import { useIsomorphicLayoutEffect } from "@react-spring/web";
import { useMemo, useEffect } from "react";
import { AsciiEffect } from "three-stdlib";

export function Renderer({
    renderIndex = 1,
    characters = "#@%=*+-:. ",
    bgColor = "var(--background)",
    fgColor = "var(--foreground)",
    invert = true,
    color = false,
    resolution = 0.25,
}) {
    const { size, gl, scene, camera } = useThree();

    const effect = useMemo(() => {
        const effect = new AsciiEffect(gl, characters, {
            invert,
            color,
            resolution,
        });
        effect.domElement.style.position = "absolute";
        effect.domElement.style.top = "0px";
        effect.domElement.style.left = "0px";
        effect.domElement.style.pointerEvents = "none";
        effect.domElement.style.width = "100%";

        return effect;
    }, [characters, invert, color, resolution]);

    useIsomorphicLayoutEffect(() => {
        effect.domElement.style.color = fgColor;
        effect.domElement.style.backgroundColor = bgColor;
    }, [fgColor, bgColor]);

    useEffect(() => {
        gl.domElement.style.opacity = "0";
        gl.domElement.parentNode!.appendChild(effect.domElement);
        return () => {
            gl.domElement.style.opacity = "1";
            gl.domElement.parentNode!.removeChild(effect.domElement);
        };
    }, [effect]);

    useEffect(() => {
        effect.setSize(size.width, size.height);
    }, [effect, size]);

    useFrame(() => {
        effect.render(scene, camera);
    }, renderIndex);

    return null;
}
