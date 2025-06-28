import React, { useState } from 'react';
import faqicons from "../Assets/faqicon.png";
import { FaRegQuestionCircle } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isFAQVisible, setIsFAQVisible] = useState<boolean>(true);

  const faqs: FAQItem[] = [
    {
      question: "Why do I need to use a Design System?",
      answer:
        "A Design System is a super useful tool for designers. It helps keep designs consistent and makes the user process faster. You can use pre-designed stuff over and over, and it’s helpful for both new and experienced designers. In short, a Design System is like a designer’s toolbox for making great-looking and user-friendly designs.",
    },
    {
      question: "Is there a preview or a free trial available?",
      answer:
        "Yes, we offer a free trial for you to explore the features of our Design System before committing to a purchase. Sign up on our website to get started!",
    },
    {
      question: "Where can I purchase AlignUI Design System?",
      answer:
        "You can purchase the AlignUI Design System directly from our official website. Visit the pricing page for more details and to complete your purchase.",
    },
    {
      question: "What are the recent updates and enhancements in AlignUI?",
      answer:
        "We regularly update AlignUI with new components, improved accessibility, and enhanced performance. Check our changelog on the website for the latest updates.",
    },
    {
      question: "How do I install AlignUI Design System in Figma?",
      answer:
        "To install AlignUI in Figma, visit our website and download the design kit. Follow the step-by-step instructions in the documentation to import it into Figma.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleFAQSection = () => {
    setIsFAQVisible(!isFAQVisible);
  };

  return (
    <div className="  lg:has-[60vh]:xl:h-[70vh] 2xl:h-[100vh] 3xl:h-[70vh] flex items-center justify-center py-12 px-4">
      <div className=" w-[60%]  flex flex-col items-center">
        <button
          // onClick={toggleFAQSection}
          className="flex items-center justify-center space-x-2 w-32 h-12 bg-[#8A63FF] rounded-2xl text-white text-sm font-semibold hover:bg-#8A63FF transition-colors mb-4"
        >
          {/* <img src={faqicons} className='lg:w-6 lg:h-6 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9'/> */}
          <FaRegQuestionCircle className='lg:w-4 lg:h-4 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5'/>
          <span>FAQS</span>
        </button>
        <h2 className="lg:text-4xl xl:text-5xl 3xl:text-5xl font-mont font-medium text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        {isFAQVisible && (
          <div className="space-y-4 w-full">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border rounded-lg overflow-hidden transition-all ${
                  openIndex === index
                    ? 'border-[#8A63FF] shadow-md shadow-purple-200 '
                    : 'border-gray-200'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-6 py-2 text-left bg-white transition-colors"
                >
                  <span className="lg:text-base xl:text-lg 2xl:text-xl font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <span className="flex items-center justify-center w-8 h-8  text-[#8F8F8F] text-2xl">
                    {openIndex === index ? '-' : '+'}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 text-gray-700 lg:text-base xl:text-sm 3xl:w-[60%]">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQ;
