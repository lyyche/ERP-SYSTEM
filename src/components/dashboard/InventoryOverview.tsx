import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { BarChart, PieChart, ArrowRight, AlertCircle } from "lucide-react";
import { Progress } from "../ui/progress";

interface InventoryCategory {
  name: string;
  count: number;
  value: number;
  percentage: number;
  status: "normal" | "low" | "critical";
}

interface InventoryOverviewProps {
  categories?: InventoryCategory[];
  totalItems?: number;
  totalValue?: number;
}

const InventoryOverview = ({
  categories = [
    {
      name: "Raw Materials",
      count: 1245,
      value: 125000,
      percentage: 75,
      status: "normal",
    },
    {
      name: "Finished Goods",
      count: 890,
      value: 230000,
      percentage: 60,
      status: "normal",
    },
    {
      name: "Packaging",
      count: 450,
      value: 45000,
      percentage: 30,
      status: "low",
    },
    {
      name: "Spare Parts",
      count: 320,
      value: 85000,
      percentage: 15,
      status: "critical",
    },
    {
      name: "Work in Progress",
      count: 560,
      value: 110000,
      percentage: 45,
      status: "normal",
    },
  ],
  totalItems = 3465,
  totalValue = 595000,
}: InventoryOverviewProps) => {
  return (
    <Card className="w-full h-full bg-white dark:bg-gray-950">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">
            Inventory Overview
          </CardTitle>
          <CardDescription>
            Current inventory levels by category
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <BarChart className="h-4 w-4 mr-2" />
            Bar
          </Button>
          <Button variant="outline" size="sm">
            <PieChart className="h-4 w-4 mr-2" />
            Pie
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {categories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="font-medium">{category.name}</span>
                    {category.status === "critical" && (
                      <AlertCircle className="h-4 w-4 text-red-500 ml-2" />
                    )}
                    {category.status === "low" && (
                      <AlertCircle className="h-4 w-4 text-amber-500 ml-2" />
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {category.count} items
                  </span>
                </div>
                <Progress
                  value={category.percentage}
                  className={`h-2 ${
                    category.status === "critical"
                      ? "bg-red-100"
                      : category.status === "low"
                        ? "bg-amber-100"
                        : "bg-gray-100"
                  }`}
                />
                <div className="flex justify-between text-sm">
                  <span
                    className={`${
                      category.status === "critical"
                        ? "text-red-500"
                        : category.status === "low"
                          ? "text-amber-500"
                          : "text-gray-500"
                    }`}
                  >
                    {category.percentage}% of capacity
                  </span>
                  <span className="font-medium">
                    ${category.value.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-between h-full">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Items</p>
                    <p className="text-2xl font-bold">
                      {totalItems.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Value</p>
                    <p className="text-2xl font-bold">
                      ${totalValue.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Status</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                    <p className="text-sm text-gray-500">Normal</p>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                      {categories.filter((c) => c.status === "normal").length}
                    </p>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
                    <p className="text-sm text-gray-500">Low</p>
                    <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
                      {categories.filter((c) => c.status === "low").length}
                    </p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                    <p className="text-sm text-gray-500">Critical</p>
                    <p className="text-xl font-bold text-red-600 dark:text-red-400">
                      {categories.filter((c) => c.status === "critical").length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button className="mt-4 w-full">
              Go to Inventory Management
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryOverview;
