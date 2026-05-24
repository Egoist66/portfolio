import { useLocation, useRoutes } from "react-router-dom";
import Layout from "../Layout/Layout";
import CareerPage from "../Content/Career/CareerPage";
import PageTransition from "../Layout/PageTransition/PageTransition";

function App() {
  const location = useLocation();

  const element = useRoutes(
    [
      { path: "/career", element: <CareerPage /> },
      { path: "/*", element: <Layout /> },
    ],
    location
  );

  const sectionKey =
    location.pathname === "/career" ? "career" : "home";

  return (
    <PageTransition transitionKey={sectionKey} scrollToTop>
      {element}
    </PageTransition>
  );
}

export default App;
