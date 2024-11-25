import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  try {
    const { cabinId } = params;
    if (!cabinId) throw new Error("Missing cabinId in params.");

    const { name } = await getCabin(cabinId);
    return { title: `Cabin ${name}` };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return { title: "Cabin Not Found" };
  }
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  return (
    <>
      <div className="max-w-6xl mx-auto mt-8">
        <Cabin cabin={cabin} />
      </div>
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name}. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </>
  );
}
