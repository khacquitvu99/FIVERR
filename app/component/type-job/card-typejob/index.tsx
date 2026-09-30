"use client";
// 1. Interface ánh xạ chính xác 100% theo Payload từ Slice / API Cybersoft
export interface SubCategory {
  id: number;
  tenChiTiet: string;
}

export interface GroupCategory {
  id: number;
  tenNhom: string;
  hinhAnh: string;
  maLoaiCongViec: number;
  dsChiTietLoai: SubCategory[];
}
/*  */
interface CategoryCardProps {
  item: GroupCategory;
  onSelectSubCategory: (subId: number, subName: string) => void;
  selectedSubId?: number | string | null;
}

export default function CategoryCard({
  item,
  onSelectSubCategory,
  selectedSubId,
}: CategoryCardProps) {
  
  // Lấy dữ liệu thuần túy từ Object `item` truyền từ Slice xuống
  const { tenNhom, hinhAnh, dsChiTietLoai } = item;

  return (
    <div className="flex flex-col gap-3 font-sans">
      {/* 1. Hình ảnh nhóm động từ API */}
      <div className="w-full h-40 bg-gray-100 rounded-xl overflow-hidden shadow-sm">
        {hinhAnh && (
          <img
            src={hinhAnh}
            alt={tenNhom}
            className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      {/* 2. Tiêu đề nhóm động từ API */}
      <h3 className="text-lg font-bold text-gray-900 mt-1">{tenNhom}</h3>

      {/* 3. Danh sách các chi tiết loại động từ API */}
      <ul className="flex flex-col gap-1.5 text-gray-600 font-medium text-sm">
        {dsChiTietLoai?.map((sub) => {
          const isSelected = selectedSubId === sub.id;

          return (
            <li key={sub.id}>
              <button
                type="button"
                onClick={() => onSelectSubCategory(sub.id, sub.tenChiTiet)}
                className={`text-left hover:text-green-600 hover:underline transition-colors py-0.5 block w-full ${
                  isSelected ? "text-green-600 font-bold underline" : ""
                }`}
              >
                {sub.tenChiTiet}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
