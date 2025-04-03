
"use client";
import _ from "lodash";
import { nanoid } from "nanoid";
import React from "react";
import { TextFade } from "../animation/TextFade";
import {Calendar, Hourglass, ChartPie,Users} from "lucide-react"
const Product = [{
    id: nanoid(),
    heading: "Shift Management",
    icon:Calendar
}, {
    id: nanoid(),
    heading: "Time & Attendance",
    icon:Hourglass
}, {
    id: nanoid(),
    heading: "Insights & Reporting",
    icon:ChartPie
}, {
    id: nanoid(),
    heading: "Employee Benefits",
    icon:Users
},]
export default function Features() {
    return <TextFade direction="up" className="flex justify-center items-center">
        <div className="w-auto flex justify-center items-center md:flex-row flex-col gap-5">{_.map(Product, (item) => <div key={item.id} className="w-full md:w-auto md:p-10 p-5 border border-gray-200 rounded-xl font-semibold flex justify-center items-center flex-col gap-5">
            <item.icon />
            <h3>{item.heading}</h3>
        </div>)}</div>
    </TextFade>


}