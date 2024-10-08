"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

interface IPieChartSpent {
  data: {
    id: number;
    label: string;
    value: number;
    fill: string;
  }[];
}

interface MapChartConfig {
  [key: string]: {
    label: string;
  };
}

const chartConfig = ({ data }: IPieChartSpent) => {
  return data.reduce((acc, curr) => {
    acc[curr.label] = { label: curr.label };
    return acc;
  }, {} as MapChartConfig) satisfies ChartConfig;
};

const PieChartSpent = ({ data }: IPieChartSpent) => {
  return (
    <ChartContainer config={chartConfig({ data })} className="mx-auto aspect-square max-h-[400px]">
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              className="w-[150px]"
              formatter={(value, name, item) => {
                return (
                  <>
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                      style={
                        {
                          "--color-bg": item.payload.fill || "",
                        } as React.CSSProperties
                      }
                    />
                    {name}
                    <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                      {value}
                      <span className="font-normal text-muted-foreground">%</span>
                    </div>
                  </>
                );
              }}
            />
          }
        />
        <Pie data={data} dataKey="value" nameKey="label" innerRadius={80} strokeWidth={5}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-xl font-bold"
                    >
                      Budget
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Allocations
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};

export default PieChartSpent;
