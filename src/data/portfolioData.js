export const SECTIONS = ["Home", "About", "Skills", "Certificates", "Projects", "Contact"];

export const SKILLS = [
  { name: "Node.js", level: 92, color: "#68D391", faClass: "fa-brands fa-node-js" },
  { name: "Express.js", level: 88, color: "#F6E05E", faClass: "fa-solid fa-server" },
  { name: "PostgreSQL", level: 85, color: "#63B3ED", faClass: "fa-solid fa-database" },
  { name: "MongoDB", level: 82, color: "#68D391", faClass: "fa-solid fa-leaf" },
  { name: "Redis", level: 78, color: "#FC8181", faClass: "fa-solid fa-bolt" },
  { name: "Docker", level: 80, color: "#63B3ED", faClass: "fa-brands fa-docker" },
  { name: "AWS", level: 75, color: "#F6AD55", faClass: "fa-brands fa-aws" },
  { name: "REST APIs", level: 95, color: "#B794F4", faClass: "fa-solid fa-plug" },
  { name: "GraphQL", level: 72, color: "#FC8181", faClass: "fa-solid fa-diagram-project" },
  { name: "TypeScript", level: 87, color: "#4299E1", faClass: "fa-brands fa-js" },
];

export const PROJECTS = [
  {
    slug: "supermarket-ecommerce",
    title: "Hệ thống quản lý và bán hàng",
    titleEn: "SUPERMARKET MANAGEMENT & E-COMMERCE SYSTEM",
    desc: "Django, MySQL, RESTful API, JWT — quản lý bán hàng & nội bộ, ca làm, lương, báo cáo PDF, tối ưu hiệu năng.",
    tags: ["Django (Python)", "MySQL", "RESTful API", "JWT Authentication"],
    color: "#2fa36b",
    faIcon: "fa-solid fa-store",
    year: "2025",
    period: "01/2025 – 04/2025",
    link: "https://github.com/NguyenHieuDavitDev/supermarket-ecommerce.git",
    detail: {
      period: "01/2025 – 04/2025",
      role: "Backend Developer",
      github: "https://github.com/NguyenHieuDavitDev/supermarket-ecommerce.git",
      overviewParagraphs: [
        "Xây dựng hệ thống quản lý và bán hàng cho siêu thị, hỗ trợ quản lý đơn hàng, chương trình khuyến mãi và vận hành nội bộ.",
        "Hệ thống giúp tự động hóa quy trình phân ca, chấm công và tính lương, từ đó tối ưu hiệu suất vận hành.",
      ],
      scopeHighlights: [
        "Kết hợp quản lý bán hàng + quản lý nội bộ",
        "Xử lý logic nghiệp vụ thực tế (ca làm, lương, đơn hàng)",
        "Có báo cáo và export PDF",
        "Tối ưu hiệu năng và khả năng mở rộng",
      ],
      security: [
        "Triển khai xác thực và phân quyền bằng JWT",
        "Phân quyền theo vai trò (Admin / Nhân viên)",
        "Kiểm soát truy cập API",
      ],
      mainFeatures: [
        "Quản lý đơn hàng",
        "Quản lý flash sale",
        "Phân quyền người dùng",
        "Phân lịch làm việc tự động",
        "Tích hợp chấm công và tính lương",
        "Báo cáo dữ liệu và xuất file PDF",
      ],
      outcomes: [
        "Giảm 30% thời gian bảo trì hệ thống",
        "Hệ thống có khả năng xử lý ổn định với 5000 người dùng",
      ],
      database: [
        "Thiết kế và tối ưu cơ sở dữ liệu với MySQL",
        "Tối ưu truy vấn giúp cải thiện hiệu năng",
        "Đảm bảo tính toàn vẹn dữ liệu",
      ],
      skillsGained: [
        "Thiết kế RESTful API với Django và tổ chức module rõ ràng",
        "Ứng dụng MVT, JWT và phân quyền theo vai trò",
        "Tối ưu MySQL, truy vấn và toàn vẹn dữ liệu",
        "Triển khai nghiệp vụ thực tế: đơn hàng, ca làm, lương, báo cáo PDF",
      ],
      architecture: [
        "Thiết kế backend theo mô hình MVT (Model - View - Template)",
        "Xây dựng hệ thống theo hướng dễ mở rộng và dễ bảo trì",
        "RESTful API cho giao tiếp hệ thống",
        "Phân tách logic rõ ràng giữa các module",
        "Tối ưu cấu trúc project Django",
      ],
      highlights: [
        "Xây dựng RESTful API với Django",
        "Thiết kế hệ thống backend theo MVT",
        "Tối ưu database MySQL",
        "Xử lý nghiệp vụ thực tế (business logic)",
      ],
    },
  },
  {
    slug: "ico-startup-fund",
    title: "ICO quản lý quỹ Hỗ Trợ Startup",
    desc: "Fullstack: smart contract Solidity, ReactJS và Ethers.js — gọi vốn minh bạch, MetaMask, đầu tư và vote dự án.",
    tags: ["Solidity", "ReactJS", "Ethers.js"],
    color: "#627eea",
    faIcon: "fa-brands fa-ethereum",
    year: "2025–2026",
    period: "11/2025 – 03/2026",
    link: "https://github.com/NguyenHieuDavitDev/ICO-Startup.git",
    detail: {
      period: "11/2025 – 03/2026",
      role: "Fullstack Developer (Blockchain layer 1 + Frontend)",
      github: "https://github.com/NguyenHieuDavitDev/ICO-Startup.git",
      overview:
        "Nền tảng ICO quản lý quỹ hỗ trợ startup: smart contract quản lý dòng tiền, giao diện React kết nối blockchain qua Ethers.js và ví MetaMask.",
      architecture: [
        "Phát triển smart contract Solidity quản lý dòng tiền minh bạch, tự động hóa quy trình gọi vốn",
        "Xây dựng UI với ReactJS, tích hợp ví MetaMask qua Ethers.js",
        "Triển khai cơ chế đầu tư, phân phối và hoàn trả lợi tức tự động theo điều kiện hợp đồng",
        "Kết nối frontend–blockchain, để dữ liệu an toàn và nhất quán",
      ],
      highlights: [
        "Chức năng: Tạo và quản lý dự án, theo dõi tiến độ; đầu tư, bình luận, vote cho dự án minh bạch; xác thực giao dịch qua ví MetaMask",
        "Kết quả: Minh bạch 100% giao dịch; giảm 95% rủi ro gian lận; xử lý ổn định nhiều giao dịch với chi phí tối ưu",
      ],
    },
  },
  {
    slug: "university-training-management",
    title: "Hệ thống quản lý đào tạo ĐẠI HỌC",
    titleEn: "University Training Management System",
    desc: "Java Spring Boot, SQL Server, Spring Security & JWT — quản lý đào tạo, phân quyền, lịch và báo cáo.",
    tags: ["Java Spring Boot", "SQL Server", "Spring Security", "JWT", "REST API"],
    color: "#6db33f",
    faIcon: "fa-solid fa-graduation-cap",
    year: "2025–2026",
    period: "12/2025 – 04/2026",
    link: "https://github.com/NguyenHieuDavitDev/Students-Management.git",
    detail: {
      period: "12/2025 – 04/2026",
      role: "Backend Developer",
      github: "https://github.com/NguyenHieuDavitDev/Students-Management.git",
      overview:
        "Hệ thống quản lý đào tạo đại học: quản lý sinh viên, giảng viên, khóa học, tiến độ và điểm số; tự động hóa quy trình và báo cáo.",
      architecture: [
        "Thiết kế backend theo MVC + RESTful API, giúp mở rộng và dễ bảo trì",
        "Triển khai xác thực và phân quyền Spring Security và JWT",
        "Thiết kế và tối ưu database SQL Server, cải thiện hiệu năng",
        "Áp dụng Validation, Exception Handling, DTO pattern",
      ],
      highlights: [
        "Chức năng: Quản lý sinh viên, giảng viên, khóa học; theo dõi tiến độ và điểm số; phân quyền; báo cáo và thống kê; phân chia lịch tự động",
        "Kết quả: Giảm 35% xử lý thủ công; tăng 25% hiệu suất hệ thống; vận hành ổn định >1.000 người dùng",
      ],
    },
  },
];

export const CONTACT_EMAIL = "minhhieu@email.com";

/** Liên kết mạng xã hội — cập nhật LinkedIn cá nhân khi có URL đầy đủ */
export const SOCIAL_LINKS = [
  { label: "GitHub", url: "https://github.com/NguyenHieuDavitDev", fa: "fa-brands fa-github" },
  { label: "LinkedIn", url: "https://www.linkedin.com", fa: "fa-brands fa-linkedin-in" },
  { label: "Email", url: `mailto:${CONTACT_EMAIL}`, fa: "fa-solid fa-envelope" },
];
