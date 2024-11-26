import React, { createContext, useContext, useState } from "react";

// MemberContextType 인터페이스 정의
interface MemberContextType {
  MemberId: number | null;
  setMemberId: (value: number | null) => void;
}

// 회원 id Context 생성 (초기값은 null로 설정)
export const MemberContext = createContext<MemberContextType | null>(null);

// Provider 컴포넌트
export const MemberProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [MemberId, setMemberId] = useState<number | null>(null);

  return (
    <MemberContext.Provider value={{ MemberId, setMemberId }}>
      {children}
    </MemberContext.Provider>
  );
};

// Context 사용 훅
export const useMemberContext = () => {
  const context = useContext(MemberContext);

  if (!context) {
    throw new Error("useMemberContext must be used within a MemberProvider");
  }

  return context;
};
