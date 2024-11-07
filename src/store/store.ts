import {create} from 'zustand';

/* api */
interface ApiUrlState {
    apiUrl: string;  // apiUrl 상태 정의
    setApiUrl: (url: string) => void;  // apiUrl을 설정하는 함수 정의
}

export const useApiUrlStore = create<ApiUrlState>((set) => ({
    apiUrl: 'https://fitee.site',
    //apiUrl: 'http://localhost:8080',  // 초기 상태 값
    setApiUrl: (url: string) => set((state) => ({ ...state, apiUrl: url })),  // apiUrl을 설정하는 함수
}));


/* 유저 data */
interface UserDataState {
    userData: UserData[]
    setUserData: (userData: UserData[]) => void
  }
  interface UserData {
    name: string,
    age: number,
    email: string,
    password: string,
    gender: string,
    tel: string,
    part: string,
  }
  
  export const useUserDataStore = create<UserDataState>((set) => ({
    userData: [],
    setUserData: (userData) => set({ userData }),
  }))

  
  /* 회원 정보 data */
interface MemberDataState {
  memberData: MemberData[]
  setMemberData: (memberData: MemberData[]) => void
}
interface MemberData {
  name: string,
  age: number,
  email: string,
  gender: string;
  tel: string,
}

export const useMemberDataStore = create<MemberDataState>((set) => ({
  memberData: [],
  setMemberData: (memberData) => set({ memberData }),
}))