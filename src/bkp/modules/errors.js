class InvalidUrl extends Error {
    constructor(msg) {
        super(msg);
        this.name = "InvalidUrl";  // Set the error name
    }
}

class InvalidResponse extends Error {
    constructor(msg) {
        super(msg);
        this.name = "InvalidResponse";  // Set the error name
    }
}