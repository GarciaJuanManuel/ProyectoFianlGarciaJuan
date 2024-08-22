const pokemonsNumbers = 100;

let pokemones = [];
let pokemonesAtrapados = JSON.parse(localStorage.getItem("pokemonesAtrapados")) || [];


const fetchPokemones = async () => {
    for (let i = 1; i <= pokemonsNumbers; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    pokemones.push(pokemon);
    renderPokemones(pokemones);
}


const renderPokemones = (pokemones) => {
    const pokeContainer = document.getElementById('poke-container');
    pokeContainer.innerHTML = ''; 

    pokemones.forEach(pokemon => {
        const { name, types, id, sprites } = pokemon;
        const tipo = tipoPokemonEspañol[types[0].type.name] || types[0].type.name;
        const nombreCapitalizado = capitalizarPrimeraLetra(name);

        const pokemonEl = document.createElement('div');
        pokemonEl.classList.add('pokemones', 'pokemonHover');
        pokemonEl.innerHTML = `
            <div class='img-container'>
                <img src='${sprites.front_default}'/>
            </div>
            <div class='info'>
                <span class='id'>${id}</span>
                <h3 class='nombre'>${nombreCapitalizado}</h3>
                <div>
                    <button class="btn-atrapar" onclick="atraparPokemon(${id})">
                        <p>Atrapar pokemon</p>
                    </button>
                </div>
                <h4 class='type'>${tipo}</h4>
            </div>
        `;
        pokeContainer.appendChild(pokemonEl);
    });
}

fetchPokemones();


const atraparPokemon = (id) => {
    let pokemon = pokemones.find((elemento) => elemento.id === id);
    
    
    if (!pokemon) {
        console.error(`Pokemon with id ${id} not found`);
        return;
    }
    
    let pokemonAtrapado = pokemonesAtrapados.find((elemento) => elemento.id === id);
    if (pokemonAtrapado) {
        pokemonAtrapado.quantity += 1;
        Swal.fire({
            title: "¡Este pokemon lo vuelves a atrapar!",
            icon: "success",
            position: "center",
            confirmButtonText: "Aceptar",
            timer: 5000,
        });
    } else {
        pokemonesAtrapados.push({ ...pokemon, quantity: 1 });
        Swal.fire({
            title: "¡Atrapaste un pokemon nuevo!",
            icon: "success",
            position: "center",
            confirmButtonText: "Aceptar",
            timer: 5000,
        });
    }
    localStorage.setItem("pokemonesAtrapados", JSON.stringify(pokemonesAtrapados));
    console.log(pokemonesAtrapados);
}

const inputSearch = document.getElementById("search");
if (inputSearch) {
    inputSearch.addEventListener("input", (evento) => {
        let value = evento.target.value.toLowerCase();
        let arrayFiltrado = pokemones.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(value)
        );
        renderPokemones(arrayFiltrado);
    });
}


const tipoPokemonEspañol = {
    bug: "Bicho",
    dragon: "Dragón",
    electric: "Eléctrico",
    fairy: "Hada",
    fighting: "Lucha",
    fire: "Fuego",
    flying: "Volador",
    ghost: "Fantasma",
    grass: "Planta",
    ground: "Tierra",
    ice: "Hielo",
    normal: "Normal",
    poison: "Veneno",
    psychic: "Psíquico",
    rock: "Roca",
    steel: "Acero",
    water: "Agua"
};

const capitalizarPrimeraLetra = (texto) => {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};