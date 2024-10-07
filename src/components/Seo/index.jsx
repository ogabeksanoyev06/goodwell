import React from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import get from "lodash/get";

const SEO = ({ title, description, alias }) => {
  const { seo, currentLangCode } = useSelector((state) => state.system);

  // alias orqali SEO ma'lumotini topish
  const item = seo.find((s) => s.alias === alias);
  
  // redux'dan meta_title va meta_descriptionni olish
  const metaTitle = get(item, `meta_title_${currentLangCode}`);
  const metaDescription = get(item, `meta_description_${currentLangCode}`);

  return (
    <Helmet>
      <title>
        {title
          ? title
          : metaTitle
          ? metaTitle
          : "Goodwell - Бытовая техника – это сердце уютного и комфортабельного дома."}
      </title>
      <meta
        name="description"
        content={
          description
            ? description
            : metaDescription
            ? metaDescription
            : "Goodwell - самые низкие цены в Узбекистане"
        }
      />
    </Helmet>
  );
};

export default SEO;
