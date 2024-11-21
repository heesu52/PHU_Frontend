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
      },
      animation: {
        slideUpDown: 'slideUpDown 1.5s infinite',
        fadeIn: 'fadeIn 2s ease-in-out',
      },
    },
  },
  plugins: [],
}