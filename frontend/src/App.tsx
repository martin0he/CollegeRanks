import { Divider } from "@mui/material";
import { MainLayout } from "./components/main-layout/main-layout.component";
import { SectionContainer } from "./components/section-container/section-container.component";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RankingsPage } from "./pages/RankingsPage";
import { ReviewPage } from "./pages/ReviewPage";
import { SignupPage } from "./pages/SignupPage";
import { SectionIdEnum } from "./types/section-id/section-id";
import { SchoolInfoPage } from "./pages/SchoolInfoPage";

const sections = [
  {
    sectionId: SectionIdEnum.home,
    component: <HomePage />,
  },
  {
    sectionId: SectionIdEnum.ranking,
    component: <RankingsPage />,
  },
  {
    sectionId: SectionIdEnum.review,
    component: <ReviewPage />,
  },
  {
    sectionId: SectionIdEnum.schoolinfo,
    component: <SchoolInfoPage />,
  },
  {
    sectionId: SectionIdEnum.login,
    component: <LoginPage />,
  },
  {
    sectionId: SectionIdEnum.signup,
    component: <SignupPage />,
  },
  
];

export const App: React.FC = () => {
  return (
    <MainLayout>
      {sections.map(({ component, sectionId }) => {
        return (
          <SectionContainer sectionId={sectionId} key={sectionId}>
            <Divider />
            {component}
          </SectionContainer>
        );
      })}
    </MainLayout>
  );
};
