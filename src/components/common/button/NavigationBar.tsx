import arrowimg from '../../../assets/arrow.svg'

function NavigationBar() {
    return (
        <div className="w-full h-[60px] border border-b-custom-softgrey flex items-center">
            <img src={arrowimg} alt="arrow" className="w-[20px] h-[20px] ml-4" />
            <div className="ml-3 text-center">
                <span className="text-[20px] font-semibold">로그인</span>
            </div>
        </div>
    );
}

export default NavigationBar;