const pokemonesAtrapados = JSON.parse(localStorage.getItem("pokemonesAtrapados")) || [];

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

const renderPokemonesAtrapados = (pokemones) => {
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
                <h4 class='type'>${tipo}</h4>
                <p>Atrapados: ${pokemon.quantity}</p>
                <button class="btn-liberar btn-liberar-uno" onclick="liberarPokemon(${id})">Liberar uno</button>
                <button class="btn-liberar btn-liberar-todos" onclick="liberarTodos(${id})">Liberar todos</button>
            </div>
        `;
        pokeContainer.appendChild(pokemonEl);
    });
};

renderPokemonesAtrapados(pokemonesAtrapados);

const liberarPokemon = (id) => {
    const pokemonIndex = pokemonesAtrapados.findIndex(pokemon => pokemon.id === id);
    
    if (pokemonIndex !== -1) {
        const pokemon = pokemonesAtrapados[pokemonIndex];
        
        if (pokemon.quantity > 1) {
            pokemon.quantity -= 1;
            Swal.fire({
                title: "Has liberado un Pokemon",
                icon: "success",
                confirmButtonText: "Aceptar",
                timer: 3000,
            });
        } else {
            Swal.fire({
                title: "Desea liberar su último Pokemon?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí",
                cancelButtonText: "No",
            }).then((result) => {
                if (result.isConfirmed) {
                    pokemonesAtrapados.splice(pokemonIndex, 1);
                    Swal.fire({
                        title: "Último Pokemon liberado",
                        icon: "success",
                        confirmButtonText: "Aceptar",
                        timer: 3000,
                    });
                    renderPokemonesAtrapados(pokemonesAtrapados);
                }
            });
        }
        localStorage.setItem("pokemonesAtrapados", JSON.stringify(pokemonesAtrapados));
        renderPokemonesAtrapados(pokemonesAtrapados);
    }
};

const liberarTodos = (id) => {
    const pokemonIndex = pokemonesAtrapados.findIndex(pokemon => pokemon.id === id);
    
    if (pokemonIndex !== -1) {
        Swal.fire({
            title: "Desea liberar todos los Pokemones?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                pokemonesAtrapados.splice(pokemonIndex, 1);
                Swal.fire({
                    title: "Todos los Pokemones fueron liberados",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    timer: 3000,
                });
                localStorage.setItem("pokemonesAtrapados", JSON.stringify(pokemonesAtrapados));
                renderPokemonesAtrapados(pokemonesAtrapados);
            }
        });
    }
};