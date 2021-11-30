const pokedex = document.getElementById('pokedex');
/*Api Daten werden gefetched */
const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id,
            height: result.height,
            weight: result.weight,
            
            
        }));
        displayPokemon(pokemon);
    });
};
/*Hier werden Daten nochmal durch 10 dividiert weil api daten falsch bzw 10 mal zu hoch */
const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokemon) => `
        <li class="card">
      

        
            <img class="card-image" src="${pokemon.image}"/>
            <div class="card2">
            <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
           
            <p class="card-subtitle">Type: ${pokemon.type}</p>
            </div>
            <h2 class="card-back"> Height: ${pokemon.height / 10}m  </h2>
            <h2 class="card-back"> Weight: ${pokemon.weight / 10 }kg </h2>
            
        </li>
      
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
