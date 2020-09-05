class Counter {
    constructor(functionName) {
        this.counter = 0;
        this.callback = functionName;
    }
    increase() {
        this.counter++;
        console.log(this.counter);

        if (this.counter % 5 === 0) {
            this.callback(this.counter);
        }
    }
}
function print(num) {
    console.log(`hi ${num}`);
}
function alertNum(num) {
    alert(`hi ${num}`);
}
function printSomthing() {
    console.log('hihi hellohello')
}
const a = new Counter(printSomthing);
a.increase();
a.increase();
a.increase();
a.increase();
a.increase();
