import { useLocation, useRoutes } from "react-router-dom";
import Layout from "../Layout/Layout";
import CareerPage from "../Content/Career/CareerPage";
import PageTransition from "../Layout/PageTransition/PageTransition";
import AppShell from "../Layout/AppShell/AppShell";

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

  const scrollToTop = !location.hash;

  return (
    <AppShell>
      <PageTransition transitionKey={sectionKey} scrollToTop={scrollToTop}>
        {element}
      </PageTransition>
    </AppShell>
  );
}

export default App;
