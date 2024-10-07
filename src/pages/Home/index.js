import React, { useEffect, useRef } from "react";
import Banner from "./sections/banner";
import Categories from "./sections/categories";
import Products from "./sections/products";
import { useDispatch, useSelector } from "react-redux";
import SystemActions from "../../store/actions/system";
import AboutUs from "./sections/aboutUs";
import BranchSection from "./sections/branchSection";
import NewsSection from "./sections/newsSection";
import VideoSection from "./sections/videoSection";
import FaqSection from "./sections/faqSection";
import AboutCompany from "./sections/about-company/aboutCompany";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { Seo } from "../../components";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const isMobile = useSelector((state) => state.system.isMobile);
  const currentLangCode = useSelector((state) => state.system.currentLangCode);
  const { t } = useTranslation("main");

  const component = useRef();
  const slider = useRef();

  const dispatch = useDispatch();
  const banners = useSelector((state) => state.system.banners);
  const categories = useSelector((state) => state.system.categories);
  const homeProducts = useSelector((state) => state.system.homeProducts);
  const homeNews = useSelector((state) => state.system.homeNews);
  const homeVideos = useSelector((state) => state.system.homeVideos);
  const faqs = useSelector((state) => state.system.faqs);

  useEffect(() => {
    if (banners.length < 1) dispatch(SystemActions.GetBanners());
    if (homeProducts.length < 1) dispatch(SystemActions.GetHomeProducts());
    if (homeNews.length < 1) dispatch(SystemActions.GetHomeNews());
    if (homeVideos.length < 1) dispatch(SystemActions.GetHomeVideo());
    if (faqs.length < 1) dispatch(SystemActions.GetFaqs());
  }, []);

  return (
    <div className="site-wrapper" ref={component}>
      <Seo alias={"home"} />
      <Banner {...{ banners, currentLangCode }} />
      <Categories {...{ categories, currentLangCode, t }} />
      <Products {...{ homeProducts, currentLangCode, t }} />
      {!isMobile && (
        <div className="about-company-wrap">
          <div className="about-company-sticky">
            <section className={"about-company"} ref={slider}>
              <AboutCompany {...{ currentLangCode, t }} />
            </section>
          </div>
        </div>
      )}
      <AboutUs {...{ currentLangCode, t }} />
      <BranchSection {...{ currentLangCode, t }} />
      <NewsSection
        items={homeNews}
        hasAllBtn={true}
        {...{ currentLangCode, t }}
      />
      <VideoSection items={homeVideos} {...{ currentLangCode, t }} />
      <FaqSection items={faqs} {...{ currentLangCode, t }} />
    </div>
  );
};

export default Index;
