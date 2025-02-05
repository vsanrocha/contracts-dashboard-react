import React from "react";
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

interface ChartSectionProps {
  expirationData?: Array<{
    month: string;
    count: number;
  }>;
  statusData?: Array<{
    status: string;
    value: number;
  }>;
}

const defaultExpirationData = [
  { month: "Jan", count: 4 },
  { month: "Feb", count: 3 },
  { month: "Mar", count: 6 },
  { month: "Apr", count: 8 },
  { month: "May", count: 5 },
  { month: "Jun", count: 7 },
];

const defaultStatusData = [
  { status: "Active", value: 45 },
  { status: "Pending", value: 25 },
  { status: "Expired", value: 20 },
  { status: "Draft", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ChartSection: React.FC<ChartSectionProps> = ({
  expirationData = defaultExpirationData,
  statusData = defaultStatusData,
}) => {
  return (
    <div className="w-full p-3 sm:p-6 space-y-4 sm:space-y-6 bg-white overflow-x-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contract Expirations Chart */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Contract Expirations</h3>
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

        {/* Status Distribution Chart */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">
            Contract Status Distribution
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
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
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChartSection;
