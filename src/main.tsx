// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import App from "./App";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Tạo QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Không retry khi lỗi
      refetchOnWindowFocus: false // Không refetch khi focus lại cửa sổ
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider
            theme={{
              token: {
                // có thể tùy chỉnh màu chủ đề tại đây
              },
            }}
          >
            <App />
          </ConfigProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
