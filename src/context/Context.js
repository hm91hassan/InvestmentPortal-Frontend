import React,{useState,useEffect,createContext,useContext,useLayoutEffect} from "react";
import axios from "axios";

const AppContext = createContext();

const AppProvider = ({ children }) =>{
    const [dealsid,setDealsId] = useState([]);
    const [deals,setDeals] = useState([]);
    const [issuername, setIssuerName] = useState([]);
    const [financername, setFinancerName] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem("userinfo"));

    const GetDeals = async() =>{
        //console.log(userInfo?.id);
        try{
          const id = dealsid;
          const data = await axios.post("/getrecordbyid",{id});
          localStorage.setItem("dealsinfo", JSON.stringify({deals: data?.data?.data?.Deals_Allowed_for_Access,}))
          setDealsId(data?.data?.data?.Deals_Allowed_for_Access);
          console.log(data?.data?.data?.Deals_Allowed_for_Access?.length);
          
        }catch(error){
          console.log(error);
        }
    
    }

    useEffect(()=>{

      //GetDeals();

    },[]);

    return(
        <AppContext.Provider value={{
            deals,
            dealsid,
            setDealsId,
            issuername,
            financername,
            setIssuerName,
            setFinancerName
        }}>{children}</AppContext.Provider>
    )
    
};

export const AppState = () =>{
    return useContext(AppContext);
}

export {AppContext,AppProvider};