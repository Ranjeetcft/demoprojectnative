import moment from "moment";
export function formatNumber(number) {
  return number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatNumberTZ(amount) {
  const formattedAmount = new Intl.NumberFormat("en-TZ", {
    style: "currency",
    currency: "TZS",
  }).format(amount);

  return formattedAmount.replace("TSh", "").replace("TZS", "").trim();
}
export const maximumWinAmount = 50000000;

export const formatDate = (dateStr) => {
  const date = moment(dateStr);
  const day = date.date();
  const daySuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return (
    date.format("MMMM") + ` ${day}${daySuffix(day)} ` + date.format("YYYY")
  );
};

export const validateEmail = (email) => {
  console.log("Email", email);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const formatingAmount = (amount) => {
  return parseInt(amount).toLocaleString("en-US");
};
