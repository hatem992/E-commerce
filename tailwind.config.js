/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container:{
      center:true
    },
    extend: {
      screens:{
        "2xl":"1320px"
      },
      colors:{
        primary :{  
            50:"#b6e6b6",
            100:"#9dde9d",
            200:"#6cce6c",
            300:"#54c654",
            400:"#3bbd3b",
            500:"#23b523",
            600:"#0aad0a",
            700:"#099c09",
            800:"#077907",
            900:"#055705",
            950:"#033403",
        
          },
        }
  },
  plugins: [],
}
}