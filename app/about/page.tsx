const About = () => {
  return (
    <section id="about-us" className="">
      <h1 className="page-name">About</h1>

      <p className="mb-6 mt-10">
        At <strong>Billow</strong>, we believe managing utility bills should be
        effortless, transparent, and secure. Our mission is to simplify how
        individuals and families interact with their service providers by
        offering a centralized platform to view, track, and pay bills—all in one
        place.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">What We Do</h2>
      <ul className="list-disc list-inside mb-6">
        <li>View current and past bills</li>
        <li>Track service details across multiple locations</li>
        <li>Make partial or full payments easily and securely</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Our Vision</h2>
      <p className="mb-6">
        We’re building tools that reduce the stress of monthly bills by making
        financial responsibility more approachable. Whether it’s water, power,
        recycling, or more, Billow puts control back in your hands.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Billow?</h2>
      <ul className="list-disc list-inside mb-6">
        <li>
          <strong>Clarity</strong>: See exactly what you owe, when, and why.
        </li>
        <li>
          <strong>Convenience</strong>: Manage multiple accounts with a single
          login.
        </li>
        <li>
          <strong>Security</strong>: Bank-grade encryption ensures your data
          stays safe.
        </li>
      </ul>
    </section>
  );
};

export default About;
