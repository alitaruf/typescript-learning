function greetUser(name: string, age?: number): string {
    if (age !== undefined) {
        return `Hello ${name}, you are ${age} years old.`;
    }

    return `Hello ${name}.`;
}

console.log(greetUser("Taruf"));
console.log(greetUser("Taruf", 40));