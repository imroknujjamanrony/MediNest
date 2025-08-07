import Banner from "@/components/page/Home/Banner";
import FeaturedDoctor from "@/components/page/Home/FeaturedDoctor";
import TopSpecialist from "@/components/page/Home/TopSpecialist";
import WhyUs from "@/components/page/Home/WhyUs";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <TopSpecialist></TopSpecialist>
      <FeaturedDoctor></FeaturedDoctor>
      <WhyUs></WhyUs>
    </div>
  );
}
