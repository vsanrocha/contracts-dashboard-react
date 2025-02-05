import { FC } from "react";
import { Card } from "../ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  Pie,
  PieChart,
  Legend,
} from "recharts";
import { Contract } from "@/types/contract";
import dayjs from "dayjs";

interface ChartSectionProps {
  contracts: Contract[];
}

const statusLabel = {
  active: "Ativo",
  expired: "Expirado",
  pending: "Pendente de Renovação",
  close_end: "Próximo ao Vencimento",
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderColorfulLegendText = (value: string, { color, payload }: any) => {
  return <span style={{ color }}>{statusLabel[payload.payload.status]}</span>;
};

const ChartSection: FC<ChartSectionProps> = ({ contracts = [] }) => {
  const getNextSixMonths = () => {
    const months = [];
    for (let i = 0; i < 6; i++) {
      months.push(dayjs().add(i, "month").format("MMM"));
    }
    return months;
  };

  const expirationData = getNextSixMonths().map((month) => ({
    month,
    count: contracts.filter((contract) =>
        dayjs(contract.endDate).format("MMM") === month &&
        dayjs(contract.endDate).isAfter(dayjs())

    ).length,
  }));

  const statusData = contracts.reduce((acc, contract) => {
    const statusIndex = acc.findIndex(
      (status) => status.status === contract.status
    );
    if (statusIndex === -1)
      return [...acc, { status: contract.status, value: 1 }];
    else acc[statusIndex].value += 1;
    return acc;
  }, []);

  return (
    <div className="w-full p-3 sm:p-6 space-y-4 sm:space-y-6 bg-white overflow-x-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">
            Contratos a expirar nos próximos meses
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expirationData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">
            Distribuição do Status dos Contratos
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, { payload }) =>
                    `${statusLabel[payload.payload.status]}`
                  }
                />
                <Legend formatter={renderColorfulLegendText} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChartSection;
