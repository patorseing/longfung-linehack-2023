import { Event } from "../api/controllers/events/types";

export const enterEventTemplate = (event: Event) => ({
  type: "flex",
  altText: event.eventName,
  contents: {
    type: "bubble",
    size: "mega",
    hero: {
      type: "image",
      url:
        event?.eventImage ??
        "https://firebasestorage.googleapis.com/v0/b/loma-nkaf.appspot.com/o/undefine.png?alt=media&token=c37fea4d-c6a9-4344-991d-d8a01fef142d",
      size: "full",
      aspectMode: "cover",
      animated: false,
      aspectRatio: "20:13",
    },
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        ...[
          event.ticketType.free
            ? {
                type: "text",
                text: "Free Event",
                color: "#F83333",
                size: "xs",
              }
            : {
                type: "text",
                text: `${event.ticketType?.price} ฿`,
                size: "xs",
              },
        ],
        {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: event.eventName,
              weight: "bold",
              wrap: true,
              size: "xl",
            },
            {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "box",
                  layout: "horizontal",
                  contents: [
                    {
                      type: "text",
                      text: "วันจัดแสดง",
                      flex: 3,
                      color: "#929292",
                    },
                    {
                      type: "text",
                      text: event.eventDate,
                      flex: 5,
                      color: "#929292",
                    },
                  ],
                },
                {
                  type: "box",
                  layout: "horizontal",
                  contents: [
                    {
                      type: "text",
                      text: "เวลา",
                      flex: 3,
                      color: "#929292",
                    },
                    {
                      type: "text",
                      text: `${event.eventStartTime} - ${event.eventEndTime}`,
                      flex: 5,
                      color: "#929292",
                    },
                  ],
                },
                {
                  type: "box",
                  layout: "horizontal",
                  contents: [
                    {
                      type: "text",
                      text: "สถานที่",
                      flex: 3,
                      color: "#929292",
                    },
                    {
                      type: "text",
                      text: event.eventLocation.address,
                      flex: 5,
                      color: "#929292",
                      wrap: true,
                    },
                  ],
                },
                {
                  type: "box",
                  layout: "horizontal",
                  contents: [
                    {
                      type: "text",
                      text: "ผู้ติดตาม",
                      flex: 3,
                      color: "#929292",
                    },
                    {
                      type: "text",
                      text: `${event.interestedPerson.length}`,
                      flex: 5,
                      color: "#929292",
                      wrap: true,
                    },
                  ],
                },
              ],
              spacing: "md",
            },
          ],
          spacing: "xxl",
        },
      ],
      spacing: "md",
    },
    footer: {
      type: "box",
      layout: "vertical",
      contents: [
        ...(event.eventLocation?.googleMapLink
          ? [
              {
                type: "button",
                action: {
                  type: "uri",
                  label: "เปิดแผนที่",
                  uri: event.eventLocation?.googleMapLink,
                },
                style: "link",
                height: "sm",
              },
            ]
          : []),
        {
          type: "button",
          action: {
            type: "message",
            label: "ติดตามอีเว้นท์นี้",
            text: `ฉันอยากติดตตาม ${event.eventName}`,
          },
          height: "sm",
        },
        {
          type: "button",
          action: {
            type: "message",
            label: "รายละเอียดเพิ่มเติม",
            text: `ขอรายละเอียดเพิ่มเติมของงาน ${event.eventName} นี้หน่อย`,
          },
          height: "sm",
        },
      ],
      paddingAll: "none",
    },
  },
});
