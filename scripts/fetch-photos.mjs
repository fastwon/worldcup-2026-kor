// 위키백과 REST summary API에서 선수 대표 사진(thumbnail)을 가져와
// players.json / captains.json 의 비어있는 photo 필드를 채운다.
// 사용: node scripts/fetch-photos.mjs
import { readFile, writeFile } from 'node:fs/promises'

// 동명이인/모호한 제목 보정
const overrides = {
  'Kim Min-jae': 'Kim Min-jae (footballer, born 1996)',
  'Ladislav Krejčí': 'Ladislav Krejčí (footballer, born 1999)',
  'Rodri': 'Rodri (footballer, born 1996)',
  'Marquinhos': 'Marquinhos (footballer, born 1994)',
  'Andy Robertson': 'Andy Robertson (footballer)',
  'Chris Wood': 'Chris Wood (footballer)',
  'Gustavo Gómez': 'Gustavo Gómez (footballer, born 1993)',
  'Jalal Hassan': 'Jalal Hassan (footballer)',
}

const HEADERS = { 'User-Agent': 'worldcup2026-kor/1.0 (cbkh9296@gmail.com)' }

async function getPhoto(nameEn) {
  const title = (overrides[nameEn] || nameEn).replace(/ /g, '_')
  const url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title)
  try {
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) return null
    const j = await res.json()
    if (j.type === 'disambiguation') return null
    return j.thumbnail?.source || j.originalimage?.source || null
  } catch {
    return null
  }
}

let filled = 0, skipped = 0
const log = (ok, name, url) => console.log(ok ? `OK  ${name}` : `--  ${name}`, ok ? url : '')

// players.json
const players = JSON.parse(await readFile('src/data/players.json', 'utf8'))
for (const arr of Object.values(players.players)) {
  for (const p of arr) {
    if (p.photo) continue
    const photo = await getPhoto(p.nameEn)
    if (photo) { p.photo = photo; filled++; log(true, p.name, photo) }
    else { skipped++; log(false, p.name) }
  }
}
await writeFile('src/data/players.json', JSON.stringify(players, null, 2) + '\n')

// captains.json
const captains = JSON.parse(await readFile('src/data/captains.json', 'utf8'))
for (const g of captains.groups) {
  for (const t of g.teams) {
    if (!t.player || t.player.photo) continue
    const photo = await getPhoto(t.player.nameEn)
    if (photo) { t.player.photo = photo; filled++; log(true, t.player.name, photo) }
    else { skipped++; log(false, t.player.name) }
  }
}
await writeFile('src/data/captains.json', JSON.stringify(captains, null, 2) + '\n')

console.log(`\n채움 ${filled}명 / 사진 없음 ${skipped}명`)
