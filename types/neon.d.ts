declare module "@neondatabase/serverless" {
  export function neon(connectionString: string): any;
  export const neonConfig: {
    fetchConnectionCache?: boolean;
    [k: string]: any;
  };
}
