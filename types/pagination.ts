export type PaginationResponse = {
  page: number;
  per_page: number;
  count: number;
  total_count: number;
};

export type PaginationParams = {
  page: number;
  per_page: number;
};
