////////////////control flow analysis
function example() {
  let x: string | number | boolean;

  x = Math.random() < 0.5;

  console.log(x);
  // x: boolean

  if (Math.random() < 0.5) {
    x = "hello";
    console.log(x);
    // x: string
  } else {
    x = 100;
    console.log(x);
    // x: number
  }

  return x;
  // x: string | number
}

example();
