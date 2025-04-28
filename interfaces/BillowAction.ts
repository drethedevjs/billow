import { Action } from "redux";

export interface BillowAction<TAction, TPayload> extends Action {
  type: TAction;
  payload: TPayload;
}
