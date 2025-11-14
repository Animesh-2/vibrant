export const avatarConfig: {
  avatars: {
    id: string;
    name: string;
    image: string;
    voices: {
      id: string;
      label: string;
      src: string;
      icon: string;
    }[];
  }[];
} = {
  avatars: [
    {
      id: "avatar1",
      name: "Sophia",
      image: "/assets/avatar1.png",
      voices: [
        {
          id: "v1",
          label: "Calm Voice",
          src: "/assets/audio/avatar1-calm.mp3",
          icon: "/assets/voice1.png",
        },
        {
          id: "v2",
          label: "Energetic Voice",
          src: "/assets/audio/voice1-energetic.mp3",
          icon: "/assets/voice1.png",
        },
        {
          id: "v3",
          label: "Professional Voice",
          src: "/assets/audio/voice1-professional.mp3",
          icon: "/assets/voice1.png",
        },
      ],
    },
    {
      id: "avatar2",
      name: "Liam",
      image: "/assets/avatar2.png",
      voices: [
        {
          id: "v1",
          label: "Friendly Voice",
          src: "/assets/audio/avatar2-friendly.mp3",
          icon: "/assets/voice1.png",
        },
        {
          id: "v2",
          label: "Deep Voice",
          src: "/assets/audio/avatar2-deep.mp3",
          icon: "/assets/voice1.png",
        },
      ],
    },
    {
      id: "avatar3",
      name: "Sophia",
      image: "/assets/avatar3.png",
      voices: [
        {
          id: "v1",
          label: "Calm Voice",
          src: "/assets/audio/avatar1-calm.mp3",
          icon: "/assets/voice1.png",
        },
        {
          id: "v2",
          label: "Energetic Voice",
          src: "/assets/audio/voice1-energetic.mp3",
          icon: "/assets/voice1.png",
        },
        {
          id: "v3",
          label: "Professional Voice",
          src: "/assets/audio/voice1-professional.mp3",
          icon: "/assets/voice1.png",
        },
      ],
    },{
      id: "avatar4",
      name: "Sophia",
      image: "/assets/avatar4.png",
      voices: [
        {
          id: "v1",
          label: "Calm Voice",
          src: "/assets/audio/avatar1-calm.mp3",
          icon: "/assets/voice1.png",
        },
        {
          id: "v2",
          label: "Energetic Voice",
          src: "/assets/audio/voice1-energetic.mp3",
          icon: "/assets/voice1.png",
        },
        {
          id: "v3",
          label: "Professional Voice",
          src: "/assets/audio/voice1-professional.mp3",
          icon: "/assets/voice1.png",
        },
      ],
    },
  ],
};
