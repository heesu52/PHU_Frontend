import arrow from "../../../assets/arrow.svg";
import SubmitButton from "../../common/button/SubmitButton";
import SummaryDeleteModal from "../../common/modal/SummaryDeleteModal";
import { adjustTextareaHeight } from "../../common/adjustTextareaHeight";
import { useNavigate } from 'react-router-dom';
import { useState} from "react";

function EditSummary() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleGoBack = () => {
        navigate(-1);
    };
    

    return (
       <div className="relative flex flex-col items-center w-full">
            {/* Header */}
            <div className="flex items-center justify-between w-full h-[55px]">
                <div className="flex p-3 ml-3 space-x-4">
                    <img src={arrow} onClick={handleGoBack} />
                    <p className="text-lg cursor-default">뒤로가기</p>
                </div>
            </div>


            {/* Component */}
            <div className="flex flex-col items-center mt-5">
                <ul className="space-y-4 border">
                    <li>
                        <h4 >요약1</h4>
                        <textarea 
                            className="border w-[500px] min-h-[70px] rounded-lg text-sm border-custom-skyblue bg-white resize-none overflow-hidden indent-1 p-1"
                            maxLength={300}
                            onInput={adjustTextareaHeight}>가나다라마사 아자차카 칸예는 N!에서 뒤에서부터 처음 0이 아닌 숫자가 나올 때까지 0의 개수를 구하는 프로그램을 작성하시오</textarea>
                    </li>
                    <li>
                        <h4>요약2</h4>
                        <textarea
                            className="border w-[500px] min-h-[70px] rounded-lg text-sm border-custom-skyblue bg-white resize-none overflow-hidden indent-1 p-1"
                            maxLength={300}
                            onInput={adjustTextareaHeight}>가나다라마사 아자차카 칸예는 N!에서 뒤에서부터 처음 0이 아닌 숫자가 나올 때까지 0의 개수를 구하는 프로그램을 작성하시오</textarea>
                    </li>
                    
                </ul>
                <div className="flex justify-end mt-3 ml-auto">
                    <SubmitButton label="수정" size="small" className="bg-blue-500" />
                </div>
            </div>
            {/* Modal */}
            <SummaryDeleteModal 
            isOpen={isModalOpen}
            onClose={()=>setIsModalOpen(false)} />
       </div>
    );
}

export default EditSummary;
