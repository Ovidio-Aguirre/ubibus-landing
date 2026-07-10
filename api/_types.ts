// Tipos mínimos para las funciones serverless de Vercel, evitando la dependencia
// @vercel/node (arrastra herramientas de build con vulnerabilidades conocidas
// que no aportan nada en runtime).

export interface ApiRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
}

export interface ApiResponse {
  status(code: number): ApiResponse;
  json(body: unknown): void;
}
