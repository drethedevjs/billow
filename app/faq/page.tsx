import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle
} from "flowbite-react";

const FAQ = () => {
  return (
    <section id="faq">
      <h1 className="page-name">Frequently Asked Questions</h1>

      <Accordion collapseAll className="mt-10">
        <AccordionPanel>
          <AccordionTitle>What is Billow?</AccordionTitle>
          <AccordionContent>
            <p>
              Billow is a platform that lets you manage utility bills from
              multiple service providers in one place. You can view, track, and
              pay your bills with ease.
            </p>
          </AccordionContent>
        </AccordionPanel>

        <AccordionPanel>
          <AccordionTitle>Is Billow free to use?</AccordionTitle>
          <AccordionContent>
            <p>
              Yes, Billow is free for users. We partner with utility companies
              and payment processors to cover platform costs.
            </p>
          </AccordionContent>
        </AccordionPanel>

        <AccordionPanel>
          <AccordionTitle>Can I manage multiple properties?</AccordionTitle>
          <AccordionContent>
            <p>
              Absolutely. Billow allows you to manage service accounts across
              multiple locations from a single dashboard.
            </p>
          </AccordionContent>
        </AccordionPanel>

        <AccordionPanel>
          <AccordionTitle>
            What types of bills can I pay with Billow?
          </AccordionTitle>
          <AccordionContent>
            <p>
              You can pay for water, power, sewage, recycling, and other utility
              services depending on your provider's offerings.
            </p>
          </AccordionContent>
        </AccordionPanel>

        <AccordionPanel>
          <AccordionTitle>Is my payment information secure?</AccordionTitle>
          <AccordionContent>
            <p>
              Yes. We use industry-standard encryption and are PCI-compliant to
              ensure your payment data is protected.
            </p>
          </AccordionContent>
        </AccordionPanel>

        <AccordionPanel>
          <AccordionTitle>Can I make partial payments?</AccordionTitle>
          <AccordionContent>
            <p>
              Yes. Billow supports partial payments as long as your utility
              provider allows it. You'll see any minimum payment amount required
              before submitting.
            </p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </section>
  );
};

export default FAQ;
