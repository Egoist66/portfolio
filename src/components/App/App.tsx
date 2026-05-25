import { lazy, Suspense } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import Layout from "../Layout/Layout";
import PageTransition from "../Layout/PageTransition/PageTransition";
import AppShell from "../Layout/AppShell/AppShell";

const CareerPage = lazy(() => import("../Content/Career/CareerPage"));

function App() {
  const location = useLocation();

  const element = useRoutes(
    [
      {
        path: "/career",
        element: (
          <Suspense fallback={null}>
            <CareerPage />
          </Suspense>
        ),
      },
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
