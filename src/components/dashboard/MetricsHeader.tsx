import { FC, ReactNode } from "react";
import { Card, CardContent } from "../ui/card";
import { ArrowUpRight, ArrowDownRight, Clock, DollarSign } from "lucide-react";
import { Contract } from "@/types/contract";
import { formatCurrency } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: ReactNode;
}

const MetricCard: FC<MetricCardProps> = ({
  title = "Metric",
  value = "0",
  trend = 0,
  icon = <DollarSign className="h-4 w-4" />,
}) => {
  const isPositive = trend >= 0;

  return (
    <Card
      className="bg-white cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onMetricClick?.(title.toLowerCase())}
    >
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
        </div>
        {trend !== undefined && (
          <div className="flex items-center mt-4 space-x-2 self-end">
            {isPositive ? (
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            )}
            <span
              className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}
            >
              {Math.abs(trend)}%
            </span>
            <span className="text-sm text-muted-foreground">
              from last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface MetricsHeaderProps {
  contracts: Contract[];
}

const MetricsHeader: FC<MetricsHeaderProps> = ({contracts}) => {

  const contractsCount=contracts?.length || 0
  const activeContracts= contracts?.filter((c) => c.status === "active").length || 0
  const expiringContracts= contracts?.filter((c) => c.status === "expired").length || 0

  const totalAmount=
    contracts?.reduce((sum, c) => sum + c.amount, 0) || 0

  const metrics = [
    {
      title: "Total de Contratos",
      value: contractsCount,
      trend: 12,
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      title: "Contratos Ativos",
      value: activeContracts,
      trend: 8,
      icon: <ArrowUpRight className="h-4 w-4" />,
    },
    {
      title: "Contratos Próximos ao Vencimento",
      value: expiringContracts,
      trend: -5,
      icon: <Clock className="h-4 w-4" />,
    },
    {
      title: "Valor Total dos Contratos",
      value: formatCurrency(totalAmount),
      trend: 15,
      icon: <DollarSign className="h-4 w-4" />,
    },
  ];

  return (
    <div className="w-full bg-gray-50 p-3 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            trend={metric.trend}
            icon={metric.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default MetricsHeader;
