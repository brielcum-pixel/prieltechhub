export type Experiment = {
  slug: string;
  index: string;
  title: string;
  tag: string;
  description: string;
  tryThis: string;
};

export const experiments: Experiment[] = [
  {
    slug: "followup-simulator",
    index: "E1",
    title: "Follow-up flow simulator",
    tag: "Automation logic",
    description:
      "Toggle the steps of a polite invoice-chasing flow and watch the week reshape. A tiny model of the human-in-the-loop pattern I use in real systems.",
    tryThis: "Turn steps on and off — the timeline and outcome update live.",
  },
  {
    slug: "type-scale",
    index: "E2",
    title: "Type scale playground",
    tag: "Typography",
    description:
      "The display scale behind this site. Drag to feel how Space Grotesk behaves from whisper to shout — the same ramp the hero uses.",
    tryThis: "Drag the slider and resize the window; notice the clamp behavior.",
  },
  {
    slug: "motion-timing",
    index: "E3",
    title: "Motion timing study",
    tag: "Interaction",
    description:
      "One easing curve, three durations. The timing system for every reveal on this site — nothing here exists elsewhere on the web, it just feels right.",
    tryThis: "Replay each duration; reduced-motion users see the instant fallback.",
  },
];
