import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NotebookPage from "./pages/NotebookPage";
import StoryPage from "./pages/StoryPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* The notebook portfolio is the site. Static routes win over
              /:section, which still serves the V2 tabbed views so every
              previously-indexed section URL keeps resolving. */}
          <Route path="/" element={<StoryPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/notebook" element={<NotebookPage />} />
          <Route path="/:section" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
