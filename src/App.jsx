// Components
import { Button } from "./components/Button";
import { Card } from "./components/Card";
// Styles
import './sass/App.scss';
import { TiArrowBack } from "react-icons/ti";
import { TiArrowForward } from "react-icons/ti";
//Hooks
import { useState } from "react";
import { useEffect } from "react";

const App = () => {

     // State variables
    const [pokemonId, setPokemonId] = useState(1);
    const [pokemonEvolutions, setPokemonEvolutions] = useState([]);
    

    useEffect(()=> {
        getEvolutions(pokemonId);
    }, [pokemonId])


    //card functions 

    async function getEvolutions (id) {
       const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
       const data = await response.json();
       
       let pokemonEvolutionArray = [];

       let initialPokemon = data.chain.species.name
       let initialPokemonImg = await getPokemonImgs(initialPokemon)

       pokemonEvolutionArray.push([initialPokemon, initialPokemonImg])


       if (data.chain.evolves_to.length !== 0){
            let secondEvolvePokemon = data.chain.evolves_to[0].species.name;
            let midPokemonImg = await getPokemonImgs(secondEvolvePokemon);

            pokemonEvolutionArray.push([secondEvolvePokemon, midPokemonImg])

            if (data.chain.evolves_to[0].evolves_to.length !== 0) {
                let finalPokemonEvolution = data.chain.evolves_to[0].evolves_to[0].species.name;
                let finalPokemonImg = await getPokemonImgs(finalPokemonEvolution)

                pokemonEvolutionArray.push([finalPokemonEvolution, finalPokemonImg])
                
            }
       }
       setPokemonEvolutions(pokemonEvolutionArray)
    }

    async function getPokemonImgs(name){
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        const data = await response.json();
        return data.sprites.other['official-artwork'].front_default;
    } 

    //buttons functions

    function prevClick() {
            (pokemonId === 1) ? 
            setPokemonId(1) : 
            setPokemonId(pokemonId - 1)
        };
        
    function nextClick() {
        setPokemonId(pokemonId + 1);
    };


    return (
    <>
    <div className="app"> 
        <div className={`card-container card${pokemonEvolutions.length}`}>
            {pokemonEvolutions.map(pokemon => 
            <Card 
                  key={pokemon[0]}  
                  name={pokemon[0]} 
                  img={pokemon[1]}  
            /> 
            )}
            
        </div>
        <div className="buttons-container">
            <Button
                icon={<TiArrowBack />}
                handleClick={prevClick}
            />
           
            <Button
                icon= {<TiArrowForward />} 
                handleClick={nextClick}
            />
        </div>
        </div>
    </>
        )
}


export {App}