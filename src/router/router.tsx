import React from "react"

import { useRoutes, Router } from "react-router"
import Home from "../template/Home"


const Routers = () => {
  const routing = useRoutes([
    {
      path: "/",
      element: <Home />,

      children: [
        {
          path: "/",
          element: <Home />

        }
      ]
    }
  ])
  return routing
}

export default Routers
