"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { GoogleLogin } from "@react-oauth/google";
import { BlurIn } from "../animation/BlurIn";
import { TextFade } from "../animation/TextFade";
import { EnterAnimation } from "../animation/PopUp";

function Hero() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="md:w-3/4 w-full flex flex-col justify-center items-center md:gap-16 gap-8 text-center">
        <EnterAnimation>
          <div className=" text-text-primary border-0 shadow-md font-medium px-4 py-2 rounded-full flex justify-start items-center gap-2 md:text-base text-sm">
            <span className="w-2 h-2 borde-0 rounded-full bg-text-primary"></span>
            <span className="text-sm">Smart Scheduling for Shift-Based Teams</span>
          </div>
        </EnterAnimation>

        <BlurIn>
          <p className="text-text-secondary text-center text-4xl font-bold tracking-tighter md:text-7xl md:leading-[5rem] mx-2">
            Create <b className="text-text-primary font-bold">shift</b>  schedules in minutes
            <br />
            <b className="text-text-primary font-bold">share</b> and{" "}
            <b className="text-text-primary font-bold">track</b> effortlessly
            {/* <span className="text-text-primary">
              virtual meeting
            </span> <br /> more human! */}
          </p>
        </BlurIn>

        <TextFade direction="up" className="md:w-3/4 w-full mx-5">
          <p className=" text-text-secondary md:text-xl text-base font-regular">
            Build and share work schedules effortlessly, track updates in
            real-time, and keep your team organized without the hassle
          </p>
        </TextFade>

        <EnterAnimation>
          <Button className="md:w-56 w-48 md:h-12 h-10 bg-text-primary hover:bg-text-primary/90 text-white md:text-lg text-sm">
            Get Started For Free
          </Button>
          <p className="text-xs mt-2">No credit card required</p>
        </EnterAnimation>
        {/* <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        /> */}
      </div>
    </div>
  );
}

export default Hero;
