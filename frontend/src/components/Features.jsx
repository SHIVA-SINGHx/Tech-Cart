import React from "react";
import { Truck, ShieldCheck, Headphones } from "lucide-react";

const features = [
  {
    icon: <Truck size={32} className="text-blue-600" />,
    title: "Free Shipping",
    desc: "On orders over $50",
  },
  {
    icon: <ShieldCheck size={32} className="text-green-600" />,
    title: "Secure Payment",
    desc: "100% secure transactions",
  },
  {
    icon: <Headphones size={32} className="text-purple-600" />,
    title: "24/7 Support",
    desc: "Always here to help",
  },
];

const Features = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {features.map((item, i) => (
          <div key={i} className="flex flex-col items-center space-y-3">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full">{item.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
