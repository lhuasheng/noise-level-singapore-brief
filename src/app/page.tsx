import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import StatRow from "@/components/StatRow";
import Spectrum from "@/components/Spectrum";
import CompareTable from "@/components/CompareTable";
import Weekday from "@/components/Weekday";
import Ceilings from "@/components/Ceilings";
import Penalties from "@/components/Penalties";
import Drivers from "@/components/Drivers";
import OneLiners from "@/components/OneLiners";
import Sources from "@/components/Sources";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatRow />
        <Spectrum />
        <CompareTable />
        <Weekday />
        <Ceilings />
        <Penalties />
        <Drivers />
        <OneLiners />
        <Sources />
      </main>
      <Footer />
    </>
  );
}
