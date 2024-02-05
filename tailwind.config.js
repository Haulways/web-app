/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'custom': '4px 0px 4px 0px rgba(108, 119, 110, 0.40)',
      },
      // font family
      fontFamily: {
        Montserrat: ['Rubik'],
      },
      // colors 
      colors: {
      transparent: 'transparent',
        current: 'currentColor',
      
        // gradient colors for the home page
      f69292: '#F69292',
        f6c492: '#F6C492',
        
        // color palletes
        // purple 
        purple_B50: '#F2E6F6',
        purple_B75: '#C999DA',
        purple_B100: '#B26FCA',
        purple_B200: '#9130B3',
        purple_B300: '#7B06A4',
        purple_B400: '#560473',
        purple_B500: '#4B0464',

        // peach 
        peach_B50: '#FEF9F4',
        peach_B75: '#FBE7D2',
        peach_B100: '#FADDC0',
        peach_B200: '#F8CEA5',
        peach_B300: '#F6C492',
        peach_B400: '#AC8966',
        peach_B500: '#967859',

        // sage green native-1
        sage_green1_N50: '#F3F7F5',
        sage_green1_N75: '#CFE0D6',
        sage_green1_N100: '#BBD3C4',
        sage_green1_N200: '#9EC0AB',
        sage_green1_N300: '#8AB39A',
        sage_green1_N400: '#617D6C',
        sage_green1_N500: '#546D5E',

        // sage green native-2
        sage_green2_N50: '#F3F7F5',
        sage_green2_N75: '#CFE0D6',
        sage_green2_N100: '#BBD3C4',
        sage_green2_N200: '#9EC0AB',
        sage_green2_N300: '#8AB39A',
        sage_green2_N400: '#617D6C',
        sage_green2_N500: '#546D5E',

        //Black accents
        light_accent_50: '#EBEBEB', // light
        light_accent_75: '#E1E1E1', // light:hover
        light_accent_100: '#C1C1C1', // light:active
        normal_accent_50: '#363636', // normal
        normal_accent_75: '#313131', // normal:hover
        normal_accent_100: '#2B2B2B', // normal:active
        dark_accent_50: '#292929', // dark
        dark_accent_75: '#202020', // dark:hover
        dark_accent_100: '#181818', // dark:active
        darker_accent_150: '#131313', // darker

        //Black
        light_black_50: '#E6E6E6', // light
        light_black_75: '#D9D9D9', // light:hover
        light_black_100: '#B1B1B1', // light:active
        normal_black_50: '#020202', // normal
        normal_black_75: '#020202', // normal:hover
        normal_black_100: '#020202', // normal:active
        dark_black_50: '#020202', // dark
        dark_black_75: '#010101', // dark:hover
        dark_black_100: '#010101', // dark:active
        darker_black_150: '#010101', // darker
        
    },
      
      

      // media quries
      screens: {
        'mobile': {'max': '640px'},
        // => @media (max-width: 640px) { ... }
        'tablet': {'min': '641px', 'max': '1023px'},
        // => @media (min-width: 641px and max-width: 1023px)
        'laptop': {'min': '1024px'},
        'Xlaptop': {'min': '1440px'},
        // => @media (min-width: 768px) { ... }
      },
      backgroundImage: {
        // 'img': "url('../images/bg-pattern.svg')",
      },
    },
  },
  plugins: [],
}

