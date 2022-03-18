const input = document.querySelector('#input');
const btnSubmit = document.querySelector('#submit');

const pokemon = {
    name: '',
    img: '',
    type: '',
    stats: '',
    moves: ''
}

const dataContainer = document.querySelector('.data');
const pokemonImage = document.querySelector('#pokemon');

const errorContainer = document.querySelector('.blackFrame');
const msg = document.querySelector('.msj');
const btnOk = document.querySelector('.btn');


btnSubmit.addEventListener('click', validar);
btnOk.addEventListener('click', hides);

function validar(evt) {
    evt.preventDefault();

    value = input.value;

    if (value.length === 0) {
        shows('Input not allowed.');

    } else {
        value = value.trim();
        value = value.toLowerCase();
        if (justLetters(value)) {
            searchPokemon(value);
        } else if (justNumbers(value)) {
            value = parseInt(value);

            if (value > 0 && value < 899) {
                searchPokemon(value);
            } else {
                shows('It only exists 898 Pokemons.');
            }

        } else {
            shows('Input not allowed.');
        }
    }
}

function justLetters(input) {
    let counter = 0;

    for (let i = 0; i < input.length; i++) {
        if (input.charCodeAt(i) > 96 && input.charCodeAt(i) < 123) {
            counter++;
        }
    }
    if (counter < input.length) {
        return false;
    } else {
        return true;
    }
}

function justNumbers(input) {
    let counter = 0;
    for (let i = 0; i < input.length; i++) {
        if (input.charCodeAt(i) > 47 && input.charCodeAt(i) < 58) {
            counter++;
        }
    }
    if (counter < input.length) {
        return false;
    } else {
        return true;
    }
}

function searchPokemon(input) {

    let url = 'https://pokeapi.co/api/v2/pokemon/' + input;

    fetch(url).then((res) => {
        if (!res.ok) {
            shows("Not matches found. Verify your input.");
            const err = new Error("Not 2xx response");
            err.response = response;
            throw err;
        } else {
            return res.json();
        }

    }).then((data) => {
        pokemon.name = data.name
        pokemon.img = data.sprites.front_default;
        pokemon.type = extractTypes(data.types);
        pokemon.moves = extractMoves(data.moves);
        pokemon.stats = extractStats(data.stats);

        generateHTML();
    });
}

function extractTypes(types) {
    let array = [];
    for (let i = 0; i < types.length; i++) {
        array[i] = types[i].type.name;
    }
    return array;
}

function extractMoves(moves) {
    let array = [];
    for (let i = 0; i < moves.length; i++) {
        array[i] = moves[i].move.name;
    }
    return array;
}

function extractStats(stats) {
    let array = [];
    for (let i = 0; i < stats.length; i++) {
        array[i] = `${stats[i].stat.name}: ${stats[i].base_stat}`;
    }
    return array;
}


function generateHTML() {
    cleanHTML();
    const name = document.createElement('p');
    const nameSpan = document.createElement('span');
    const type = document.createElement('p');
    const typeSpan = document.createElement('span');
    const stats = document.createElement('p');
    const moves = document.createElement('p');

    pokemonImage.src = pokemon.img;

    name.classList.add('title');
    nameSpan.innerHTML = pokemon.name;
    name.textContent = 'Name: ';
    name.appendChild(nameSpan);
    dataContainer.appendChild(name);

    type.classList.add('title');
    typeSpan.innerHTML = pokemon.type;
    type.textContent = 'Type: ';
    type.appendChild(typeSpan);
    dataContainer.appendChild(type);

    stats.classList.add('title');
    stats.textContent = 'Stats: ';
    dataContainer.appendChild(stats);

    pokemon.stats.forEach(stat => {
        let paragraph = document.createElement('p');
        paragraph.textContent = '- ' + stat;
        dataContainer.appendChild(paragraph);
    });

    moves.classList.add('title');
    moves.textContent = 'Moves: ';
    dataContainer.appendChild(moves);

    pokemon.moves.forEach(move => {
        let paragraph = document.createElement('p');
        paragraph.textContent = '- ' + move;
        dataContainer.appendChild(paragraph);
    });
}

function cleanHTML() {
    while (dataContainer.firstChild) {
        dataContainer.removeChild(dataContainer.firstChild);
    }
}

function hides() {
    errorContainer.classList.add('hide');
}

function shows(message) {
    errorContainer.classList.remove('hide');
    msg.textContent = message;
}