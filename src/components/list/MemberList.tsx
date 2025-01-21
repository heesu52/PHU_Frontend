import { useEffect, useState } from "react";
import HeaderBar from "../common/bar/HeaderBar";
import meatball from "../../assets/three-dots.svg";
import NavigationBar from "../common/bar/NavigationBar";
import profile from "../../assets/basic-profile.svg";
import Dropdown from "../common/DropDown";
import plusbtn from "../../assets/plus-circle-fill.svg";
import deletebtm from "../../assets/dash-circle-fill.svg";
import BottomSheet from "../common/modal/BottomSheet";
import MemberDeleteModal from "../common/modal/MemberDeleteModal";
import { Link } from "react-router-dom";
import { getPTListApi } from "../../store/api/info/MemberApi";
import { useListDataStore } from "../../store/store";

function MemberList() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isdeletebtnOpen, setIsdeletebtnOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seletMemberId, setSelectMemberId] = useState<number | null>(null);
  const [selectMemberName, setSelectMemberName] = useState<string | null>(null); // 선택한 회원의 이름 추가
  const { listData, setListData } = useListDataStore();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  const toggledeleteBtn = () => {
    setIsdeletebtnOpen(!isdeletebtnOpen);
  };

  const handleDeleteClick = (id: number, name: string) => {
    setIsModalOpen(true);
    setSelectMemberId(id);
    setSelectMemberName(name); // 회원 이름 설정
  };

  // 회원 리스트 가져오기
  useEffect(() => {
    const fetchPTlistInfo = async () => {
      const response = await getPTListApi();
      if (response?.success) {
        setListData(response.data);
      }
    };
    fetchPTlistInfo();
  }, [setListData]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <HeaderBar
        label="회원목록"
        icon={meatball}
        onIconClick={toggleDropdown}
      />
      {isDropdownOpen && (
        <Dropdown
          options={[
            { label: "회원 수정", onClick: toggledeleteBtn },
            { label: "회원 추가", onClick: toggleBottomSheet },
          ]}
          onClose={() => setIsDropdownOpen(false)}
        />
      )}
      <div className="flex items-center w-full">
        <ul className="w-full">
          {/* 회원 리스트 */}
          {listData && listData.length > 0 ? (
            listData.map((list, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b h-14 hover:bg-custom-softblue"
              >
                <Link
                  className="flex items-center justify-center p-3 ml-5 cursor-pointer"
                  to={`/member/info/${list.id}`}
                >
                  <img
                    src={profile}
                    alt="icon"
                    className="w-[30px] h-[30px] mr-3"
                  />
                  <span className="text-sm md:text-base lg:text-base">{list.name}</span> {/* 회원 이름 */}
                </Link>
                <div className="flex">
                  <div className="flex items-center justify-center w-48 mr-5 border rounded-lg h-7 border-custom-blue">
                    <span className="text-xs">{list.tel}</span> {/* 회원 전화번호 */}
                  </div>
                  {isdeletebtnOpen && (
                    <img
                      src={deletebtm}
                      className="mr-5"
                      onClick={() => handleDeleteClick(list.id, list.name)} // 클릭 시 id와 name 전달
                    />
                  )}
                </div>
              </li>
            ))
          ) : null}
        </ul>
      </div>
      {/* plusbtn은 isDropdownOpen 상태에 따라 조건부 렌더링 */}
      {!isDropdownOpen && (
        <img
          src={plusbtn}
          className="fixed bottom-0 w-8 h-8 mb-20"
          onClick={toggleBottomSheet}
        />
      )}
      {isBottomSheetOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-30"
          onClick={toggleBottomSheet}
        />
      )}
      {/* BottomSheet */}
      <BottomSheet onClose={toggleBottomSheet} isOpen={isBottomSheetOpen} />
      {/* MemberDeleteModal */}
      <MemberDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // 모달 닫기 시 선택된 회원 ID 초기화
        memberId={seletMemberId}
        memberName={selectMemberName} // 모달에 memberName도 전달
      />
      <NavigationBar />
    </div>
  );
}

export default MemberList;
