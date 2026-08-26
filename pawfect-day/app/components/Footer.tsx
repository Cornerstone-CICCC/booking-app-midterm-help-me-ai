import Link from "next/link";

export default function Footer() {
  return (
    <footer 
    className="bg-brown py-[64px] px-[24px] 
    md:px-[48px] lg:px-[96px]">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2">
          <div
            className="
            flex
            items-center
            gap-2
            font-display
            text-xl
            font-semibold
            text-cream
          "
          >
            <span aria-hidden="true">🐾</span>
            <span>Pawfect Day</span>
          </div>
          <p className="text-cream/70">
            A warm, professional grooming salon where every pet is treated with
            care, patience and love.
          </p>
        </div>
        <div className="col-span-1 flex-col">
            <h3 className="font-semibold text-cream mb-2 uppercase">
                Visit Us</h3>
            <p className="text-cream/70 text-sm">
              1234 Pet Lane<br />
              Petville, PA 12345<br />
              (123) 456-7890<br />
              info@pawfectday.com


            </p>
     
            
            
        </div>
        <div className="col-span-1 flex-col">
            <h3 className="font-semibold text-cream mb-2 uppercase">
                Hours</h3>
            <p className="text-cream/70 text-sm">
              Monday - Friday: 9am - 6pm<br />
              Saturday: 10am - 4pm<br />
              Sunday: Closed
            </p>
            <div className="mt-2 border-t border-cream/40 pt-2">
                <Link href="/dashboard" className="text-cream/70 hover:text-terra transition-colors" >Staff Login</Link>
            </div>
        </div>
      </div>
      <div className="text-cream/40 container mx-auto text-center border-t border-cream/40 pt-4 mt-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Pawfect Day. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
