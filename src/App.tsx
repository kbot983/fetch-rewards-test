import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import MatchesPage from "./pages/MatchesPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Loaders
import { loader as loginLoader } from "./functions/loginPage";
import { loader as mainPageLoader } from "./functions/mainPage";
import { loader as matchesLoader } from "./functions/matchesPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    loader: mainPageLoader,
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: loginLoader,
  },
  {
    path: "/matches",
    element: <MatchesPage />,
    loader: matchesLoader,
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
