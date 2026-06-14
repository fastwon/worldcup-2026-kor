// 선수 등번호를 2026 월드컵 국대 등번호로 갱신한다(nameEn 기준).
// 확인된 번호만 채워서 누적 적용. node scripts/patch-numbers.mjs
import { readFile, writeFile } from 'node:fs/promises'

// nameEn -> 2026 월드컵 등번호 (검증된 것만 기입)
const NUM = {
  // 대한민국 (문화일보/위키 확인)
  'Son Heung-min': 7,
  'Kim Min-jae': 4,
  'Lee Kang-in': 19,
  'Hwang Hee-chan': 11,
  'Jens Castrop': 23,
  'Oh Hyun-gyu': 18,
}

let n = 0
const apply = (p) => {
  if (NUM[p.nameEn] != null && p.number !== NUM[p.nameEn]) {
    console.log(`${p.name}: ${p.number} -> ${NUM[p.nameEn]}`)
    p.number = NUM[p.nameEn]
    n++
  }
}

const players = JSON.parse(await readFile('src/data/players.json', 'utf8'))
for (const arr of Object.values(players.players)) arr.forEach(apply)
await writeFile('src/data/players.json', JSON.stringify(players, null, 2) + '\n')

const captains = JSON.parse(await readFile('src/data/captains.json', 'utf8'))
for (const g of captains.groups) for (const t of g.teams) if (t.player) apply(t.player)
await writeFile('src/data/captains.json', JSON.stringify(captains, null, 2) + '\n')

console.log('changed', n)
