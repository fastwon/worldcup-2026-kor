// 검색으로 찾은 일부 선수 사진을 nameEn 기준으로 직접 채운다.
import { readFile, writeFile } from 'node:fs/promises'

const MAP = {
  'Johan Vásquez': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Johan_V%C3%A1squez.png/330px-Johan_V%C3%A1squez.png',
  'Marquinhos': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/FC_Salzburg_gegen_Paris_Saint-Germain_UEFA_Champions_League_49_%28cropped%29.jpg/330px-FC_Salzburg_gegen_Paris_Saint-Germain_UEFA_Champions_League_49_%28cropped%29.jpg',
  'Andy Robertson': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Andy_Robertson_Scotland_v_Bolivia_6_June_2026-43.jpg/330px-Andy_Robertson_Scotland_v_Bolivia_6_June_2026-43.jpg',
  'Chris Wood': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Chris_Wood_%28cropped%29.jpg/330px-Chris_Wood_%28cropped%29.jpg',
  'Gustavo Gómez': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Gustavo-Gomez-Palmeiras-Athletico-jul-2022-2.jpg/330px-Gustavo-Gomez-Palmeiras-Athletico-jul-2022-2.jpg',
}

let n = 0
const players = JSON.parse(await readFile('src/data/players.json', 'utf8'))
for (const arr of Object.values(players.players))
  for (const p of arr) if (MAP[p.nameEn] && !p.photo) { p.photo = MAP[p.nameEn]; n++; console.log('OK', p.name) }
await writeFile('src/data/players.json', JSON.stringify(players, null, 2) + '\n')

const captains = JSON.parse(await readFile('src/data/captains.json', 'utf8'))
for (const g of captains.groups)
  for (const t of g.teams) if (t.player && MAP[t.player.nameEn] && !t.player.photo) { t.player.photo = MAP[t.player.nameEn]; n++; console.log('OK', t.player.name) }
await writeFile('src/data/captains.json', JSON.stringify(captains, null, 2) + '\n')

console.log('patched', n)
