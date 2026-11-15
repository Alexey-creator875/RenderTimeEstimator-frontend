import { resolve } from "path";
import { generateApi } from "swagger-typescript-api";

generateApi({
  fileName: "Api.ts",
  output: resolve(process.cwd(), "./src/api"),
  input: resolve(process.cwd(), "./swagger.json"),
  httpClientType: "axios",
});
