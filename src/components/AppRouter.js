import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { privateRoutes, publicRoutes } from "./routes";
import { LOGIN_ROUTE, MAIN_ROUTE } from "./utils/consts";


const AppRouter = ({isLogged, setIsLogged, isOpen}) => {

    return isLogged ? 
    (
        <Routes>
          {privateRoutes.map(({path, Component})=>
            <Route key={path} path={path} element={<Component isLogged={isLogged}/>}/>
          )}
          <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />
        </Routes>
    )
    : 
    (
        <Routes>
          {publicRoutes.map(({path, Component})=>
            <Route key={path} path={path} element={<Component setIsLogged={setIsLogged} isOpen={isOpen}/>}/>
          )}
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
        </Routes>
    );
}
  
export default AppRouter;