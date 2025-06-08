attribute vec3 a_position;
attribute vec2 a_texture_coordinate;

varying vec2 pos;

void main() {
    pos = a_texture_coordinate;
    gl_Position = vec4(a_position, 1.0);
}
