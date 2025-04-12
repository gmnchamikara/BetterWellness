import {
  Squares2X2Icon,
  UserIcon,
  CalendarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  UserGroupIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Squares2X2Icon,
  },
  {
    name: "Counselors",
    href: "/dashboard/counselors",
    icon: UserGroupIcon,
  },
  {
    name: "Sessions",
    href: "/dashboard/sessions",
    icon: CalendarIcon,
  },
  {
    name: "Messages",
    href: "/dashboard/messages",
    icon: ChatBubbleOvalLeftEllipsisIcon,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: UserIcon,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Cog6ToothIcon,
  },
];

export default navigation;
