import { useRef } from "react";

function MemberInfo() {
  const goalRef = useRef<HTMLTextAreaElement | null>(null);
  const notesRef = useRef<HTMLTextAreaElement | null>(null);

  //textarea의 높이를 자동조절하는 함수
  const adjustTextareaHeight = (ref: React.RefObject<HTMLTextAreaElement>) => {
    if (ref.current) {
      ref.current.style.height = "auto"; // 높이를 초기화한 후
      ref.current.style.height = `${ref.current.scrollHeight}px`; // 내용에 맞춰 높이 설정
    }
  };

  return (
    <div className="flex-col w-[80%] space-y-6 flex h-[90%]">
      <div className="space-y-1">
        <div className="text-base">PT 날짜</div>
        <span>2024년 11월 21일</span>
        <span className="mx-3">~</span>
        <span>2025년 1월 21일</span>
      </div>
      
      <div className="space-y-1">
        <div className="text-base">목표</div>
        <textarea
            ref={goalRef}
            className="border w-[450px] min-h-[70px] rounded-lg text-sm border-custom-skyblue bg-white resize-none overflow-hidden indent-1 p-1"
            onInput={() => adjustTextareaHeight(goalRef)}
            placeholder="ex) 목표 몸무게, 감량하고 싶은 부위"
            disabled/>
      </div>
      
      <div className="space-y-1">
        <div className="text-base">특이사항</div>
        <textarea
            ref={notesRef}
            className="border w-[450px] min-h-[70px] rounded-lg text-sm border-custom-skyblue bg-white resize-none overflow-hidden indent-2 p-1"
            onInput={() => adjustTextareaHeight(notesRef)}
            placeholder="ex) 어깨가 불편함, 식단을 하지 않음"
            disabled/>
      </div>
      
    </div>
  );
}

export default MemberInfo;
