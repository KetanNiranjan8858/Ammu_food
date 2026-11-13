export type ThemeMode = "traditional" | "professional" | "daily";

export interface ThemeConfig {
  activeTheme: ThemeMode;
  showFestiveMandalas: boolean;
  seasonalGreeting?: string;
  festivalName?: string;
}

export interface MarketplaceLinks {
  meesho?: string;
  amazon?: string;
  flipkart?: string;
}

export interface ProductFilter {
  id: string;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  commonName?: string;
  weight: string;
  price: number;
  originalPrice: number;
  badge?: string;
  category?: string;
  description: string;
  features: string[];
  image: string;
  images?: string[];
  popular?: boolean;
  showOnLandingPage?: boolean;
  links: MarketplaceLinks;
}

export interface CompanyConfig {
  name: string;
  brandTitle: string;
  tagline: string;
  logo?: string;
  manufacturer: string;
  address: string;
  fssaiLicense: string;
  email: string;
  secondaryEmail: string;
  phone: string;
  rawPhone: string;
  whatsappNumber: string;
  helpDesk: string;
  defaultCurrency: string;
}

export interface HeroConfig {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  dealBadge: string;
  dealTitle: string;
  dealSubtitle: string;
  dealPrice: number;
  dealOriginalPrice: number;
  dealDiscount: string;
  keyPoints: string[];
  meeshoLink: string;
  amazonLink: string;
  flipkartLink: string;
  heroImage: string;
}

export interface TrustBadge {
  title: string;
  subtitle: string;
}

export interface BulkBannerConfig {
  badge: string;
  title: string;
  description: string;
}

export interface WhyAmmuPoint {
  title: string;
  desc: string;
}

export interface WhyAmmuConfig {
  badge: string;
  title: string;
  subtitle: string;
  ammuCard: {
    title: string;
    subtitle: string;
    points: WhyAmmuPoint[];
  };
  marketCard: {
    title: string;
    subtitle: string;
    points: WhyAmmuPoint[];
  };
}

export interface NutritionConfig {
  badge: string;
  title: string;
  description: string;
  labelNote: string;
  guaranteeTitle: string;
  guaranteeText: string;
  checklist: string[];
}

export interface PurityTest {
  title: string;
  badge: string;
  summary: string;
  pureResult: string;
  fakeResult: string;
}

export interface PurityGuideConfig {
  badge: string;
  title: string;
  subtitle: string;
  tests: PurityTest[];
}

export interface BenefitItem {
  category: string;
  title: string;
  desc: string;
}

export interface BenefitsConfig {
  badge: string;
  title: string;
  subtitle: string;
  items: BenefitItem[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface InquiryConfig {
  badge: string;
  title: string;
  subtitle: string;
  responseSpeedText: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  title: string;
  comment: string;
  productName: string;
  verified: boolean;
  date: string;
}

export interface ReviewsConfig {
  badge: string;
  title: string;
  subtitle: string;
  averageRating: number;
  totalReviewsCount: string;
  externalReviewLink: string;
  externalReviewLinkText: string;
  items: ReviewItem[];
}

export interface SiteContent {
  theme?: ThemeConfig;
  company: CompanyConfig;
  hero: HeroConfig;
  trustBadges: TrustBadge[];
  productFilters?: ProductFilter[];
  products: Product[];
  bulkBanner: BulkBannerConfig;
  whyAmmu: WhyAmmuConfig;
  nutrition: NutritionConfig;
  purityGuide: PurityGuideConfig;
  benefits: BenefitsConfig;
  faqs: FaqItem[];
  inquiry: InquiryConfig;
  reviews?: ReviewsConfig;
}

