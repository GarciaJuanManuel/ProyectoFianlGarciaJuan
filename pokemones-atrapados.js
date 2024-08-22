// Obtener los Pokémon atrapados del local storage
const pokemonesAtrapados = JSON.parse(localStorage.getItem("pokemonesAtrapados")) || [];

// Renderizar los Pokémon atrapados en la página
// const renderPokemonesAtrapados = (pokemones) => {
//     const pokeContainer = document.getElementById('poke-container');

//     pokeContainer.innerHTML = ""; 

//     pokemones.forEach(pokemon => {
//         const { name, types, id, sprites } = pokemon;
//         const type = types[0].type.name;

//         const pokemonEl = document.createElement('div');
//         pokemonEl.classList.add('pokemones');
//         pokemonEl.classList.add('pokemonHover');
        
//         const pokeInnerHtml = `
//             <div class='img-container'>
//                 <img src='${sprites.front_default}'/>
//             </div>
//             <div class='info'>
//                 <span class='id'>${id}</span>
//                 <h3 class='nombre'>${name}</h3>
//                 <h4 class='type'>${type}</h4>
//                 <p>Cantidad atrapada: ${pokemon.quantity}</p>
//             </div>
//         `;

//         pokemonEl.innerHTML = pokeInnerHtml;
//         pokeContainer.appendChild(pokemonEl);
//     });
// };
const renderPokemonesAtrapados = (pokemones) => {
    const pokeContainer = document.getElementById('poke-container');
    pokeContainer.innerHTML = ''; // Limpiar el contenedor

    pokemones.forEach(pokemon => {
        const { name, types, id, sprites } = pokemon;
        const type = types[0].type.name;
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
                <h4 class='type'>${type}</h4>
                <p>Atrapados: ${pokemon.quantity}</p>
            </div>
        `;
        pokeContainer.appendChild(pokemonEl);
    });
    console.log(pokemonesAtrapados)
}
// Ejecutar la función de renderizado
renderPokemonesAtrapados(pokemonesAtrapados);


// Obtener los Pokémon atrapados del local storage y renderizarlos
const loadPokemonesAtrapados = () => {
    const pokemonesAtrapados = JSON.parse(localStorage.getItem("pokemonesAtrapados")) || [];
    renderPokemonesAtrapados(pokemonesAtrapados);
}

// Espera a que el documento esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {
    loadPokemonesAtrapados();
});








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