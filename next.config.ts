import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Génère une sortie autonome compatible avec Docker et un déploiement sur VPS
  output: "standalone",
};

export default nextConfig;
