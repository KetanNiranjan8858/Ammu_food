import siteContent from "@/data/site-content.json";
import { Product, MarketplaceLinks, CompanyConfig } from "./types";

export type { Product, MarketplaceLinks, CompanyConfig };

export const PRODUCTS: Product[] = siteContent.products as Product[];
export const COMPANY_CONFIG: CompanyConfig = siteContent.company as CompanyConfig;
