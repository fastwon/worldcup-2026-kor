// 위키 원문에서 각 국가대표팀의 '주장(other=captain)'과 등번호를 추출해
// captains.json의 주장 데이터와 비교한다. node scripts/check-captains.mjs
import { readFile } from 'node:fs/promises'

const url = 'https://en.wikipedia.org/w/index.php?title=2026_FIFA_World_Cup_squads&action=raw'
const wt = await (await fetch(url, { headers: { 'User-Agent': 'wc/1.0' } })).text()

let team = null
const captainOf = {}
const inSquad = {}
for (const l of wt.split('\n')) {
  const h = l.match(/^=+\s*([^=]+?)\s*=+\s*$/)
  if (h) { team = h[1].trim(); continue }
  if (team && /\{\{nat fs.*player/.test(l)) {
    const nm = l.match(/\|name=\[\[([^\]]+)\]\]/)
    if (!nm) continue
    const name = nm[1].includes('|') ? nm[1].split('|').pop() : nm[1]
    const no = (l.match(/\|no=(\d+)/) || [])[1] || '?'
    ;(inSquad[team] = inSquad[team] || []).push(name)
    if (/other=\[\[Captain/.test(l)) captainOf[team] = `${name} (#${no})`
  }
}

// 데이터의 영문국가명 매핑
const ENG = {
  mex: 'Mexico', rsa: 'South Africa', cze: 'Czech Republic',
  can: 'Canada', sui: 'Switzerland', qat: 'Qatar', bih: 'Bosnia and Herzegovina',
  bra: 'Brazil', mar: 'Morocco', sco: 'Scotland', hai: 'Haiti',
  usa: 'United States', tur: 'Turkey', par: 'Paraguay', aus: 'Australia',
  ger: 'Germany', civ: 'Ivory Coast', ecu: 'Ecuador', cuw: 'Curaçao',
  ned: 'Netherlands', jpn: 'Japan', swe: 'Sweden', tun: 'Tunisia',
  bel: 'Belgium', egy: 'Egypt', irn: 'Iran', nzl: 'New Zealand',
  esp: 'Spain', uru: 'Uruguay', ksa: 'Saudi Arabia', cpv: 'Cape Verde',
  fra: 'France', sen: 'Senegal', nor: 'Norway', irq: 'Iraq',
  arg: 'Argentina', alg: 'Algeria', aut: 'Austria', jor: 'Jordan',
  por: 'Portugal', col: 'Colombia', cod: 'DR Congo', uzb: 'Uzbekistan',
  eng: 'England', cro: 'Croatia', gha: 'Ghana', pan: 'Panama',
}
// 위키 헤더 이름이 다를 수 있는 경우 보정
const ALIAS = { 'United States': ['United States'], 'Ivory Coast': ['Ivory Coast', "Côte d'Ivoire"], 'DR Congo': ['DR Congo'], 'Turkey': ['Turkey', 'Türkiye'] }

const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '')

const captains = JSON.parse(await readFile('src/data/captains.json', 'utf8'))
const mine = {}
for (const g of captains.groups) for (const t of g.teams) if (t.player) mine[t.code] = `${t.player.nameEn} (#${t.player.number}) ${t.player.captain ? 'C' : ''}`

console.log('코드 | 내 데이터 주장 | 위키 실제 주장')
for (const [code, eng] of Object.entries(ENG)) {
  const names = ALIAS[eng] || [eng]
  let wiki = null
  for (const n of names) if (captainOf[n]) { wiki = captainOf[n]; break }
  // squad presence check for my captain
  console.log(`${code.padEnd(4)}| ${(mine[code] || '-').padEnd(34)}| ${wiki || '(주장표시 못찾음)'}`)
}
