import ClientComponent from "../../components/client-component";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
  // query parameter는 타입에 맞게 하나씩 추가하자
  // 실제로 number라 하더라도 number가 아닌 string으로 선언하자.
  // 왜냐하면 url query parameter는 무조건 string이기 때문이다.
}) {
  const { q } = await searchParams;
  // 필요하다면, 구조분해 할당 후에 (아직 string인 상태) 타입 변환 및 정합성 검증을 진행하자.
  return (
    <div>
      Search 페이지 {q}
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  );
}
