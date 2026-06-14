// 위키백과 '2026 FIFA World Cup squads' 원문에서 A매치 caps/goals를 파싱해
// 전 선수/주장의 수치를 공식값으로 갱신한다. node scripts/parse-stats.mjs
import { readFile, writeFile } from 'node:fs/promises'

const norm = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '')

const url = 'https://en.wikipedia.org/w/index.php?title=2026_FIFA_World_Cup_squads&action=raw'
const wt = await (await fetch(url, { headers: { 'User-Agent': 'wc/1.0' } })).text()

// 한 줄에 한 선수 템플릿. 중첩 중괄호(age) 때문에 줄 단위로 개별 필드만 추출.
const map = new Map()
for (const line of wt.split('\n')) {
  if (!/\{\{nat fs.*player/.test(line)) continue
  const nm = line.match(/\|name=\[\[([^\]]+)\]\]/)
  const cp = line.match(/\|caps=(\d+)/)
  const gl = line.match(/\|goals=(\d+)/)
  if (!nm || !cp) continue
  let name = nm[1]
  if (name.includes('|')) name = name.split('|').pop()
  const key = norm(name)
  if (!map.has(key)) map.set(key, { caps: +cp[1], goals: gl ? +gl[1] : 0 })
}
console.log('parsed:', map.size)

let changed = 0
const miss = []
const apply = (p) => {
  const v = map.get(norm(p.nameEn))
  if (!v) { miss.push(p.name); return }
  if (p.caps !== v.caps || p.goals !== v.goals) {
    console.log(`${p.name}: caps ${p.caps}->${v.caps}, goals ${p.goals}->${v.goals}`)
    p.caps = v.caps; p.goals = v.goals; changed++
  }
}

const players = JSON.parse(await readFile('src/data/players.json', 'utf8'))
for (const arr of Object.values(players.players)) arr.forEach(apply)
await writeFile('src/data/players.json', JSON.stringify(players, null, 2) + '\n')

const captains = JSON.parse(await readFile('src/data/captains.json', 'utf8'))
for (const g of captains.groups) for (const t of g.teams) if (t.player) apply(t.player)
await writeFile('src/data/captains.json', JSON.stringify(captains, null, 2) + '\n')

console.log('\nchanged', changed)
console.log('매칭 실패:', miss.join(', ') || '없음')
