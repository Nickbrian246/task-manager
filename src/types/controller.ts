import { CustomNextApiRequest } from "./custom-next-api-request-interface";
import { CustomNextApiResponse } from "./custom-next-api-response.interface";

export type Controller<ResponseData, RequestBody = any> = (
  req: CustomNextApiRequest<RequestBody>,
  res: CustomNextApiResponse<ResponseData>
) => Promise<void>;
