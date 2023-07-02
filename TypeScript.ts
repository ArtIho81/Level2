//Primitive types

const num: number = 10;
const str: string = "Hello";
const myNull: null = null;
const myUnderfined: undefined = undefined;

//Object types

const obj: object = {};

const user: {
  name: string;
  surname: string;
  age?: number; // ?
} = {
  name: "",
  surname: "",
};

//Array types

const arr: number[] = [1, 2, 3, 4, 5];
const matrix: number[][] = [[], [], []];
const mix: (number | string)[] = [1, "1"];
const coordinates: [number, number] = [10, 10];

//Any
let test: any = 123
test = "123"

//Unknown
let test2: unknown = ''

//void

function func (arg:string): void {}