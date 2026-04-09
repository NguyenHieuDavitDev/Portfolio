import msSapPartnership from "../assets/projects/certificates/ms-sap-partnership.png";
import dotnetCompliance from "../assets/projects/certificates/dotnet8-compliance.png";
import azureOpenAi from "../assets/projects/certificates/azure-openai-studio.png";
import dongAGiayKhen2425 from "../assets/projects/certificates/cc1.jpg";
import dongAGiayKhen2324 from "../assets/projects/certificates/cc2.jpg";

/** issuerKind: hiển thị icon — microsoft | school */
export const CERTIFICATES = [
  {
    id: "ms-sap-partnership",
    title: "The Microsoft and SAP partnership",
    issuer: "Microsoft",
    date: "04/2026",
    image: msSapPartnership,
    alt: "Chứng chỉ hoàn thành chương trình Microsoft và SAP partnership",
    issuerKind: "microsoft",
  },
  {
    id: "dotnet8-compliance",
    title: "Implement compliance in a cloud-native .NET 8 application",
    issuer: "Microsoft",
    date: "04/2026",
    image: dotnetCompliance,
    alt: "Chứng chỉ .NET 8 cloud-native compliance",
    issuerKind: "microsoft",
  },
  {
    id: "azure-openai-studio",
    title: "Forging Voices from Data — Custom AI Training with Azure OpenAI Studio",
    issuer: "Microsoft",
    date: "04/2026",
    image: azureOpenAi,
    alt: "Chứng chỉ Azure OpenAI Studio và AI training",
    issuerKind: "microsoft",
  },
  {
    id: "dong-a-giay-khen-2024-2025",
    title: "Giấy khen — Sinh viên Giỏi (2024 – 2025)",
    issuer: "Đại học Đông Á",
    date: "09/2025",
    image: dongAGiayKhen2425,
    alt: "Giấy khen Sinh viên Giỏi năm học 2024–2025 — ĐH Đông Á, ngành CNTT",
    issuerKind: "school",
  },
  {
    id: "dong-a-giay-khen-2023-2024",
    title: "Giấy khen — Sinh viên Giỏi (2023 – 2024)",
    issuer: "Đại học Đông Á",
    date: "09/2024",
    image: dongAGiayKhen2324,
    alt: "Giấy khen Sinh viên Giỏi năm học 2023–2024 — ĐH Đông Á, ngành CNTT",
    issuerKind: "school",
  },
];
