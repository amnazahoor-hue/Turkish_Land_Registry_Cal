import type {
  FAQItem,
  HowItWorksStep,
  InfoCard,
  NavLink,
  SocialLink,
} from "@/types";

export const SITE_NAME = "TapuCalc";

export const AUTHOR_NAME = "Selin Tekvatan";

export const navLinks: NavLink[] = [
  { label: "Hakkımızda", href: "/about-us" },
  { label: "Bize Ulaşın", href: "/contact" },
  { label: "Gizlilik Politikası", href: "/privacy-policy" },
];

export const legalLinks: NavLink[] = [
  { label: "Feragatname", href: "/disclaimer" },
  { label: "Gizlilik Politikası", href: "/privacy-policy" },
  { label: "Kullanım Şartları", href: "/terms-and-conditions" },
];

export const companyLinks: NavLink[] = [
  { label: "Hakkımızda", href: "/about-us" },
  { label: "Bize Ulaşın", href: "/contact" },
  { label: "Yazar", href: "/author" },
];

export const socialLinks: SocialLink[] = [
  {
    brand: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/",
  },
  {
    brand: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/",
  },
  {
    brand: "x",
    label: "X (Twitter)",
    href: "https://x.com/",
  },
  {
    brand: "pinterest",
    label: "Pinterest",
    href: "https://www.pinterest.com/",
  },
  {
    brand: "reddit",
    label: "Reddit",
    href: "https://www.reddit.com/",
  },
  {
    brand: "quora",
    label: "Quora",
    href: "https://www.quora.com/",
  },
  {
    brand: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/",
  },
];

export const howItWorksSteps: HowItWorksStep[] = [
  {
    number: "01",
    iconName: "home",
    title: "Enter Sale Price",
    description: "Enter the property sale amount in Turkish Lira (TRY).",
  },
  {
    number: "02",
    iconName: "calculator",
    title: "Click Calculate",
    description: "One click applies the official transfer fee rates.",
  },
  {
    number: "03",
    iconName: "chart",
    title: "View Results",
    description: "See buyer fee, seller fee, and total instantly.",
  },
  {
    number: "04",
    iconName: "check",
    title: "Plan Your Transaction",
    description: "Use the breakdown to budget your property transfer.",
  },
];

export const infoCards: InfoCard[] = [
  {
    iconName: "landmark",
    tag: "Basics",
    title: "What Is Title Deed Fee?",
    description:
      "The title deed fee (tapu harcı) is an official state tax paid to the Turkish Land Registry during property sales. It is calculated on the declared sale price and must be paid before the transfer is completed.",
  },
  {
    iconName: "users",
    tag: "Split",
    title: "Who Pays?",
    description:
      "The buyer pays 2% and the seller pays 2% of the sale price separately (4% total). Each party pays their share through the bank before the land registry appointment.",
  },
  {
    iconName: "scale",
    tag: "Law",
    title: "Legal Requirement",
    description:
      "Paying the fee is mandatory for title transfers. Underpayment can block completion. Rates are set by law and cannot be negotiated between parties.",
  },
  {
    iconName: "building",
    tag: "Process",
    title: "Land Registry vs. Notary",
    description:
      "Title transfer happens only at the Land Registry Office (Tapu Müdürlüğü). A notarized pre-sale agreement is a different process with separate costs.",
  },
  {
    iconName: "calendar",
    tag: "Timing",
    title: "When Is It Paid?",
    description:
      "Fees are paid via bank before the registry appointment. The receipt must be presented; payment should be completed before your scheduled date.",
  },
  {
    iconName: "globe",
    tag: "International",
    title: "Foreign Buyers",
    description:
      "Foreign nationals buying property in Turkey pay the same buyer rate (2%). Special cases may apply—consult your local land registry office.",
  },
];

export const faqs: FAQItem[] = [
  {
    q: "Tapu kayıt ücreti nedir? 2026'daki oran ne olacak?",
    a: "Tapu sicilinde beyan edilen standart değer %4'tür. Bu oran %2 alıcı ve %2 satıcı olarak ikiye ayrılır. Mevcut koşullar altında tapu harcı 2026 oranı, 492 sayılı kanun kapsamında yayınlanmıştır.",
    iconName: "receipt",
  },
  {
    q: "Döner sermaye fonu ücreti nedir?",
    a: "Döner sermaye ödemesi, Tapu Sicil Müdürlüğü (TKGM) tarafından alınan ayrı bir sabit hizmet ücretidir. Ana kayıt ücretine ek olarak alınır. Tapu sicili ve kadastro müdürlüklerinin işletme giderlerini karşılamak için kullanılır. İllere göre değişiklik gösterir.",
    iconName: "calculator",
  },
  {
    q: "Bağış yoluyla tapu devrinin ücreti ne kadardır?",
    a: "Hediye yoluyla devredilen tapu senedi tamamen farklıdır. Değerlendirilmiş mülk değerinin binde 68,31'idir. Alıcı, bu bedeli iki taraf arasında bölmek yerine kendisi ödemekle yükümlüdür.",
    iconName: "users",
  },
  {
    q: "Ortak mülkiyetin devri için ücret nasıl hesaplanır?",
    a: "Ortak mülkiyet devrinde hesaplanan ücret, devredilen payın büyüklüğüne bağlıdır. Mülkün tam değeri değildir. Her tarafın payı, kayıtlı yüzdesine göre değerlendirilir.",
    iconName: "scale",
  },
  {
    q: "Aile içi mülk transferlerinde indirim var mı?",
    a: "Hayır, gayrimenkulde özel bir indirim yok. Aile içi devirde akrabalar arasında yapılan satışlar, diğer satışlarla aynı şekilde vergilendirilir. Daha düşük oran, yalnızca transferin bağış olarak değerlendirilmesi ve Türk makamları tarafından titizlikle doğrulanması durumunda uygulanır.",
    iconName: "files",
  },
  {
    q: "Tapu ücreti emlak vergisi değerinden daha düşük mü olabilir?",
    a: "Hayır, hesaplama için beyan edilen değer kullanılır. Bu değer, alıcı ve satıcının özel olarak anlaştığı fiyattan bağımsız olarak, mülkün resmi vergi değerinin altına asla düşürülmemelidir.",
    iconName: "scale",
  },
  {
    q: "Tapu vergisi kredi kartıyla ödenebilir mi?",
    a: "Evet, GİB kredi kartı ödemesini kabul ediyor. Hemen hemen her bankadan. Ayrıca, birçok Tapu Sicil Müdürlüğü ofisinde de kart ödeme terminalleri bulunmaktadır.",
    iconName: "globe",
  },
];
