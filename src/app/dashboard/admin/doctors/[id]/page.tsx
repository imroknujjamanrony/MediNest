import DoctorDetails from "./DoctorDetails";

export default async function DoctorDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the params Promise to get the actual values
  const { id } = await params;

  return <DoctorDetails id={id} />;
}
