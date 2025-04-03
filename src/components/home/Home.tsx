import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import Product from "./Product";
import Section from "@/components/section/Section";
import Navbar from "../layout/Navbar";
import Faq from "./Faq";
import Footer from "./Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Section heading="One hub for a happier, more productive team.">
        <Product />
      </Section>
      <Section heading="Features">
        <Features />
      </Section>
      <Section heading="Faq">
        <Faq/>
      </Section>
      <Footer/>
    </>
  );
}

export default Home;
