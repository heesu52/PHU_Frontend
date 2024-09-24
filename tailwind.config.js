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
    },
  },
  plugins: [],
}