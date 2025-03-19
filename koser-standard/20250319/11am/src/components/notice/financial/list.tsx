import { Accordion, AccordionHeader } from "@components/common";

// mock-up data
import { ACCORDION_DATA_LIST } from "@app/temp/sample-accordion/data/data";

export default function List() {
  return (
    <div>
      <AccordionHeader />
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
    </div>
  );
}