export default function NotFound() {
  return <div>404: Not Found</div>;
}

// Next.js에서 not-found.tsx와 notFound.tsx 파일명 인식 차이는 App Router의 특수 파일 명명 규칙 때문입니다.
// Next.js App Router는 특수 파일들에 대해 kebab-case 명명 규칙을 사용합니다. 이는 다음과 같은 모든 특수 파일에 적용됩니다:
// not-found.tsx (404 페이지)
// error.tsx (에러 처리)
// loading.tsx (로딩 상태)
// layout.tsx (레이아웃)
// page.tsx (페이지)
// 반면 notFound.tsx(camelCase)는 특수 파일로 인식되지 않고 일반 컴포넌트 파일로 취급됩니다.
// 이는 React 컴포넌트 이름이 일반적으로 PascalCase(예: NotFound)를 사용하는 것과 대조적입니다. Next.js의 이런 규칙은 파일 시스템 기반 라우팅에서 특수 파일과 일반 컴포넌트 파일을 명확히 구분하기 위해 의도적으로 설계되었습니다.
// Next.js 공식 문서에 따르면 App Router의 모든 특수 파일은 kebab-case를 사용해야 합니다.
