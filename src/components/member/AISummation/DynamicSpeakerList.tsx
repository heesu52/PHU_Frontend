interface SpeakerItem {
    speaker: string; // 스피커 정보 (예: "A", "B", "C")
    text: string;     // 해당 스피커의 텍스트
  }
  
  interface DynamicSpeakerListProps {
    list: SpeakerItem[]; // list는 SpeakerItem 객체 배열
  }
  
  function DynamicSpeakerList({ list }: DynamicSpeakerListProps) {
    const getSpeakerStyle = (speaker: string) => {
      switch (speaker.toUpperCase()) {
        case "A":
          return {
            title: "Speaker A",
            titleClass: "text-blue-600",
            bubbleClass: "bg-blue-100",
          };
        case "B":
          return {
            title: "Speaker B",
            titleClass: "text-green-600",
            bubbleClass: "bg-green-100",
          };
        case "C":
          return {
            title: "Speaker C",
            titleClass: "text-red-600",
            bubbleClass: "bg-red-100",
          };
        default:
          return {
            title: "Unknown Speaker",
            titleClass: "text-gray-600",
            bubbleClass: "bg-gray-100",
          };
      }
    };
  
    return (
      <ul className="w-[90%] space-y-4">
        {list.map((item, index) => {
          const { title, titleClass, bubbleClass } = getSpeakerStyle(item.speaker);
          return (
            <li key={index} className="flex items-center">
              <div className="flex flex-col items-start w-full ">
                <h4 className={`text-sm md:text-base font-semibold ${titleClass}`}>{title}</h4>
                <p className={`p-2 text-xs md:text-sm rounded-lg ${bubbleClass}`}>{item.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
  
  export default DynamicSpeakerList;
  