// import GenerateForm from "./generate-form";

import GenerateForm from "./generate-form";

// export const metadata = {
//   title: "Generate | Dashboard | WriteFlow AI",
// };

// export default function GeneratePage({
//   searchParams,
// }: {
//   searchParams: { prompt?: string; topic?: string; tone?: string; audience?: string };
// }) {
//   return (
//     <GenerateForm
//       initialPrompt={searchParams.prompt ?? ""}
//       initialTopic={searchParams.topic ?? ""}
//       initialTone={searchParams.tone ?? "formal"}
//       initialAudience={searchParams.audience ?? ""}
//     />
//   );
// }


export default async function GeneratePage({ searchParams }: any) {
  const params = await searchParams;

  return (
    <GenerateForm
      initialPrompt={params.prompt ?? ""}
      initialTopic={params.topic ?? ""}
      initialTone={params.tone ?? "formal"}
      initialAudience={params.audience ?? ""}
    />
  );
}