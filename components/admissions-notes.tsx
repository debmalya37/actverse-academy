import {
  HOUSING_START,
  PAYMENT_METHODS,
  REFUND_POLICY,
  formatFee,
} from "@/lib/site-data";

export function AdmissionsNotes() {
  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-14">
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
          Fees &amp; admissions
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/85 md:mt-5 md:text-base md:leading-7 lg:text-[1.0625rem]">
          <li>Taxes applicable as per government norms.</li>
          <li>
            Enquire with admissions about early-bird discounts and special
            offers.
          </li>
          <li>
            Special senior citizen discounts are available on Foundation courses
            in Acting.
          </li>
          <li>{REFUND_POLICY}</li>
          <li>Payment modes: {PAYMENT_METHODS.join(", ")}.</li>
        </ul>
      </div>

      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
          Coming to Mumbai?
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-foreground/85 md:mt-5 md:text-base md:leading-7 lg:text-[1.0625rem]">
          We support outstation students in choosing paying guest, hotels,
          service apartments and rentals. Hostel accommodation expenses start at{" "}
           <b>{formatFee(HOUSING_START)} </b>  per month; costs vary by accommodation type
          and location.
        </p>
        <h3 className="mt-6 font-display text-xl font-semibold tracking-tight md:text-2xl">
          Travel &amp; location
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground/85 md:text-base md:leading-7 lg:text-[1.0625rem]">
          Find Actverse Academy in Versova, opposite Mukesh Khapra Casting.
          Mumbai’s local trains, metro, buses, auto-rickshaws and cab services
          keep the academy connected.
        </p>
      </div>
    </div>
  );
}