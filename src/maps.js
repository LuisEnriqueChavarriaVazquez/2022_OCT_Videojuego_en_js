/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
    'U': ' ',
    'O': '🚪',
    'X': '💣',
    'I': '🎁',
    'PLAYER': '👾',
    'BOMB_COLLISION': '🔥',
    'GAME_OVER': '👎',
    'WIN': '🏆',
};

const maps = [];
maps.push(`
    IXXXXXXXXX
    UXXXXXXXXX
    UXXXXXXXXX
    UXXXXXXXXX
    UXXXXXXXXX
    UXXXXXXXXX
    UXXXXXXXXX
    UXXXXXXXXX
    UXXXXXXXXX
    OXXXXXXXXX
  `);

maps.push(`
    OUUXXXXXXX
    XUUXXXXXXX
    XXUUUUXXXX
    XUUXXUXXXX
    XUXXXUUXXX
    XUXXXXUXXX
    XXUUXXUUXX
    XXUUXXXUXX
    XXXXUUUIXX
    XXXXXXXXXX
    `);

maps.push(`
    IUUUUUXXXX
    XXXXXUXXXX
    XXUUUUXXXX
    XXUXXXXXXX
    XXUUUUUXXX
    XXXXXXUXXX
    XXUUUUUXXX
    XXUXXXXXXX
    XXUUUUUOXX
    XXXXXXXXXX
  `);