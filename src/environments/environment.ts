export const environment = {
  production: false,

  // API del backend NestJS en local
  apiBaseUrl: "http://localhost:3000",

  // Rutas de conveniencia
  endpoints: {
    login: "/monitor/auth/login",
    labs: "/monitor/laboratorios",
    reservas: "/monitor/reservas",
    // agrega aquí los que vayas usando...
  },

  // UI
  appTitle: "Monitor de Laboratorios (DEV)",
};
