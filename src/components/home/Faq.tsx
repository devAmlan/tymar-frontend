"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import _ from "lodash"
import { nanoid } from "nanoid"

const fAQ = [
    {
        id: nanoid(),
        question: "Is it accessible?",
        answer: "Yes. It adheres to the WAI-ARIA design pattern."
    }
]
export default function Faq() {
    return <div className="w-full flex justify-center items-center">
        {_.map(fAQ, (item) => {
            return <Accordion type="single" collapsible className="w-full mx-10 md:mx-0" key={item?.id}> <AccordionItem value={item?.id}>
                <AccordionTrigger className="text-lg">{item?.question}</AccordionTrigger>
                <AccordionContent>
                    {item?.answer}
                </AccordionContent>
            </AccordionItem></Accordion>
        })}



    </div>
}