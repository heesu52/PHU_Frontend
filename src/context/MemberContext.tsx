import React, { createContext, useContext, useState } from "react";

// Context 타입 정의
interface IMemberContext {
  listId: number | null;
  memberId: number | null;
  setListId: (id: number | null) => void;
  setMemberId: (id: number | null) => void;
}

// Context 생성
const MemberContext = createContext<IMemberContext | undefined>(undefined);

// Provider 컴포넌트
export const MemberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listId, setListId] = useState<number | null>(null);
  const [memberId, setMemberId] = useState<number | null>(null);

  return (
    <MemberContext.Provider value={{ listId, memberId, setListId, setMemberId }}>
      {children}
    </MemberContext.Provider>
  );
};

// 커스텀 훅
export const useMemberContext = (): IMemberContext => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error("useMemberContext must be used within a MemberProvider");
  }
  return context;
};
