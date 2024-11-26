import React, { createContext, useContext, useState } from "react";

// MemberContextType 인터페이스 정의
interface MemberListContextType {
  ListId: number | null;
  setListId: (value: number | null) => void;
}

// 회원 id Context 생성 (초기값은 null로 설정)
export const MemberContext = createContext<MemberListContextType | null>(null);

// Provider 컴포넌트 (Context 값을 설정)
export const ListProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ListId, setListId] = useState<number | null>(null);

  return (
    <MemberContext.Provider value={{ ListId, setListId }}>
      {children}
    </MemberContext.Provider>
  );
};

// Context 사용 훅 (Context 값을 사용)
export const useMemberListContext = () => {
  const context = useContext(MemberContext);

  if (!context) {
    throw new Error("useMemberListContext must be used within a MemberProvider");
  }

  return context;
};
