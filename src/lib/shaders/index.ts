import createGL from "gl";
import { createCanvas } from "canvas";

import fragSrc from "./speckle_fragment.glsl";
import vertSrc from "./speckle_vertex.glsl";

export function renderPattern(hash: string, w = 1200, h = 630): Buffer {
    const gl = createGL(w, h, { preserveDrawingBuffer: true });
    if (!gl) throw new Error("Unable to create GL context");
    gl.viewport(0, 0, w, h);

    const compile = (type: number, src: string): WebGLShader => {
        const sh = gl.createShader(type)!;
        gl.shaderSource(sh, src);
        gl.compileShader(sh);
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS))
            throw new Error(gl.getShaderInfoLog(sh) || "Shader compile failed");
        return sh;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertSrc));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragSrc));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        throw new Error(gl.getProgramInfoLog(program) || "Program link failed");
    gl.useProgram(program);

    const getLoc = (name: string) => gl.getUniformLocation(program, name);

    gl.uniform2f(getLoc("u_resolution"), w, h);

    const seed = new Float32Array([
        parseInt(hash.slice(0, 2), 16) / 255,
        parseInt(hash.slice(2, 4), 16) / 255,
        parseInt(hash.slice(4, 6), 16) / 255,
    ]);
    gl.uniform3fv(getLoc("u_seed"), seed);

    // prettier-ignore
    const vertices = new Float32Array([
    //  x,  y, z,   u, v
       -1, -1, 0,   0, 0,
        1, -1, 0,   1, 0,
       -1,  1, 0,   0, 1,

       -1,  1, 0,   0, 1,
        1, -1, 0,   1, 0,
        1,  1, 0,   1, 1,
    ]);

    const vbo = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const stride = 5 * 4;
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, stride, 0);

    const uvLoc = gl.getAttribLocation(program, "a_texture_coordinate");
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, stride, 3 * 4);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.finish();

    const pixels = Buffer.alloc(w * h * 4);
    gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext("2d");
    const img = ctx.createImageData(w, h);
    img.data.set(pixels);
    ctx.putImageData(img, 0, 0);

    return canvas.toBuffer("image/png");
}
