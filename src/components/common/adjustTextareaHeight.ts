 // textarea의 높이를 자동으로 조정하는 함수
 export const adjustTextareaHeight = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = "auto"; // 기존 높이를 리셋
    textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 맞춰서 높이 조정
  };
