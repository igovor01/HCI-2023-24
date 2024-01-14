"use client";

import Feature from "@/views/homepage/Feature";
import Hero from "@/views/homepage/Hero";
import FAQ from "@/views/homepage/FAQ";
import Footer from "@/views/homepage/Footer";
import LastCTA from "@/views/homepage/LastCTA";
import Testimonials from "@/views/homepage/Testimonials";
import Benefits from "@/views/homepage/Benefits";
import { useSession } from "next-auth/react";
import Spinner from "@/components/icons/Spinner";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Spinner />;
  }

  return session && session.user ? (
    <div className="flex justify-center">Welcome, {session.user.firstName}</div>
  ) : (
    <>
      <div className="bg-fixed bg-center bg-cover custom-img">
        <div className="flex flex-col max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6 py-44">
          <Hero />
        </div>
      </div>
      <div className="flex flex-col max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6 gap-44 mt-24">
        <Feature />
        <Benefits />
        <Testimonials />
        <FAQ />
        <LastCTA />
      </div>
      <div className="bg-black">
        <div className="flex flex-col max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6 mt-44">
          <Footer />
        </div>
      </div>
    </>
  );
}
