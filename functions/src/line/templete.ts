import {format} from "date-fns-tz";
import {add} from "date-fns";

import {Event} from "../api/dto/event";
import {createBandDTO} from "../api/dto/band";

export const eventTemplate = ({
  event,
  interested,
  userId,
}: {
  event: { token: string } & Event;
  interested?: boolean;
  userId?: string;
}) => {
  return {
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
                        offsetTop: "4px",
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
                        text: `${format(
                            add(
                                (
                              event.eventStartTime as FirebaseFirestore.Timestamp
                                ).toDate(),
                                {hours: -17}
                            ),
                            "HH:mm",
                            {timeZone: "asia/Bangkok"}
                        )} - ${format(
                            add(
                                (
                              event.eventEndTime as FirebaseFirestore.Timestamp
                                ).toDate(),
                                {hours: -17}
                            ),
                            "HH:mm",
                            {timeZone: "asia/Bangkok"}
                        )}`,
                        flex: 5,
                        color: "#929292",
                        offsetTop: "4px",
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
                        offsetTop: "4px",
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
                  type: "postback",
                  label: "ติดตาม",
                  data: `ติดตาม ${event.token}`,
                },
                height: "sm",
              },
            ]),
          {
            type: "button",
            action: {
              type: "uri",
              label: "รายละเอียดเพิ่มเติม",
              uri: `https://liff.line.me/1657898632-vkQB6aYy/event-info/${event.token}`,
            },
            height: "sm",
          },
        ],
        paddingAll: "none",
      },
    },
  };
};

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

export const bandTemplete = (band: { token: string } & createBandDTO) => {
  return {
    type: "flex",
    altText: band.bandName,
    contents: {
      type: "bubble",
      hero: {
        type: "image",
        url:
          band?.bandImage ??
          /* eslint max-len: ["error", { "code": 200 }]*/
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
          ...(band?.streamingPlatform?.appleMusic ||
          band?.streamingPlatform?.spotify ||
          band?.streamingPlatform?.youtube ?
            [
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
            ] :
            []),
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
              type: "uri",
              label: "ขอเพลง",
              uri: `https://liff.line.me/1657898632-vkQB6aYy/song-request/${band.token}`,
            },
          },
          {
            type: "button",
            style: "link",
            height: "sm",
            action: {
              type: "uri",
              label: "ดูรายละเอียดเพิ่มเติม",
              uri: `https://liff.line.me/1657898632-vkQB6aYy/band-info/${band.token}`,
            },
          },
          {
            type: "button",
            style: "link",
            height: "sm",
            action: {
              type: "postback",
              label: "สนับสนุนวงดนตรีนี้",
              data: `ขอช่องทางสนับสนุนของ ${band.token}`,
            },
          },
        ],
        flex: 0,
        paddingAll: "none",
      },
    },
  };
};

export const bandLineUpTemplete = (
    bandName: string,
    startTime: string,
    endTime: string,
    bandImage?: string
) => {
  return {
    type: "flex",
    altText: bandName,
    contents: {
      type: "bubble",
      size: "mega",
      body: {
        type: "box",
        layout: "horizontal",
        contents: [
          {
            type: "image",
            url:
              bandImage ??
              "https://firebasestorage.googleapis.com/v0/b/loma-nkaf.appspot.com/o/undefine.png?alt=media&token=c37fea4d-c6a9-4344-991d-d8a01fef142d",
            size: "full",
            aspectMode: "cover",
          },
          {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: `${startTime} - ${endTime}`,
                wrap: true,
                size: "sm",
              },
              {
                type: "text",
                text: bandName,
                gravity: "center",
                wrap: false,
                size: "xl",
                weight: "bold",
              },
            ],
            height: "50%",
            paddingAll: "xl",
            margin: "md",
            offsetTop: "25px",
          },
        ],
        paddingAll: "none",
      },
    },
  };
};
