# MCP Todo API

## 프로젝트 개요

MCP Todo API는 **Model Context Protocol (MCP)** 환경에서 AI Agent가 사용할 수 있는 Todo 관리 시스템입니다. 이 프로젝트는 AI Agent가 사용자의 할 일을 효율적으로 관리하고 스케줄링할 수 있도록 설계된 RESTful API 서버입니다.

## 주요 목적

- **AI Agent 통합**: MCP 환경에서 AI Agent가 직접 사용할 수 있는 Todo 관리 API 제공
- **스케줄링 기능**: 날짜별 할 일 관리 및 시간 기반 스케줄링 지원
- **시간대 처리**: 한국 시간대(Asia/Seoul) 지원으로 정확한 스케줄링
- **간편한 CRUD**: AI Agent가 쉽게 사용할 수 있는 직관적인 API 구조

## 기술 스택

### Backend Framework
- **NestJS 11.0.1**: TypeScript 기반의 Node.js 프레임워크
- **Express**: HTTP 서버 플랫폼

### Database & ORM
- **SQLite**: 경량 데이터베이스 (database.sqlite 파일 사용)
- **TypeORM 0.3.25**: TypeScript ORM
- **@nestjs/typeorm**: NestJS TypeORM 통합

### 시간 처리
- **moment-timezone**: 시간대 처리 라이브러리
- **date-fns-tz**: 날짜/시간 유틸리티

### 개발 도구
- **TypeScript 5.7.3**: 정적 타입 지원
- **Jest**: 테스트 프레임워크
- **ESLint**: 코드 품질 관리
- **Prettier**: 코드 포맷팅

## 핵심 기능

### 1. Todo CRUD 작업
- **생성**: 제목, 설명, 스케줄, 예상 소요시간 설정 가능
- **조회**: 전체 목록 조회 및 ID 기반 개별 조회
- **수정**: 제목, 설명, 완료 상태, 스케줄, 소요시간 수정
- **삭제**: ID 기반 Todo 항목 삭제

### 2. 스케줄링 시스템
- **날짜별 조회**: 특정 날짜의 스케줄된 Todo 조회
- **시간대 지원**: 한국 시간대(Asia/Seoul) 자동 처리
- **정렬**: 스케줄 시간순으로 자동 정렬

### 3. AI Agent 최적화
- **도구 메타데이터**: AI Agent가 이해할 수 있는 API 스키마 제공
- **POST 기반 API**: 모든 엔드포인트가 POST 방식으로 통일
- **명확한 속성 정의**: 각 API의 입력/출력 형식 명시

## 데이터 모델

### Todo Entity
```typescript
{
  id: number;              // 고유 식별자
  title: string;           // Todo 제목
  description?: string;    // 상세 설명 (선택사항)
  completed: boolean;      // 완료 상태 (기본값: false)
  scheduledAt?: Date;      // 스케줄 날짜 (선택사항)
  duration?: number;       // 예상 소요시간 (분, 선택사항)
  createdAt: Date;        // 생성 시간
  updatedAt: Date;        // 수정 시간
}
```

## API 엔드포인트

### 기본 CRUD
- `POST /todos/find-all`: 모든 Todo 조회
- `POST /todos/find-id`: ID로 특정 Todo 조회
- `POST /todos/create`: 새로운 Todo 생성
- `POST /todos/update`: 기존 Todo 수정
- `POST /todos/delete`: Todo 삭제

### 스케줄링
- `POST /todos/schedule`: 특정 날짜의 스케줄된 Todo 조회

### AI Agent 도구 메타데이터
- `POST /todos`: AI Agent용 API 스키마 정보 반환

## AI Agent 통합 특징

### 1. 도구 메타데이터 제공
각 API 엔드포인트에 대해 AI Agent가 이해할 수 있는 상세한 메타데이터를 제공합니다:
- API URL
- 기능 설명
- 입력 속성 정의
- 필수/선택 파라미터 구분

### 2. 직관적인 API 설계
- 모든 엔드포인트가 POST 방식으로 통일
- JSON 기반 요청/응답
- 명확한 에러 처리

### 3. 시간대 인식
- 한국 시간대 자동 처리
- 날짜 기반 스케줄링 지원
- 시간순 정렬 기능

## 프로젝트 구조

```
src/
├── app.module.ts          # 메인 모듈 설정
├── main.ts               # 애플리케이션 진입점
└── todo/
    ├── todo.controller.ts # API 엔드포인트 정의
    ├── todo.entity.ts    # 데이터 모델
    ├── todo.service.ts   # 비즈니스 로직
    └── todo.module.ts    # Todo 모듈 설정
```

## 개발 환경

- **Node.js**: 최신 LTS 버전
- **포트**: 3000 (환경변수 PORT로 변경 가능)
- **데이터베이스**: SQLite (자동 생성)
- **동기화**: 개발 환경에서 자동 스키마 동기화

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run start:dev

# 프로덕션 빌드
npm run build
npm run start:prod
```

## AI Agent 사용 시나리오

1. **할 일 생성**: AI Agent가 사용자 요청을 받아 Todo 생성
2. **스케줄 관리**: 특정 날짜의 할 일 조회 및 관리
3. **진행 상황 추적**: 완료 상태 업데이트 및 진행률 모니터링
4. **시간 관리**: 예상 소요시간 설정 및 스케줄 최적화

이 프로젝트는 MCP 환경에서 AI Agent가 사용자의 할 일을 효율적으로 관리할 수 있도록 설계된 전문적인 Todo 관리 시스템입니다.
