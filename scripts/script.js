// This only succeeds half the time!
let dogsPromise = getDogs();

dogsPromise
    .then((result) => {
        removeLoadingEl();
        populateDogsList(result.dogs);

        // get a random dog to show in selected dog!
        // utiliize the generateRandomNumber function!
        const selectedDogIndex = generateRandomNumber(0, result.dogs.length);

        // Returning a promise allows us to promise chain!
        return getDogByName(result.dogs[selectedDogIndex])    
    })
    .then(result => {
        populateSelectedDogEl(result);
    })
    .catch(() => {
        removeLoadingEl();
        showErrorMessage();
    })

function showErrorMessage() {
    const dogsEl = document.querySelector(".dogs");

    const errorEl = document.createElement("p");
    errorEl.classList.add("dogs__error-message");
    errorEl.innerText = "There are no dogs here. Try refreshing!";

    dogsEl.prepend(errorEl);
}

function removeLoadingEl() {
    const dogsEl = document.querySelector(".dogs");
    const loadingEl = document.querySelector(".dogs__loading-message");
    dogsEl.removeChild(loadingEl);
}

function populateDogsList(dogsArray) {
    const dogsListEl = document.querySelector(".dogs__list")

    dogsArray.forEach(dog => {
        const dogEl = document.createElement("li");
        dogEl.innerText = dog;

        dogEl.addEventListener("click", () => { 
            
            emptySelectedDogEl();
            
            // Get the information for this specific dog
            getDogByName(dog)
                .then(result => {        
                    populateSelectedDogEl(result)
                });
        })

        dogsListEl.appendChild(dogEl);
    })
}

function emptySelectedDogEl() {
    const selectedDogEl = document.querySelector(".selected-dog");
    selectedDogEl.innerHTML = "";
}

function populateSelectedDogEl(dogObject) {
    const selectedDogEl = document.querySelector(".selected-dog");
    
    const nameEl = document.createElement("h2");
    nameEl.innerText = dogObject.name;
    
    const breedEl = document.createElement("div");
    breedEl.innerText = "Breed: " + dogObject.breed;
    
    const ageEl = document.createElement("div");
    ageEl.innerText = "Age: " + dogObject.age;
    
    selectedDogEl.appendChild(nameEl);
    selectedDogEl.appendChild(breedEl);
    selectedDogEl.appendChild(ageEl);
}