// math.ts
function square(x: number): number {
  return Math.pow(x, 2);
};

function cube(x: number): number {
  return Math.pow(x, 3);
};

function random(a: number, b:number): number {
	let min = Math.ceil(a);
	let max = Math.floor(b);
	return min + Math.floor(Math.random() * (max - min));
}

const PI = Math.PI;

const E = Math.E;

export { square, cube, random, PI, E };

