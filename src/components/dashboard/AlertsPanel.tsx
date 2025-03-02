import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Package,
  Truck,
  AlertTriangle,
  Clock,
  ChevronRight,
} from "lucide-react";

interface AlertItem {
  id: string;
  type: "inventory" | "shipment" | "approval";
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  timestamp: string;
}

interface AlertsPanelProps {
  alerts?: AlertItem[];
  onViewAll?: () => void;
  onAlertClick?: (alert: AlertItem) => void;
}

const AlertsPanel = ({
  alerts = [
    {
      id: "1",
      type: "inventory",
      title: "Low Inventory Alert",
      description: "Product SKU-12345 has reached reorder point",
      severity: "high",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "shipment",
      title: "Delayed Shipment",
      description: "Order #87654 is delayed by 2 days",
      severity: "medium",
      timestamp: "5 hours ago",
    },
    {
      id: "3",
      type: "approval",
      title: "Purchase Order Approval",
      description: "PO-2023-056 requires your approval",
      severity: "low",
      timestamp: "1 day ago",
    },
    {
      id: "4",
      type: "inventory",
      title: "Stock Out Warning",
      description: "Product SKU-78901 will be out of stock in 3 days",
      severity: "medium",
      timestamp: "1 day ago",
    },
    {
      id: "5",
      type: "shipment",
      title: "Shipment Exception",
      description: "Order #34567 has a delivery exception",
      severity: "high",
      timestamp: "2 days ago",
    },
  ],
  onViewAll = () => console.log("View all alerts clicked"),
  onAlertClick = (alert) => console.log("Alert clicked", alert),
}: AlertsPanelProps) => {
  const getAlertIcon = (type: AlertItem["type"]) => {
    switch (type) {
      case "inventory":
        return <Package className="h-5 w-5 text-amber-500" />;
      case "shipment":
        return <Truck className="h-5 w-5 text-blue-500" />;
      case "approval":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getSeverityBadge = (severity: AlertItem["severity"]) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full h-full bg-white dark:bg-gray-800 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Bell className="h-5 w-5 text-red-500" />
            Critical Alerts
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Bell className="h-10 w-10 mx-auto mb-2 opacity-20" />
              <p>No alerts at this time</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                onClick={() => onAlertClick(alert)}
              >
                <div className="flex-shrink-0 mt-1">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm">{alert.title}</h4>
                    {getSeverityBadge(alert.severity)}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {alert.description}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <Clock className="h-3 w-3 mr-1" />
                    {alert.timestamp}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
