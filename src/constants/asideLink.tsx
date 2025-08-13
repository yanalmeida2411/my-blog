import {
  FiHome,
  FiUsers,
  FiUserCheck,
  FiFileText,
  FiUser,
} from "react-icons/fi";

export const blogLinks = (userId: number | null) => [
  {
    name: "Início",
    href: `/blog/${userId?.toString()}`,
    icon: <FiHome size={20} />
  },
  {
    name: "Meu Pefil",
    href: `/blog/${userId?.toString()}/meuperfil`,
    icon: <FiUser size={20} />
  },
  {
    name: "Seguidores",
    href: `/blog/${userId?.toString()}/seguidores`,
    icon: <FiUsers size={20} />
  },
  {
    name: "Seguindo",
    href: `/blog/${userId?.toString()}/seguindo`,
    icon: <FiUserCheck size={20} />
  },
  {
    name: "Meus Posts",
    href: `/blog/${userId?.toString()}/meusposts`,
    icon: <FiFileText size={20} />
  },
];
