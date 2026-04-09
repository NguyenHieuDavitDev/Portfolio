
import uniScheduleGrid from "../assets/projects/university/schedule-week-grid.png";
import uniScheduleSemester from "../assets/projects/university/schedule-semester-view.png";
import uniScheduleClasses from "../assets/projects/university/schedule-with-classes.png";
import uniAdminLogin from "../assets/projects/university/admin-login.png";
import uniDashboardCharts from "../assets/projects/university/admin-dashboard-charts.png";
import uniDashboardOverview from "../assets/projects/university/admin-dashboard-overview.png";

import smPromoBanner from "../assets/projects/supermarket-ecommerce/promo-banner.jpg";
import smShopBanner from "../assets/projects/supermarket-ecommerce/shop-banner.webp";
import smProductBaRoi from "../assets/projects/supermarket-ecommerce/product-ba-roi.jpg";
import smProductDauNanh from "../assets/projects/supermarket-ecommerce/product-dau-nanh.jpg";
import smProductMiTom from "../assets/projects/supermarket-ecommerce/product-mi-tom.jpg";
import smProductRauMuong from "../assets/projects/supermarket-ecommerce/product-rau-muong.jpg";

import icoHome from "../assets/projects/ico-startup-fund/ico-home.png";
import icoProjectDetail from "../assets/projects/ico-startup-fund/ico-project-detail.png";
import icoAdmin from "../assets/projects/ico-startup-fund/ico-admin.png";
import icoDividends from "../assets/projects/ico-startup-fund/ico-dividends.png";

/** @typedef {{ src: string, alt: string, caption?: string, stock?: boolean }} GalleryItem */

/**
 * @typedef {'unsplash' | 'screenshots' | 'repo-assets' | 'placeholder'} MediaAttribution
 * @type {Record<string, { cover: string, gallery: GalleryItem[], mediaAttribution?: MediaAttribution }>}
 */
export const PROJECT_MEDIA = {
  "supermarket-ecommerce": {
    mediaAttribution: "repo-assets",
    cover: smShopBanner,
    gallery: [
      {
        src: smShopBanner,
        alt: "Banner cửa hàng trên giao diện",
        caption: "Banner shop — file `media/products/None/banner1.webp` trong repo GitHub",
      },
      {
        src: smPromoBanner,
        alt: "Banner khuyến mãi",
        caption: "Ảnh khuyến mãi — `media/promotions/banner2.jpg` trong repo",
      },
      {
        src: smProductBaRoi,
        alt: "Sản phẩm: ba rọi",
        caption: "Ảnh sản phẩm mẫu — `media/products/None/ba_roi.jpg`",
      },
      {
        src: smProductDauNanh,
        alt: "Sản phẩm: đậu nành",
        caption: "Ảnh sản phẩm mẫu — `media/products/None/dau_dau_nanh.jpg`",
      },
      {
        src: smProductMiTom,
        alt: "Sản phẩm: mì tôm",
        caption: "Ảnh sản phẩm mẫu — `media/products/None/mytom.jpg`",
      },
      {
        src: smProductRauMuong,
        alt: "Sản phẩm: rau muống",
        caption: "Ảnh sản phẩm mẫu — `media/products/None/rau_muong.jpg`",
      },
    ],
  },
  "ico-startup-fund": {
    mediaAttribution: "screenshots",
    cover: icoHome,
    gallery: [
      {
        src: icoHome,
        alt: "Trang chủ — danh sách dự án và kết nối ví",
        caption: "Giao diện trang chủ — danh sách dự án ICO",
      },
      {
        src: icoProjectDetail,
        alt: "Chi tiết dự án — donate, vote, bình luận",
        caption: "Trang chi tiết dự án trên frontend React",
      },
      {
        src: icoAdmin,
        alt: "Khu vực quản trị",
        caption: "Dashboard / quản lý dự án admin",
      },
      {
        src: icoDividends,
        alt: "Chia cổ tức hoặc luồng liên quan",
        caption: "Màn hình quản lý cổ tức / giao diện bổ sung",
      },
    ],
  },
  "university-training-management": {
    mediaAttribution: "screenshots",
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
