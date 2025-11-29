import React from "react";

const stats = [
  { label: "ПАТЕНТ", value: "110+" },
  { label: "ЖИЛ", value: "45" },
  { label: "УЛС ОРОН", value: "17" },
  { label: "ФУНТ", value: "22,964,894,212" },
];

export const StatsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 border-t border-gray-200 pt-8 lg:pt-10">
      {stats.map((stat, index) => (
        <div key={index} className="flex flex-col">
          <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest mb-2 font-medium">
            {stat.label}
          </span>
          <span
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-gray-900 truncate"
            title={stat.value}
          >
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
};
