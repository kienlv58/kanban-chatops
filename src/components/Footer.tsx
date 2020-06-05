import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  label: string;
}
const Footer = (props: PropsTest) => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      {t('name')}: {props.name}
      <button
        onClick={() => {
          if (i18n.language === 'en') i18n.changeLanguage('vi');
          else i18n.changeLanguage('en');
        }}>
        change to language
      </button>
    </div>
  );
};
export default Footer;
