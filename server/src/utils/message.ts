import moment from "moment";

export const formatMessage = (username: string, text: string, id: string) => {
   return { username, text, time: moment().format("h:mm a"), id };
};
