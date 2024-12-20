import Type from "./typeModels"

interface Pokemon{
    id: number,
    identifier: string,
    species_id: number,
    height: number,
    weight: number,
    base_experience: number,
    order: number,
    is_default: number,
    types: Type[];
    moves: Move[];
    eggGroups: EggGroup[];
}


interface Move {
    id: number;
    identifier: string; 
    power: number; 
    accuracy: number
}

interface EggGroup {
    id: number; 
    identifier: string; 
}

export default Pokemon;