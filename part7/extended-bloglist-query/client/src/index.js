import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationContextProvider } from "./contexts/NotificationContext";
import { UserContestProvider } from "./contexts/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <UserContestProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </UserContestProvider>
  </QueryClientProvider>
);
