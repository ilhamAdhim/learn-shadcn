"use client"

import { Overview } from "@/components/composites/overview";
import { RecentTransaction } from "@/components/composites/recent-transaction";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { transactionRecords } from "@/store";
import { useAtomValue } from "jotai/react";
import { CreditCardIcon, DollarSignIcon, TrendingDownIcon, UserIcon } from "lucide-react";
import Link from "next/link";

// Data mock
const data = [
    {
      "id": "Income",
      "color": "green",
      "data": [
        {
          "x": "Jan",
          "y": Math.floor(Math.random() * 10000000) + 1000
        },
        {
          "x": "Feb",
          "y": Math.floor(Math.random() * 10000000) + 1000
        },
        {
          "x": "March",
          "y": Math.floor(Math.random() * 10000000) + 1000
        },
        {
          "x": "Apr",
          "y": Math.floor(Math.random() * 10000000) + 1000
        },
        {
          "x": "May",
          "y": Math.floor(Math.random() * 10000000) + 1000
        },
        {
          "x": "Jun",
          "y": Math.floor(Math.random() * 10000000) + 1000
        },
        {
          "x": "Jul",
          "y": Math.floor(Math.random() * 10000000) + 1000
        },
        {
          "x": "Aug",
          "y": Math.floor(Math.random() * 10000000) + 1000
        },
        {
          "x": "Sep",
          "y": Math.floor(Math.random() * 10000000) + 1000
        },
        {
          "x": "Oct",
          "y": Math.floor(Math.random() * 10000000) + 1000
        },
        {
          "x": "Nov",
          "y": Math.floor(Math.random() * 10000000) + 1000
        },
        {
          "x": "Dec",
          "y": Math.floor(Math.random() * 10000000) + 1000
        }
      ]
    },
    {
      "id": "Expenses",
      "color": "#bf4b39",
      "data": [
        {
          "x": "Jan",
          "y": Math.floor(Math.random() * 10000000) + 1000
        },
        {
          "x": "Feb",
          "y": Math.floor(Math.random() * 10000000) + 1000
        },
        {
          "x": "March",
          "y": Math.floor(Math.random() * 10000000) + 1000
        },
        {
          "x": "Apr",
          "y": Math.floor(Math.random() * 10000000) + 1000
        },
        {
          "x": "May",
          "y": Math.floor(Math.random() * 10000000) + 1000
        },
        {
          "x": "Jun",
          "y": Math.floor(Math.random() * 10000000) + 1000
        },
        {
          "x": "Jul",
          "y": Math.floor(Math.random() * 10000000) + 1000
        },
        {
          "x": "Aug",
          "y": Math.floor(Math.random() * 10000000) + 1000
        },
        {
          "x": "Sep",
          "y": Math.floor(Math.random() * 10000000) + 1000
        },
        {
          "x": "Oct",
          "y": Math.floor(Math.random() * 10000000) + 1000
        },
        {
          "x": "Nov",
          "y": Math.floor(Math.random() * 10000000) + 1000
        },
        {
          "x": "Dec",
          "y": Math.floor(Math.random() * 10000000) + 1000
        }
      ]
    }
  ]

const dataStats = [
    {
        title: "Total Revenue",
        description: "+20.1% from last month",
        value: "$45,231.89",
        icon: <DollarSignIcon fontSize={12} color="gray" />
    },
    {
        title: "Subscriptions",
        description: "+180.1% from last month",
        value: "+2350",
        icon: <UserIcon fontSize={12} color="gray" />
    },
    {
        title: "Transaction",
        description: "+19% from last month",
        value: "+12,234",
        icon: <CreditCardIcon fontSize={12} color="gray" />
    },
    {
        title: "Active Now",
        description: "+201 since last month",
        value: "+573",
        icon: <TrendingDownIcon fontSize={12} color="gray" />
    },

]

function OverviewScreen() {
    const recentTransaction = useAtomValue(transactionRecords)

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {dataStats.map((item, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {item.title}
                            </CardTitle>
                            {item.icon}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{item.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {item.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2 h-[400px]">
                        <Overview data={data} />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <div className="flex space-between">
                        <CardHeader className="grow">
                            <CardTitle>Recent Transaction</CardTitle>
                            <CardDescription>
                                You made {recentTransaction.length} sales this month.
                            </CardDescription>
                        </CardHeader>
                        <div className="p-4">
                            <Link href="/transaction">
                            <Button className="my-auto">Read more</Button>
                            </Link>
                        </div>
                    </div>
                    <CardContent>
                        <RecentTransaction />
                    </CardContent>
                </Card>
            </div>
        </>);
}

export default OverviewScreen;