import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

export function useAuth() {
  const [fullname, setFullname] = useState<string | null>(null);
  const [userIdFromToken, setUserIdFromToken] = useState<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('https://my-blog-back-dzcr.onrender.com/profile', { withCredentials: true });
        console.log("Resposta profile:", res.data);

        const userIdFromRes = Number(res.data.userId);
        setUserIdFromToken(userIdFromRes);
        setFullname(res.data.fullname);

        const segments = pathname.split('/').filter(Boolean);
        console.log("URL segments:", segments);

        if (segments[0] === 'blog' && segments.length > 1) {
          const userIdFromUrl = Number(segments[1]);
          console.log("userIdFromUrl:", userIdFromUrl, typeof userIdFromUrl);
          console.log("userIdFromRes:", userIdFromRes, typeof userIdFromRes);

          if (userIdFromRes !== userIdFromUrl && !isNaN(userIdFromUrl)) {
            alert('Acesso negado! Evite tentar acessar páginas pela URL, Você será redirecionado para sua página.');
            router.push(`/blog/${userIdFromRes}`);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        router.push('/login');
      }
    };

    fetchUser();
  }, [pathname, router]);

  return { fullname, userId: userIdFromToken };
}
