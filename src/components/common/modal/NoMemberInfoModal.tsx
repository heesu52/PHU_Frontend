function NoMemberInfoModal({ onClose }: { onClose: () => void }) {


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-lg font-bold">회원 정보 없음</h2>
        <p className="text-sm text-gray-600">
          현재 저장되어있는 회원님의 정보가 없습니다.
        </p>
        <p className="mb-6 text-sm text-gray-600">
          회원님의 정보를 추가해주세요!
        </p>
        <div className="flex justify-end space-x-3">
          {/* '확인' 버튼: 모달만 닫기 */}
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 rounded-md bg-custom-softgrey hover:bg-custom-grey"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoMemberInfoModal;
