
import { RouterProvider, createBrowserRouter } from 'react-router'
import './App.css'
import NavbarWrapper from './app/components/NavbarWrapper'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'

function App() {
  const routes = createBrowserRouter(
    [
      {
        path: "",
        //errorElement: <ErrorPage />
        children: [
          {
            element: <NavbarWrapper />,
            children: [
              {
                path: "",
                element: <MainPage />
              }
            ]
          }
        ]
      },
      {
        path: "login",
        element: <LoginPage />
      }
    ],
    { basename: import.meta.env.APP_BASE_URL }
  )
  return (
    <RouterProvider router={routes} />
  )
}

export default App
