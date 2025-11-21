import { Text } from "@/components/shared/custom_widget";

export default function PesananSayaPage() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8">
      <Text size={24} weight="600" className="mb-6">
        PESANAN SAYA
      </Text>
      <Text className="text-gray-600">
        Halaman ini akan menampilkan daftar pesanan Anda.
      </Text>
    </div>
  );
}
