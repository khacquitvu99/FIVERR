export default function Title() {
  return (
    <div className="container mx-auto px-6 bg-[#fafafa] py-4 border-b border-gray-100">
      <div className="mx-auto px-6 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-gray-400 text-sm font-semibold">
        {/* Tiêu đề Trusted by */}
        <span className="text-gray-400 font-medium">Trusted by:</span>

        {/* Facebook */}
        <span className="text-lg tracking-wider font-bold uppercase opacity-60 hover:opacity-100 transition">
          facebook
        </span>

        {/* Google */}
        <span className="text-xl font-bold font-serif opacity-60 hover:opacity-100 transition">
          Google
        </span>

        {/* Netflix */}
        <span className="text-lg font-black tracking-widest uppercase opacity-60 hover:opacity-100 transition">
          NETFLIX
        </span>

        {/* P&G */}
        <span className="text-lg font-bold italic opacity-60 hover:opacity-100 transition">
          P&G
        </span>

        {/* PayPal */}
        <span className="text-lg font-extrabold italic tracking-tighter opacity-60 hover:opacity-100 transition">
          PayPal
        </span>
      </div>
    </div>
  );
}