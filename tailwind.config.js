module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // 소스 파일 경로 설정
  ],
  theme: {
    extend: {
      colors: {
        "custom-blue" : "#3C8ACF",
        "custom-skyblue" : "#C5D9FA",
        "custom-softblue" : "#F3F7FE",
        "custom-orange" :"#ED930C",
        "custom-softgrey" : "#e6e6e6",
        "custom-grey" : "#D6D6D6",
        "custom-darkgrey" : "#A6A6A6",
        "custom-indigo" : "#1E4061",
        "custom-yellow" : "#F6D468"
      },
      keyframes: {
        slideUpDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '50%': { borderColor: 'transparent' },
        },
      },
      animation: {
        slideUpDown: 'slideUpDown 1.5s infinite',
        fadeIn: 'fadeIn 2s ease-in-out',
        typing: 'typing 3.5s steps(30) 1s forwards', // 타이핑 애니메이션
        blink: 'blink 0.75s step-end infinite', // 깜빡임 애니메이션
      },
      screens: {
        'sm': '640px',   // 작은 화면 (모바일)
        'md': '768px',   // 중간 화면 (태블릿)
        'lg': '1024px',  // 큰 화면 (데스크탑)
      },
    },
  },
  plugins: [],
}
