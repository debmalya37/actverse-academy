import { HOUSING_START, PAYMENT_METHODS, REFUND_POLICY, formatFee } from "@/lib/site-data";

export function AdmissionsNotes() { 
  return (
    <div className="grid gap-10 border-t border-border pt-10 md:grid-cols-2">
      <div>
        <h2 className="text-2xl">Fees & admissions</h2>
        <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
          <li>Taxes applicable as per government norms.</li>
          <li>Enquire with admissions about early-bird discounts and special offers.</li>
          <li>Special senior citizen discounts are available on Foundation courses in Acting.</li>
          <li>{REFUND_POLICY}</li>
          <li>Payment modes: {PAYMENT_METHODS.join(", ")}.</li>
        </ul>
      </div>
      <div>
        <h2 className="text-2xl">Coming to Mumbai?</h2>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          We support outstation students in choosing paying guest, hotels, service apartments and rentals. Hostel accommodation expenses start at {formatFee(HOUSING_START)} per month; costs vary by accommodation type and location.
        </p>
        <h3 className="mt-6 text-xl">Travel & location</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Find Actverse Academy in Versova, opposite Mukesh Khapra Casting. Mumbai’s local trains, metro, buses, auto-rickshaws and cab services keep the academy connected.
        </p>
      </div>
    </div>
  ); 
}

