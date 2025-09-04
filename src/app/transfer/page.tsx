export default function TransferGuidePage() {
  return (
    <div className="container-px mx-auto py-8">
      <h1 className="text-2xl font-semibold">Transfer guide</h1>
      <div className="mt-4 card rounded-[--radius] p-5">
        <ol className="list-decimal list-inside text-sm text-[--color-muted-foreground] space-y-1">
          <li>For .com transfers, we’ll ask the seller to provide an EPP/Auth code.</li>
          <li>Or a registrar push if enabled by the current registrar.</li>
          <li>You confirm control by adding DNS or logging proof at the destination.</li>
        </ol>
      </div>
    </div>
  );
}


