import { useRef } from "react";
import jsPDF from "jspdf";
import InstallationAndTrainingReportTemplate from "./Installation & Training Report/Installation&TrainingReportTemplate";

const GeneratePDF3 = () => {
  const componentRef = useRef();

  const downloadPDF = () => {
    const element = componentRef.current;

    const pdf = new jsPDF('p', 'pt', 'a4');

    // Logo
    const logo = new Image();
    logo.src = './cdacFavicon2.png';

    // Function to add image to PDF
    const addImageToPDF = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = logo.width;
      canvas.height = logo.height;
      context.drawImage(logo, 0, 0);

      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 40, 40, 200, 50); // Adjust positioning and dimensions of the logo
    };

    // Add logo to PDF
    addImageToPDF();

    // Other content
    const content = element.innerText || element.textContent;

    pdf.setFont('Arial');
    pdf.setFontSize(12);

    // Adjust positioning for other content elements
    pdf.text("INSTALLATION & TRAINING REPORT", 40, 150);
    pdf.text(content, 40, 180);

    pdf.save('InstallationAndTrainingReport.pdf');
  };

  return (
    <div>
      <div ref={componentRef}>
        <InstallationAndTrainingReportTemplate />
      </div>
      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
};

export default GeneratePDF3;
