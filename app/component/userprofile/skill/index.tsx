"use client";

export default function SkillJob() {
  return (
    <div className="w-full bg-white border border-gray-200 p-5 rounded-sm shadow-xs text-gray-800 font-sans space-y-5">
      {/* 1. Description */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-900 text-sm">Description</h3>
          <button className="text-xs text-blue-600 hover:underline font-medium cursor-pointer">
            Edit Description
          </button>
        </div>
      </div>

      {/* 2. Languages */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-gray-900 text-sm">Languages</h3>
          <button className="text-xs text-blue-600 hover:underline font-medium cursor-pointer">
            Add New
          </button>
        </div>
        <p className="text-xs text-gray-600">
          English - <span className="text-gray-400">Basic</span>
        </p>
      </div>

      {/* 3. Linked Accounts */}
      <div className="border-b border-gray-200 pb-5">
        <h3 className="font-bold text-gray-900 text-sm mb-3">
          Linked Accounts
        </h3>
        <ul className="space-y-2.5 text-xs text-blue-600 font-medium">
          <li className="cursor-pointer hover:underline flex items-center gap-1.5">
            <span className="text-blue-500 font-bold text-sm">+</span> Facebook
          </li>
          <li className="cursor-pointer hover:underline flex items-center gap-1.5">
            <span className="text-xs font-bold bg-gray-600 text-white px-1 py-0.2 rounded">
              G+
            </span>{" "}
            Google
          </li>
          <li className="cursor-pointer hover:underline flex items-center gap-1.5">
            <span className="text-blue-500 font-bold text-sm">+</span> Dribbble
          </li>
          <li className="cursor-pointer hover:underline flex items-center gap-1.5">
            <span className="text-blue-500 font-bold text-sm">+</span> Stack
            Overflow
          </li>
          <li className="cursor-pointer hover:underline flex items-center gap-1.5">
            <span className="text-blue-500 font-bold text-sm">+</span> GitHub
          </li>
          <li className="cursor-pointer hover:underline flex items-center gap-1.5">
            <span className="text-blue-500 font-bold text-sm">+</span> Vimeo
          </li>
          <li className="cursor-pointer hover:underline flex items-center gap-1.5">
            <span className="text-blue-500 font-bold text-sm">+</span> Twitter
          </li>
        </ul>
      </div>

      {/* 4. Skills */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-gray-900 text-sm">Skills</h3>
          <button className="text-xs text-blue-600 hover:underline font-medium cursor-pointer">
            Add New
          </button>
        </div>
        <p className="text-xs text-gray-400 italic">Add your Skills.</p>
      </div>

      {/* 5. Education */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-gray-900 text-sm">Education</h3>
          <button className="text-xs text-blue-600 hover:underline font-medium cursor-pointer">
            Add New
          </button>
        </div>
        <p className="text-xs text-gray-400 italic">Add your Education.</p>
      </div>

      {/* 6. Certification */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-gray-900 text-sm">Certification</h3>
          <button className="text-xs text-blue-600 hover:underline font-medium cursor-pointer">
            Add New
          </button>
        </div>
        <p className="text-xs text-gray-400 italic">Add your Certification.</p>
      </div>
    </div>
  );
}
