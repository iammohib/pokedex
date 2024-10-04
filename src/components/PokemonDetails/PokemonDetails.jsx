import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { PokemonDetailsCard } from "../index";

function PokemonDetails() {
    // Access URL parameters
    const { id } = useParams();
    const [pokemonDataDetails, setPokemonDataDetails] = useState({})
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    const getData = async () => {
        const response = await axios.get(url)
        console.log(response.data)

        const pokemonData = {
            id: id,
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            cries: response.data.cries ? response.data.cries.latest : "null",
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name)
        }

        setPokemonDataDetails(pokemonData)
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <PokemonDetailsCard
                id={id}
                name={pokemonDataDetails.name}
                image={pokemonDataDetails.image}
                types={pokemonDataDetails.types}
                cries={pokemonDataDetails.cries}
                weight={pokemonDataDetails.weight}
                height={pokemonDataDetails.height}
            />
        </div>
    )
}

export default PokemonDetails
