export async function generateStaticParams() {
  return [
    { plantId: '1' },
    { plantId: '2' },
    { plantId: '3' },
    { plantId: '4' },
    { plantId: '5' },
    { plantId: '6' },
    { plantId: '7' },
    { plantId: '8' },
  ];
}

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Under Maintenance</h1>
        <p>This page is temporarily unavailable while we fix some issues.</p>
      </div>
    </div>
  );
}
