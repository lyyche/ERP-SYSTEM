import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  PlusCircle,
  Truck,
  Package,
  Users,
  FileText,
  BarChart3,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface QuickActionProps {
  actions?: Array<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    color?: string;
  }>;
}

const QuickActions = ({ actions }: QuickActionProps) => {
  const defaultActions = [
    {
      icon: <PlusCircle className="h-5 w-5" />,
      label: "New Order",
      onClick: () => console.log("Create new order"),
      color: "bg-blue-100 text-blue-700",
    },
    {
      icon: <Package className="h-5 w-5" />,
      label: "Add Inventory",
      onClick: () => console.log("Add inventory"),
      color: "bg-green-100 text-green-700",
    },
    {
      icon: <Truck className="h-5 w-5" />,
      label: "Schedule Delivery",
      onClick: () => console.log("Schedule delivery"),
      color: "bg-purple-100 text-purple-700",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Add Supplier",
      onClick: () => console.log("Add supplier"),
      color: "bg-amber-100 text-amber-700",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Generate Report",
      onClick: () => console.log("Generate report"),
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      label: "View Analytics",
      onClick: () => console.log("View analytics"),
      color: "bg-rose-100 text-rose-700",
    },
  ];

  const displayActions = actions || defaultActions;

  return (
    <Card className="w-full p-4 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">Quick Actions</h3>
      </div>
      <div className="flex flex-wrap gap-3 justify-start">
        <TooltipProvider>
          {displayActions.map((action, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className={`flex items-center gap-2 ${action.color || "bg-gray-100 text-gray-700"} border-none hover:bg-opacity-80`}
                  onClick={action.onClick}
                >
                  {action.icon}
                  <span>{action.label}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{action.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </Card>
  );
};

export default QuickActions;
