import React from 'react';

const footerData = [
  {
    title: 'Categories',
    links: [
      { label: 'Graphics & Design', href: '#' },
      { label: 'Digital Marketing', href: '#' },
      { label: 'Writing & Translation', href: '#' },
      { label: 'Video & Animation', href: '#' },
      { label: 'Music & Audio', href: '#' },
      { label: 'Programming & Tech', href: '#' },
      { label: 'Data', href: '#' },
      { label: 'Business', href: '#' },
      { label: 'Lifestyle', href: '#' },
      { label: 'Sitemap', href: '#' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Careers', href: '#' },
      { label: 'Press & News', href: '#' },
      { label: 'Partnerships', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Intellectual Property Claims', href: '#' },
      { label: 'Investor Relations', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help & Support', href: '#' },
      { label: 'Trust & Safety', href: '#' },
      { label: 'Selling on Fiverr', href: '#' },
      { label: 'Buying on Fiverr', href: '#' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Events', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Forum', href: '#' },
      { label: 'Community Standards', href: '#' },
      { label: 'Podcast', href: '#' },
      { label: 'Affiliates', href: '#' },
      { label: 'Invite a Friend', href: '#' },
      { label: 'Become a Seller', href: '#' },
      { label: 'Fiverr Elevate', desc: 'Exclusive Benefits', href: '#' },
    ],
  },
  {
    title: 'More From Fiverr',
    links: [
      { label: 'Fiverr Business', href: '#' },
      { label: 'Fiverr Pro', href: '#' },
      { label: 'Fiverr Studios', href: '#' },
      { label: 'Fiverr Logo Maker', href: '#' },
      { label: 'Fiverr Guides', href: '#' },
      { label: 'Get Inspired', href: '#' },
      { label: 'ClearVoice', desc: 'Content Marketing', href: '#' },
      { label: 'AND CO', desc: 'Invoice Software', href: '#' },
      { label: 'Learn', desc: 'Online Courses', href: '#' },
    ],
  },
];

export default function FooterLinks() {
  return (
      <div className="justify-center w-full container mx-auto px-6 bg-white border-t border-gray-200 py-12 text-gray-600 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {footerData.map((column, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="font-bold text-gray-800 text-base">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={link.href}
                      className="hover:underline hover:text-gray-900 transition-colors block"
                    >
                      <span className="block">{link.label}</span>
                      {link.desc && (
                        <span className="block text-xs text-gray-400 font-normal">
                          {link.desc}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
  );
}