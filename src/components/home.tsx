import React, { useState } from "react";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import KpiCards from "./dashboard/KpiCards";
import AlertsPanel from "./dashboard/AlertsPanel";
import InventoryOverview from "./dashboard/InventoryOverview";
import OrderStatusChart from "./dashboard/OrderStatusChart";
import DeliveryPerformance from "./dashboard/DeliveryPerformance";
import QuickActions from "./dashboard/QuickActions";

const Home = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In a real implementation, you would apply the theme to the document
    // document.documentElement.classList.toggle('dark');
  };

  return (
    <div
      className={`flex h-screen w-full bg-gray-50 ${isDarkMode ? "dark" : ""}`}
    >
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        userName="John Doe"
        userRole="Supply Chain Manager"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          userName="John Doe"
          userRole="Supply Chain Manager"
          notificationCount={5}
        />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto space-y-6">
            {/* KPI Cards */}
            <section>
              <KpiCards />
            </section>

            {/* Quick Actions */}
            <section>
              <QuickActions />
            </section>

            {/* Main Dashboard Widgets */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Alerts Panel */}
              <div className="lg:col-span-1">
                <AlertsPanel />
              </div>

              {/* Inventory Overview */}
              <div className="lg:col-span-2">
                <InventoryOverview />
              </div>
            </section>

            {/* Charts Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Status Chart */}
              <div>
                <OrderStatusChart />
              </div>

              {/* Delivery Performance */}
              <div>
                <DeliveryPerformance />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
