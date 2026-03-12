# 🛍️ 대빵언니 (Daebbang Sister)

> 현재 오프라인 매장과 인스타그램 기반 판매를 확장하여  
> 온라인 쇼핑몰 운영을 목표로 개발 중인 **E-commerce 프로젝트**

---

## 🌐 Existing Store

현재 **오프라인 매장과 인스타그램(@_daebbang_sister)**을 통해 운영 중이며,  
온라인 쇼핑몰 확장을 위해 해당 프로젝트를 개발하고 있습니다.

📷 Instagram: [https://www.instagram.com/_daebbang_sister/](https://www.instagram.com/_daebbang_sister/)

---

## 🎨 Design

프로젝트 UI/UX 디자인은 직접 진행하였으며,  
아래 피그마 링크에서 화면 설계와 프로토타입을 확인할 수 있습니다.

📐 Figma: [대빵언니 쇼핑몰 디자인](https://www.figma.com/design/7uqkmWdCedG8mb1r1xyzK0/%EB%8C%80%EB%B9%B5%EC%96%B8%EB%8B%88?node-id=0-1&t=1QXfMUY1rtJcBVqq-1)

---

## 🔗 Live Demo

| Service | Link |
|---|---|
| Web | https://www.daebbang-sister.shop/ |
| Admin | https://admin.daebbang-sister.shop/ |

---

## 📋 Project Management

- **Development Methodology:** Agile 방식, 기능 단위 스프린트 진행  
  - 각 기능을 작게 나누어 개발하고, 반복적으로 검증하며 점진적으로 프로젝트 완성

- **Git Branch Strategy:** GitHub Flow  
  - 소규모 팀 + Monorepo 환경에 적합  
  - **Feature 브랜치 → Pull Request → Merge**  
  - PR 과정에서 **AI 기반 코드 리뷰 + 자동 Lint/Tests** 진행  
  - 안정적 배포와 코드 품질 유지  

---

## 📌 Project Overview

**대빵언니(Daebbang Sister)** 는  
오프라인/인스타 기반 가게를 온라인 쇼핑몰로 확장하기 위해 개발된 프로젝트입니다.  

### 💡 설계 의도 / 아키텍처 선택 이유

1. **쇼핑몰 Web(사용자 서비스)**  
   - **Next.js + SSR** 사용 → SEO 최적화, 초기 로딩 속도, 검색 엔진 노출 극대화  
   - 사용자 경험 및 검색 노출이 중요한 서비스에 적합

2. **관리자 Admin 페이지**  
   - **React + Vite** 사용 → 가볍고 빠른 번들링, 서버 사이드 렌더링 필요 없음  
   - 관리자는 SEO 필요 없고, 빠른 개발과 간단한 빌드가 더 중요

3. **Node Modules 최적화**  
   - 각 앱(client/admin)이 독립적으로 node_modules를 가지면 비효율적  
   - **pnpm workspace**와 **심볼릭 링크**를 사용하여 공통 패키지(styles, ui, utils, types) 공유  
   - 결과: 의존성 중복 최소화, 빌드 속도 개선, Monorepo 유지보수 효율화

---

## 🎯 Project Goals

- 온라인 쇼핑몰(Web) 개발로 판매 채널 확장  
- 관리자(Admin) 페이지를 통한 상품/주문/회원 관리  
- Monorepo 구조로 앱별 독립성과 공통 패키지 재사용성 확보  
- 프론트엔드 아키텍처 설계 및 공통 컴포넌트, 유틸 재사용 연습

---

## 🛠 Tech Stack

| Layer | Technology | Description |
|-------|------------|-------------|
| 🌐 Web | **Next.js 13 + App Router** | SSR로 SEO 최적화, 초기 로딩 속도 개선 |
|       | **React 19 + TypeScript** | UI 구성, 타입 안정성 |
|       | **Tailwind CSS / Headless UI / Heroicons / clsx / tailwind-merge / CVA** | UI 구성 및 재사용성 확보 |
|       | **Tanstack Query** | 서버 상태 관리, 데이터 fetching |
| 🖥 Admin | **React 19 + Vite** | 가벼운 번들링, 빠른 개발 환경 |
|       | **TypeScript** | 타입 안정성 확보 |
|       | **Tailwind CSS / Headless UI / Heroicons / clsx / tailwind-merge / CVA** | 관리자 UI 구성 |
| 🔗 Monorepo / Common | **pnpm workspace** | 앱 간 공통 패키지 심볼릭 링크 연결, node_modules 중복 제거 |
|       | **packages: styles / ui / utils / types** | 공통 CSS, 컴포넌트, 유틸, 타입 관리 |
| ✅ Quality / CI | **ESLint / Prettier / prettier-plugin-tailwindcss** | 코드 스타일, Lint, 포맷팅 |
|       | **Husky + lint-staged + commitlint** | 커밋 검사, 코드 품질 유지 |
| 🚀 Deployment | **GitHub Actions** | PR마다 Lint / Test 자동 검사 |
|       | **Vercel** | Web + Admin 자동 배포 |

---

## ⚙️ Development & Deployment

- **커밋 검사:** Husky를 사용하여 Git commit 및 push 시 prettier 코드 스타일, Lint 검사 수행  
- **CI/CD:** GitHub Actions를 통해 PR마다 자동 Lint, Test 검사  
- **배포:** Vercel과 연동하여 Web과 Admin 서비스 자동 배포  
- **효과:** 코드 품질 유지 + 안정적인 배포 + 개발 워크플로우 최적화

---

## 📦 Monorepo Structure

```text
root/
├─ apps/
│  ├─ client/     # Next.js 사용자 쇼핑몰
│  │  ├─ src/
│  │  │  ├─ app/       # 라우팅 및 레이아웃
│  │  │  ├─ features/  # 기능 단위 모듈 (auth, profile 등)
│  │  │  └─ shared/    # 앱 내부 공용 컴포넌트/훅/유틸
│  │  └─ package.json
│  │
│  └─ admin/      # React + Vite 관리자 페이지
│     ├─ src/
│     │  ├─ features/  # 기능 단위 모듈 (dashboard, user-management 등)
│     │  └─ shared/    # 앱 내부 공용 컴포넌트/훅/유틸
│     └─ package.json
│
├─ packages/       # 공통 패키지
│  ├─ styles/      # 글로벌 CSS
│  ├─ ui/          # 공용 UI 컴포넌트
│  ├─ utils/       # 공용 유틸
│  └─ types/       # 공통 타입
│
├─ package.json
├─ pnpm-workspace.yaml
└─ README.md
```

---

