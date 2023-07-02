// 1.

function getFirstWord(a: string): number {
  return a.split(/ +/)[0].length;
}

// 2.
type obj = { [key: string]: string };
function getUserNamings(a: obj): obj {
  return {
    fullname: a.name + " " + a.surname,
    initials: a.name[0] + "." + a.surname[0],
  };
}

// 3.
type arrObj = { [key: string]: { [key: string]: string }[] };
// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
function getAllProductNames(a: arrObj): string[] {
  return a?.products?.map((prod) => prod?.name) || [];
}

// 4.1

// easy way is using 'as' keyword
// hard way is ?...

function hey1(a: any): string {
  return "hey! i'm " + a.name();
}
hey1({ name: () => "roma", cuteness: 100 } as {
  name: () => string;
  cuteness: number;
});
hey1({ name: () => "vasya", coolness: 100 } as {
  name: () => string;
  coolness: number;
});

// 4.2
function hey2(abstractPet: { name: () => string }): string {
  return "hey! i'm " + abstractPet.name();
}

interface Pet {
  petName: string;
  isFemale?: boolean;
  number?: number;
  name: () => string;
}

class Cat implements Pet {
  petName: string;
  isFemale: boolean;
  constructor(petName: string, isFemale: boolean) {
    this.petName = petName;
    this.isFemale = isFemale;
  }
  name(): string {
    return this.petName;
  }
}
class Dog implements Pet{
  petName: string;
  number: number
  constructor(petName: string, number:number) {
    this.petName = petName;
    this.number = number
  }
  name(): string {
    return this.petName;
  }
}
let a = new Cat("myavchik", true);
let b = new Dog("gavchik", 333);
hey2(a);
hey2(b);

// 4.3
type forHey3 = {
    name: () => string,
    type: string,
    cuteness?: number,
    coolness?:number
}

function hey3(a: forHey3):string {
  return (
    "hey! i'm " +
    a.name() +
    (a.type === "cat" ? "cuteness: " + a.cuteness : "coolness: " + a.coolness)
  );
}
hey3({ name: () => "roma", type: "cat", cuteness: 100 });
hey3({ name: () => "vasya", type: "dog", coolness: 100 });

// 5.

// google for Record type
function stringEntries(a: Record<string, any>) {
  return Array.isArray(a) ? a : Object.keys(a);
}

// 6.

// you don't know Promises and async/await yet. Or do you?
// ....can be hard, don't worry and SKIP if you do not know how to do it

// async function world(a) {
//   return "*".repeat(a);
// }
// const hello = async () => {
//   return await world(10);
// };
// hello()
//   .then((r) => console.log(r))
//   .catch((e) => console.log("fail"));
