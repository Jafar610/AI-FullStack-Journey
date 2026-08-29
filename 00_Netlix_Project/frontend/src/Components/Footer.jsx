import React from "react";

const footerColumns = [
  ["FAQ", "Investor Relations", "Privacy", "Speed Test"],
  ["Help Center", "Jobs", "Cookie Preferences", "Legal Notices"],
  ["Account", "Ways to Watch", "Corporate Information", "Only on Netflix"],
  ["Media Center", "Terms of Use", "Contact Us", "Netflix Originals"],
];

function Footer() {
  return (
    <footer className="bg-[#141414] text-[#757575] px-4 py-6 sm:px-10 sm:py-8">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs sm:text-sm mb-4 sm:mb-6 text-center sm:text-left">
          Questions? Call{" "}
          <a
            href="tel:0942419800"
            className="text-white hover:underline inline-block"
          >
            0942419800
          </a>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm">
          {footerColumns.map((column, columnIndex) => (
            <ul
              key={columnIndex}
              className="space-y-2 text-center sm:text-left"
            >
              {column.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="block py-2 sm:py-0 hover:underline text-[#757575] hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-[#757575] mt-6 sm:mt-8 text-center">
          Netflix Ethiopia
        </p>
      </div>
    </footer>
  );
}

export default Footer;
