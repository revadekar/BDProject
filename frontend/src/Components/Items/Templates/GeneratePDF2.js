import React from 'react';
import { PDFDownloadLink, Font } from '@react-pdf/renderer';
<<<<<<< HEAD
// import InstallationAndTrainingReportPDF from './InstallationAndTrainingReportPDF';

const GeneratePDF2 = ({ formData, Template, FileName }) => (
  <PDFDownloadLink
    document ={<Template formData={formData} />}
=======

const GeneratePDF2 = ({ formData, Template, FileName }) => (
  <PDFDownloadLink
    document = {<Template formData={formData} />}
>>>>>>> d3f47389ef07a4b37952e57be1a8025fc01bbe49
    fileName = {FileName}
  >
    {({ loading, error }) => (
      <div style={{ textAlign: 'center' }}>
        {loading && <p style={{ color: 'blue' }}>Generating PDF...</p>}
        {error && <p style={{ color: 'red' }}>Error occurred, please try again later.</p>}
        {!loading && !error && <span>Download PDF !</span>}
      </div>
    )}
  </PDFDownloadLink>
);

export default GeneratePDF2;
