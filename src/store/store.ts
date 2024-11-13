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


  /* 회원 리스트 data */
  interface ListDataState {
    listData: ListData[]
    setListData: (listData: ListData[]) => void
  }
  interface ListData {
    id: number,
    name: string,
    email: string,
    tel: string,
  }
  
  export const useListDataStore = create<ListDataState>((set) => ({
    listData: [],
    setListData: (listData) => set({ listData }),
  }))


    // 회원 상세정보 객체 형태로 수정
    interface InfoDataState {
      infoData: InfoData;  // InfoData를 객체로 설정
      setInfoData: (infoData: InfoData) => void;
    }

    export interface InfoData {
      id: number;
      memberName: string;
      memberAge: number;
      ptStartDate: string;
      ptEndDate: string;
      memberTarget: string;
      significant: string;
    }

    export const memberInfoDataStore = create<InfoDataState>((set) => ({
      infoData: {
        id: 0,
        memberName: '',
        memberAge: 0,
        ptStartDate: '',
        ptEndDate: '',
        memberTarget: '',
        significant: '',
      },
      setInfoData: (infoData) => set({ infoData }),
    }));
