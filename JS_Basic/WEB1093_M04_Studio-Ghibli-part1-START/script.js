const mainElement = document.querySelector("main");
const navlinks = document.querySelectorAll("#mainnav ul li a");


let filmData;
let dataSet = "films";
let url = "https://ghibliapi.herokuapp.com/films";

async function getData(url) {
    const dataPromise = await fetch(url);
    const data = await dataPromise.json();
    mainElement.innerHTML = ""
    if (dataSet === "films") {
        setSort(data);
        addCard(data);      
        filmData = data;
        document.getElementById("sortorder").removeAttribute("style");
        document.getElementById("sortorder").removeAttribute("disabled");
    }
    else {
        document.getElementById("sortorder").style.display = "none";
        addCard(data);
    }
}

getData(url);
document.getElementById("sortorder").addEventListener("change", function () {
    mainElement.innerHTML = "";
    setSort(filmData);
    addCard(filmData);
});
navlinks.forEach(eachLink => {
    eachLink.addEventListener("click", event => {
        event.preventDefault();
        const clickedLink = event.target.getAttribute("href").substring(1);
        url = "https://ghibliapi.herokuapp.com/" + clickedLink;
        dataSet = clickedLink;
        getData(url);
    })
})

function setSort (films) {
    const sortOrder = document.getElementById("sortorder").value;
    switch(sortOrder){
        case "title":films.sort((a ,b) => (a.title > b.title) ? 1 : -1); break;
        case "release_date":films.sort((a ,b) => (a.release_date > b.release_date) ? 1 : -1); break;
        case "rt_score":films.sort((a ,b) => (parseInt(a.rt_score) > parseInt(b.rt_score)) ? -1 : 1); break;
    }
}

function addCard (datas) {
    datas.forEach(data => {
        createCard(data);
    });
}


async function createCard(data) {
    const card = document.createElement("article");
    switch (dataSet) {
        case "films": card.innerHTML = filmCardContents(data); break;
        case "people": card.innerHTML = await peopleCardContents(data); break;
        case "locations": card.innerHTML = await locationCardContents(data); break;
        case "species": card.innerHTML = await speciesCardContents(data); break;
        case "vehicles": card.innerHTML = await vehiclesCardContents(data); break;
    }
    
    mainElement.appendChild(card);
}

function filmCardContents(data) {
    let html = `<h2>${data.title}</h2>`;
    html += `<p><strong>Director:</strong> ${data.director}</p>`;
    html += `<p><strong>Released:</strong> ${data.release_date}</p>`;
    html += `<p>${data.description}</p>`;
    html += `<p><strong>Rotten Tomatoes Score::</strong> ${data.rt_score}</p>`;
    return html;
}

async function indivItem(url, item) {
    let theItem;
    try {
        const itemPromise = await fetch(url);
        const data = await itemPromise.json();
        theItem = data[item];
    } catch(err){
        theItem = "no data available";
    } finally {
        return theItem;
    }
}

async function peopleCardContents(data) {

    const thefilms = data.films;
    let filmtitles = [];
    for (film of thefilms) {
        const filmTitle = await indivItem(film, "title");
        filmtitles.push(filmTitle);
    }

    const species = await indivItem(data.species, "name");
    let html = `<h2>${data.name}</h2>`;
    html += `<p><strong>Details:</strong> gender ${data.gender}, age ${data.age}, eye color ${data.eye_color}, hair color ${data.hair_color}</p>`;
    html += `<p><strong>Films:</strong> ${filmtitles.join(", ")}</p>`;
    html += `<p><strong>Species:</strong> ${species}</p>`;
    return html;
}

async function locationCardContents(data) {
    const regex = 'https?:\/\/';
    const theResidents = data.residents;
    let residentNames = [];
    for (eachResident of theResidents) {
        if(eachResident.match(regex)){
            const resName = await indivItem(eachResident, 'name');
            residentNames.push(resName);
    } else {
        residentNames[0]='no data available';
    }}
    const thefilms = data.films;
    let filmtitles = [];
    for (eachFilm of thefilms) {
        const filmTitle = await indivItem(eachFilm, 'title');
        filmtitles.push(filmTitle);
    }
    let html = `<h2>${data.name}</h2>`;
    html += `<p><strong>Details:</strong> climate ${data.climate}, terrain ${data.terrain}, surface water
    ${data.surface_water}%</p>`;
    html += `<p><strong>Residents:</strong> ${residentNames.join(', ')}</p>`;
    html += `<p><strong>Films:</strong> ${filmtitles.join(', ')}</p>`;
    return html;
}

async function speciesCardContents(data) {

    const thefilms = data.films;
    let filmtitles = [];
    for (film of thefilms) {
        const filmTitle = await indivItem(film, "title");
        filmtitles.push(filmTitle);
    }

    const thepeople = data.people;
    let people = [];
    for (eachPerson of thepeople) {
        const person = await indivItem(eachPerson, "name");
        people.push(person);
    }

    let html = `<h2>${data.name}</h2>`;
    html += `<p><strong>Classification:</strong> ${data.classification}</p>`
    html += `<p><strong>Details:</strong> eye colors ${data.eye_colors}, hair colors ${data.hair_colors}</p>`;
    html += `<p><strong>Films:</strong> ${filmtitles.join(", ")}</p>`;
    html += `<p><strong>People:</strong> ${people}</p>`;
    return html;
}

async function vehiclesCardContents(data) {
    const filmTitle = await indivItem(data.films, "title");
    const pilot = await indivItem(data.pilot, "name");

    let html = `<h2>${data.name}</h2>`;
    html += `<p><strong>Description:</strong> ${data.description}</p>`
    html += `<p><strong>Details:</strong> vehicle class ${data.vehicle_class}, length ${data.length}</p>`;
    html += `<p><strong>Films:</strong> ${filmTitle}</p>`;
    html += `<p><strong>Pilot:</strong> ${pilot}</p>`;
    return html;
}