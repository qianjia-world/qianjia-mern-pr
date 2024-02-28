import CopyRight from "./CopyRight";
import FooterMenu from "./FooterMenu";
import BackToTop from "./BackToTop";
export default function Footer() {
  return (
    <footer className="mt-auto">
      <FooterMenu />
      <CopyRight />
      <BackToTop />
    </footer>
  );
}
