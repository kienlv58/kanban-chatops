import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles.scss';

interface Props {
  label: string;
}
const Footer = (props: PropsTest) => {
  const { t, i18n } = useTranslation();
  return (
    <div className={'footer'}>
      {t('name')}: {props.name}
      <br />
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
