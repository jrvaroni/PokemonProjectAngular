import { Component, OnInit } from '@angular/core';
import { PokemonServices } from './pokemon.service';
import { IPokemon } from '../../interfaces/Pokemon/Pokemon';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pokemons: IPokemon[] = [];

  constructor(private _pokemonServices: PokemonServices) { }

  ngOnInit(): void {
    this.getAllPokemons();
  }

  getAllPokemons() {
    this._pokemonServices.getAllPokemons().subscribe(pokemons => {
      pokemons.results.forEach(async (pokemon) => {
        this.fetchPokemon(pokemon)
      })
    });
  }

  fetchPokemon(pokemon) {
    this._pokemonServices.getPokemon(pokemon.url).subscribe((pokemon: any) => {
      this.pokemons.push(pokemon)
      this.pokemons.sort((a, b) => a.id - b.id)
    })
  }

  getImage(id) {
    return `https://pokeres.bastionbot.org/images/pokemon/${id}.png`
  }
}
