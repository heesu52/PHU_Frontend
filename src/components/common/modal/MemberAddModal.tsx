import profileimg from "../../../assets/person-circle.svg"
interface MemberAddModalProps {
    onClose: () => void; 
  }
  
  function MemberAddModal({ onClose}: MemberAddModalProps) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div className="p-6 bg-white rounded-md shadow-lg w-80">
          <div>
            <h2 className="mb-4 text-lg font-bold">정우혁 회원님</h2>
            <img src={profileimg}/>
          </div>
          <div className="flex justify-end gap-4">
          <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-white rounded-md bg-custom-softblue hover:bg-custom-skyblue">
              확인
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 rounded-md bg-custom-softgrey hover:bg-custom-grey">
              취소
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default MemberAddModal;
  