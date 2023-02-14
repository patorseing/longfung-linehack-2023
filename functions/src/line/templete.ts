import { Profile } from "@line/bot-sdk";
export const enter1 = (profile: Profile) => ({
  type: "flex",
  altText: "Hello LINE Beacon!",
  contents: {
    type: "bubble",
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "image",
              url: "https://store.ais.co.th/media/catalog/product/cache/2/thumbnail/9df78eab33525d08d6e5fb8d27136e95/b/e/beacon2-01.png",
              size: "full",
              aspectMode: "cover",
              aspectRatio: "14:9",
            },
          ],
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "image",
                  url: `${profile.pictureUrl}`,
                  aspectMode: "cover",
                  size: "full",
                },
              ],
              cornerRadius: "100px",
              width: "72px",
              height: "72px",
            },
            {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "text",
                  contents: [],
                  wrap: true,
                  text: `Hello ${profile.displayName}!`,
                  weight: "bold",
                },
                {
                  type: "text",
                  text: `${profile.statusMessage}`,
                  size: "sm",
                },
              ],
              justifyContent: "center",
            },
          ],
          spacing: "xl",
          paddingAll: "20px",
        },
      ],
      paddingAll: "0px",
    },
  },
});

export const bandTemplete = () => {
  return {
    type: "flex",
    altText: "Hello from band",
    contents: {
      type: "bubble",
      hero: {
        type: "image",
        url: "https://i.ytimg.com/vi/cqQAzpZBpAw/maxresdefault.jpg",
        size: "full",
        aspectRatio: "20:13",
        aspectMode: "cover",
        action: {
          type: "uri",
          label: "Line",
          uri: "https://linecorp.com/",
        },
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "Paper Planes",
            weight: "bold",
            size: "xl",
            contents: [],
          },
          {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            margin: "lg",
            contents: [
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "เพลง",
                    size: "sm",
                    color: "#AAAAAA",
                    flex: 1,
                    contents: [],
                  },
                  {
                    type: "text",
                    text: "ทรงอย่างแบด",
                    size: "sm",
                    color: "#666666",
                    flex: 5,
                    wrap: true,
                    contents: [],
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                position: "relative",
                contents: [
                  {
                    type: "icon",
                    url: "https://play-lh.googleusercontent.com/P2VMEenhpIsubG2oWbvuLGrs0GyyzLiDosGTg8bi8htRXg9Uf0eUtHiUjC28p1jgHzo",
                    size: "3xl",
                    offsetStart: "8px",
                  },
                  {
                    type: "icon",
                    url: "https://www.cnet.com/a/img/resize/c0b4b98d22f67b9ad2d8faba4bb707c643a5e989/hub/2016/06/21/72e03f2a-9435-4566-92aa-d1394827de10/applemusic-ios.png?auto=webp&fit=crop&height=1200&width=1200",
                    size: "3xl",
                    offsetStart: "8px",
                  },
                  {
                    type: "icon",
                    url: "https://play-lh.googleusercontent.com/76AjYITcB0dI0sFqdQjNgXQxRMlDIswbp0BAU_O5Oob-73b6cqKggVlAiNXQAW5Bl1g",
                    size: "3xl",
                    offsetStart: "8px",
                    offsetEnd: "100px",
                  },
                ],
              },
            ],
          },
          {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "รายละเอียด",
                weight: "bold",
                contents: [],
              },
              {
                type: "text",
                text: "Paper Planes วงร็อกอัลเทอร์เนทีฟ จากค่าย Genie records ที่ประกอบไปด้วย 2 สมาชิก ฮาย ธันวา (ร้องนำ) และ เซน นครินทร์ (เบส) เดบิวต์อย่างเป็นทางการในช่วงปี พ.ศ. 2560 ภายใต้โปรโปรเจกต์อัลบั้ม Showroom Vol.3 และปล่อยผลงานเพลงแรกออกมาในชื่อเพลง ก่อนเสียเธอไป ต่อด้วย ซ้ำซ้ำ, เก็บฉันไว้ทำไม, คำตอบเดิม, กุหล",
                weight: "regular",
                contents: [],
              },
            ],
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        flex: 0,
        spacing: "sm",
        contents: [
          {
            type: "button",
            action: {
              type: "uri",
              label: "ขอเพลง",
              uri: "https://linecorp.com",
            },
          },
          {
            type: "button",
            action: {
              type: "uri",
              label: "ดูรายละเอียดเพิ่ม",
              uri: "https://linecorp.com",
            },
            height: "sm",
            style: "link",
          },
          {
            type: "spacer",
            size: "sm",
          },
        ],
      },
    },
  };
};
