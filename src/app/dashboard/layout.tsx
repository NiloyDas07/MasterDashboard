"use client";

import React from "react";
import NavBar from "./_components/NavBar";
import NavBarMobile from "./_components/NavBarMobile";
import { useMediaQuery } from "@/hooks/use-media-query";
import Footer from "./_components/Footer";

const DashboardLayout: React.FC = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <>
      {isMobile ? <NavBarMobile /> : <NavBar />}
      {children}
      <Footer />
    </>
  );
};

export default DashboardLayout;
