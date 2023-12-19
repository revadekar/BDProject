import html2pdf from 'html2pdf.js';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const generatePDF = async (formData, Template) => {
  const content = <Template formData={formData} />;

  const htmlString = ReactDOMServer.renderToStaticMarkup(content);

  const pdf = new html2pdf(htmlString, {
    // Set the filename within the PDF options
    filename: 'InstallationAndTrainingReport.pdf', // Default filename
    image: { type: 'png', quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  });

  // Generate the PDF as a Blob
  const pdfBlob = await pdf.output('blob');

  // Create a Blob URL for the Blob
  const pdfUrl = URL.createObjectURL(pdfBlob);

  // Open the PDF in a new tab
  const newTab = window.open(pdfUrl, '_blank');
  
  // Cleanup the URL when the tab is closed
  newTab.addEventListener('beforeunload', () => URL.revokeObjectURL(pdfUrl));
};

export default generatePDF;
