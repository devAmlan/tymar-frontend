"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";

export default function Features() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-10 mx-5 md:mx-0">
      <nav className="w-full col-span-1">
        <ul className="flex flex-col">
          {tabs.map((item) => (
            <motion.li
              key={item.label}
              initial={false}
              animate={{
                backgroundColor: item === selectedTab ? "#eee" : "#eee0",
              }}
              className="py-5 md:px-4 px-0 md:border-r-2 border-r-0 border-b-2 md:border-b-0 border-gray-300"
              onClick={() => setSelectedTab(item)}
            >
              {`${item.icon} ${item.label}`}
              {item === selectedTab ? (
                <motion.div layoutId="underline" id="underline" />
              ) : null}
            </motion.li>
          ))}
        </ul>
      </nav>
      <main className="md:col-span-2 col-span-1">
        {selectedTab && (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab ? selectedTab.label : "empty"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="md:text-4xl text-3xl font-bold">{selectedTab.heading}</h3>
              <p className="my-5">{selectedTab.description}</p>
              <div className="w-full md:h-96 h-60 overflow-hidden rounded-lg">
                <motion.img src={selectedTab?.image} alt="image" className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }} />
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}

const allIngredients = [
  {
    icon: "🍅",
    label: "Tomato",
    heading: "Tomato",
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    image:
      "https://nimbusweb.me/wp-content/themes/nimbus/assets/images/homepage/implementation-2.png",
  },
  {
    icon: "🥬",
    label: "Lettuce",
    heading: "Lettuce",
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    image:
      "https://nimbusweb.me/wp-content/themes/nimbus/assets/images/homepage/implementation-2.png",
  },
  {
    icon: "🧀",
    label: "Cheese",
    heading: "Cheese",
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    image:
      "https://nimbusweb.me/wp-content/themes/nimbus/assets/images/homepage/implementation-2.png",
  },
  {
    icon: "🥕",
    label: "Carrot",
    heading: "Carrot",
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    image:
      "https://nimbusweb.me/wp-content/themes/nimbus/assets/images/homepage/implementation-2.png",
  },
  {
    icon: "🍌",
    label: "Banana",
    heading: "Banana",
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    image:
      "https://nimbusweb.me/wp-content/themes/nimbus/assets/images/homepage/implementation-2.png",
  },
];

const [tomato, lettuce, cheese, carrot] = allIngredients;
const tabs = [tomato, lettuce, cheese, carrot];
