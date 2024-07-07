import { useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation, Trans } from "react-i18next";
const Language = () => {
  const { t, i18n } = useTranslation();
  const [langueage, setLanguage] = useState("Việt Nam");
  const handleChangeLanguage = (language, value) => {
    i18n.changeLanguage(language);
    setLanguage(value);
  };
  return (
    <>
      <NavDropdown title={langueage} id="basic-nav-dropdown">
        <NavDropdown.Item
          onClick={() => handleChangeLanguage("vi", "Việt Nam")}
        >
          {" "}
          Việt Nam
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleChangeLanguage("en", "English")}>
          {" "}
          English
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Language;
