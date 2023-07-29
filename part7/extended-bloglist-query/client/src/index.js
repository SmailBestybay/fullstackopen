import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationContextProvider } from "./contexts/NotificationContext";
import { UserContestProvider } from "./contexts/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <UserContestProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </UserContestProvider>
    </QueryClientProvider>
  </Router>
);
