"use client";
import React from "react";
import { Instagram, Facebook, Twitter } from "lucide-react"
export default function Footer() {
    return <div className="w-full min-h-60 bg-lightBlack text-white p-10">
        <div className="flex justify-between items-start flex-col gap-5 md:flex-row">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold text-text-primary">Tymar</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="cursor-pointer hover:underline text-lightGray">Features</p>
                <p className="cursor-pointer hover:underline text-lightGray">Pricing</p>
                <p className="cursor-pointer hover:underline text-lightGray">Contact Us</p>
                <p className="cursor-pointer hover:underline text-lightGray">Faq</p>
            </div>
        </div>
        <hr className="w-full border border-darkGray my-10" />
        <div className="flex md:justify-between justify-start md:items-center items-start md:flex-row flex-col-reverse gap-5">
            <div className="flex md:flex-row flex-col-reverse md:gap-5 gap-2 text-lightGray md:text-base text-sm">
                <p className="cursor-pointer"> Tymar {new Date().getFullYear()} All rights reserved</p>
                <p className="cursor-pointer hover:underline">Terms of Service</p>
                <p className="cursor-pointer hover:underline">Privacy Policy</p>
                <p className="cursor-pointer hover:underline">Refund Policy</p>
            </div>
            <div className="flex gap-5">
                <Instagram className="cursor-pointer size-5" />
                <Facebook className="cursor-pointer size-5" />
                <Twitter className="cursor-pointer size-5" />
            </div>
        </div>
    </div>
}