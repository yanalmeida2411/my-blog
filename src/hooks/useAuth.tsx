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
        const res = await axios.get('http://localhost:3001/profile', { withCredentials: true });
        setUserIdFromToken(res.data.userId);
        setFullname(res.data.fullname);

        const segments = pathname.split('/').filter(Boolean);

        // Só faz a checagem se for uma rota dentro do blog com userId
        if (segments[0] === 'blog' && segments.length > 1) {
          const userIdFromUrl = Number(segments[1]);

          if (res.data.userId !== userIdFromUrl && !isNaN(userIdFromUrl)) {
            alert('Acesso negado! Evite tentar acessar páginas pela URL, Você será redirecionado para sua página.');
            router.push(`/blog/${res.data.userId}`);
          }
        }
      } catch {
        router.push('/login');
      }
    };

    fetchUser();
  }, [pathname, router]);

  return { fullname, userId: userIdFromToken };
}