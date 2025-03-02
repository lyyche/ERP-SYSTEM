import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Doughnut } from "recharts";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Badge } from "../ui/badge";

interface OrderStatusChartProps {
  data?: {
    name: string;
    value: number;
    color: string;
  }[];
}

const OrderStatusChart = ({
  data = [
    { name: "New", value: 25, color: "#3b82f6" },
    { name: "Processing", value: 35, color: "#f59e0b" },
    { name: "Shipped", value: 20, color: "#10b981" },
    { name: "Delivered", value: 15, color: "#6366f1" },
    { name: "Cancelled", value: 5, color: "#ef4444" },
  ],
}: OrderStatusChartProps) => {
  // Calculate total orders
  const totalOrders = data.reduce((sum, item) => sum + item.value, 0);

  // Calculate percentages
  const dataWithPercentage = data.map((item) => ({
    ...item,
    percentage: Math.round((item.value / totalOrders) * 100),
  }));

  return (
    <Card className="w-full h-full bg-white dark:bg-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Order Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col h-full">
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} orders`, "Count"]}
                  labelFormatter={() => ""}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {dataWithPercentage.map((status, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: status.color }}
                  />
                  <span className="text-sm font-medium">{status.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{status.value} orders</span>
                  <Badge variant="outline" className="text-xs">
                    {status.percentage}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderStatusChart;
