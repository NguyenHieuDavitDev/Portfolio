/**
 * Ảnh thật (screenshot) trong `src/assets/projects/…`
 * Ảnh bổ sung tương tự chủ đề: Unsplash (https://unsplash.com/license)
 */
import uniScheduleGrid from "../assets/projects/university/schedule-week-grid.png";
import uniScheduleSemester from "../assets/projects/university/schedule-semester-view.png";
import uniScheduleClasses from "../assets/projects/university/schedule-with-classes.png";
import uniAdminLogin from "../assets/projects/university/admin-login.png";
import uniDashboardCharts from "../assets/projects/university/admin-dashboard-charts.png";
import uniDashboardOverview from "../assets/projects/university/admin-dashboard-overview.png";

const UNSPLASH = {
  retail1:
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=80",
  retail2:
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1400&q=80",
  retail3:
    "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1400&q=80",
  crypto1:
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1400&q=80",
  crypto2:
    "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?auto=format&fit=crop&w=1400&q=80",
  crypto3:
    "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=1400&q=80",
  crypto4:
    "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?auto=format&fit=crop&w=1400&q=80",
};

/** @typedef {{ src: string, alt: string, caption?: string, stock?: boolean }} GalleryItem */

/** @type {Record<string, { cover: string, gallery: GalleryItem[] }>} */
export const PROJECT_MEDIA = {
  "supermarket-ecommerce": {
    cover: UNSPLASH.retail1,
    gallery: [
      {
        src: UNSPLASH.retail1,
        alt: "Giao dịch và thanh toán bán lẻ",
        caption: "Minh họa: vận hành bán hàng & POS (Unsplash)",
        stock: true,
      },
      {
        src: UNSPLASH.retail2,
        alt: "Siêu thị và kệ hàng",
        caption: "Minh họa: quản lý hàng hóa bán lẻ (Unsplash)",
        stock: true,
      },
      {
        src: UNSPLASH.retail3,
        alt: "Kho và logistics",
        caption: "Minh họa: tồn kho & vận hành (Unsplash)",
        stock: true,
      },
    ],
  },
  "ico-startup-fund": {
    cover: UNSPLASH.crypto1,
    gallery: [
      {
        src: UNSPLASH.crypto1,
        alt: "Blockchain và tài sản số",
        caption: "Minh họa: hệ sinh thái blockchain (Unsplash)",
        stock: true,
      },
      {
        src: UNSPLASH.crypto2,
        alt: "Mạng lưới phi tập trung",
        caption: "Minh họa: minh bạch giao dịch (Unsplash)",
        stock: true,
      },
      {
        src: UNSPLASH.crypto3,
        alt: "Theo dõi thị trường và giao dịch",
        caption: "Minh họa: dashboard & gọi vốn (Unsplash)",
        stock: true,
      },
      {
        src: UNSPLASH.crypto4,
        alt: "Công nghệ tài chính",
        caption: "Minh họa: DeFi / fintech (Unsplash)",
        stock: true,
      },
    ],
  },
  "university-training-management": {
    cover: uniScheduleClasses,
    gallery: [
      {
        src: uniScheduleGrid,
        alt: "Giao diện lịch học theo tuần",
        caption: "Lịch học — lưới tuần (T2–CN × tiết)",
      },
      {
        src: uniScheduleSemester,
        alt: "Lịch học và học kỳ",
        caption: "Chọn học kỳ và lưới lịch",
      },
      {
        src: uniScheduleClasses,
        alt: "Lịch có môn học trên lưới",
        caption: "Hiển thị tiết học, phòng, giảng viên",
      },
      {
        src: uniAdminLogin,
        alt: "Đăng nhập quản trị",
        caption: "Đăng nhập quản trị — JWT / phân quyền",
      },
      {
        src: uniDashboardCharts,
        alt: "Dashboard biểu đồ thống kê",
        caption: "Admin dashboard — biểu đồ cột, đường, tròn",
      },
      {
        src: uniDashboardOverview,
        alt: "Tổng quan dashboard",
        caption: "Thống kê sinh viên, lớp, khoa",
      },
    ],
  },
};

export function getProjectMedia(slug) {
  return PROJECT_MEDIA[slug] ?? null;
}
