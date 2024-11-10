export interface NavBarItems {
  id: number;
  href: string;
  label: string;
}

export const navbarItems: NavBarItems[] = [
  {
    id: 1,
    href: "weather-news",
    label: "Weather/News",
  },
  {
    id: 2,
    href: "kanban",
    label: "Kanban",
  },
  {
    id: 3,
    href: "analytics",
    label: "Analytics",
  },
];
