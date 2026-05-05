import {
  DataStyleConfig,
  DisplayConfig,
  EffectsConfig,
  FontsConfig,
  MailchimpConfig,
  ProtectedRoutesConfig,
  RoutesConfig,
  SameAsConfig,
  SchemaConfig,
  SocialSharingConfig,
  StyleConfig,
} from "@/types";
import { home } from "./index";

const baseURL: string = "https://magic-portfolio-tau.vercel.app";

const routes: RoutesConfig = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": false,
  "/gallery": false,
};

const display: DisplayConfig = {
  location: false,
  time: false,
  themeSwitcher: true,
};

const protectedRoutes: ProtectedRoutesConfig = {};

// Parisian Studio typography — refined serifs with italic expressiveness
import { Cormorant_Garamond } from "next/font/google";
import { Lora } from "next/font/google";
import { DM_Sans } from "next/font/google";
import { Geist_Mono } from "next/font/google";

const heading = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
});

const body = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const label = DM_Sans({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts: FontsConfig = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

// Parisian Studio palette — warm parchment + custom ochre brand + terracotta accent
const style: StyleConfig = {
  theme: "light",
  neutral: "sand",
  brand: "orange",   // overridden by --scheme-brand-* in custom.css (ochre gold)
  accent: "red",     // overridden by --scheme-accent-* in custom.css (terracotta)
  solid: "color",
  solidStyle: "flat",
  border: "conservative",
  surface: "translucent",
  transition: "all",
  scaling: "100",
};

const dataStyle: DataStyleConfig = {
  variant: "gradient",
  mode: "categorical",
  height: 24,
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};

const effects: EffectsConfig = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: true,
    opacity: 60,
    x: 50,
    y: 0,
    width: 80,
    height: 40,
    tilt: 0,
    colorStart: "brand-background-strong",
    colorEnd: "page-background",
  },
  dots: {
    display: false,
    opacity: 20,
    size: "2",
    color: "brand-background-strong",
  },
  grid: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-medium",
    width: "0.25rem",
    height: "0.25rem",
  },
  lines: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-weak",
    size: "16",
    thickness: 1,
    angle: 45,
  },
};

const mailchimp: MailchimpConfig = {
  action: "https://url/subscribe/post?parameters",
  effects: {
    mask: {
      cursor: true,
      x: 50,
      y: 0,
      radius: 100,
    },
    gradient: {
      display: true,
      opacity: 90,
      x: 50,
      y: 0,
      width: 50,
      height: 50,
      tilt: 0,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
    },
    dots: {
      display: false,
      opacity: 20,
      size: "2",
      color: "brand-on-background-weak",
    },
    grid: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      width: "0.25rem",
      height: "0.25rem",
    },
    lines: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      size: "16",
      thickness: 1,
      angle: 90,
    },
  },
};

const schema: SchemaConfig = {
  logo: "",
  type: "Person",
  name: "Ayush Gupta",
  description: home.description,
  email: "ayushgupta20011@gmail.com",
};

const sameAs: SameAsConfig = {
  threads: "",
  linkedin: "https://www.linkedin.com/in/ayush-gupta-50007b1b6/",
  discord: "",
};

const socialSharing: SocialSharingConfig = {
  display: true,
  platforms: {
    x: false,
    linkedin: true,
    facebook: false,
    pinterest: false,
    whatsapp: false,
    reddit: false,
    telegram: false,
    email: true,
    copyLink: true,
  },
};

export {
  display,
  mailchimp,
  routes,
  protectedRoutes,
  baseURL,
  fonts,
  style,
  schema,
  sameAs,
  socialSharing,
  effects,
  dataStyle,
};
