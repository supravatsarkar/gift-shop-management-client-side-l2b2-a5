/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetSalesHistoryGraphQuery } from "@/redux/features/sale/saleApi";
import { Label, Radio } from "keep-react";
import React, { FormEventHandler, useState } from "react";
import { TEChart } from "tw-elements-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { months } from "@/config/constants";

type TSalesHistoryGraph = { _id: string; salesCount: number };
export default function SalesHistory() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear.toString());
  const [filterCategory, setFilterCategory] = useState("daily");
  const { data, isFetching, isError } = useGetSalesHistoryGraphQuery({
    category: filterCategory,
    year: year,
  });
  //   console.log("SalesHistory data=>", data);
  const rawSalesData: TSalesHistoryGraph[] = data?.data;
  const salesData = {
    // labels: [
    //   "Monday",
    //   "Tuesday",
    //   "Wednesday",
    //   "Thursday",
    //   "Friday",
    //   "Saturday",
    //   "Sunday",
    // ],
    labels: rawSalesData?.map((item) => {
      if (filterCategory === "weekly") {
        return `week ${item._id + 1}`;
      } else if (filterCategory === "monthly") {
        return months[Number(item._id) - 1];
      }
      return item._id;
    }),
    datasets: [
      {
        label: "Sales",
        data: rawSalesData?.map((item) => {
          return item.salesCount;
        }),
      },
    ],
  };
  return (
    <div className="">
      <div className="flex justify-evenly">
        <div>
          <form
            className="flex flex-col gap-2"
            onChange={(e: any) => setFilterCategory(e.target.value)}
          >
            <legend className="mb-1 text-body-3 text-metal-600">
              Choose Category
            </legend>
            <div className="flex gap-3">
              <fieldset className="flex items-center gap-2">
                <Radio
                  variant="circle"
                  id="daily"
                  name="filterCategory"
                  value="daily"
                  defaultChecked
                />
                <Label htmlFor="daily">Daily</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2">
                <Radio
                  variant="circle"
                  id="weekly"
                  name="filterCategory"
                  value="weekly"
                />
                <Label htmlFor="weekly">Weekly</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2">
                <Radio
                  variant="circle"
                  id="monthly"
                  name="filterCategory"
                  value="monthly"
                />
                <Label htmlFor="monthly">Monthly</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2">
                <Radio
                  variant="circle"
                  id="yearly"
                  name="filterCategory"
                  value="yearly"
                />
                <Label htmlFor="yearly">Yearly</Label>
              </fieldset>
            </div>
          </form>
        </div>
        <div className={`${filterCategory === "yearly" ? "invisible" : ""}`}>
          <legend className="mb-1 text-body-3 text-metal-600">
            Choose Year
          </legend>
          <Select onValueChange={(e) => setYear(e)} value={year}>
            <SelectTrigger className="w-[180px] border-slate-200 p-5">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent className="bg-gray-100">
              <SelectGroup>
                <SelectLabel>Filter By</SelectLabel>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-center">
        <div className=" lg:w-3/4 shadow-lg rounded-lg p-3">
          <TEChart type="bar" data={salesData} />
        </div>
      </div>
    </div>
  );
}
