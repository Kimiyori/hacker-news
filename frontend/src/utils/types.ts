export type postDataProps = {
  by: string;
  id: number;
  score: number;
  time: number;
  title: string;
  url?: string;
  kids?: number[];
  descendants: number;
};
export type postCommentsProps = {
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
  dead?: boolean;
  deleted?: boolean;
};
