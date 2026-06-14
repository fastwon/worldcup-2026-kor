// 위키백과 '2026 FIFA World Cup squads' 원문(wikitext)에서 등번호를 파싱해
// 대한민국을 제외한 전 선수/주장 등번호를 갱신한다. node scripts/parse-numbers.mjs
import { readFile, writeFile } from 'node:fs/promises'

const norm = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '')

const url = 'https://en.wikipedia.org/w/index.php?title=2026_FIFA_World_Cup_squads&action=raw'
const wt = await (await fetch(url, { headers: { 'User-Agent': 'wc/1.0' } })).text()

// {{nat fs ... player|no=NN|...|name=[[Target|Display]]|...}} 파싱
const map = new Map()
const re = /\{\{nat fs[^}]*?\|no=(\d+)[^}]*?\|name=\[\[([^\]]+)\]\]/g
let m
while ((m = re.exec(wt))) {
  const no = parseInt(m[1], 10)
  let name = m[2]
  if (name.includes('|')) name = name.split('|').pop()
  const key = norm(name)
  if (!map.has(key)) map.set(key, no)
}
console.log('parsed players:', map.size)

let changed = 0
const miss = []
const setNum = (p) => {
  const k = norm(p.nameEn)
  if (map.has(k)) {
    const no = map.get(k)
    if (p.number !== no) { console.log(`${p.name}: ${p.number} -> ${no}`); p.number = no; changed++ }
  } else {
    miss.push(p.name)
  }
}

const players = JSON.parse(await readFile('src/data/players.json', 'utf8'))
for (const [code, arr] of Object.entries(players.players)) {
  if (code === 'kor') continue // 대한민국은 이미 수동 검증 적용
  arr.forEach(setNum)
}
await writeFile('src/data/players.json', JSON.stringify(players, null, 2) + '\n')

const captains = JSON.parse(await readFile('src/data/captains.json', 'utf8'))
for (const g of captains.groups) for (const t of g.teams) if (t.player) setNum(t.player)
await writeFile('src/data/captains.json', JSON.stringify(captains, null, 2) + '\n')

console.log('\nchanged', changed)
console.log('매칭 실패(수동 확인 필요):', miss.join(', ') || '없음')
