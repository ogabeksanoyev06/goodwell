import * as moment from "moment";

const time = {
  getToday: () => {
    return moment().format("DD");
  },

  isToday: day => {
    return moment().format("DD") === day;
  },

  getMonth: dateString => {
    return moment(dateString).month();
  },
  getYear: dateString => {
    return moment(dateString).year();
  },
  getDayNumber: dateString => {
    return moment(dateString).date();
  },
  current: (format = "DD.MM.YYYY") => {
    return moment().format(format);
  },
  to: (timestamp, format = "DD.MM.YYYY") => {
    return moment.unix(timestamp).format(format);
  },
  format: (dateString, format = "DD.MM.YYYY") => {
    return moment(dateString).format(format);
  },
  toChat: timestamp => {
    return moment(timestamp, "X").calendar(null, {
      sameDay: "HH:mm",
      lastDay: "[Вчера], HH:mm",
      sameElse: "DD.MM.YYYY"
    });
  },

  getDay: (day, activeDate) => {
    const currDay = new Date().getDay();

    let dd = moment.unix(activeDate).format("YYYYMMDD");
    let ndd = moment(dd)
      .startOf("day")
      .add(6, "hours");

    let ddStart = Number(moment(ndd).format("X"));
    let ddEnd = ddStart + 86399;

    return {
      start: ddStart - (currDay - day) * 86400,
      end: ddEnd - (currDay - day) * 86400
    };
  }
};

export default time;
