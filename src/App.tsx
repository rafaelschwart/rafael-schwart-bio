import { lazy, Suspense } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import StoryPage from "./pages/StoryPage";

const NotFound = lazy(() => import("./pages/NotFound"));
const NotebookPage = lazy(() => import("./pages/NotebookPage"));

/**
 * Section slugs from the retired V2 tabbed site, mapped onto the categories
 * that replaced them. These URLs are indexed and were still serving the old
 * design, so anyone arriving from search landed on a site that no longer
 * matches the homepage. Redirect rather than 404 so the link equity carries.
 */
const LEGACY_SECTIONS: Record<string, string> = {
  home: "",
  method: "method",
  experience: "record",
  work: "ventures",
  credentials: "credentials",
  contact: "contact",
  // earlier still, from the editorial era
  about: "record",
  skills: "method",
  certifications: "credentials",
  projects: "ventures",
  recommendations: "references",
  "employment-verification": "references",
};

function LegacySectionRedirect() {
  const { section } = useParams<{ section?: string }>();
  const target = section ? LEGACY_SECTIONS[section] : undefined;
  if (target === undefined) return <NotFound />;
  return <Navigate to={target ? `/#${target}` : "/"} replace />;
}

const App = () => (
  <TooltipProvider>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          {/* The notebook portfolio is the site. Static routes win over
              /:section, which redirects the retired V2 slugs onto their
              replacement categories. */}
          <Route path="/" element={<StoryPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/notebook" element={<NotebookPage />} />
          <Route path="/:section" element={<LegacySectionRedirect />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
