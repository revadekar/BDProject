import React from 'react';
import { PDFDownloadLink, Font } from '@react-pdf/renderer';
import InstallationAndTrainingReportPDF from './InstallationAndTrainingReportPDF';

const GeneratePDF2 = ({ formData }) => (
  <PDFDownloadLink
    document={<InstallationAndTrainingReportPDF formData={formData} />}
    fileName="InstallationAndTrainingReport.pdf"
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
