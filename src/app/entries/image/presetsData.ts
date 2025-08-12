export type PresetOptions = {
  id: string;
  label: string;
  w: number;
  h: number;
};

export type Preset = {
  id: string;
  label: string;
  options: Array<PresetOptions>;
};

export const presetsData: Array<Preset> = [
  {
    label: "Facebook",
    id: "facebook",
    options: [
      {
        id: "facebook-post",
        label: "Facebook Post",
        w: 1200,
        h: 630,
      },
      {
        id: "facebook-cover",
        label: "Facebook Cover",
        w: 851,
        h: 315,
      },
      {
        id: "facebook-profile",
        label: "Facebook Profile",
        w: 170,
        h: 170,
      },
      {
        id: "facebook-story",
        label: "Facebook Story",
        w: 1080,
        h: 1920,
      },
    ],
  },
  {
    label: "Instagram",
    id: "instagram",
    options: [
      {
        id: "instagram-landscape",
        label: "Instagram Landscape",
        w: 1080,
        h: 566,
      },
      {
        id: "instagram-portait",
        label: "Instagram Portait",
        w: 1080,
        h: 1350,
      },
      {
        id: "instagram-square",
        label: "Instagram Square",
        w: 1080,
        h: 1080,
      },
      {
        id: "instagram-story",
        label: "Instagram Story",
        w: 1080,
        h: 1920,
      },
      {
        id: "instagram-thumbnail",
        label: "Instagram Thumbnail",
        w: 161,
        h: 161,
      },
    ],
  },
  {
    label: "LinkedIn",
    id: "linkedin",
    options: [
      {
        id: "linkedin-blog-post",
        label: "LinkedIn Blog Post",
        w: 1200,
        h: 627,
      },
      {
        id: "linkedin-cover",
        label: "LinkedIn Cover",
        w: 1128,
        h: 191,
      },
      {
        id: "linkedin-profile",
        label: "LinkedIn Profile",
        w: 400,
        h: 400,
      },
    ],
  },
];
