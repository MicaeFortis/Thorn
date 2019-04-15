import { getEmptyPrefix, Prefix } from './Prefix';

export interface Item {
    id?: number,
    name: string,
      strengthRequired: number,
      agilityRequired: number,
      intelligenceRequired: number,
      damage: number,
      defense: number,
      evasion: number,
      wisdom: number,
      itemType: string,
      prefix: Prefix,
}

export function getEmptyItem(): Item {
    return {
        name: '',
        strengthRequired: 0,
        agilityRequired: 0,
        intelligenceRequired: 0,
        damage: 0,
        defense: 0,
        evasion: 0,
        wisdom: 0,
        itemType: '',
        prefix: getEmptyPrefix(),
      };
}