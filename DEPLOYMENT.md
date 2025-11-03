# GitHub Pages 배포 가이드

## 🚀 GitHub을 통한 웹사이트 배포 방법

### 1단계: GitHub 저장소 생성

1. **GitHub.com**에 로그인
2. **New Repository** 버튼 클릭
3. 저장소 설정:
   - **Repository name**: `jeju-apartment-sale` (또는 원하는 이름)
   - **Description**: `제주 곶자왈아이파크 32평 급매 매물 사이트`
   - **Public** 선택 (GitHub Pages 무료 사용을 위해)
   - **Add a README file** 체크하지 않음 (이미 있음)
4. **Create repository** 클릭

### 2단계: 로컬 파일을 GitHub에 업로드

#### 방법 A: GitHub 웹 인터페이스 사용 (권장)

1. 생성된 저장소 페이지에서 **uploading an existing file** 클릭
2. 다음 파일들을 드래그해서 업로드:
   ```
   index.html
   script.js
   styles-backup.css
   .nojekyll
   .gitignore
   README.md
   images/ (폴더 전체)
   ```
3. **Commit message**: `Initial commit - 제주 곶자왈아이파크 매물 사이트`
4. **Commit changes** 클릭

#### 방법 B: Git 명령어 사용 (Git 설치된 경우)

```bash
# 현재 폴더에서 Git 초기화
git init

# 모든 파일 추가
git add .

# 첫 번째 커밋
git commit -m "Initial commit - 제주 곶자왈아이파크 매물 사이트"

# GitHub 저장소와 연결
git remote add origin https://github.com/[사용자명]/[저장소명].git

# main 브랜치로 푸시
git branch -M main
git push -u origin main
```

### 3단계: GitHub Pages 활성화

1. GitHub 저장소의 **Settings** 탭 클릭
2. 왼쪽 메뉴에서 **Pages** 선택
3. **Source** 섹션에서:
   - **Deploy from a branch** 선택
   - **Branch**: `main` 선택
   - **Folder**: `/ (root)` 선택
4. **Save** 버튼 클릭

### 4단계: 배포 확인

- 몇 분 후 GitHub Pages에서 사이트 URL 제공
- URL 형식: `https://[사용자명].github.io/[저장소명]/`
- 예시: `https://johndoe.github.io/jeju-apartment-sale/`

## 🌐 배포 후 URL 예시

배포가 완료되면 다음과 같은 URL로 접속 가능:

- **메인 페이지**: `https://[사용자명].github.io/[저장소명]/`
- **이미지**: `https://[사용자명].github.io/[저장소명]/images/living-room.jpg`

## 📝 업데이트 방법

### 콘텐츠 수정 후 재배포

1. 파일 수정 (index.html, 이미지 추가 등)
2. GitHub 저장소에 새 파일 업로드 또는 기존 파일 수정
3. 자동으로 재배포됨 (5-10분 소요)

### Git을 사용한 업데이트

```bash
# 파일 수정 후
git add .
git commit -m "매물 정보 업데이트"
git push origin main
```

## 🔧 문제 해결

### 이미지가 표시되지 않는 경우

- 파일명 대소문자 확인
- 이미지 경로 확인: `images/파일명.jpg`

### CSS/JS가 적용되지 않는 경우

- `.nojekyll` 파일이 업로드되었는지 확인
- 브라우저 캐시 새로고침 (Ctrl+F5)

### 동영상이 재생되지 않는 경우

- MP4 파일 크기 확인 (GitHub 파일 크기 제한: 100MB)
- 동영상 코덱 확인 (H.264 권장)

## 📊 성능 최적화

### GitHub Pages에서의 권장사항

1. **이미지 최적화**:

   - 큰 이미지들을 압축 (현재 8-9MB → 1-3MB 권장)
   - WebP 포맷 사용 고려

2. **동영상 최적화**:

   - 동영상 압축 (현재 10.89MB)
   - 스트리밍 서비스 사용 고려 (YouTube, Vimeo)

3. **CDN 활용**:
   - Tailwind CSS CDN 사용 (현재 적용됨)
   - Google Fonts CDN 사용 (현재 적용됨)

## 🎯 SEO 최적화

배포 후 검색 엔진 최적화를 위해:

1. **Google Search Console**에 사이트 등록
2. **sitemap.xml** 생성 및 제출
3. **robots.txt** 파일 생성
4. 메타 태그 최적화 (현재 적용됨)

## 🔗 유용한 링크

- **GitHub Pages 공식 문서**: https://pages.github.com/
- **HTML 유효성 검사**: https://validator.w3.org/
- **성능 측정**: https://pagespeed.web.dev/

---

**🎉 축하합니다! 이제 전 세계 어디서나 매물 사이트에 접속할 수 있습니다!**
