export default function CheckoutPage() {
  return (
    <div className="container-px mx-auto py-8">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="card rounded-[--radius] p-5">
          <div className="font-medium">Order summary</div>
          <div className="mt-3 grid gap-3 text-sm">
            <div className="flex items-center justify-between"><span>Domain</span><span>brandly.io</span></div>
            <div className="flex items-center justify-between"><span>Subtotal</span><span>$4,800</span></div>
            <div className="flex items-center justify-between"><span>Fees</span><span>$0</span></div>
            <div className="flex items-center justify-between font-semibold"><span>Total</span><span>$4,800</span></div>
          </div>
          <div className="mt-4 p-3 rounded-[--radius] bg-[--color-muted] text-sm">
            Funds held in escrow until you confirm transfer.
          </div>
        </section>
        <aside className="space-y-4">
          <div className="card rounded-[--radius] p-5">
            <div className="font-medium">Payment</div>
            <div className="mt-3 grid gap-2 text-sm">
              <label className="flex items-center gap-2"><input type="radio" name="pay" defaultChecked/> Pay in full</label>
              <label className="flex items-center gap-2"><input type="radio" name="pay"/> Start a payment plan</label>
            </div>
            <button className="mt-4 h-11 w-full rounded-full bg-[--color-primary] text-[--color-primary-foreground] font-medium">Pay securely</button>
          </div>
          <div className="card rounded-[--radius] p-5">
            <div className="font-medium">What happens next</div>
            <ol className="mt-3 list-decimal list-inside text-sm text-[--color-muted-foreground] space-y-1">
              <li>We hold funds in escrow</li>
              <li>Seller provides EPP or initiates push</li>
              <li>You confirm control</li>
              <li>We release funds</li>
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}


