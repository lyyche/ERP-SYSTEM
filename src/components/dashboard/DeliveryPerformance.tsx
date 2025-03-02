import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon } from "lucide-react";

interface DeliveryPerformanceProps {
  data?: DeliveryDataPoint[];
  title?: string;
  trend?: "up" | "down" | "stable";
  currentRate?: number;
}

interface DeliveryDataPoint {
  month: string;
  onTimeRate: number;
  targetRate: number;
}

const DeliveryPerformance = ({
  data = defaultData,
  title = "Delivery Performance",
  trend = "up",
  currentRate = 94.5,
}: DeliveryPerformanceProps) => {
  const trendIcon = {
    up: <ArrowUpIcon className="h-4 w-4 text-green-500" />,
    down: <ArrowDownIcon className="h-4 w-4 text-red-500" />,
    stable: <TrendingUpIcon className="h-4 w-4 text-blue-500" />,
  };

  const trendColor = {
    up: "text-green-500",
    down: "text-red-500",
    stable: "text-blue-500",
  };

  const trendText = {
    up: "Improving",
    down: "Declining",
    stable: "Stable",
  };

  return (
    <Card className="w-full h-full bg-white dark:bg-gray-800 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">{currentRate}%</span>
          <div className="flex items-center">
            {trendIcon[trend]}
            <span className={`text-sm ml-1 ${trendColor[trend]}`}>
              {trendText[trend]}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#E5E7EB" }}
              />
              <YAxis
                tickFormatter={(value) => `${value}%`}
                domain={[70, 100]}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, "On-time Rate"]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="onTimeRate"
                name="On-time Delivery"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="targetRate"
                name="Target Rate"
                stroke="#9CA3AF"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Trend analysis shows {trendText[trend].toLowerCase()} on-time
            delivery performance over the last 6 months.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const defaultData: DeliveryDataPoint[] = [
  { month: "Jan", onTimeRate: 85, targetRate: 90 },
  { month: "Feb", onTimeRate: 88, targetRate: 90 },
  { month: "Mar", onTimeRate: 87, targetRate: 90 },
  { month: "Apr", onTimeRate: 90, targetRate: 90 },
  { month: "May", onTimeRate: 92, targetRate: 90 },
  { month: "Jun", onTimeRate: 94.5, targetRate: 90 },
];

export default DeliveryPerformance;
