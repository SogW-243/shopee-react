// 📄 File: src/pages/HomePage/index.tsx

import React from "react";
import HeroSection from "./components/HeroSection";
import CategorySection from "./components/CategorySection";
import FlashSale from "./components/FlashSale";
import ShopeeMall from "./components/ShopeeMall";
import TopSearches from "./components/TopSearches";
import DailySuggestions from "./components/DailySuggestions";

function HomePage() {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <FlashSale />
      <ShopeeMall />
      <TopSearches />
      <DailySuggestions />
    </div>
  );
}

export default HomePage;
