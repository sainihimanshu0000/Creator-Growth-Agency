"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export interface Creator {
  id: string;
  name: string;
  handle: string;
  subscribers?: string;
  followers?: string;
  platform?: "youtube" | "kick" | "instagram";
  url: string;
  avatar: string;
  initials: string;
  tone: string;
  category?: string;
}

const creators: Creator[] = [
  {
    id: "ziya-gaming", name: "Ziya Gaming", handle: "@ziyagaming", subscribers: "6.35M",
    url: "https://www.youtube.com/@ziyagaming",
    avatar: "https://yt3.ggpht.com/ZyoJn3HEwuq2soLYlcbzhV2H0kKu67bqrdRAPbSQ_SM9WfkBnHO4UmPzcfcbW7rTjl3cHJBV=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "ZG", tone: "linear-gradient(140deg, #6247AA, #28B8C4)",
  },
  {
    id: "pri-gaming", name: "Pri Gaming", handle: "@PriGaming", subscribers: "1.96M",
    url: "https://www.youtube.com/@PriGaming",
    avatar: "https://yt3.ggpht.com/zeajWwIL58X8jGC305luZgiAzrpzKJOJIkAibiMcw3faZibh0uXLqtqpvmMnp7ofN5T4bYvs=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "PG", tone: "linear-gradient(140deg, #9E4567, #E59B6D)",
  },
  {
    id: "tagaru-gaming", name: "Tagaru Gaming", handle: "@tagarugaming", subscribers: "703K",
    url: "https://www.youtube.com/@tagarugaming",
    avatar: "https://yt3.ggpht.com/5G3skJy5wHmp1urukJpKkriXhW1B2KPJYGkQ0FgJxG6jQUZoRSmarFdaVDnfsmnQjjq4rfcg=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "TG", tone: "linear-gradient(140deg, #8E614C, #D1A17D)",
  },
  {
    id: "nonstop-gaming", name: "Nonstop Gaming", handle: "@NonstopGaming_", subscribers: "3.82M",
    url: "https://www.youtube.com/@NonstopGaming_",
    avatar: "https://yt3.ggpht.com/VxKxYUuY-Rw-gvKLyK6MIYfdxxDgdJpU1MO7Q-5pA14YyqkxiTdAWOAjoZeFVl3wyvbt4y59QIo=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "NG", tone: "linear-gradient(140deg, #445B5B, #94A28D)",
  },
  {
    id: "fire-eyes-gaming", name: "FireEyes Gaming", handle: "@FireEyesGaming", subscribers: "5.4M",
    url: "https://www.youtube.com/@FireEyesGaming",
    avatar: "https://yt3.ggpht.com/JmbYgqlNq1f-0D8qheQoGXiv-nWdie3XEwr1TydJHLeyZaOt-jKsQCdwmwCIMiwIdHMAULphS2A=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "FE", tone: "linear-gradient(140deg, #80536B, #D29E9A)",
  },
  {
    id: "smooth-sneaky", name: "SMOOTH & SNEAKY", handle: "@smoothsneaky6998", subscribers: "927K",
    url: "https://www.youtube.com/@smoothsneaky6998",
    avatar: "https://yt3.googleusercontent.com/ytc/AIdro_kYLAearTfTUA-5_G7gWpIIrJKtr8zH9PTYv8XB1x8LryA=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "SS", tone: "linear-gradient(140deg, #775B3C, #C7A96D)",
  },
  {
    id: "tufan-ff", name: "TUFAN FF", handle: "@TUFANFF99", subscribers: "878K",
    url: "https://www.youtube.com/@TUFANFF99",
    avatar: "https://yt3.ggpht.com/u3F8pU_w5Wfy0V9BFvYvoTDaf6c1IJxHVaZdj2eNA7jWXUa4-KE8eON6hcCEuEdf0-7NoGkK=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "TF", tone: "linear-gradient(140deg, #4B695C, #9CAD82)",
  },
  {
    id: "tufan-live", name: "TUFAN LIVE", handle: "@tufanlive7620", subscribers: "269K",
    url: "https://www.youtube.com/@tufanlive7620",
    avatar: "https://yt3.ggpht.com/vvop6f1iXCBbPjkPMZf2vt0n7bkbjijpUHfNZkPzLYnD4MdYiFBopcVNzAb_8C1XVXxe2D81zw=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "TL", tone: "linear-gradient(140deg, #49566D, #9EA7B6)",
  },
  {
    id: "decor-gaming", name: "DecoR Gaming", handle: "@DecoRGaming", subscribers: "12.4M",
    url: "https://www.youtube.com/@DecoRGaming",
    avatar: "https://yt3.ggpht.com/bYHq8npzY8QW2qryaQowPJaEhseCwScRYiOrZE-8soeBu4SBkBnvRdnHCsliBoBOx_bn2r90YNw=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "DR", tone: "linear-gradient(140deg, #47695D, #A3B28B)",
  },
  {
    id: "monty-bhai", name: "Monty Bhai", handle: "@montybhaiff", subscribers: "4.07M",
    url: "https://www.youtube.com/@montybhaiff",
    avatar: "https://yt3.ggpht.com/p30PIAfPjF2UPA8QE4_q31Gc_0DZMG2yv2sL3w1WtJUdK1N98uXIv_xabjsGeki36De03p5h9h4=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "MB", tone: "linear-gradient(140deg, #456678, #98B5AA)",
  },
  {
    id: "ng-angry", name: "NG ANGRY", handle: "@NG_ANGRY", subscribers: "216K",
    url: "https://www.youtube.com/@NG_ANGRY",
    avatar: "https://yt3.ggpht.com/XDAAatx8kNIHr9--xXz3drGoSIdIEFgx5tvPs3fnYJXo3WU15vDbjJATFSoJrzEzHGCEVzm6=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "NA", tone: "linear-gradient(140deg, #735744, #C6946D)",
  },
  {
    id: "ng-madmax", name: "NG MADMAX", handle: "@NG_MADMAX9", subscribers: "76.9K",
    url: "https://www.youtube.com/@NG_MADMAX9",
    avatar: "https://yt3.ggpht.com/C21iT_F4G_8lXJN038XZAovd48ZbZKJOty74geDPSlDZJ8-udm6u9Njod7TtIiei7tneGAv75g=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "NM", tone: "linear-gradient(140deg, #655774, #AFA1B6)",
  },
  {
    id: "c5t-arjun", name: "C5T Arjun YT", handle: "@C5T-ARJUN", subscribers: "1.34M",
    url: "https://www.youtube.com/@C5T-ARJUN",
    avatar: "https://yt3.ggpht.com/dBjpGww-uSQo4OJLhLuCnpwxTadKC7Tx8swFmTtyb4WCZNmUhNMBNfqsiZSY5ksm0XEF9P2gpw=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "C5", tone: "linear-gradient(140deg, #7C5F59, #C5A18D)",
  },
  {
    id: "prashant-gamer", name: "Prashant Gamer", handle: "@PrashantGamer08", subscribers: "1.9M",
    url: "https://www.youtube.com/@PrashantGamer08",
    avatar: "https://yt3.ggpht.com/kuahXBRCwaS1IH-X04dzenigIRIg2uf5BzLuKWEZUAwZYHpyPDpIYXHv1viPHovPCj0m5Bup=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "PG", tone: "linear-gradient(140deg, #3D5D4D, #94A17C)",
  },
  {
    id: "ng-esports", name: "NG Esports", handle: "@NGESPORTS", subscribers: "297K",
    url: "https://www.youtube.com/@NGESPORTS",
    avatar: "https://yt3.googleusercontent.com/RUEDDxQifTxAH55ppMTOtWtflcVTcNj_lxN8uALZhJe-ENphvZ360DkI1rUSovtJYCMVkdipCQ=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "NG", tone: "linear-gradient(140deg, #414C65, #8CA6C7)",
  },
  {
    id: "blackshout-ff", name: "BlackShout FF", handle: "@BlackShoutFF", subscribers: "362K",
    url: "https://www.youtube.com/@BlackShoutFF",
    avatar: "https://yt3.googleusercontent.com/jux2B-E6rK8QNFed0b8IqVVEjUF4DpMMrLTaexJ80F3k1tveBjcUQ2KyplR_TwAn_9g52Dz-=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "BS", tone: "linear-gradient(140deg, #4C4141, #C97945)",
  },
  {
    id: "nonstop-ff", name: "Nonstop FF", handle: "@Nonstopff", subscribers: "647K",
    url: "https://www.youtube.com/@Nonstopff",
    avatar: "https://yt3.googleusercontent.com/ytc/AIdro_keRNiVo4Bsgl5iSCrfYhEV_IfEaVLziLNWtgasebdpmfI=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "NF", tone: "linear-gradient(140deg, #3F5D54, #95B395)",
  },
  {
    id: "jackson-gaming", name: "Jackson Gaming", handle: "@JacksonGamingFF", subscribers: "5.82M",
    url: "https://www.youtube.com/@JacksonGamingFF",
    avatar: "https://yt3.googleusercontent.com/ytc/AIdro_lM3D01ryXZ08VGjHJM07Pjjb9Cbzzc5sDswRFfqInJYA=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "JG", tone: "linear-gradient(140deg, #51466D, #A58CC8)",
  },
  {
    id: "notaxid-yt", name: "NOTAXID YT", handle: "@notaxidyt", subscribers: "282K",
    url: "https://www.youtube.com/@notaxidyt",
    avatar: "https://yt3.ggpht.com/HFwdwWFr8J-OCZH2BHFfRdGmVIIxuacB47Z0dBmY_j7nWTz2Q9poctl1Fuj9ePvwuBwxO8hP9w=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "NY", tone: "linear-gradient(140deg, #3D5968, #83B4C4)",
  },
  {
    id: "max-playz", name: "MAX PLAYZ", handle: "@MaxPlayz69", subscribers: "111K",
    url: "https://www.youtube.com/@MaxPlayz69",
    avatar: "https://yt3.ggpht.com/ZJXWxZju9SdpI4wwX5F1M9woAuzhQ-aR9ww6YIRkxjcp6mXyxgnW0HYf3MNrOoJ-Q3T5jokOfQ=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "MP", tone: "linear-gradient(140deg, #654D3B, #C89A65)",
  },
  {
    id: "sunshine-gaming", name: "SUNSHINE GAMING", handle: "@SUNSHINEGAMING000", subscribers: "412K",
    url: "https://www.youtube.com/@SUNSHINEGAMING000",
    avatar: "https://yt3.ggpht.com/-greNo7OqKFiGocR-rtO_3_8WUDpV-0nWN2oeJDQcXzgBl7XJa1MEwRkWovp8rB9_IlT7sqP16o=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "SG", tone: "linear-gradient(140deg, #80603C, #E0B65E)",
  },
  {
    id: "m4x-ff", name: "M4X FF", handle: "@MaxFF69", subscribers: "496K",
    url: "https://www.youtube.com/@MaxFF69",
    avatar: "https://yt3.ggpht.com/NyjijZNgkyjrp5_ZHw2xbnwfEBb1kzb34jVhHBg0pDZOZ36upX2bXGsdt961L-cBCYoiV0pw=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "M4", tone: "linear-gradient(140deg, #475B70, #8CA7CE)",
  },
  {
    id: "rose-live", name: "ROSE LIVE", handle: "@rosegaming012", subscribers: "285K",
    url: "https://www.youtube.com/@rosegaming012",
    avatar: "https://yt3.ggpht.com/DbEM0-12_FJbnAevgYSs-Io5WJr2jx_HqDCVz6PnK_jVEp_i0m2liCsZLZn2lwwVQj5n3lXcmw=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "RL", tone: "linear-gradient(140deg, #80465D, #D28A9E)",
  },
  {
    id: "ng-abhishek", name: "NG ABHISHEK", handle: "@ngabhishek", subscribers: "183K",
    url: "https://www.youtube.com/@ngabhishek",
    avatar: "https://yt3.ggpht.com/kh50ovjdbDjcnC3AwKG2JzsKoZ7BsW2vW8KuVPw03HyVVPcKNYSmCr8S714nOj6FQ1WbwEjY=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "NA", tone: "linear-gradient(140deg, #4E624C, #9EBD7A)",
  },
  {
    id: "boss-army", name: "BOSS ARMY", handle: "@BossArmy", subscribers: "1.62M",
    url: "https://www.youtube.com/@BossArmy",
    avatar: "https://yt3.ggpht.com/OEtbK6_ZLQffmlClFALKY2UNde6k_stAzX41srO5jZO4M8w64s8TTvylBWZOe61MtzY5BIKx0A=s176-c-k-c0x00ffffff-no-rj-mo",
    initials: "BA", tone: "linear-gradient(140deg, #644949, #BC8870)",
  },
  {
    id: "nonstopgaming-kick", name: "Nonstop Gaming", handle: "@nonstopgaming", followers: "93.8K",
    platform: "kick", url: "https://kick.com/nonstopgaming",
    avatar: "https://files.kick.com/images/user/28177882/profile_image/conversion/3a25c8b8-8fea-4db7-b205-869654600cd5-fullsize.webp",
    initials: "NG", tone: "linear-gradient(140deg, #445B5B, #94A28D)",
  },
  {
    id: "boss-army-ff-kick", name: "BOSS ARMY FF", handle: "@bossarmyff", followers: "11.9K",
    platform: "kick", url: "https://kick.com/bossarmyff",
    avatar: "https://files.kick.com/images/user/107878986/profile_image/conversion/0a7acc51-eeca-49ed-932a-3bffd7d15045-fullsize.webp",
    initials: "BA", tone: "linear-gradient(140deg, #644949, #BC8870)",
  },
  {
    id: "fireeyes-instagram", name: "FireEyes Gaming", handle: "@fireeyes_official", followers: "239K",
    platform: "instagram", url: "https://www.instagram.com/fireeyes_official/",
    avatar: "/brand/logo-mark-on-dark.png",
    initials: "FE", tone: "linear-gradient(140deg, #80536B, #D29E9A)",
  },
  {
    id: "smooth-sneaky-instagram", name: "SMOOTH & SNEAKY", handle: "@smooth_and_sneaky", followers: "106K",
    platform: "instagram", url: "https://www.instagram.com/smooth_and_sneaky/",
    avatar: "/brand/logo-mark-on-dark.png",
    initials: "SS", tone: "linear-gradient(140deg, #775B3C, #C7A96D)",
  },
  {
    id: "tufan-ff-instagram", name: "TUFAN FF", handle: "@tufan_ff", followers: "29.9K",
    platform: "instagram", url: "https://www.instagram.com/tufan_ff/",
    avatar: "/brand/logo-mark-on-dark.png",
    initials: "TF", tone: "linear-gradient(140deg, #4B695C, #9CAD82)",
  },
  {
    id: "rose-live-instagram", name: "ROSE LIVE", handle: "@roselive02", followers: "31.8K",
    platform: "instagram", url: "https://www.instagram.com/roselive02/",
    avatar: "/brand/logo-mark-on-dark.png",
    initials: "RL", tone: "linear-gradient(140deg, #80465D, #D28A9E)",
  },
  {
    id: "prashant-prakash-instagram", name: "Prashant Prakash", handle: "@prashantplays_", followers: "23.3K",
    platform: "instagram", url: "https://www.instagram.com/prashantplays_/",
    avatar: "/brand/logo-mark-on-dark.png",
    initials: "PP", tone: "linear-gradient(140deg, #3D5D4D, #94A17C)",
  },
  {
    id: "priyank-patel-instagram", name: "Priyank Patel", handle: "@pri_gamingyt", followers: "109K",
    platform: "instagram", url: "https://www.instagram.com/pri_gamingyt/",
    avatar: "/brand/logo-mark-on-dark.png",
    initials: "PP", tone: "linear-gradient(140deg, #9E4567, #E59B6D)",
  },
  {
    id: "ng-esports-instagram", name: "NG E-SPORTS", handle: "@ng.esports_ff", followers: "16.3K",
    platform: "instagram", url: "https://www.instagram.com/ng.esports_ff/",
    avatar: "/brand/logo-mark-on-dark.png",
    initials: "NG", tone: "linear-gradient(140deg, #414C65, #8CA6C7)",
  },
  {
    id: "nonstopgaming-325-instagram", name: "Shivam Rathi", handle: "@nonstopgaming_325", followers: "196K",
    platform: "instagram", url: "https://www.instagram.com/nonstopgaming_325/",
    avatar: "/brand/logo-mark-on-dark.png",
    initials: "SR", tone: "linear-gradient(140deg, #445B5B, #94A28D)",
  },
  {
    id: "joel-jazz-instagram", name: "Joel Jazz", handle: "@joeljazzofficial", followers: "10.2K",
    platform: "instagram", url: "https://www.instagram.com/joeljazzofficial/",
    avatar: "/brand/logo-mark-on-dark.png",
    initials: "JJ", tone: "linear-gradient(140deg, #6247AA, #D66B9A)",
  },
];

// Helper ordering logic
const featuredYoutube = ["decor-gaming", "ziya-gaming", "jackson-gaming"]
  .map((id) => creators.find((creator) => creator.id === id))
  .filter((c): c is Creator => Boolean(c));

const featuredInstagram = ["fireeyes-instagram", "nonstopgaming-325-instagram", "priyank-patel-instagram"]
  .map((id) => creators.find((creator) => creator.id === id))
  .filter((c): c is Creator => Boolean(c));

const featuredLeaders = featuredYoutube.flatMap((creator, index) =>
  [creator, featuredInstagram[index]].filter((c): c is Creator => Boolean(c))
);

const featuredIds = new Set(featuredLeaders.map((creator) => creator.id));
const remainingCreators = creators.filter((creator) => !featuredIds.has(creator.id));

const audienceValue = (creator: Creator) => {
  const match = String(creator.followers ?? creator.subscribers ?? "0").match(/^([\d.]+)\s*([KM])?$/i);
  if (!match) return 0;
  const multiplier = match[2]?.toUpperCase() === "M" ? 1_000_000 : match[2]?.toUpperCase() === "K" ? 1_000 : 1;
  return Number(match[1]) * multiplier;
};

const platformsList = ["youtube", "instagram", "kick"] as const;
const creatorsByPlatform = Object.fromEntries(
  platformsList.map((platform) => [
    platform,
    remainingCreators
      .filter((creator) => (creator.platform ?? "youtube") === platform)
      .sort((first, second) => audienceValue(second) - audienceValue(first)),
  ])
);

const orderedRemaining: Creator[] = [];
while (platformsList.some((platform) => creatorsByPlatform[platform].length > 0)) {
  platformsList.forEach((platform) => {
    const creator = creatorsByPlatform[platform].shift();
    if (creator) orderedRemaining.push(creator);
  });
}

const orderedCreators = [...featuredLeaders, ...orderedRemaining];
const rowSize = Math.ceil(orderedCreators.length / 3);

const rowRanges = {
  one: orderedCreators.slice(0, rowSize),
  two: orderedCreators.slice(rowSize, rowSize * 2),
  three: orderedCreators.slice(rowSize * 2),
};

function PlatformIcon({ platform = "youtube" }: { platform?: "youtube" | "kick" | "instagram" }) {
  if (platform === "kick") {
    return (
      <span className="text-emerald-400 font-bold text-xs inline-flex items-center gap-1" title="Kick">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
          <path d="M3 2h8v7h2V5h8v6h-6v2h6v9h-8v-7h-2v7H3V2Z" />
        </svg>
      </span>
    );
  }
  if (platform === "instagram") {
    return (
      <span className="text-pink-500 font-bold text-xs inline-flex items-center gap-1" title="Instagram">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current stroke-[2.2] fill-none" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.6" cy="6.7" r="1.2" fill="currentColor" />
        </svg>
      </span>
    );
  }
  return (
    <span className="text-red-500 font-bold text-xs inline-flex items-center gap-1" title="YouTube">
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
      </svg>
    </span>
  );
}

function CreatorAvatar({ creator }: { creator: Creator }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="roster-avatar relative overflow-hidden shrink-0 shadow-md"
      style={{ background: creator.tone }}
    >
      {!imgError && creator.avatar ? (
        <img
          src={creator.avatar}
          alt={creator.name}
          className="w-full h-full object-cover rounded-full"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : (
        <span className="text-xs font-bold text-white tracking-wider">{creator.initials}</span>
      )}
    </div>
  );
}

export function CollabindHome() {
  const [modalTab, setModalTab] = useState<"brand" | "creator" | null>(null);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [showToTop, setShowToTop] = useState(false);

  // Counter animations
  const [creatorsCount, setCreatorsCount] = useState(0);
  const [shortlistsCount, setShortlistsCount] = useState(0);
  const [verticalsCount, setVerticalsCount] = useState(0);

  // Contact form submission state
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Form input values
  const [brandForm, setBrandForm] = useState({ name: "", company: "", email: "", whatsapp: "", brief: "" });
  const [creatorForm, setCreatorForm] = useState({ channelName: "", email: "", channelLink: "", whatsapp: "", about: "" });

  useEffect(() => {
    // Stats count animation
    const duration = 1500;
    const steps = 30;
    const stepTime = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCreatorsCount(Math.min(120, Math.floor(progress * 120)));
      setShortlistsCount(Math.min(48, Math.floor(progress * 48)));
      setVerticalsCount(Math.min(6, Math.floor(progress * 6)));

      if (currentStep >= steps) clearInterval(timer);
    }, stepTime);

    // Scroll listener for back-to-top button
    const handleScroll = () => {
      setShowToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError(null);

    const isBrand = modalTab === "brand";
    const payload = isBrand
      ? { type: "brand", ...brandForm }
      : { type: "creator", ...creatorForm };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setFormError(data.error || "Failed to submit inquiry.");
      } else {
        setFormSubmitted(true);
      }
    } catch {
      setFormError("Network error. Please try again later.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="top" className="min-h-screen bg-canvas text-ink font-sans selection:bg-purple selection:text-canvas overflow-x-hidden">
      <Header onOpenModal={(tab) => { setFormSubmitted(false); setFormError(null); setModalTab(tab); }} />

      <main id="content" className="pt-20 sm:pt-28">
        {/* ===== HERO ===== */}
        <section className="relative pt-6 pb-16 sm:pt-20 sm:pb-32 overflow-hidden px-3 sm:px-6">
          <div className="blob-a pointer-events-none absolute -left-28 top-8 w-[300px] sm:w-[440px] h-[300px] sm:h-[440px] rounded-full bg-purple/10 blur-[100px] sm:blur-[120px]" />
          <div className="blob-b pointer-events-none absolute -right-32 top-1/4 w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] rounded-full bg-purple/15 blur-[100px] sm:blur-[130px]" />

          <div className="max-w-6xl mx-auto text-center relative z-10">
            <span className="reveal pulse inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold bg-orange/10 text-orange border border-orange/25 uppercase tracking-wide">
              🤝 The Ultimate Creator-Brand Bridge
            </span>

            <h1 className="reveal mt-6 sm:mt-9 text-3xl sm:text-6xl lg:text-[4.4rem] font-extrabold tracking-tight text-bordo font-display leading-[1.08] sm:leading-[1.02] max-w-5xl mx-auto">
              Bringing Collabs to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-bordo">Creators</span>.<br />
              Promoting Big <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-bordo">Brands</span> to the World.
            </h1>

            <p className="reveal mt-5 sm:mt-7 text-sm sm:text-lg text-subtext max-w-2xl mx-auto leading-relaxed px-2">
              Collabind links all kinds of brands with all kinds of digital creators — landing high-paying sponsorship deals in your lap while building dominant campaigns that scale market authority.
            </p>

            <div className="reveal mt-8 sm:mt-11 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none mx-auto">
              <button
                type="button"
                onClick={() => document.getElementById("contact-hub")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="btn magnetic glow-orange w-full sm:w-auto bg-orange px-7 py-3.5 sm:px-9 sm:py-4 rounded-xl sm:rounded-2xl text-[#090D10] font-bold text-sm sm:text-base cursor-pointer transition hover:scale-105"
              >
                <span className="sp flex items-center justify-center gap-2">
                  Promote Your Brand <span aria-hidden="true">→</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("contact-hub")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="btn magnetic w-full sm:w-auto glass-card px-7 py-3.5 sm:px-9 sm:py-4 rounded-xl sm:rounded-2xl text-ink font-semibold text-sm sm:text-base hover:bg-purple/5 rise-hover cursor-pointer transition hover:scale-105"
              >
                <span className="sp">Bring Me Collabs</span>
              </button>
            </div>

            <div className="reveal mt-12 sm:mt-16 grid grid-cols-3 gap-2 sm:gap-5 max-w-2xl mx-auto">
              <div className="glass-card rise rounded-xl sm:rounded-2xl py-4 sm:py-6 px-1 sm:px-2 hover:-translate-y-1 transition-transform">
                <div className="text-xl sm:text-4xl font-extrabold text-purple font-display">
                  <span className="count">{creatorsCount}</span>+
                </div>
                <div className="mt-1 text-[10px] sm:text-xs text-subtext font-semibold uppercase tracking-wide">
                  Vetted Creators
                </div>
              </div>
              <div className="glass-card rise rounded-xl sm:rounded-2xl py-4 sm:py-6 px-1 sm:px-2 hover:-translate-y-1 transition-transform">
                <div className="text-xl sm:text-4xl font-extrabold text-purple font-display">
                  <span className="count">{shortlistsCount}</span>hr
                </div>
                <div className="mt-1 text-[10px] sm:text-xs text-subtext font-semibold uppercase tracking-wide">
                  Brand Shortlists
                </div>
              </div>
              <div className="glass-card rise rounded-xl sm:rounded-2xl py-4 sm:py-6 px-1 sm:px-2 hover:-translate-y-1 transition-transform">
                <div className="text-xl sm:text-4xl font-extrabold text-purple font-display">
                  <span className="count">{verticalsCount}</span>
                </div>
                <div className="mt-1 text-[10px] sm:text-xs text-subtext font-semibold uppercase tracking-wide">
                  Elite Verticals
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== MARQUEE ===== */}
        <section className="py-6 sm:py-10 border-y border-clay/30 marquee-wrap bg-card/60 overflow-hidden">
          <p className="text-center text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-subtext mb-4 sm:mb-7">
            Platforms We Activate
          </p>
          <div className="flex overflow-hidden">
            <div className="marquee-track flex shrink-0 items-center gap-8 sm:gap-14 px-4 sm:px-7">
              <span className="font-display font-bold text-sm sm:text-xl text-purple/70">Instagram Reels</span>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple" />
              <span className="font-display font-bold text-sm sm:text-xl text-purple/70">YouTube Shorts</span>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple" />
              <span className="font-display font-bold text-sm sm:text-xl text-purple/70">YouTube Long-Form</span>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple" />
              <span className="font-display font-bold text-sm sm:text-xl text-purple/70">LinkedIn &amp; X</span>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple" />
            </div>
            <div className="marquee-track flex shrink-0 items-center gap-8 sm:gap-14 px-4 sm:px-7" aria-hidden="true">
              <span className="font-display font-bold text-sm sm:text-xl text-purple/70">Instagram Reels</span>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple" />
              <span className="font-display font-bold text-sm sm:text-xl text-purple/70">YouTube Shorts</span>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple" />
              <span className="font-display font-bold text-sm sm:text-xl text-purple/70">YouTube Long-Form</span>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple" />
              <span className="font-display font-bold text-sm sm:text-xl text-purple/70">LinkedIn &amp; X</span>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple" />
            </div>
          </div>
        </section>

        {/* ===== CREATOR ROSTER ===== */}
        <section id="roster" className="roster-section" aria-labelledby="roster-title">
          <div className="roster-shell max-w-6xl mx-auto">
            <div className="roster-heading">
              <div>
                <h2 id="roster-title">
                  Real creator.<br />
                  <span>Real channels.</span>
                </h2>
              </div>
              <p className="roster-intro">
                A few of the creators and spaces we partner with, and their real audience reach.
              </p>
            </div>
          </div>

          <div className="roster-rows" role="group" aria-label="Creator channels">
            {/* Row 1 */}
            <div className="roster-row roster-row-one" role="group" aria-label="Creator channels, first row">
              <div className="roster-track">
                {[...rowRanges.one, ...rowRanges.one].map((creator, i) => {
                  const audience = creator.followers ?? creator.subscribers;
                  const audienceLabel = audience
                    ? `${audience} ${creator.followers ? "FOLLOWERS" : "SUBSCRIBERS"}`
                    : creator.category || "Gaming";

                  return (
                    <button
                      key={`r1-${creator.id}-${i}`}
                      type="button"
                      onClick={() => setSelectedCreator(creator)}
                      className="roster-card"
                    >
                      <CreatorAvatar creator={creator} />
                      <div className="roster-card-info text-left">
                        <div className="flex items-center gap-1.5">
                          <PlatformIcon platform={creator.platform} />
                          <h3 className="truncate font-bold">{creator.name}</h3>
                        </div>
                        <p className="text-xs text-subtext truncate">{creator.handle}</p>
                        <span className="roster-card-badge">{audienceLabel}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 2 */}
            <div className="roster-row roster-row-two" role="group" aria-label="Creator channels, second row">
              <div className="roster-track">
                {[...rowRanges.two, ...rowRanges.two].map((creator, i) => {
                  const audience = creator.followers ?? creator.subscribers;
                  const audienceLabel = audience
                    ? `${audience} ${creator.followers ? "FOLLOWERS" : "SUBSCRIBERS"}`
                    : creator.category || "Gaming";

                  return (
                    <button
                      key={`r2-${creator.id}-${i}`}
                      type="button"
                      onClick={() => setSelectedCreator(creator)}
                      className="roster-card"
                    >
                      <CreatorAvatar creator={creator} />
                      <div className="roster-card-info text-left">
                        <div className="flex items-center gap-1.5">
                          <PlatformIcon platform={creator.platform} />
                          <h3 className="truncate font-bold">{creator.name}</h3>
                        </div>
                        <p className="text-xs text-subtext truncate">{creator.handle}</p>
                        <span className="roster-card-badge">{audienceLabel}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 3 */}
            <div className="roster-row roster-row-three" role="group" aria-label="Creator channels, third row">
              <div className="roster-track">
                {[...rowRanges.three, ...rowRanges.three].map((creator, i) => {
                  const audience = creator.followers ?? creator.subscribers;
                  const audienceLabel = audience
                    ? `${audience} ${creator.followers ? "FOLLOWERS" : "SUBSCRIBERS"}`
                    : creator.category || "Gaming";

                  return (
                    <button
                      key={`r3-${creator.id}-${i}`}
                      type="button"
                      onClick={() => setSelectedCreator(creator)}
                      className="roster-card"
                    >
                      <CreatorAvatar creator={creator} />
                      <div className="roster-card-info text-left">
                        <div className="flex items-center gap-1.5">
                          <PlatformIcon platform={creator.platform} />
                          <h3 className="truncate font-bold">{creator.name}</h3>
                        </div>
                        <p className="text-xs text-subtext truncate">{creator.handle}</p>
                        <span className="roster-card-badge">{audienceLabel}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Creator Details Drawer Modal */}
        {selectedCreator && (
          <>
            <div
              className="roster-drawer-backdrop"
              onClick={() => setSelectedCreator(null)}
            />
            <aside className="roster-drawer" role="dialog" aria-modal="true">
              <button
                type="button"
                className="roster-drawer-close"
                onClick={() => setSelectedCreator(null)}
                aria-label="Close creator details"
              >
                ×
              </button>
              <p className="roster-kicker">CREATOR PROFILE</p>
              <div className="roster-drawer-person">
                <CreatorAvatar creator={selectedCreator} />
                <div>
                  <h2>{selectedCreator.name}</h2>
                  <p className="roster-drawer-channel font-semibold">
                    {selectedCreator.platform?.toUpperCase() ?? "YOUTUBE"} · {selectedCreator.handle}
                  </p>
                </div>
              </div>
              <p className="roster-drawer-description font-medium">
                Publicly visible {selectedCreator.followers ? "follower" : "subscriber"} count:{" "}
                <strong className="text-purple">{selectedCreator.followers ?? selectedCreator.subscribers}</strong>.
              </p>
              <dl className="roster-stats">
                <div>
                  <dt>{selectedCreator.followers ? "Followers" : "Subscribers"}</dt>
                  <dd>{selectedCreator.followers ?? selectedCreator.subscribers}</dd>
                </div>
                <div>
                  <dt>Platform link</dt>
                  <dd>
                    <a
                      href={selectedCreator.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-purple truncate block max-w-[140px]"
                    >
                      {selectedCreator.handle}
                    </a>
                  </dd>
                </div>
              </dl>
              <a
                className="roster-book"
                href={`mailto:support@collabind.com?subject=${encodeURIComponent(`Instant collab with ${selectedCreator.name}`)}`}
              >
                Instant Collab / Book <span aria-hidden="true">↗</span>
              </a>
            </aside>
          </>
        )}

        {/* ===== MANIFESTO ===== */}
        <section id="bridge" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="reveal inline-flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-purple">
              <span className="w-4 sm:w-6 h-px bg-clay/40" /> The Perfect Infrastructure <span className="w-4 sm:w-6 h-px bg-clay/40" />
            </span>
            <blockquote className="reveal text-xl sm:text-4xl md:text-[2.8rem] font-bold text-bordo font-display leading-[1.2] sm:leading-[1.12] mt-5 sm:mt-6 px-2">
              &quot;We cut out the DM spam, loose contracts, and late invoices so you can{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-bordo">build</span>.&quot;
            </blockquote>
          </div>
        </section>

        {/* ===== BRIDGE ===== */}
        <section className="pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="space-y-5 sm:space-y-7">
              <span className="reveal inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-purple">
                <span className="w-4 sm:w-6 h-px bg-clay/40" />
                How It Works
              </span>
              <h2 className="reveal text-2xl sm:text-5xl font-extrabold text-bordo font-display leading-tight">
                One Platform.<br />
                Shared Success.
              </h2>
              <p className="reveal text-sm sm:text-base text-subtext leading-relaxed max-w-md">
                We operate as the core pipeline infrastructure. Creators focus on production; brands focus on scaling conversion traffic.
              </p>
              <div className="reveal flex flex-wrap gap-2.5 pt-1">
                <span className="shimmer px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-teal text-[#090D10] text-[10px] sm:text-xs font-bold uppercase tracking-wide">
                  Any Niche
                </span>
                <span className="shimmer px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-teal text-[#090D10] text-[10px] sm:text-xs font-bold uppercase tracking-wide">
                  Any Brand Size
                </span>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-5">
              <article className="reveal glow rise-hover glass-card rounded-2xl sm:rounded-[1.6rem] p-5 sm:p-7 flex gap-4 sm:gap-5 group hover:border-orange/40">
                <div className="tile flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 shrink-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple to-bordo text-[#090D10] font-extrabold text-base sm:text-lg shadow-lg shadow-purple/40">
                  01
                </div>
                <div>
                  <h3 className="font-bold text-bordo font-display text-base sm:text-lg mb-1">Inbound Deal Drops</h3>
                  <p className="text-xs sm:text-sm text-subtext leading-relaxed">
                    Creators get matched directly to vetted brand proposals without pitching manually.
                  </p>
                </div>
              </article>
              <article className="reveal glow rise-hover glass-card rounded-2xl sm:rounded-[1.6rem] p-5 sm:p-7 flex gap-4 sm:gap-5 group hover:border-orange/40">
                <div className="tile flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 shrink-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple to-bordo text-[#090D10] font-extrabold text-base sm:text-lg shadow-lg shadow-purple/40">
                  02
                </div>
                <div>
                  <h3 className="font-bold text-bordo font-display text-base sm:text-lg mb-1">Hyper-Scale Visibility</h3>
                  <p className="text-xs sm:text-sm text-subtext leading-relaxed">
                    Brands find precise, bot-checked creators across multiple channels simultaneously.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ===== NICHES ===== */}
        <section id="niches" className="py-16 sm:py-24 md:py-32 relative px-4 sm:px-6">
          <div className="blob-a pointer-events-none absolute -right-28 top-40 w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] rounded-full bg-purple/10 blur-[100px] sm:blur-[120px]" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
              <span className="reveal inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-purple">
                <span className="w-4 sm:w-6 h-px bg-clay/40" />
                The Roster Matrix
                <span className="w-4 sm:w-6 h-px bg-clay/40" />
              </span>
              <h2 className="reveal text-2xl sm:text-5xl font-extrabold text-bordo font-display mt-3 sm:mt-4">
                All Kinds of Verticals.
              </h2>
              <p className="reveal mt-3 sm:mt-4 text-xs sm:text-base text-subtext">
                We balance campaigns across six elite sectors of modern digital culture.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {siteConfig.rosterMatrix.sectors.map((sector) => (
                <article
                  key={sector.title}
                  className="reveal glow rise-hover glass-card rounded-2xl sm:rounded-3xl overflow-hidden group hover:-translate-y-1.5 transition-transform"
                >
                  <div className="relative h-40 sm:h-44 overflow-hidden">
                    <img
                      src={sector.image}
                      alt={sector.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    <div className="tile absolute left-5 sm:left-6 -bottom-0 translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple to-bordo flex items-center justify-center text-xl sm:text-2xl shadow-lg shadow-purple/30">
                      {sector.icon}
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 pt-10 sm:pt-11">
                    <h3 className="text-lg sm:text-xl font-bold text-bordo font-display mb-2 sm:mb-3">{sector.title}</h3>
                    <p className="text-xs sm:text-sm text-subtext leading-relaxed mb-4 sm:mb-6">{sector.description}</p>
                    <span className="inline-flex px-3 py-1 rounded-full bg-purple/10 text-purple text-[10px] sm:text-[11px] font-bold tracking-wide">
                      ⚡ {sector.tags}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PLAYBOOKS ===== */}
        <section id="playbooks" className="pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
              <span className="reveal inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-purple">
                <span className="w-4 sm:w-6 h-px bg-clay/40" />
                Playbooks
                <span className="w-4 sm:w-6 h-px bg-clay/40" />
              </span>
              <h2 className="reveal text-2xl sm:text-5xl font-extrabold text-bordo font-display mt-3 sm:mt-4">
                Proven Frameworks for Measurable ROI.
              </h2>
              <p className="reveal mt-3 sm:mt-4 text-xs sm:text-base text-subtext">
                How we structure campaigns to ensure reliable delivery without guesswork.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
              <article className="reveal glow rise-hover glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden group">
                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple to-bordo" />
                <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-purple/12 text-purple text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  Playbook 01
                </span>
                <h3 className="text-base sm:text-lg font-bold text-bordo font-display mt-4 sm:mt-6 mb-3 sm:mb-4">
                  The Synchronized Product Launch
                </h3>
                <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-subtext">
                  <p>
                    <span className="text-purple font-semibold">Objective — </span> Feed saturation and immediate algorithm momentum.
                  </p>
                  <p>
                    <span className="text-purple font-semibold">Execution — </span> 10–15 vetted creators posting within a 72-hour window.
                  </p>
                  <p>
                    <span className="text-purple font-semibold">Core Assets — </span> Coordinated short-form video paired with discount codes.
                  </p>
                </div>
              </article>

              <article className="reveal glow rise-hover glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden group">
                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple to-bordo" />
                <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-purple/12 text-purple text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  Playbook 02
                </span>
                <h3 className="text-base sm:text-lg font-bold text-bordo font-display mt-4 sm:mt-6 mb-3 sm:mb-4">
                  The Authority Funnel
                </h3>
                <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-subtext">
                  <p>
                    <span className="text-purple font-semibold">Objective — </span> Complex product education and long-term brand equity.
                  </p>
                  <p>
                    <span className="text-purple font-semibold">Execution — </span> Deep integrations with trusted niche specialists.
                  </p>
                  <p>
                    <span className="text-purple font-semibold">Core Assets — </span> YouTube segments, podcast reads, and breakdowns.
                  </p>
                </div>
              </article>

              <article className="reveal glow rise-hover glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden group">
                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple to-bordo" />
                <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-purple/12 text-purple text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  Playbook 03
                </span>
                <h3 className="text-base sm:text-lg font-bold text-bordo font-display mt-4 sm:mt-6 mb-3 sm:mb-4">
                  The Paid UGC Performance Engine
                </h3>
                <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-subtext">
                  <p>
                    <span className="text-purple font-semibold">Objective — </span> Continuous creative testing for paid social advertising.
                  </p>
                  <p>
                    <span className="text-purple font-semibold">Execution — </span> Ongoing sourcing of creator-led reviews and skits.
                  </p>
                  <p>
                    <span className="text-purple font-semibold">Core Assets — </span> Raw and polished video with 30–90 day whitelisting.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ===== STANDARDS ===== */}
        <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="dark-card rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-10 md:p-16 relative overflow-hidden">
              <div className="blob-b pointer-events-none absolute -right-20 -top-20 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] rounded-full bg-purple/15 blur-[80px] sm:blur-[120px]" />
              <div className="blob-a pointer-events-none absolute -left-20 -bottom-24 w-[220px] sm:w-[320px] h-[220px] sm:h-[320px] rounded-full bg-purple/30 blur-[80px] sm:blur-[120px]" />
              <div className="relative z-10 text-center max-w-2xl mx-auto mb-8 sm:mb-12">
                <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-teal">
                  <span className="w-4 sm:w-6 h-px bg-clay/50" /> Quality Standards <span className="w-4 sm:w-6 h-px bg-clay/50" />
                </span>
                <h2 className="text-2xl sm:text-5xl font-extrabold mt-3 sm:mt-4">Zero Friction. Zero Fluff.</h2>
              </div>
              <div className="relative z-10 grid md:grid-cols-3 gap-4 sm:gap-5">
                <div className="rounded-2xl sm:rounded-3xl bg-[#131920] text-[#F0F4F8] border border-clay/40 p-5 sm:p-7 hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-orange/10 border border-orange/20 flex items-center justify-center text-orange mb-4 sm:mb-5">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3.5 19 6v5.4c0 4.3-2.9 7.7-7 9.1-4.1-1.4-7-4.8-7-9.1V6l7-2.5Z" />
                      <path d="m8.5 12.2 2.2 2.3 4.8-5" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg mb-1.5 sm:mb-2">Zero Artificial Reach</h3>
                  <p className="text-xs sm:text-sm text-subtext leading-relaxed">
                    Strict screening against fake followers, pods, and bought traffic.
                  </p>
                </div>

                <div className="rounded-2xl sm:rounded-3xl bg-[#131920] text-[#F0F4F8] border border-clay/40 p-5 sm:p-7 hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-orange/10 border border-orange/20 flex items-center justify-center text-orange mb-4 sm:mb-5">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 3.75h7l4 4v12.5H7z" />
                      <path d="M14 3.75v4h4M9.5 11h6M9.5 14.5h6M9.5 18h4" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg mb-1.5 sm:mb-2">Transparent Licensing</h3>
                  <p className="text-xs sm:text-sm text-subtext leading-relaxed">
                    Clean contracts covering post longevity and paid ad permissions.
                  </p>
                </div>

                <div className="rounded-2xl sm:rounded-3xl bg-[#131920] text-[#F0F4F8] border border-clay/40 p-5 sm:p-7 hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-orange/10 border border-orange/20 flex items-center justify-center text-orange mb-4 sm:mb-5">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="8.5" />
                      <path d="M12 7.5V12l3.5 2" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg mb-1.5 sm:mb-2">Strict Milestones</h3>
                  <p className="text-xs sm:text-sm text-subtext leading-relaxed">
                    Defined timelines for briefs, scripts, drafts, and publishing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CONTACT HUB SECTION ===== */}
        <div className="closing-sections">
          <section id="contact-hub" className="conversion-section py-12 sm:py-16 md:py-20 text-center px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <header className="conversion-header mx-auto">
                <span className="conversion-badge reveal inline-flex items-center">Get In Touch</span>
                <h2 className="conversion-title reveal font-display">
                  Ready to Build Something Remarkable?
                </h2>
                <p className="conversion-intro reveal">
                  Whether you’re a brand looking for vetted top-tier creators or a creator ready for high-impact partnerships, select your path below to get started within 24 hours.
                </p>
              </header>

              <div className="conversion-grid">
                <article id="brand-contact" className="contact-card reveal">
                  <span className="contact-badge">For Brands</span>
                  <div className="contact-icon-wrap">
                    <span className="contact-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 11v2h3l9 5V6l-9 5H4Z" />
                        <path d="M7 13l1.4 5H12l-2-6" />
                        <path d="M19 9.5a4 4 0 0 1 0 5" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="contact-title text-xl sm:text-3xl font-extrabold font-display mb-2 sm:mb-3">Promote My Brand</h3>
                  <p className="contact-description text-xs sm:text-sm leading-relaxed mb-5 sm:mb-7">
                    Eliminate the burden of scouting, negotiating, and chasing deadlines. We deliver handpicked creators, secure rights, and track performance.
                  </p>
                  <ul className="contact-features text-xs sm:text-sm mb-6 sm:mb-8">
                    <li className="flex gap-2.5"><span>✓</span><span>Custom creator shortlist within 48 hours</span></li>
                    <li className="flex gap-2.5"><span>✓</span><span>Turnkey contracts, rights &amp; payments managed</span></li>
                    <li className="flex gap-2.5"><span>✓</span><span>Real-time tracking &amp; post-campaign analytics</span></li>
                  </ul>
                  <button
                    type="button"
                    onClick={() => { setFormSubmitted(false); setFormError(null); setModalTab("brand"); }}
                    className="btn contact-action contact-action-primary inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span className="sp">Request Brand Shortlist <span aria-hidden="true">→</span></span>
                  </button>
                </article>

                <article id="creator-contact" className="contact-card reveal">
                  <span className="contact-badge">For Creators</span>
                  <div className="contact-icon-wrap">
                    <span className="contact-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h11A2.5 2.5 0 0 1 20 8.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z" />
                        <circle cx="12" cy="12.5" r="3.2" />
                        <path d="m8 6 1.2-2h5.6L16 6" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="contact-title text-xl sm:text-3xl font-extrabold font-display mb-2 sm:mb-3">Bring Me Collabs</h3>
                  <p className="contact-description text-xs sm:text-sm leading-relaxed mb-5 sm:mb-7">
                    Stop negotiating lowball offers and waiting months for invoices. We connect you directly with brands aligned with your content style.
                  </p>
                  <ul className="contact-features text-xs sm:text-sm mb-6 sm:mb-8">
                    <li className="flex gap-2.5"><span>✓</span><span>Transparent payment terms &amp; clear dates</span></li>
                    <li className="flex gap-2.5"><span>✓</span><span>Structured briefs with agreed boundaries</span></li>
                    <li className="flex gap-2.5"><span>✓</span><span>Recurring brand sponsorship opportunities</span></li>
                  </ul>
                  <button
                    type="button"
                    onClick={() => { setFormSubmitted(false); setFormError(null); setModalTab("creator"); }}
                    className="btn contact-action contact-action-secondary inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span className="sp">Apply to Join Roster <span aria-hidden="true">→</span></span>
                  </button>
                </article>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ===== CONTACT MODAL ===== */}
      {modalTab && (
        <div className="contact-modal">
          <div className="contact-modal-backdrop" onClick={() => setModalTab(null)} />
          <section className="contact-form-card" role="dialog" aria-modal="true">
            <button
              className="contact-form-close"
              type="button"
              aria-label="Close contact form"
              onClick={() => setModalTab(null)}
            >
              ×
            </button>

            <div className="contact-switcher" role="tablist">
              <button
                className={`contact-tab ${modalTab === "brand" ? "is-active" : ""}`}
                type="button"
                onClick={() => { setModalTab("brand"); setFormError(null); setFormSubmitted(false); }}
              >
                I&apos;m a brand
              </button>
              <button
                className={`contact-tab ${modalTab === "creator" ? "is-active" : ""}`}
                type="button"
                onClick={() => { setModalTab("creator"); setFormError(null); setFormSubmitted(false); }}
              >
                I&apos;m a creator
              </button>
            </div>

            <h2 className="contact-form-title">Tell us what you’re looking for.</h2>

            {formSubmitted ? (
              <div className="py-6 sm:py-8 text-center space-y-3 sm:space-y-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-orange/20 text-orange border border-orange/40 flex items-center justify-center mx-auto text-xl sm:text-2xl">
                  ✓
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-ink">Inquiry Submitted!</h3>
                <p className="text-xs sm:text-sm text-subtext">
                  Thank you for reaching out. A Collabind specialist will review your details and respond within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setModalTab(null)}
                  className="btn bg-purple text-canvas px-5 py-2 sm:px-6 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm cursor-pointer mt-3 sm:mt-4"
                >
                  Close window
                </button>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit}>
                {formError && (
                  <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
                    {formError}
                  </div>
                )}

                {modalTab === "brand" ? (
                  <div className="contact-fields">
                    <div className="contact-field">
                      <label htmlFor="brand-name">Your name</label>
                      <input
                        id="brand-name"
                        type="text"
                        placeholder="Full name"
                        value={brandForm.name}
                        onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="contact-field">
                      <label htmlFor="brand-company">Brand or company</label>
                      <input
                        id="brand-company"
                        type="text"
                        placeholder="Company name"
                        value={brandForm.company}
                        onChange={(e) => setBrandForm({ ...brandForm, company: e.target.value })}
                        required
                      />
                    </div>
                    <div className="contact-field">
                      <label htmlFor="brand-email">Work email</label>
                      <input
                        id="brand-email"
                        type="email"
                        placeholder="you@company.com"
                        value={brandForm.email}
                        onChange={(e) => setBrandForm({ ...brandForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="contact-field">
                      <label htmlFor="brand-whatsapp">WhatsApp optional</label>
                      <input
                        id="brand-whatsapp"
                        type="tel"
                        placeholder="Number"
                        value={brandForm.whatsapp}
                        onChange={(e) => setBrandForm({ ...brandForm, whatsapp: e.target.value })}
                      />
                    </div>
                    <div className="contact-field contact-field-wide">
                      <label htmlFor="brand-brief">The brief</label>
                      <textarea
                        id="brand-brief"
                        rows={3}
                        placeholder="Product, market and budget. A few lines is enough."
                        value={brandForm.brief}
                        onChange={(e) => setBrandForm({ ...brandForm, brief: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <div className="contact-fields">
                    <div className="contact-field">
                      <label htmlFor="creator-name">Channel name</label>
                      <input
                        id="creator-name"
                        type="text"
                        placeholder="Your channel"
                        value={creatorForm.channelName}
                        onChange={(e) => setCreatorForm({ ...creatorForm, channelName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="contact-field">
                      <label htmlFor="creator-email">Email</label>
                      <input
                        id="creator-email"
                        type="email"
                        placeholder="you@email.com"
                        value={creatorForm.email}
                        onChange={(e) => setCreatorForm({ ...creatorForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="contact-field">
                      <label htmlFor="creator-link">Channel link</label>
                      <input
                        id="creator-link"
                        type="url"
                        placeholder="YouTube or Instagram link"
                        value={creatorForm.channelLink}
                        onChange={(e) => setCreatorForm({ ...creatorForm, channelLink: e.target.value })}
                        required
                      />
                    </div>
                    <div className="contact-field">
                      <label htmlFor="creator-whatsapp">WhatsApp optional</label>
                      <input
                        id="creator-whatsapp"
                        type="tel"
                        placeholder="Number"
                        value={creatorForm.whatsapp}
                        onChange={(e) => setCreatorForm({ ...creatorForm, whatsapp: e.target.value })}
                      />
                    </div>
                    <div className="contact-field contact-field-wide">
                      <label htmlFor="creator-about">About you</label>
                      <textarea
                        id="creator-about"
                        rows={3}
                        placeholder="Niche, subs and audience country"
                        value={creatorForm.about}
                        onChange={(e) => setCreatorForm({ ...creatorForm, about: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                )}

                <p className="contact-consent">
                  Submitting this form indicates your consent to process your details as described in our{" "}
                  <Link href="/privacy">Privacy Policy</Link> and agreement to our Platform Terms.
                </p>
                <div className="contact-form-actions">
                  <button className="contact-submit" type="submit" disabled={formSubmitting}>
                    {formSubmitting ? "Sending inquiry..." : "Send inquiry →"}
                  </button>
                  <a className="contact-support" href="mailto:support@collabind.com">
                    Or email support@collabind.com
                  </a>
                </div>
              </form>
            )}
          </section>
        </div>
      )}

      <Footer onOpenModal={(tab) => { setFormSubmitted(false); setFormError(null); setModalTab(tab); }} />

      {/* ===== BACK TO TOP ===== */}
      {showToTop && (
        <button
          id="toTop"
          aria-label="Back to top"
          onClick={scrollToTop}
          className="back-top group fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 ease-out group-hover:-translate-y-1"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}