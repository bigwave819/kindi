import { getSingleMenuAction } from "@/actions/user-actions";
import Image from "next/image";
import MenuDetails from "@/components/user/MenuDetails";

export default async function OrderPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const result = await getSingleMenuAction(slug);

  if (!result)
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Item not found 😔</p>
      </div>
    );

  return (
    <section className="container mx-auto p-6 flex flex-col md:flex-row gap-10 items-center justify-center min-h-[80vh]">
      {/* Image Section */}
      <div className="relative w-full md:w-1/2 max-w-sm mx-auto">
        <Image
          src={result.fileUrl || "/placeholder-coffee.jpg"}
          alt={result.title}
          width={400}
          height={400}
          className="rounded-2xl object-cover shadow-lg border"
          unoptimized
        />
      </div>

      {/* Pass data to a client component */}
      <MenuDetails item={result} />
    </section>
  );
}