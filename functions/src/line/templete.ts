import {Event} from "../api/dto/event";
import {createBandDTO} from "../api/dto/band";

export const eventTemplate = ({
  event,
  interested,
  userId,
}: {
  event: Event;
  interested?: boolean;
  userId?: string;
}) => ({
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
          event.ticketType.free ?
            {
              type: "text",
              text: "Free Event",
              color: "#F83333",
              size: "xs",
            } :
            {
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
        ...(event.eventLocation?.googleMapLink ?
          [
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
          ] :
          []),
        ...(interested || event.interestedPerson.includes(userId ?? "") ?
          [] :
          [
            {
              type: "button",
              action: {
                type: "message",
                label: "ติดตามอีเว้นท์นี้",
                text: `ฉันอยากติดตาม ${event.eventName}`,
              },
              height: "sm",
            },
          ]),
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

export type EventTemp = {
  type: "bubble";
  size: "mega";
  hero: {
    type: "image";
    url: string;
    size: "full";
    aspectMode: "cover";
    animated: false;
    aspectRatio: "20:13";
  };
  body: {
    type: "box";
    layout: "vertical";
    contents: [
      (
        | {
            type: "text";
            text: "Free Event";
            color: "#F83333";
            size: "xs";
          }
        | {
            type: "text";
            text: string;
            size: "xs";
          }
      ),
      {
        type: "box";
        layout: "vertical";
        contents: [
          {
            type: "text";
            text: string;
            weight: "bold";
            wrap: true;
            size: "xl";
          },
          {
            type: "box";
            layout: "vertical";
            contents: [
              {
                type: "box";
                layout: "horizontal";
                contents: [
                  {
                    type: "text";
                    text: "วันจัดแสดง";
                    flex: 3;
                    color: "#929292";
                  },
                  {
                    type: "text";
                    text: string;
                    flex: 5;
                    color: "#929292";
                  }
                ];
              },
              {
                type: "box";
                layout: "horizontal";
                contents: [
                  {
                    type: "text";
                    text: "เวลา";
                    flex: 3;
                    color: "#929292";
                  },
                  {
                    type: "text";
                    text: string;
                    flex: 5;
                    color: "#929292";
                  }
                ];
              },
              {
                type: "box";
                layout: "horizontal";
                contents: [
                  {
                    type: "text";
                    text: "สถานที่";
                    flex: 3;
                    color: "#929292";
                  },
                  {
                    type: "text";
                    text: string;
                    flex: 5;
                    color: "#929292";
                    wrap: true;
                  }
                ];
              },
              {
                type: "box";
                layout: "horizontal";
                contents: [
                  {
                    type: "text";
                    text: "ผู้ติดตาม";
                    flex: 3;
                    color: "#929292";
                  },
                  {
                    type: "text";
                    text: string;
                    flex: 5;
                    color: "#929292";
                    wrap: true;
                  }
                ];
              }
            ];
            spacing: "md";
          }
        ];
        spacing: "xxl";
      }
    ];
    spacing: "md";
  };
  footer: {
    type: "box";
    layout: "vertical";
    contents: Array<{
      type: "button";
      action: {
        type: "message" | "uri";
        label: string;
        uri?: string;
        text?: string;
      };
      style?: "link";
      height?: "sm";
    }>;
    paddingAll: "none";
  };
};

export const bandTemplete = (band: createBandDTO) => {
  return {
    type: "flex",
    altText: band.bandName,
    contents: {
      type: "bubble",
      hero: {
        type: "image",
        url:
          band?.bandImage ??
          "https://firebasestorage.googleapis.com/v0/b/loma-nkaf.appspot.com/o/undefine.png?alt=media&token=c37fea4d-c6a9-4344-991d-d8a01fef142d",
        size: "full",
        aspectRatio: "20:13",
        aspectMode: "cover",
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: band.bandName,
            weight: "bold",
            size: "xl",
          },
          ...(band?.firstPromotedSong || band?.secondPromotedSong ?
            [
              {
                type: "text",
                text: [band?.firstPromotedSong, band?.secondPromotedSong]
                    .filter((song) => song)
                    .join(", "),
                color: "#929292",
              },
            ] :
            []),
          {
            type: "box",
            layout: "horizontal",
            contents: [
              ...(band?.streamingPlatform?.spotify ?
                [
                  {
                    type: "image",
                    url: "https://firebasestorage.googleapis.com/v0/b/loma-nkaf.appspot.com/o/social%2Fspotify.svg?alt=media&token=81115900-a641-450c-9ae3-b37abbdd4168",
                    size: "40px",
                    align: "end",
                    offsetTop: "xs",
                    action: {
                      type: "uri",
                      label: "action",
                      uri: band?.streamingPlatform?.spotify,
                    },
                  },
                ] :
                []),
              ...(band?.streamingPlatform?.appleMusic ?
                [
                  {
                    type: "image",
                    url: "https://firebasestorage.googleapis.com/v0/b/loma-nkaf.appspot.com/o/social%2Fapple-music.svg?alt=media&token=3072d292-c7c3-4d8c-ad65-4dccdc037778",
                    size: "45px",
                    align: "end",
                    action: {
                      type: "uri",
                      label: "action",
                      uri: band?.streamingPlatform?.appleMusic,
                    },
                  },
                ] :
                []),
              ...(band?.streamingPlatform?.youtube ?
                [
                  {
                    type: "image",
                    url: "https://firebasestorage.googleapis.com/v0/b/loma-nkaf.appspot.com/o/social%2Fyoutube.svg?alt=media&token=c8fc7182-a955-4954-9b91-815a4e0480e6",
                    size: "47px",
                    action: {
                      type: "uri",
                      label: "action",
                      uri: band?.streamingPlatform?.youtube,
                    },
                  },
                ] :
                []),
            ],
            spacing: "md",
            width: "150px",
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          {
            type: "button",
            style: "link",
            height: "sm",
            action: {
              type: "message",
              label: "ขอเพลง",
              text: `ขอเพลงจากวง ${band.bandName} นี้ได้ไหม`,
            },
          },
          {
            type: "button",
            style: "link",
            height: "sm",
            action: {
              type: "message",
              label: "ดูรายละเอียดเพิ่มเติม",
              text: `ขอรายละเอียดของวง ${band.bandName} นี้เพิ่มเติม`,
            },
          },
        ],
        flex: 0,
        paddingAll: "none",
      },
    },
  };
};
