import React, { useState } from "react";
import InstallationTrainingReportForm from "./installationTemplate";
import MaintenanceReportForm from "./Maintenance Report/MaintenanceReportTemplatePDF"
import InstallationAndTrainingReportTemplate from "./Installation&TrainingReportTemplate";
import { Button } from "react-bootstrap";
import InstallationAndTrainingReportPDF from "./InstallationAndTrainingReportPDF";
import { PDFViewer } from '@react-pdf/renderer';

const Templates = () => {
    const [showInstallationForm, setShowInstallationForm] = useState(false);
    const [showInstallationAndTrainingDesign, setShowInstallationAndTrainingDesign] = useState(false);
    const [showTemplates,setShowTemplates] = useState(true);
    

    const handleInstallationClick = () => {
        setShowInstallationForm(true);
        setShowTemplates(false);
    };

    const handleInstallationDesignClick = () => {
        setShowInstallationAndTrainingDesign(true);
        setShowTemplates(false);
    };

    

    return (
        <div className="container-fluid">
            <div className="">

                {showTemplates &&
                <>
                <div className="d-flex justify-content-start mb-5">
                     <h3>Templates</h3>
                 </div>
                 <div className="d-flex justify-content-start"><h4>Forms :</h4></div>
                  <div className="d-flex justify-content-start">

                    <ol>
                        <div style={{ textAlign: "start" }}>
                            <li>
                                <button className="btn btn-link" onClick={handleInstallationClick}>
                                    Installation and Training Report
                                </button>
                            </li>
                            <li ><button className="btn btn-link">Invoice</button></li>
                        </div>
                    </ol>
                </div>
                <div className="d-flex justify-content-start"><h4>Template Designs :</h4></div>
                  <div className="d-flex justify-content-start">

                    <ol>
                        <div style={{ textAlign: "start" }}>
                            <li>
                                <button className="btn btn-link" onClick={handleInstallationDesignClick}>
                                    Installation and Training Report
                                </button>
                            </li>
                            <li ><button className="btn btn-link">Invoice</button></li>
                        </div>
                    </ol>
                </div>
                </>
                }

                {showInstallationForm && <InstallationTrainingReportForm  onCancel={()=>{ setShowInstallationForm(false); setShowTemplates(true);}}/>}

                {showInstallationAndTrainingDesign && 
                <div>
                    <div className="d-flex justify-content-start mb-3 form1">
                        <Button className="button" onClick={()=>{ setShowInstallationAndTrainingDesign(false); setShowTemplates(true); }}>
                           Back
                        </Button>
                        </div>
                    {/* <InstallationAndTrainingReportTemplate  /> */}
                    <PDFViewer width={1000} height={1200}>
                      <InstallationAndTrainingReportPDF />
                   </PDFViewer>
                    </div> }
            </div>
        </div>
    );
};

export default Templates;
