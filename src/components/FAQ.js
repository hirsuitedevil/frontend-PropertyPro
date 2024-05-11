/* eslint-disable */
import { React, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const FAQ = () => {
  const [open, setOpen] = useState(null);

  const toggle = (index) => {
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };

  const faqs = [
    {
      question: "What is the use of AI in PropertyPro?",
      answer:
        "AI technology in PropertyPro can help sales traffic which will appear suggested to buyers who are looking for a house. Then AI also helps buyers who want to build a house according to the request they want, and then suggests making it happen with PropertyPro.",
    },
    {
      question: "How to use AI on PropertyPro?",
      answer: "Details on how to use AI will be provided here.",
    },
    {
      question: "What is the use of AI in PropertyPro?",
      answer:
        "AI technology in PropertyPro can help sales traffic which will appear suggested to buyers who are looking for a house. Then AI also helps buyers who want to build a house according to the request they want, and then suggests making it happen with PropertyPro.",
    },
    {
      question: "How to use AI on PropertyPro?",
      answer: "Details on how to use AI will be provided here.",
    },
    {
      question: "What is the use of AI in PropertyPro?",
      answer:
        "AI technology in PropertyPro can help sales traffic which will appear suggested to buyers who are looking for a house. Then AI also helps buyers who want to build a house according to the request they want, and then suggests making it happen with PropertyPro.",
    },
    {
      question: "How to use AI on PropertyPro?",
      answer: "Details on how to use AI will be provided here.",
    },
    // Add other FAQs
  ];
  const halfIndex = Math.ceil(faqs.length / 2);
  const firstHalfFaqs = faqs.slice(0, halfIndex);
  const secondHalfFaqs = faqs.slice(halfIndex);
  return (
    <div
      className={`p-8 bg-white py-4 bg-[url('./assets/grid-bg.png')] bg-cover bg-center`}
    >
      <div className="max-w-7xl mx-auto text-center py-8 px-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg leading-6 text-gray-700">
          Here comes the frequently asked questions of our first time users. We
          will answer
        </p>
        <p className="mb-4">and will make you understand on our workflow</p>
        <div className="grid grid-cols-2 ml-28">
          <div className="">
            {firstHalfFaqs.map((faq, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between w-3/4 p-4 text-left text-gray-900 bg-gray-100 rounded-t-lg font-semibold">
                  <span>{faq.question}</span>
                  <button
                    onClick={() => toggle(index)}
                    className="bg-green-500 rounded-full p-1 flex items-center justify-center hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50"
                  >
                    <span>
                      {open === index ? (
                        <FaMinus className="text-white text-xl content-center" />
                      ) : (
                        <FaPlus className=" text-white text-xl content-center" />
                      )}
                    </span>
                  </button>
                </div>
                <div
                  className={`flex justify-between items-center w-3/4 px-4 pb-4 text-left text-gray-900 bg-gray-100 rounded-b-lg ${
                    open === index ? "block" : "hidden"
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
          <div>
            {secondHalfFaqs.map((faq, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between w-3/4 p-4 text-left text-gray-900 bg-gray-100 rounded-t-lg font-semibold">
                  <span>{faq.question}</span>
                  <button
                    onClick={() => toggle(index + halfIndex)}
                    className="bg-green-500 rounded-full p-1 flex items-center justify-center hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50"
                  >
                    <span>
                      {open === index + halfIndex ? (
                        <FaMinus className="text-white text-xl content-center" />
                      ) : (
                        <FaPlus className=" text-white text-xl content-center" />
                      )}
                    </span>
                  </button>
                </div>
                <div
                  className={`flex justify-between items-center w-3/4 px-4 pb-4 text-left text-gray-900 bg-gray-100 rounded-b-lg ${
                    open === index + halfIndex ? "block" : "hidden"
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
