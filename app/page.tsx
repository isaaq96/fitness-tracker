import { redirect } from "next/navigation";

type HomePageProps = {
  searchParams: Promise<{
    code?: string;
    next?: string;
    token_hash?: string;
    type?: string;
  }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const callbackParams = new URLSearchParams();

  if (typeof params.code === "string") {
    callbackParams.set("code", params.code);
  }

  if (typeof params.next === "string") {
    callbackParams.set("next", params.next);
  }

  if (typeof params.token_hash === "string") {
    callbackParams.set("token_hash", params.token_hash);
  }

  if (typeof params.type === "string") {
    callbackParams.set("type", params.type);
  }

  if (callbackParams.size > 0) {
    redirect(`/auth/confirm?${callbackParams.toString()}`);
  }

  redirect("/today");
}
