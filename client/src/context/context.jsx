import {createContext, useState} from "react";
import useLocalStorage from "../hooks/useLocalStorage";


export const GlobalContext = createContext(null)

export default function GlobalState({children}){
    
    const [selectedFilm,setSelectedFilm]=useState(null)
    const [selectedFilters,setSelectedFilters]=useState({
        countries:[],
        'release year':[],
        genres:[]
    })
    const [signupData, setSignupData] = useState({
        name:"",
        email: "",
        password: "",
        confirmPassword: "",
      });
      const [loginData, setLoginData] = useState({
        email: "",
        password: "",
      });
      const [user,setUser] = useState(null);
      const[theme,setTheme]=useLocalStorage('theme','Dark')
    function truncate(str, n) {
        if (str.length <= n) return str; // Return the original string if its length is less than or equal to n
        
        // Find the last space character within the substring up to length n
        const lastSpaceIndex = str.substr(0, n).lastIndexOf(' ');
        
        // If no space is found or the last space is at the end, truncate normally
        if (lastSpaceIndex === -1 || lastSpaceIndex === n - 1) {
            return str.substr(0, n - 1) + '...';
        } else {
            // Otherwise, truncate at the last space character
            return str.substr(0, lastSpaceIndex) + '...';
        }
    }
    function convertMinutesToHoursAndMinutes(totalMinutes) {
        // Calculate hours
        const hours = Math.floor(totalMinutes / 60);
      
        // Calculate remaining minutes
        const minutes = totalMinutes % 60;
      
        // Return formatted string
        if(hours === 0){
        return `${minutes}min${minutes !== 1 ? 's' : ''}`
        }else if(minutes === 0) {
            return `${hours}hr${hours !== 1 ? 's' : ''}`;
        }else
        return `${hours}hr${hours !== 1 ? 's' : ''} ${minutes}minute${minutes !== 1 ? 's' : ''}`;
      }

    return <GlobalContext.Provider value={{selectedFilm,setSelectedFilm,truncate,convertMinutesToHoursAndMinutes,selectedFilters,setSelectedFilters,signupData, setSignupData,loginData, setLoginData,user,setUser,theme,setTheme}}>{children}</GlobalContext.Provider>
}