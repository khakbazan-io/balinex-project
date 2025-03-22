export type MakeErrorType = {
  name: string;
  message: string;
  status: number;
};

export function makeError(error: Partial<MakeErrorType>): MakeErrorType {
  return {
    name: error.name || "خطای ناشناخته",
    message: error.message || "خطای ناشناخته ای رخ داده است",
    status: error.status || 500,
  };
}
