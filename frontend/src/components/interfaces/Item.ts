export interface split {
    "username": string,
    "amount": number,
}
export interface Item {
    "datetime": string,
    "item_name": string,
    "amount": number,
    "payer": string,
    "split": split[],
    "splitEqually": boolean,
    "comment": string,
}