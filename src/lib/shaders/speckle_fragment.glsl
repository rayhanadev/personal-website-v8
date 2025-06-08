precision mediump float;

varying vec2 pos;

uniform vec2 u_resolution;
uniform vec3 u_seed;

float hash(vec2 p) {
    return fract(sin(dot(p + u_seed.xy, vec2(127.1, 311.7))) * 43758.5453);
}

vec2 hash2(vec2 p) {
    return fract(sin(vec2(dot(p + u_seed.xy, vec2(127.1, 311.7)), dot(p + u_seed.yz, vec2(269.5, 183.3)))) * 43758.5453);
}

vec3 hash3(vec2 p) {
    return fract(sin(vec3(
        dot(p + u_seed.xy, vec2(127.1, 311.7)),
        dot(p + u_seed.yz, vec2(269.5, 183.3)),
        dot(p + u_seed.zx, vec2(419.2, 371.9))
    )) * 43758.5453);
}

void main() {
    vec2 uv = pos;

    uv.x *= u_resolution.x / u_resolution.y;

    float pattern = 0.0;

    float scale1 = 40.0;
    vec2 scaledUV1 = uv * scale1;

    for(int x = -1; x <= 1; x++) {
        for(int y = -1; y <= 1; y++) {
            vec2 offset = vec2(float(x), float(y));
            vec2 gridPos = floor(scaledUV1) + offset;
            vec3 rand = hash3(gridPos);

            if(rand.x < 0.2) {
                float squareSize = 0.1 + rand.y * 0.6;
                vec2 size = vec2(squareSize);

                vec2 randPos = hash2(gridPos + vec2(100.0, 200.0));
                vec2 rectCenter = gridPos + randPos * 0.8;

                vec2 toCenter = scaledUV1 - rectCenter;
                vec2 d = abs(toCenter) - size * 0.5;
                float rectDist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);

                if(rectDist < 0.0) {
                    pattern = 1.0;
                }
            }
        }
    }

    float scale2 = 80.0;
    vec2 scaledUV2 = uv * scale2;

    for(int x = -1; x <= 1; x++) {
        for(int y = -1; y <= 1; y++) {
            vec2 offset = vec2(float(x), float(y));
            vec2 gridPos = floor(scaledUV2) + offset;
            vec3 rand = hash3(gridPos + vec2(500.0, 600.0));

            if(rand.x < 0.3) {
                float squareSize = 0.3 + rand.z * 0.5;
                vec2 size = vec2(squareSize);

                vec2 randPos = hash2(gridPos + vec2(700.0, 800.0));
                vec2 rectCenter = gridPos + randPos;

                vec2 toCenter = scaledUV2 - rectCenter;
                vec2 d = abs(toCenter) - size * 0.5;
                float rectDist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);

                if(rectDist < 0.0) {
                    pattern = 1.0;
                }
            }
        }
    }

    float scale3 = 80.0;
    vec2 scaledUV3 = uv * scale3;
    vec2 gridPos3 = floor(scaledUV3);
    vec3 rand3 = hash3(gridPos3 + vec2(1000.0, 1100.0));

    if(rand3.x < 0.6) {
        float squareSize = 0.1 + rand3.y * 0.4; // Max size is 0.3
        vec2 size = vec2(squareSize);

        vec2 randPos = hash2(gridPos3 + vec2(1200.0, 1300.0));
        vec2 rectCenter = gridPos3 + randPos;

        vec2 toCenter = scaledUV3 - rectCenter;
        vec2 d = abs(toCenter) - size * 0.5;
        float rectDist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);

        if(rectDist < 0.0) {
            pattern = 1.0;
        }
    }

    gl_FragColor = vec4(vec3(1.0 - pattern), 1.0);
}
