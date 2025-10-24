export interface Page<T> {
  pageable: {
    pageNumber: 0,
    pageSize: 20,
    sort: {
      empty: boolean,
      sorted: boolean,
      unsorted: boolean
    },
    offset: number,
    paged: boolean,
    unpaged: boolean
}
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number,
  sort: {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean
  }
}
