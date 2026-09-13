interface User {
  id: number;
  name: string;
  isActive: boolean;
}

function printUser(user: User): void {
  console.log(`ID: ${user.id}`);
  console.log(`Name: ${user.name}`);
  console.log(`Active: ${user.isActive}`);
}

const user: User = {
  id: 101,
  name: "Ali",
  isActive: true
};

printUser(user);