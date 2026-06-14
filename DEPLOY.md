# 배포 가이드

빌드 산출물은 `npm run build` → `dist/` 폴더에 생성됩니다. (확인 완료)

아래 중 하나를 고르면 됩니다. **가장 쉬운 건 Vercel 또는 Netlify**입니다.

---

## 옵션 A. Vercel (추천, 가장 쉬움)
1. https://vercel.com 가입 (GitHub 계정 연동)
2. 이 프로젝트를 GitHub 저장소로 올린 뒤(아래 'GitHub 올리기' 참고), Vercel에서 "Import Project" → 저장소 선택
3. 프레임워크 자동 감지(Vite). 별도 설정 없이 **Deploy** 클릭
4. 끝. `https://<프로젝트>.vercel.app` 주소가 발급됩니다.

CLI로 바로 배포하려면(로그인은 대화창에 `! npx vercel login` 입력):
```
npx vercel --prod
```

---

## 옵션 B. Netlify
1. https://netlify.com 가입
2. "Add new site" → "Import an existing project" → GitHub 저장소 선택
3. Build command: `npm run build` / Publish directory: `dist`
4. Deploy

드래그앤드롭 배포: `npm run build` 후 `dist/` 폴더를 Netlify Drop(https://app.netlify.com/drop)에 끌어다 놓아도 됩니다.

---

## 옵션 C. GitHub Pages
⚠️ 프로젝트 페이지(`https://<id>.github.io/<repo>/`)로 배포하면 **하위 경로** 때문에 `vite.config.js`에 base 설정이 필요합니다.

1. `vite.config.js`에 추가:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/저장소이름/',   // 예: '/worldCup/'
   })
   ```
2. 빌드: `npm run build`
3. `dist/`를 `gh-pages` 브랜치로 배포 (예: `npx gh-pages -d dist`)
4. 저장소 Settings → Pages에서 소스 브랜치를 `gh-pages`로 지정

> 사용자 페이지(`https://<id>.github.io/`)나 커스텀 도메인이면 base 설정은 불필요합니다.

---

## GitHub에 올리기 (공통 선행 작업)
이 폴더는 아직 git 저장소가 아닙니다. 터미널에 다음을 입력하세요(대화창에서는 `!` 접두사로 실행 가능):
```
git init
git add .
git commit -m "2026 월드컵 대한민국 정보 페이지"
gh repo create worldcup-2026-kor --public --source=. --push
```
(`gh` 로그인 필요 시: `! gh auth login`)

---

## 배포 후 체크리스트
- [ ] OG 미리보기 확인 (https://www.opengraph.xyz 에 배포 URL 입력)
- [ ] 모바일에서 토글/공유 버튼 동작 확인
- [ ] index.html의 `og:url`/`canonical`을 실제 배포 주소로 교체
- [ ] (선택) `og:image`용 대표 이미지 추가 → 공유 시 썸네일 표시
