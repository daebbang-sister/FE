// shared/ui/side-navi/SideNavi.tsx

import { getCategories } from "@/shared/hooks/category";
import SideNaviClient from "./SideNaviClient";

export default async function SideNavi() {
  const categories = await getCategories();

  return <SideNaviClient categories={categories} />;
}
