import React from "react";
import {
  ArrowUp,
  ArrowDown,
  DollarSign,
  Package,
  Truck,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KpiCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  bgColor?: string;
}

const KpiCard = ({
  title = "Metric",
  value = "0",
  change,
  icon = <DollarSign className="h-5 w-5" />,
  bgColor = "bg-white",
}: KpiCardProps) => {
  return (
    <Card className={`${bgColor} border-none shadow-md`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div
          className={`rounded-full p-2 ${bgColor === "bg-white" ? "bg-gray-100" : "bg-white/20"}`}
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="flex items-center mt-1">
            {change.isPositive ? (
              <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span
              className={`text-xs ${change.isPositive ? "text-green-500" : "text-red-500"}`}
            >
              {change.value} {change.isPositive ? "increase" : "decrease"}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface KpiCardsProps {
  cards?: KpiCardProps[];
}

const KpiCards = ({ cards }: KpiCardsProps) => {
  const defaultCards: KpiCardProps[] = [
    {
      title: "Total Inventory Value",
      value: "$1,245,890",
      change: {
        value: "8.2%",
        isPositive: true,
      },
      icon: <DollarSign className="h-5 w-5 text-blue-600" />,
      bgColor: "bg-blue-50",
    },
    {
      title: "Pending Orders",
      value: "142",
      change: {
        value: "12.5%",
        isPositive: false,
      },
      icon: <Package className="h-5 w-5 text-amber-600" />,
      bgColor: "bg-amber-50",
    },
    {
      title: "On-Time Delivery Rate",
      value: "94.2%",
      change: {
        value: "3.1%",
        isPositive: true,
      },
      icon: <Truck className="h-5 w-5 text-green-600" />,
      bgColor: "bg-green-50",
    },
    {
      title: "Active Suppliers",
      value: "87",
      change: {
        value: "5.3%",
        isPositive: true,
      },
      icon: <Users className="h-5 w-5 text-purple-600" />,
      bgColor: "bg-purple-50",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayCards.map((card, index) => (
          <KpiCard
            key={index}
            title={card.title}
            value={card.value}
            change={card.change}
            icon={card.icon}
            bgColor={card.bgColor}
          />
        ))}
      </div>
    </div>
  );
};

export default KpiCards;
