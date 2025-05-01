import { Action } from "redux";

export interface BillowAction<TPayload> extends Action {
  type: string;
  payload: TPayload;
}
