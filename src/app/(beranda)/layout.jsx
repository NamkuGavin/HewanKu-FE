import { Column } from "@/components/shared/custom_widget";
import HeaderBeranda from "@/components/shared/header_beranda";
import FooterBeranda from "@/components/shared/footer_beranda";
import { FavoritesProvider } from "@/contexts/favorite-context";

export default function BerandaLayout({ children }) {
  return (
    <Column
      mainAxisAlignment="start"
      crossAxisAlignment="stretch"
      className="min-h-screen bg-gray-50"
    >
      <HeaderBeranda />
      <FavoritesProvider>{children}</FavoritesProvider>;
      <FooterBeranda />
    </Column>
  );
}
