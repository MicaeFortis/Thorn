export interface Enemy {
    id?: number,
    name: string,
    strength: number,
    agility: number,
    intelligence: number,
    enemyType: string,
    hitPoints: number,
    dead: boolean,
};

export function getEmptyEnemy(): Enemy {
    return {
      name: '',
      strength: 0,
      agility: 0,
      intelligence: 0,
      enemyType: '',
      hitPoints: 0,
      dead: false,
    }
}