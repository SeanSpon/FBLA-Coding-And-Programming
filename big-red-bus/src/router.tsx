import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Mission from "@/pages/Mission";
import Partners from "@/pages/Partners";
import Programs from "@/pages/Programs";
import Impact from "@/pages/Impact";
import Donate from "@/pages/Donate";
import GetInvolved from "@/pages/GetInvolved";
import Events from "@/pages/Events";
import Stories from "@/pages/Stories";
import Contact from "@/pages/Contact";
import StoryDetail from "@/pages/StoryDetail";
import NonprofitDirectory from "@/pages/NonprofitDirectory";
import NonprofitDetail from "@/pages/NonprofitDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "mission", element: <Mission /> },
      { path: "partners", element: <Partners /> },
      { path: "programs", element: <Programs /> },
      { path: "impact", element: <Impact /> },
      { path: "donate", element: <Donate /> },
      { path: "get-involved", element: <GetInvolved /> },
      { path: "events", element: <Events /> },
      { path: "stories", element: <Stories /> },
      { path: "stories/:id", element: <StoryDetail /> },
      { path: "nonprofits", element: <NonprofitDirectory /> },
      { path: "nonprofits/:id", element: <NonprofitDetail /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);
