import { Outlet } from "react-router";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import type { Navigation } from "@toolpad/core/AppProvider";

const navigation: Navigation = [
  {
    segment: "test",
    title: "Test",
  },
];

const BRANDING = {
  title: "test",
};

export default function App() {
  return (
    <ReactRouterAppProvider navigation={navigation} branding={BRANDING}>
      <Outlet />
    </ReactRouterAppProvider>
  );
}
