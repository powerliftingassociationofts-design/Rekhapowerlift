import React, { useState } from 'react';

// Import PDFs from src/assets/pdfs for proper bundling
import registrationPDF from '../../assets/pdfs/Application.pdf';
import rulesPDF from '../../assets/pdfs/I’d card .pdf';


const RegistrationMain = () => {
    const [selectedDocument, setSelectedDocument] = useState('');

    const documents = [
        {
            value: 'wpc-registration-form.pdf',
            label: 'WPC Registration Form',
            description: 'Official registration form for WPC Telangana competitions',
            file: registrationPDF
        },
        {
            value: 'wpc-powerlifting-rules.pdf',
            label: 'WPC ID Card Form',
            description: 'Complete rules and regulations for WPC powerlifting competitions',
            file: rulesPDF
        },
        // {
        //     value: 'wpc-competition-guidelines.pdf',
        //     label: 'Competition Guidelines',
        //     description: 'Guidelines and procedures for competition day',
        //     file: guidelinesPDF
        // },
        // {
        //     value: 'wpc-membership-application.pdf',
        //     label: 'Membership Application',
        //     description: 'Application form for WPC Telangana membership',
        //     file: membershipPDF
        // }
    ];

    const handleDownload = () => {
        if (selectedDocument) {
            const selectedDoc = documents.find(doc => doc.value === selectedDocument);
            if (selectedDoc) {
                const link = document.createElement('a');
                link.href = selectedDoc.file;
                link.download = selectedDocument;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } else {
            alert('Please select a document to download');
        }
    };

    const handleDocumentChange = (e) => {
        setSelectedDocument(e.target.value);
    };

    return (
        <section className="registration-one">
            <div className="container">
                <div className="section-title text-center">
                    <div className="section-title__tagline-box">
                        <span className="section-title__tagline">WPC Telangana Documents</span>
                    </div>
                    <h2 className="section-title__title">Registration & Documents</h2>
                    <p className="section-title__text">
                        Download official registration forms, rules, and guidelines for WPC Telangana powerlifting competitions.
                    </p>
                </div>
                
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-10">
                        <div className="registration-form">
                            <div className="registration-form__download-section">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="registration-form__input-box">
                                            <label className="registration-form__label">
                                                Select Document to Download:
                                            </label>
                                            <select
                                                value={selectedDocument}
                                                onChange={handleDocumentChange}
                                                className="registration-form__select"
                                            >
                                                <option value="">-- Choose a Document --</option>
                                                {documents.map((doc, index) => (
                                                    <option key={index} value={doc.value}>
                                                        {doc.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    
                                    {selectedDocument && (
                                        <div className="col-12">
                                            <div className="registration-form__document-info">
                                                <h4 className="document-title">
                                                    {documents.find(doc => doc.value === selectedDocument)?.label}
                                                </h4>
                                                <p className="document-description">
                                                    {documents.find(doc => doc.value === selectedDocument)?.description}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="col-12">
                                        <div className="registration-form__btn-box">
                                            <button 
                                                type="button" 
                                                className="thm-btn registration-form__btn"
                                                onClick={handleDownload}
                                                disabled={!selectedDocument}
                                            >
                                                Download PDF
                                                <span className="icon-download"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="registration-form__documents-list">
                                <h3 className="documents-list__title">Available Documents:</h3>
                                <div className="row">
                                    {documents.map((doc, index) => (
                                        <div key={index} className="col-xl-6 col-lg-6 col-md-12">
                                            <div className="document-card">
                                                <div className="document-card__icon">
                                                    <i className="icon-file-pdf"></i>
                                                </div>
                                                <div className="document-card__content">
                                                    <h4 className="document-card__title">{doc.label}</h4>
                                                    <p className="document-card__description">{doc.description}</p>
                                                    <button 
                                                        className="document-card__btn"
                                                        onClick={() => {
                                                            const link = document.createElement('a');
                                                            link.href = doc.file;
                                                            link.download = doc.value;
                                                            document.body.appendChild(link);
                                                            link.click();
                                                            document.body.removeChild(link);
                                                        }}
                                                    >
                                                        Download
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegistrationMain;
