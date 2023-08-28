import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    // Borrar datos existentes
    await this.pokemonModel.deleteMany({});

    // Obtener datos de la API
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    // 1 - Hacer una insercion cada vez, si hay 600 hace 600 inserciones 
  
    // data.results.forEach(async ({name, url}) => {
    //   const segments = url.split('/');
    //   const no = +segments[segments.length - 2];

    //   const pokemon = await this.pokemonModel.create({ name, no });
    // });

    // 2 - Inserciones de forma simultanea mediante array de promesas

    // const insertPromisesArray = [];

    // data.results.forEach(async ({name, url}) => {
    //   const segments = url.split('/');
    //   const no = +segments[segments.length - 2];

    //   insertPromisesArray.push(
    //     this.pokemonModel.create({ name, no }),
    //   );
    // });

    // await Promise.all(insertPromisesArray);

    // 3 - Mediante array de pokemon con insertMany

    const pokemonToInsert: {name: string, no: number}[] = [];

    data.results.forEach(({name, url}) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      pokemonToInsert.push({ name, no });
    });

    this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed!';
  }
}
