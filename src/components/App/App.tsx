import { lazy, Suspense } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import Layout from "../Layout/Layout";
import PageTransition from "../Layout/PageTransition/PageTransition";
import AppShell from "../Layout/AppShell/AppShell";

const CareerPage = lazy(() => import("../Content/Career/CareerPage"));
const WordPressPage = lazy(() => import("../Content/WordPress/WordPressPage"));

function getSectionKey(pathname: string): string {
  if (pathname === "/career") return "career";
  if (pathname === "/wordpress") return "wordpress";
  return "home";
}

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
      {
        path: "/wordpress",
        element: (
          <Suspense fallback={null}>
            <WordPressPage />
          </Suspense>
        ),
      },
      { path: "/*", element: <Layout /> },
    ],
    location
  );

  const sectionKey = getSectionKey(location.pathname);

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
