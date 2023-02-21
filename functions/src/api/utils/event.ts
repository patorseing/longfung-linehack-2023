export const isEventActive = (event: {
  eventDate: string;
  eventEndTime: string;
}) => {
  const eventDate = event.eventDate as string;
  const eventEndTime = event.eventEndTime as string;

  const endDate = convertStringToData(eventDate, eventEndTime);
  const currentDate = new Date();

  return endDate > currentDate;
};

const convertStringToData = (date: string, time: string) => {
  const fullDateTime = `${transformDateString(date)}T${time}`;

  return new Date(fullDateTime);
};

const transformDateString = (date: string) => {
  return date.split("/").reverse().join("-");
};
