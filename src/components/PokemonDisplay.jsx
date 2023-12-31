function PokemonDisplay({ pokemon, pokedex }) {
    let flavorTextNum = 0;
    {/* gen 1 to gen 4 is 0th index, gen 5 is 1st index, gen 6 is 6th index, gen 7 is 7th index legends arceus and gen 9 is 0th index */ }
    function decideFlavorTextNum() {
        if (pokedex.id >= 1 && pokedex.id <= 493 && pokedex.id !== 492) {
            flavorTextNum = 0
        }
        else if (pokedex.id >= 494 && pokedex.id <= 649 || pokedex.id === 492) {
            flavorTextNum = 1
        }
        else if (pokedex.id >= 650 && pokedex.id <= 720) {
            flavorTextNum = 6
        }
        else if (pokedex.id >= 721 && pokedex.id <= 898) {
            flavorTextNum = 7
        }
        else {
            flavorTextNum = 0
        }
    }

    let categoryNum = 0;
    // gen 1 to gen 8 is index 7, legends arceus is index 5, gen 9 is index 3 
    function decideCategoryNum() {
        if (pokedex.id >= 1 && pokedex.id <= 898) {
            categoryNum = 7
        }
        else if (pokedex.id >= 899 && pokedex.id <= 905) {
            categoryNum = 5
        } else {
            categoryNum = 3
        }
    }

    const loaded = () => {
        return (
            <>
                {/* initialize flavor text number */}
                {decideFlavorTextNum()}
                {/* initialize category number */}
                {decideCategoryNum()}


                {/* name of the pokemon */}
                <h1>{pokedex.name.charAt(0).toUpperCase() + pokedex.name.slice(1)}</h1>
                {/* official artwork of the pokemon */}
                <img src={pokemon.sprites.other['official-artwork']['front_default']} alt={`An official picture of ${pokemon.name}`} />
                {/* pokedex entry # */}
                <h2>Dex number: #{pokedex.id}</h2>
                {/* Pokemon types */}
                {pokemon.types.map((typeEle, index) => {
                    return (
                        <div key={index} className={typeEle.type.name}>{typeEle.type.name.charAt(0).toUpperCase() + typeEle.type.name.slice(1)}</div>
                    )
                })}
                {/* Display the pokedex entry here */}
                <h2>{pokedex.flavor_text_entries[flavorTextNum].flavor_text}</h2>
                <div id="info">
                    <p>Height: ~{Math.round(pokemon.height * 0.328084)} ft </p>
                    <p>Weight: ~{Math.round(pokemon.weight * 0.220462)} lb</p>

                    <p>Category: {pokedex.genera[categoryNum].genus}</p>
                    {/* Map over the abilities to display all abilities */}
                    {pokemon.abilities.map((abi, index) => {
                        return (
                            <p key={index}>Ability {index + 1}: {abi.ability.name.charAt(0).toUpperCase() + abi.ability.name.slice(1)}</p>
                        )
                    })}
                </div>

            </>
        )
    }

    const loading = () => {
        <h1>No pokemon to display yet</h1>
    }


    return pokemon ? loaded() : loading();
}

export default PokemonDisplay