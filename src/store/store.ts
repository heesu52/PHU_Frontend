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
  userData: UserData | null;
  setUserData: (userData: UserData) => void;
}
interface UserData {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  tel: string;
  part: string;
}

export const useUserDataStore = create<UserDataState>((set) => ({
  userData: null,
  setUserData: (userData) => set({ userData }),
}));


/* 로그인하는 회원 정보 data */
interface MemberDataState {
  memberData: MemberData | null;
  setMemberData: (memberData: MemberData) => void;
}
interface MemberData {
  name: string;
  age: number;
  email: string;
  gender: string;
  tel: string;
}

export const useMemberDataStore = create<MemberDataState>((set) => ({
  memberData: null,
  setMemberData: (memberData) => set({ memberData }),
}));



/* 회원 전체 정보 (리스트) data */
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
}));

/* 리스트에서 클릭한 회원의 listid와 memberid를 저장*/
interface IdStoreState {
  listId: number | 0;
  memberId: number | 0;
  setListId: (id: number) => void;
  setMemberId: (id: number) => void;
}

export const useIdStore = create<IdStoreState>((set) => ({
  listId: 0,
  memberId: 0,
  setListId: (id) => set({ listId: id }),
  setMemberId: (id) => set({ memberId: id }),
}));


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

export const useInfoDataStore = create<InfoDataState>((set) => ({
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


/* 데일리 차트 전체 (리스트) data */
interface ChartListDataState {
  chartlistData: ChartListData[]
  setChartListData: (chartlistData: ChartListData[]) => void
}
interface ChartListData {
  id: number,
  branch: string,
  chartDate: string,
  routines: string[],
}
  
export const useChartListDataStore = create<ChartListDataState>((set) => ({
  chartlistData: [],
  setChartListData: (chartlistData) => set({ chartlistData }),
}));


/* 데일리 차트 개별 data 객체로 수정 */
interface ChartDataState {
  chartData: ChartData;  // InfoData를 객체로 설정
  setChartData: (chartData: ChartData) => void;
}

export interface ChartData {
  id: number;
  branch: string;
  chartDate: string;
  weight: string;
  memo: string;
  routines: string[];
}

export const useChartDataStore = create<ChartDataState>((set) => ({
  chartData: {
    id: 0,
    branch: '',
    chartDate: '',
    weight: '',
    memo: '',
    routines: [],
  },
  setChartData: (chartData) => set({ chartData }),
}));


// VoiceListData와 VoiceData의 공통 구조를 정의하는 인터페이스
interface VoiceDataCommon {
  fileId: number;
  memberId: number;
  uploadFileUrl: string;
  originalFileName: string;
  createAt: string;
  voiceTextId: string; //텍스트 추출 여부 id
  isTransformation: boolean;
}

/* 음성파일 전체 (리스트) data & voiceTextId 저장 */
interface VoiceListDataState {
  voicelistData: VoiceDataCommon[];
  setVoiceListData: (voicelistData: VoiceDataCommon[]) => void;
  voiceTextId: string | null;
  setVoiceTextId: (id: string) => void;
}

export const useVoiceListDataStore = create<VoiceListDataState>((set) => ({
  voicelistData: [],
  setVoiceListData: (voicelistData) => set({ voicelistData }),
  voiceTextId: null,
  setVoiceTextId: (id: string) => set({ voiceTextId: id }),
}));


/* 음성파일 개별 data 객체로 수정 */
interface VoiceDataState {
  voiceData: VoiceDataCommon;
  setVoiceData: (voiceData: VoiceDataCommon) => void;
}

export const useVoiceDataStore = create<VoiceDataState>((set) => ({
  voiceData: {
    fileId: 0,
    memberId: 0,
    uploadFileUrl: '',
    originalFileName: '',
    createAt: '',
    voiceTextId: '',
    isTransformation: false,
  },
  setVoiceData: (voiceData) => set({ voiceData }),
}));



/* 음성파일에서 추출한 텍스트 */
// list 배열에 포함될 각 항목에 대한 구조 정의
interface TextDataState {
  textData: TextData;
  setTextData: (textData: TextData) => void;
}

interface TextData {
  voiceListId: string; //params로 들어가는 voiceTextId와 동일
  createAt: string;
  memberName: string;
  list: TextItem[]; // list를 포함하도록 수정
}

interface TextItem {
  speaker: string;  // 발화자
  text: string;     // 발화 내용
}

export const useTextDataStore = create<TextDataState>((set) => ({
  textData: {
    voiceListId: '',
    createAt: '',
    memberName: '',
    list: [], // 초기값으로 빈 배열
  },
  setTextData: (textData) => set({ textData }),
}));



/* 요약된 텍스트 객체 */
interface SummationState {
  summationData: SummationData;
  setSummationData: (summationData: SummationData) => void;
}

interface SummationData {
  summarizationId: number;
  trainerId: number;
  memberId: number;
  voiceListId : string;
  texts : string;
  createAt : string;
}

export const useSummationDataStore = create<SummationState>((set) => ({
  summationData: {
    summarizationId: 0,
  trainerId: 0,
  memberId: 0,
  voiceListId : '',
  texts : '',
  createAt : ''
  },
  setSummationData: (summationData) => set({ summationData }),
}));
