"use client";

import Script from "next/script";

export function GoKwikButton({ courseName, fee }: { courseName: string, fee: number }) {
  const handleGoKwikCheckout = () => {
    // Check if the GoKwik SDK has loaded on the window object
    if (typeof window !== "undefined" && (window as any).GoKwik) {
      (window as any).GoKwik.init({
        merchantId: process.env.NEXT_PUBLIC_GOKWIK_MERCHANT_ID,
        environment: "production", // or 'sandbox' for testing
        // Pass cart details for the Kwikpass / Checkout overlay
        cart: {
          items: [{ name: courseName, price: fee, quantity: 1 }],
          total: fee
        },
        onSuccess: async (response: any) => {
          // Response contains the auto-filled address/phone details from GoKwik's network
          console.log("GoKwik Success:", response);
          
          // Send this data to your Prisma database (e.g., via a Next.js API route)
          await fetch("/api/leads", {
            method: "POST",
            body: JSON.stringify({
              name: response.customer_name,
              phone: response.customer_phone,
              email: response.customer_email,
              course: courseName
            })
          });
        },
        onClose: () => {
          console.log("User closed the GoKwik popup");
        }
      });
    }
  };

  return (
    <>
      {/* Load GoKwik's proprietary SDK script without blocking page load */}
      <Script 
        src="https://dev.gokwik.co/checkout.js" // Replace with exact URL provided by your GoKwik account manager
        strategy="lazyOnload" 
      />
      <button onClick={handleGoKwikCheckout} className="btn-gold w-full">
        Enquire Now (Fast Checkout)
      </button>
    </>
  );
}