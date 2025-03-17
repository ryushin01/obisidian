"use client";

import { Accordion } from "@components/common";
import { ACCORDION_DATA_LIST } from "./data/data";

export default function SampleAccordion() {

  return (
    <>
      <ul>
        {ACCORDION_DATA_LIST.map((accordion) => {
          const { id, title, author, date, description } = accordion;
          return (
            <li key={id}>
              <Accordion
                id={id}
                title={title}
                author={author}
                date={date}
                description={description}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
