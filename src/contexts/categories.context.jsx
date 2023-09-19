import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";


export const CategoriesContext = createContext({
    categoriesMap: {},

});

export const CategoriesProvider = ({children}) => {
    const[categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categotyMap = await getCategoriesAndDocuments();
            //console.log(categotyMap);
            setCategoriesMap(categotyMap);
        };
        getCategoriesMap();
    },  []);


    const value = {categoriesMap};

    return (
        <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>
    )
}