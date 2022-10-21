const dogs = {
    dogs: [
        "Dr. Puppers",
        "Spike",
        "Wishbone",
        "Lucy",
        "Lassie"
    ]
}

const detailedDogInfo = [
    {
        name: "Dr. Puppers",
        breed: "Golden Doodle",
        age: 0.3
    },
    {
        name: "Spike",
        breed: "Chihuahua",
        age: 7
    },
    {
        name: "Wishbone",
        breed: "Jack Russell Terrier",
        age: 5
    },
    {
        name: "Lucy",
        breed: "Labrador Retriever",
        age: 0.5
    },
    {
        name: "Lassie",
        position: "Rough Collie",
        age: 6
    },
];

/**
 * Generates a random number between a 
 * specified range
 * 
 * @param Number min
 * @param Number max 
 * @return Number Randomly generated number
 */
 function generateRandomNumber(min, max) {
    let range = max - min;

    return Math.round(Math.random() * range) + min;
}

/**
 * Randomly resolves or rejects half the time after 1 - 1.5 seconds
 * 
 * @returns Promise
 */
function asyncPromiseFunc() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            1 === generateRandomNumber(1, 2) ? 
                resolve("Successfully resolved promise") 
                : 
                reject({error:"The thing I promised you ran into an error!"});
        }, generateRandomNumber(1000, 1500));
    });
}


/**
 * 50% chance of resolving or rejecting. 
 * Calls getDogsResolved() or getDogsRejected()
 * 
 * @returns Promise contains dogs object
 */
function getDogs() {
    if (1 === generateRandomNumber(1, 2)) {
        return getDogsResolved();
    } else {
        return getDogsRejected();
    }
}

/**
 * Attempts to find dog information by a passed dog's name after 1 - 1.5 seconds
 * Promise resolves if the dog is found
 * Promise rejects if the dog is not found
 * 
 * @param string dogName 
 * @returns Promise
 */
function getDogByName(dogName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const foundDog = detailedDogInfo.find(dog => dog.name === dogName);
            (foundDog) ? resolve(foundDog) : reject({ error: "Unable to find dog with that name"});
        }, generateRandomNumber(1000, 1500));
    });
}

/**
 * Returns dog object randomly between 1 - 1.5 seconds
 * 
 * @returns Promise contains dogs object
 */
function getDogsResolved() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(dogs);
        }, generateRandomNumber(1000, 1500));
    });
}

/**
 * Returns an always-rejected promise (for testing purposes) after 1 - 1.5 seconds
 * 
 * @returns Promise 
 */
function getDogsRejected() {
    return new Promise((_resolve, reject) => {
        setTimeout(() => {
            reject({ error: "Unable to process request" });
        }, generateRandomNumber(1000, 1500));
    });
}
