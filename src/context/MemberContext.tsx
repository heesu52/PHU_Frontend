import React, { createContext, useContext, useState } from "react";

export const MemberContext = createContext<{
  MemberId: number | null;
  setMemberId: React.Dispatch<React.SetStateAction<number | null>>;
}>({
  MemberId: null,
  setMemberId: () => {},
});

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

export const useMemberContext = () => useContext(MemberContext);
