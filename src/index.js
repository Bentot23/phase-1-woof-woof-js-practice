const baseUrl = "http://localhost:3000/pups"


// DOM Selectors
const bar = document.querySelector('#dog-bar')
const details = document.querySelector('#dog-info')
const filterBtn = document.querySelector('#good-dog-filter')

// register listeners
filterBtn.addEventListener('click', toggleFilter)


//Fetches
function getAllDogs() {
    return fetch(baseUrl)
    .then(resp => resp.json())
    // .then(renderAllInBar)
}

function getOneDog(id) {
    return fetch(baseUrl + `/${id}`)
    .then(resp => resp.json())
}

//Rendering
function renderAllInBar(dogsArr, filter = false) {
    bar.innerHTML = ''
    if(filter) {
        dogsArr.filter(dogObj => dogObj.isGoodDog).forEach(addOneDogToBar)
     } else {
        dogsArr.forEach(addOneDogToBar)
     }
    }

function addOneDogToBar(dogObj) {
    const dogSpan = document.createElement('span')
    // console.log(dogSpan)
    dogSpan.innerText = dogObj.name
    dogSpan.dataset.id = dogObj.id
    dogSpan.addEventListener('click', handleSpanClick)
    bar.append(dogSpan)
}

function showOneDog(dogObj) {
    // console.log(dogObj)
    details.innerHTML = ''
    const dogDiv = document.createElement('div')
    dogDiv.innerHTML = `
        <img src=${dogObj.image}>
        <h2>${dogObj.name}</h2>`
    const dogBtn = document.createElement('button')
    dogBtn.textContent = ((dogObj.isGoodDog) ? 'Good Dog' : 'Bad Dog')
    dogBtn.addEventListener('click', () => toggleDogButton(dogBtn))
    details.append(dogDiv, dogBtn)
}

//Event handlers
function handleSpanClick(e) {
    const id = e.target.dataset.id
    getOneDog(id).then(showOneDog)
}

function toggleDogButton(dogButton) {
    // dogButton.textContent = dogButton.textContent.includes('Good') ? 'Bad Dog' : 'Good Dog'
    if(dogButton.textContent.includes('Good')) {
        dogButton.textContent = 'Bad Dog'
    } else {
        dogButton.textContent = 'Good Dog'
    }
}

function toggleFilter() {
    if(filterBtn.textContent.includes('OFF')) {
        filterBtn.textContent = 'Filter good dogs: ON'
        getAllDogs().then(dogArr => renderAllInBar(dogArr, true))
    } else {
        filterBtn.textContent = 'Filter good dogs: OFF'
        getAllDogs().then(renderAllInBar)
    }
}
//Initialize
getAllDogs().then(renderAllInBar)