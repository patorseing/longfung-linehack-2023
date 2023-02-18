import { Event } from "../api/controllers/events/types";

export const enterEventTemplate = (event: Event) => ({
  type: "flex",
  altText: event.eventName,
  contents: {
    type: "bubble",
    size: "mega",
    direction: "ltr",
    hero: {
      type: "image",
      url:
        event?.eventImage ??
        "https://firebasestorage.googleapis.com/v0/b/loma-nkaf.appspot.com/o/undefine.png?alt=media&token=c37fea4d-c6a9-4344-991d-d8a01fef142d",
      size: "full",
      margin: "none",
      position: "relative",
      align: "start",
      gravity: "top",
      aspectMode: "cover",
      animated: false,
      offsetTop: "none",
      offsetBottom: "none",
      offsetStart: "none",
      aspectRatio: "1.25:1",
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
                weight: "regular",
                decoration: "none",
                size: "xs",
              }
            : {
                type: "text",
                text: `${event.ticketType?.price} ฿`,
                weight: "regular",
                decoration: "none",
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
                      position: "relative",
                      flex: 3,
                      color: "#929292",
                      size: "md",
                    },
                    {
                      type: "text",
                      text: event.eventDate,
                      flex: 5,
                      color: "#929292",
                      size: "md",
                    },
                  ],
                  offsetTop: "none",
                  spacing: "none",
                },
                {
                  type: "box",
                  layout: "horizontal",
                  contents: [
                    {
                      type: "text",
                      text: "เวลา",
                      position: "relative",
                      flex: 3,
                      color: "#929292",
                      size: "md",
                    },
                    {
                      type: "text",
                      text: `${event.eventStartTime} - ${event.eventEndTime}`,
                      flex: 5,
                      color: "#929292",
                      size: "md",
                    },
                  ],
                  offsetTop: "none",
                },
                {
                  type: "box",
                  layout: "horizontal",
                  contents: [
                    {
                      type: "text",
                      text: "สถานที่",
                      position: "relative",
                      flex: 3,
                      color: "#929292",
                      size: "md",
                    },
                    {
                      type: "text",
                      text: event.eventLocation.address,
                      flex: 5,
                      color: "#929292",
                      wrap: true,
                      size: "md",
                    },
                  ],
                  offsetTop: "none",
                },
                {
                  type: "box",
                  layout: "horizontal",
                  contents: [
                    {
                      type: "text",
                      text: "ผู้ติดตาม",
                      position: "relative",
                      flex: 3,
                      color: "#929292",
                      size: "md",
                    },
                    {
                      type: "text",
                      text: event.interestedPerson.length,
                      flex: 5,
                      color: "#929292",
                      wrap: true,
                      size: "md",
                    },
                  ],
                  offsetTop: "none",
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
            type: "uri",
            label: "รายละเอียดเพิ่มเติม",
            uri: `line://app/<liffID>?event=${event.eventName}`,
          },
          height: "sm",
        },
      ],
      paddingAll: "none",
    },
    styles: {
      hero: {
        separator: false,
      },
    },
  },
});
