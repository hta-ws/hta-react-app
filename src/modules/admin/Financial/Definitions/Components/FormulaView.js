import React from 'react';
import PropTypes from 'prop-types';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import SimpleBar from 'simplebar-react';
import { Card, CardBody } from 'reactstrap';
// SimpleBar için stil dosyası

const FormulaView = ({ formikValues }) => {
  const {
    sp_id,
    p_positive_codes,
    p_negative_codes,
    s_label,
    p_numerator_report_code,
    p_denominator_report_code,
    p_multiplier,
    p_report_code,
  } = formikValues;

  // Kod formatlama fonksiyonu
  const formatCodes = (code, suffix = '') => {
    if (!code) return '';
    // Kodları formatla ve yıl etiketini ekle
    return (
      code
        .split('_')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' ') + suffix
    );
  };
  const formatCodes1 = (codes) => {
    // codes değeri boşsa (null, undefined veya boş string), boş string dön
    if (!codes) {
      return '';
    }

    return codes
      .split(',')
      .map((code) =>
        code
          .split('_')
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(' '),
      )
      .join(' + ');
  };

  // Formül oluşturma fonksiyonu
  const getEquation = () => {
    if (sp_id === 1) {
      const formattedPositiveCodes = formatCodes1(p_positive_codes);
      const formattedNegativeCodes = formatCodes1(p_negative_codes);

      const equationParts = [`\\text{${s_label}} = `];
      equationParts.push(`(${formattedPositiveCodes})`);
      if (formattedNegativeCodes) {
        equationParts.push(` - (${formattedNegativeCodes})`);
      }

      return equationParts.join('');
    } else if (sp_id === 2) {
      // Formül için gerekli kodları formatla
      const formattedReportCodeCurrentYear = formatCodes(
        p_report_code,
        ' (Bu Sene)',
      );
      const formattedReportCodePreviousYear = formatCodes(
        p_report_code,
        ' (Önceki Sene)',
      );

      // Multiplier kontrolü - eğer tanımlı değilse 1 kabul et
      //const multiplier = p_multiplier || '1';

      // Formülü oluştur
      return `\\text{${s_label}} = \\left(\\frac{${formattedReportCodeCurrentYear} + ${formattedReportCodePreviousYear}}{2}\\right)`;
    } else if (sp_id === 3) {
      // Alanların boş olup olmadığını kontrol et
      if (
        !p_numerator_report_code ||
        !p_denominator_report_code ||
        !p_multiplier
      ) {
        return ''; // Eğer gerekli alanlardan biri boşsa, formülü gösterme
      }

      // Formülü oluştur
      const formattedNumerator = formatCodes(p_numerator_report_code);
      const formattedDenominator = formatCodes(p_denominator_report_code);
      const multiplier = p_multiplier || '1'; // Multiplier yoksa varsayılan olarak '1' kullan

      return `\\text{${s_label}} = \\frac{${formattedNumerator}}{${formattedDenominator}} \\times ${multiplier}`;
    } else if (sp_id === 4) {
      const formattedReportCodeCurrentYear = formatCodes(
        p_report_code,
        ' (Bu Period)',
      );
      const formattedReportCodePreviousYear = formatCodes(
        p_report_code,
        ' (Önceki Period)',
      );

      // Büyüme formülünü oluştur
      return `\\text{${s_label}} = \\left(\\frac{${formattedReportCodeCurrentYear} - ${formattedReportCodePreviousYear}}{${formattedReportCodePreviousYear}} \\right) \\times 100`;
    } else if (sp_id === 5) {
      const formattedReportCodeCurrentYear = formatCodes(
        p_report_code,
        ' (Bu Sene)',
      );
      const formattedReportCodePreviousYear = formatCodes(
        p_report_code,
        ' (Önceki Sene)',
      );

      // Büyüme formülünü oluştur
      return `\\text{${s_label}} = \\left(\\frac{${formattedReportCodeCurrentYear} - ${formattedReportCodePreviousYear}}{${formattedReportCodePreviousYear}} \\right) \\times 100`;
    } else if (sp_id === 6) {
      // Alanların boş olup olmadığını kontrol et
      if (
        !p_numerator_report_code ||
        !p_denominator_report_code ||
        !p_multiplier
      ) {
        return ''; // Eğer gerekli alanlardan biri boşsa, formülü gösterme
      }

      // Formülü oluştur
      const formattedNumerator = formatCodes(p_numerator_report_code);
      const formattedDenominator = formatCodes(p_denominator_report_code);
      const multiplier = p_multiplier || '1'; // Multiplier yoksa varsayılan olarak '1' kullan

      return `\\text{${s_label}} = \\frac{${formattedNumerator}}{${formattedDenominator}} \\times ${multiplier}`;
    } else if (sp_id === 7) {
      // Alanların boş olup olmadığını kontrol et
      if (
        !p_numerator_report_code ||
        !p_denominator_report_code ||
        !p_multiplier
      ) {
        return ''; // Eğer gerekli alanlardan biri boşsa, formülü gösterme
      }

      // Formülü oluştur
      const formattedNumerator = formatCodes(p_numerator_report_code);
      const formattedDenominator = formatCodes(p_denominator_report_code);
      const multiplier = p_multiplier || '1'; // Multiplier yoksa varsayılan olarak '1' kullan

      return `\\text{${s_label}} = \\frac{${formattedNumerator}}{${formattedDenominator}} \\times ${multiplier}`;
    } else return ''; // SP ID '1' veya '3' değilse boş string döndür
  };

  const equation = getEquation();

  return (
    <div className=''>
      {equation ? (
        <SimpleBar style={{ maxHeight: '400px' }}>
          <BlockMath math={equation} displayMode={true} />
        </SimpleBar>
      ) : (
        <p>Formül için uygun veri yok.</p>
      )}
    </div>
  );
};

FormulaView.propTypes = {
  formikValues: PropTypes.shape({
    sp_id: PropTypes.number,
    p_positive_codes: PropTypes.string,
    p_negative_codes: PropTypes.string,
    s_label: PropTypes.string,
    p_numerator_report_code: PropTypes.string,
    p_denominator_report_code: PropTypes.string,
    p_multiplier: PropTypes.number,
    p_report_code: PropTypes.string,
  }).isRequired,
};

export default FormulaView;
