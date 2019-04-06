// Tuple type

let p: [string, string, number];

p = ["John", "Doe", 25];

console.log("p = ", p);

let x: string = `I am ${p[0]} ${p[1]}.
	I will be ${p[2] + 1} next year.`

console.log("x = ", x);

