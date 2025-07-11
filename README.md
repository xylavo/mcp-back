# MCP Todo API

## 프로젝트 개요

MCP Todo API는 Model Context Protocol(MCP)을 위한 Todo 관리 시스템입니다. 이 프로젝트는 AI Agent가 사용자의 할 일을 효율적으로 관리할 수 있도록 설계된 RESTful API 서버입니다.

## 프로젝트 목적

- **AI Agent 지원**: AI Agent가 사용자의 할 일을 생성, 조회, 수정, 삭제할 수 있는 API 제공
- **스케줄 관리**: 날짜별 할 일 스케줄링 기능으로 시간 관리 지원
- **MCP 통합**: Model Context Protocol을 통한 AI Agent와의 원활한 통신
- **데이터 영속성**: SQLite 데이터베이스를 통한 안정적인 데이터 저장

## 기술 스택

### 백엔드 프레임워크
- **NestJS**: Node.js 기반의 TypeScript 서버 프레임워크
- **TypeORM**: TypeScript ORM으로 데이터베이스 관리
- **SQLite**: 경량 데이터베이스로 로컬 데이터 저장

### 주요 라이브러리
- **moment-timezone**: 시간대 처리 및 날짜 관리
- **date-fns-tz**: 타임존 기반 날짜/시간 조작
- **reflect-metadata**: TypeScript 메타데이터 리플렉션

## 프로젝트 구조

```
src/
├── app.module.ts          # 애플리케이션 메인 모듈
├── main.ts               # 애플리케이션 진입점
├── app.controller.ts     # 기본 컨트롤러
├── app.service.ts        # 기본 서비스
└── todo/                 # Todo 기능 모듈
    ├── todo.module.ts    # Todo 모듈 설정
    ├── todo.controller.ts # Todo API 엔드포인트
    ├── todo.service.ts   # Todo 비즈니스 로직
    └── todo.entity.ts    # Todo 데이터 모델
```

## 데이터 모델

### Todo Entity

```typescript
@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;                    // 고유 식별자

  @Column()
  title: string;                 // 할 일 제목

  @Column({ nullable: true })
  description: string;           // 할 일 설명

  @Column({ default: false })
  completed: boolean;            // 완료 여부

  @Column({ nullable: true })
  scheduledAt: Date;            // 스케줄 날짜/시간

  @Column({ nullable: true })
  duration: number;             // 예상 소요 시간 (분)

  @CreateDateColumn()
  createdAt: Date;              // 생성 시간

  @UpdateDateColumn()
  updatedAt: Date;              // 수정 시간
}
```

## API 엔드포인트

### 기본 CRUD 작업

| 메서드 | 엔드포인트 | 설명 |
|--------|------------|------|
| POST | `/todos/find-all` | 모든 Todo 항목 조회 |
| POST | `/todos/find-id` | ID로 특정 Todo 조회 |
| POST | `/todos/create` | 새로운 Todo 생성 |
| POST | `/todos/update` | 기존 Todo 수정 |
| POST | `/todos/delete` | Todo 삭제 |

### 스케줄 관리

| 메서드 | 엔드포인트 | 설명 |
|--------|------------|------|
| POST | `/todos/schedule` | 특정 날짜의 스케줄된 Todo 조회 |

### API 도구 정보

| 엔드포인트 | `/todos` | API 도구 목록 반환 |

## 주요 기능

### 1. Todo 관리
- **생성**: 제목, 설명, 스케줄, 예상 소요 시간 설정 가능
- **조회**: 전체 목록 조회 및 ID 기반 개별 조회
- **수정**: 제목, 설명, 완료 상태, 스케줄, 소요 시간 수정
- **삭제**: ID 기반 Todo 항목 삭제

### 2. 스케줄 관리
- **날짜별 조회**: 특정 날짜의 모든 스케줄된 Todo 조회
- **시간순 정렬**: 스케줄된 Todo를 시간순으로 정렬하여 반환
- **타임존 지원**: 한국 시간대(Asia/Seoul) 지원

### 3. AI Agent 통합
- **도구 정보 제공**: AI Agent가 사용할 수 있는 API 도구 목록 제공
- **표준화된 응답**: JSON 형태의 일관된 응답 형식
- **에러 처리**: 적절한 에러 메시지와 상태 코드 제공

## 데이터베이스 설정

- **타입**: SQLite
- **파일**: `database.sqlite`
- **동기화**: 개발 환경에서 자동 스키마 동기화
- **엔티티**: TypeORM을 통한 자동 테이블 생성

## 개발 환경

### 필수 요구사항
- Node.js (v18 이상)
- npm 또는 yarn

### 의존성
- **@nestjs/common**: NestJS 공통 모듈
- **@nestjs/typeorm**: TypeORM 통합
- **typeorm**: ORM 라이브러리
- **sqlite3**: SQLite 데이터베이스 드라이버
- **moment-timezone**: 시간대 처리
- **date-fns-tz**: 날짜/시간 조작

## 배포 고려사항

- **데이터베이스**: 프로덕션 환경에서는 PostgreSQL 등으로 마이그레이션 권장
- **환경 변수**: 데이터베이스 연결 정보를 환경 변수로 관리
- **로깅**: 프로덕션 환경에서 적절한 로깅 설정 필요
- **보안**: API 인증 및 권한 관리 추가 필요

## 확장 가능성

- **사용자 인증**: JWT 기반 사용자 인증 시스템
- **카테고리 관리**: Todo 카테고리 분류 기능
- **우선순위**: Todo 우선순위 설정 기능
- **반복 작업**: 반복되는 Todo 설정 기능
- **알림 시스템**: 스케줄 알림 기능
- **통계 분석**: 완료율, 생산성 통계 제공
