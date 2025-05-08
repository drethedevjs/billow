import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup
} from "flowbite-react";

const TheFooter = () => {
  return (
    <Footer container>
      <FooterCopyright href="/" by="Billow" year={new Date().getFullYear()} />
      <span className="text-sm">
        Powered By{" "}
        <a
          href="https://csra-web-services.vercel.app/"
          target="_blank"
          className="text-accent hover:text-error transition-colors"
        >
          CSRA Web Services
        </a>
      </span>
      <FooterLinkGroup>
        <FooterLink href="/about">About</FooterLink>
        <FooterLink href="#">Contact</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
};

export default TheFooter;
