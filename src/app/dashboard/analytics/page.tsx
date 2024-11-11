import React from "react";
import LineChart from "./_components/LineChart";
import BarChart from "./_components/BarChart";
import Users from "./_components/Users";

const AnalyticsPage: React.FC = () => {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <section aria-label="Line Chart">
          <LineChart />
        </section>
        <section aria-label="Bar Chart">
          <BarChart />
        </section>
      </div>

      <section className="p-4">
        <Users />
      </section>
    </main>
  );
};

export default AnalyticsPage;
