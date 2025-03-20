import { Accordion, AccordionHeader } from "@components/accordion";

// mock-up data
import { ACCORDION_DATA_LIST } from "@data/sample-accordion-data";

export default function List() {
  return (
    <div>
      <AccordionHeader />

      <ul>
        {ACCORDION_DATA_LIST.map((accordion) => {
          const { id, title, author, date, description, isUrgent } = accordion;

          return (
            <li key={id}>
              <Accordion
                id={id}
                title={title}
                author={author}
                date={date}
                description={description}
                isUrgent={isUrgent}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}