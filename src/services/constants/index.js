import React from "react";

export const constants = {
  SHOW_PHONE: 2,
  showRooms: [
    {
      id: 1,
      number: '01',
      name_uz: "Toshkent City",
      name_ru: "Tashkent City",
      name_en: "Tashkent City",
      description_uz: "Toshkent sh, Furqat ko'chasi 1A",
      description_ru: 'Улица Фурката 1A, Ташкент',
      description_en: 'Tashkent, Furkat street 1A'
    },
    {
      id: 2,
      number: '02',
      name_uz: "Brend shop",
      name_ru: "Бренд шоп",
      name_en: "Brand shop",
      description_uz: "Toshkent Bobur ko'chasi, 34-uy",
      description_ru: "Улица Бабура 34, Ташкент",
      description_en: "Tashkent, Babur street 34"
    }
  ],
  homeAboutSections: [
    {
      name_uz: "Biz haqimizda",
      name_ru: "О нас",
      name_en: "О нас",
      description_uz: 'Goodwell brendi 2008 yilda tashkil etilgan. Ko\'p yillar davomida biz mijozlarimizni Yevropa sifat standartlari bo\'yicha ishlab chiqarilgan yuqori sifatli maishiy texnika bilan ta\'minlashga harakat qilmoqdamiz',
      description_ru: 'Бренд Goodwell был основан в 2008 году. На протяжении многих лет мы стараемся предоставлять нашим покупателям качественную бытовую технику, изготовленную по европейским стандартам качества',
      description_en: 'Бренд Goodwell был основан в 2008 году. На протяжении многих лет мы стараемся предоставлять нашим покупателям качественную бытовую технику, изготовленную по европейским стандартам качества'
    },
    {
      name_uz: "Maqsad",
      name_ru: "Цель",
      name_en: "Цель",
      description_uz: "Biz mijozlarimiz tomonidan yuqori darajadagi ishonchga erishishga intilamiz va kompaniyamiz va mijozlar va hamkorlar bilan o'zaro munosabatlar atrofida oilaviy muhit va tushunishni yaratishga intilamiz. Bizning asosiy muvaffaqiyatimiz, biz uy uchun maishiy texnika ishlab chiqaruvchilari orasida sifat kafolati deb hisoblashimiz mumkin",
      description_ru: "Мы стремимся достичь высокого доверия от наших клиентов и создать семейную атмосферу и понимание вокруг нашей компании и взаимодействия с клиентами и партнёрами. Главным нашим успехом можем считать что мы являемся гарантом качества среди производителей бытовой техники для дома",
      description_en: "Мы стремимся достичь высокого доверия от наших клиентов и создать семейную атмосферу и понимание вокруг нашей компании и взаимодействия с клиентами и партнёрами. Главным нашим успехом можем считать что мы являемся гарантом качества среди производителей бытовой техники для дома"
    },
    {
      name_uz: "Sifat",
      name_ru: "Качество",
      name_en: "Качество",
      description_uz: "Mahsulot batafsil aniqlik va uzoq xizmat muddati kafolati bilan ishlab chiqariladi. Goodwell mahsulotini sotib olganingizda, u sizga uzoq vaqt xizmat qilishiga amin bo'lishingiz mumkin",
      description_ru: "Продук произведен с детальной точность и гарантией долгосрочной службы. Когда вы покупаете продукт компании Goodwell, можете быть уверенными что он прослужит вам долго",
      description_en: "Продук произведен с детальной точность и гарантией долгосрочной службы. Когда вы покупаете продукт компании Goodwell, можете быть уверенными что он прослужит вам долго"
    }
  ],
  footerDescription: {
    uz: "Gudwell muvaffaqiyat uchun ishonchli hamkoringizdir. Bizning vazifamiz sizning biznesingiz uchun tengsiz sifat va professionallikni ta'minlovchi innovatsion yechimlarni yaratishdir. Bizga ishoning va Goodwell bilan yangi marralarni zabt eting.",
    ru: "Goodwell - ваш надежный партнер в достижении успеха. Наша миссия - создавать инновационные решения для вашего бизнеса, обеспечивая непревзойденное качество и профессионализм. Доверьтесь нам и достигните новых высот с Goodwell.",
    en: "Goodwell - ваш надежный партнер в достижении успеха. Наша миссия - создавать инновационные решения для вашего бизнеса, обеспечивая непревзойденное качество и профессионализм. Доверьтесь нам и достигните новых высот с Goodwell."
  },
  aboutUsPageTopDescription: {
    uz: 'Maishiy texnika shinam va farovon uyning yuragi hisoblanadi. Bu odamlarga qo\'shimcha bo\'sh vaqt beradi va ularning kundalik tashvishlarini sezilarli darajada osonlashtiradi. Shu bois Goodwell brendi so‘nggi 14 yil davomida xalqaro standartlarga muvofiqligi kabi afzalliklari bilan ajralib turadi.',
    ru: 'Бытовая техника – это сердце уютного и комфортабельного дома. Она дарит людям дополнительное свободное время и значительно облегчает их ежедневные заботы. Вот почему бренд Goodwell на протяжении вот уже 14 лет отличают такие достоинства, как соответствие международным стандартам.',
    en: 'Бытовая техника – это сердце уютного и комфортабельного дома. Она дарит людям дополнительное свободное время и значительно облегчает их ежедневные заботы. Вот почему бренд Goodwell на протяжении вот уже 14 лет отличают такие достоинства, как соответствие международным стандартам.',
  },
  aboutUsPageAdvantages: [
    {
      id: 1,
      title_uz: "To'g'ridan-to'g'ri kafolat",
      title_ru: 'Прямая гарантии',
      title_en: 'Прямая гарантии',
      description_uz: 'Гарантия Goodwell – это обещание надежности и долговечности наших продуктов. Мы гордимся высоким стандартом качества, который подтверждается нашей гарантией, предоставляющей клиентам полное спокойствие и уверенность в их выборе. Профессионализм и забота о наших клиентах - вот основные принципы, которые определяют нашу гарантию. С нами ваш выбор поддерживается обязательством выдающегося качества.',
      description_ru: 'Гарантия Goodwell – это обещание надежности и долговечности наших продуктов. Мы гордимся высоким стандартом качества, который подтверждается нашей гарантией, предоставляющей клиентам полное спокойствие и уверенность в их выборе. Профессионализм и забота о наших клиентах - вот основные принципы, которые определяют нашу гарантию. С нами ваш выбор поддерживается обязательством выдающегося качества.',
      description_en: 'Гарантия Goodwell – это обещание надежности и долговечности наших продуктов. Мы гордимся высоким стандартом качества, который подтверждается нашей гарантией, предоставляющей клиентам полное спокойствие и уверенность в их выборе. Профессионализм и забота о наших клиентах - вот основные принципы, которые определяют нашу гарантию. С нами ваш выбор поддерживается обязательством выдающегося качества.',
      image: require("../../assets/icon/aboutItem1.svg")
    },
    {
      id: 2,
      title_uz: 'Zamonaviy dizayn',
      title_ru: 'Современный дизайн',
      title_en: 'Современный дизайн',
      description_uz: 'Дизайн от Goodwell – это совершенство формы и функциональности, сочетание современных тенденций и практичности. Наши творческие команды стремятся к инновациям, создавая эстетически привлекательные и эргономичные решения. Погружайтесь в мир современного дизайна с Goodwell, где каждая деталь выражает современные тренды и подчеркивает ваш индивидуальный стиль',
      description_ru: 'Дизайн от Goodwell – это совершенство формы и функциональности, сочетание современных тенденций и практичности. Наши творческие команды стремятся к инновациям, создавая эстетически привлекательные и эргономичные решения. Погружайтесь в мир современного дизайна с Goodwell, где каждая деталь выражает современные тренды и подчеркивает ваш индивидуальный стиль',
      description_en: 'Дизайн от Goodwell – это совершенство формы и функциональности, сочетание современных тенденций и практичности. Наши творческие команды стремятся к инновациям, создавая эстетически привлекательные и эргономичные решения. Погружайтесь в мир современного дизайна с Goodwell, где каждая деталь выражает современные тренды и подчеркивает ваш индивидуальный стиль',
      image: require("../../assets/icon/aboutItem2.svg")
    },
    {
      id: 3,
      title_uz: 'Yuqori xavfsizlik',
      title_ru: 'Высокая безопасность',
      title_en: 'Высокая безопасность',
      description_uz: 'Безопасность наших клиентов - наш приоритет номер один. Goodwell обеспечивает высший стандарт безопасности для ваших данных, продуктов и услуг. Мы активно внедряем передовые технологии и строгие процессы, гарантируя вам надежную защиту и спокойствие в цифровом мире. С Goodwell вы можете быть уверены в том, что ваша безопасность находится в надежных руках.',
      description_ru: 'Безопасность наших клиентов - наш приоритет номер один. Goodwell обеспечивает высший стандарт безопасности для ваших данных, продуктов и услуг. Мы активно внедряем передовые технологии и строгие процессы, гарантируя вам надежную защиту и спокойствие в цифровом мире. С Goodwell вы можете быть уверены в том, что ваша безопасность находится в надежных руках.',
      description_en: 'Безопасность наших клиентов - наш приоритет номер один. Goodwell обеспечивает высший стандарт безопасности для ваших данных, продуктов и услуг. Мы активно внедряем передовые технологии и строгие процессы, гарантируя вам надежную защиту и спокойствие в цифровом мире. С Goodwell вы можете быть уверены в том, что ваша безопасность находится в надежных руках.',
      image: require("../../assets/icon/aboutItem3.svg")
    }
  ],
  aboutUsPageContent: {
    uz: <div>
      <p>"Goodwell" - bu innovatsion texnologiyalar va ajoyib nemis sifatiga ega kompaniya
        sanoatning oldingi qatorida mahsulotlar yaratish uchun bir-biriga bog'langan. Bizning
        ishlab chiqarish ilg'or texnologiyalarga asoslangan bo'lib, eng yuqori standartni ta'minlaydi
        ishlab chiqarish jarayonining har bir bosqichida samaradorlik va ishonchlilik.</p>
      <p>Bizning texnologiya nuqtai nazarimiz bizning hayotimizni o'zgartiradigan innovatsiyalarga qaratilgan
        mahsulotlarni nafaqat funktsional narsaga aylantiradi. Biz doimo yangilarini o'rganamiz
        uchun noyob va samarali echimlarni yaratish usullari va materiallari
        mijozlar.</p>
      <p>"Goodwell" - bu innovatsion texnologiyalar va ajoyib nemis sifatiga ega kompaniya
        sanoatning oldingi qatorida mahsulotlar yaratish uchun bir-biriga bog'langan. Bizning
        ishlab chiqarish ilg'or texnologiyalarga asoslangan bo'lib, eng yuqori standartni ta'minlaydi
        ishlab chiqarish jarayonining har bir bosqichida samaradorlik va ishonchlilik. Markazda
        bizning texnologik qarashimiz - mahsulotlarimizni o'zgartiradigan innovatsiyalar
        shunchaki funktsional emas, balki ko'proq narsa. Biz doimo yangi usullarni tadqiq qilamiz va
        mijozlarimiz uchun noyob va samarali echimlarni yaratish uchun materiallar.
        Biz faxrlanadigan nemis sifati mahsulotlarimizning har bir jabhasida mujassam.
        Nozik muhandislik, bardoshli materiallar va qat'iy sifat nazorati standartlari
        har bir Goodwell mahsuloti hunarmandchilik asari ekanligiga kafolat. Biz harakat qilamiz
        ishlab chiqarishning har bir bosqichi bizning mukammallikka bo'lgan sadoqatimizni aks ettirishini ta'minlash. Bizning
        professionallar jamoasi bunga ishonch hosil qilish uchun har bir qadamni diqqat bilan kuzatib boradi
        ishlab chiqarishimizni tark etadigan har bir mahsulot bizning yuqori standartlarimizga javob beradi
        standartlar.</p>
    </div>,
    ru: <div>
      <p>"Goodwell - компания, где инновационные технологии и выдающееся немецкое качество
        переплетаются, чтобы создавать продукты на переднем крае индустрии. Наше
        производство основано на передовых технологиях, обеспечивая высший стандарт
        эффективности и надежности в каждом этапе производственного процесса.</p>
      <p>В центре нашего технологического взгляда - инновации, которые преобразуют нашу
        продукцию в нечто более чем просто функциональное. Мы постоянно исследуем новые
        методы и материалы, чтобы создавать уникальные и эффективные решения для наших
        клиентов.</p>
      <p>"Goodwell - компания, где инновационные технологии и выдающееся немецкое качество
        переплетаются, чтобы создавать продукты на переднем крае индустрии. Наше
        производство основано на передовых технологиях, обеспечивая высший стандарт
        эффективности и надежности в каждом этапе производственного процесса. В центре
        нашего технологического взгляда - инновации, которые преобразуют нашу продукцию в
        нечто более чем просто функциональное. Мы постоянно исследуем новые методы и
        материалы, чтобы создавать уникальные и эффективные решения для наших клиентов.
        Немецкое качество, за что мы гордимся, воплощается в каждом аспекте наших продуктов.
        Прецизионная инженерия, долговечные материалы и строгие стандарты контроля качества
        гарантируют, что каждый продукт Goodwell - это произведение мастерства. Мы стремимся
        к тому, чтобы каждый этап производства отражал наше стремление к совершенству. Наша
        команда профессионалов тщательно следит за каждым этапом, чтобы удостовериться, что
        каждый продукт, который покидает наше производство, соответствует нашим высоким
        стандартам.</p>
    </div>,
    en: <div>
      <p>"Goodwell - компания, где инновационные технологии и выдающееся немецкое качество
        переплетаются, чтобы создавать продукты на переднем крае индустрии. Наше
        производство основано на передовых технологиях, обеспечивая высший стандарт
        эффективности и надежности в каждом этапе производственного процесса.</p>
      <p>В центре нашего технологического взгляда - инновации, которые преобразуют нашу
        продукцию в нечто более чем просто функциональное. Мы постоянно исследуем новые
        методы и материалы, чтобы создавать уникальные и эффективные решения для наших
        клиентов.</p>
      <p>"Goodwell - компания, где инновационные технологии и выдающееся немецкое качество
        переплетаются, чтобы создавать продукты на переднем крае индустрии. Наше
        производство основано на передовых технологиях, обеспечивая высший стандарт
        эффективности и надежности в каждом этапе производственного процесса. В центре
        нашего технологического взгляда - инновации, которые преобразуют нашу продукцию в
        нечто более чем просто функциональное. Мы постоянно исследуем новые методы и
        материалы, чтобы создавать уникальные и эффективные решения для наших клиентов.
        Немецкое качество, за что мы гордимся, воплощается в каждом аспекте наших продуктов.
        Прецизионная инженерия, долговечные материалы и строгие стандарты контроля качества
        гарантируют, что каждый продукт Goodwell - это произведение мастерства. Мы стремимся
        к тому, чтобы каждый этап производства отражал наше стремление к совершенству. Наша
        команда профессионалов тщательно следит за каждым этапом, чтобы удостовериться, что
        каждый продукт, который покидает наше производство, соответствует нашим высоким
        стандартам.</p>
    </div>
  },
  vacanciesPageDescription: {
    uz: "Mavjud bo'sh ish o'rinlarini tanlash, aloqa ma'lumotlarini yuborish yoki raqamga qo'ng'iroq qilish orqali siz bizning katta va do'stona jamoamizning bir qismi bo'lishingiz mumkin. Sizning rezyumeingiz talab qilinadi. Agar hamma narsa vakansiya talablariga javob bersa, biz jamoamizda professionallarni ko'rishdan xursand bo'lamiz",
    ru: "Стать частью нашей большой и дружной команды можно выбрав доступную вакансию отправить ваши контакты для связи, а также позвонив по номеру. Обязательно необходимо ваше резюме. Если все будет соответствовать запросам по вакансии,будем рады видеть в нашей команде профессионалов",
    en: "Стать частью нашей большой и дружной команды можно выбрав доступную вакансию отправить ваши контакты для связи, а также позвонив по номеру. Обязательно необходимо ваше резюме. Если все будет соответствовать запросам по вакансии,будем рады видеть в нашей команде профессионалов",
  }
};
