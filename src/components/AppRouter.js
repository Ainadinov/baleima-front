import React, { useState } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { privateRoutes, profileRoutes, publicRoutes } from "./routes";
import { LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE } from "./utils/consts";


const AppRouter = ({isLogged, setIsLogged}) => {

    return isLogged ? 
    ( 
      // is ? 
      //   <Routes>
      //     {privateRoutes.map(({path, Component})=>
      //       <Route key={path} path={path} element={<Component isLogged={isLogged}/>}/>
      //     )}
      //     <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />
      //   </Routes>
      //   : 
      //   <Routes>
      //     {profileRoutes.map(({path, Component})=>
      //       <Route key={path} path={path} element={<Component/>}/>
      //     )}
      //       <Route path="*" element={<Navigate to={PROFILE_ROUTE} />} />
      //   </Routes>
        <Routes>
          {privateRoutes.map(({path, Component})=>
            <Route key={path} path={path} element={<Component isLogged={isLogged}/>}/>
          )}
          <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />

          {profileRoutes.map(({path, Component})=>
            <Route key={path} path={path} element={<Component/>}/>
          )}
            <Route path="*" element={<Navigate to={PROFILE_ROUTE} />} />
        </Routes>
    )
    : 
    (
        <Routes>
          {publicRoutes.map(({path, Component})=>
            <Route key={path} path={path} element={<Component setIsLogged={setIsLogged} />}/>
          )}
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
        </Routes>
    );
}
  
export default AppRouter;