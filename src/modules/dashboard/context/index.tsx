import dayjs from "dayjs";
import React, { PropsWithChildren, createContext, useState } from "react";

type DashboardContextType = {
  dateRange: [number, number];
  setDateRange: React.Dispatch<React.SetStateAction<[number, number]>>;
};

export const DashboardContext = createContext<DashboardContextType>(
  {} as DashboardContextType
);

export const DashboardContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [dateRange, setDateRange] = useState<[number, number]>([
    dayjs().subtract(7, "days").startOf("day").valueOf(),
    dayjs().endOf("day").valueOf(),
  ]);

  return (
    <DashboardContext.Provider
      value={{
        setDateRange,
        dateRange,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
