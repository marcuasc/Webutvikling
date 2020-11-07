// Interface for standardizing the form on the parameters that should be sent with the get request in searchActions
export interface ParamsInterface {
  q: string;
  page: number;
  genre?: Array<string>;
  duration?: {
    gt: number;
    lt: number;
  };
  budget?: {
    gt: number;
    lt: number;
  };
  sort: {
    type: "title" | "duration" | "budget";
    descending: boolean;
  };
}
