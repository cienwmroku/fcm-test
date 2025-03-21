import { Outlet } from "react-router";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { getToken, onMessage } from "firebase/messaging";
import { messaging, vapidKey } from "../firebase";
import { useNotifications } from "@toolpad/core";

export default function Layout() {
  const notification = useNotifications();

  navigator.serviceWorker.getRegistrations().then((registrations) => {
    if (registrations.length === 0) {
      window.location.reload();
    }
  });

  console.log("Requesting permission...");

  Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        getToken(messaging, { vapidKey: vapidKey })
          .then((x) => {
            console.log(x);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
    .catch((error) => {
      console.log(error);
    });

  onMessage(messaging, (x) => {
    notification.show(x.notification?.body);
  });

  return (
    <DashboardLayout defaultSidebarCollapsed={true}>
      <PageContainer title="">
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}
