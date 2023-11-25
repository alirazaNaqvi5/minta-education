import { jsPDF } from "jspdf";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";

export default ({ course, userName }) => {
    const [image, setImage] = useState(null);
    const courseName = course.title;
    const ref = useRef(null);
    const downloadCertificate = () => {
        const element = ref.current;
        element.visibility = "visible";
        html2canvas(element).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const doc = new jsPDF('p', 'mm', 'a4');
            const imgProps = doc.getImageProperties(imgData);
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            doc.save(`${courseName} - ${userName} - ${new Date().toLocaleDateString()} - Certificate of Attendance - MINTA.pdf`);
            element.visibility = "hidden";
        });
       
    };

    return (
        <>
            <div className="card border-success mb-3">
                
                <div className="card-header bg-transparent border-success">
                    <h5 className="card-title text-success">Certificate of Completion</h5>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text">Congratulations! You've successfully completed the course.</p>
                </div>
                
                <div className="card-footer bg-transparent border-success">
                    <button className="btn btn-success" onClick={downloadCertificate}>Download Certificate</button>
                </div>
            </div>
            <div style={{height:'10px',width:'10px',overflow:'hidden',position:'relative'}}>

            
            <div ref={ref} style={{ visibility:'visible',position:'absolute', width: '2480px', height: '3508px',zIndex:-1,padding:'100px' }}>
                <div style={{ border: '40px solid black', padding: '20px', height: '100%' }}>
                    <div style={{ border: '20px solid black', padding: '20px', display: 'flex', flexDirection: 'column', justifyItems: 'center', fontFamily: 'Times New Roman', height: '100%' }}>
                        <div style={{ border: '20px solid black', padding: '200px', display: 'flex', flexDirection: 'column', justifyItems: 'center', fontFamily: 'Times New Roman', height: '100%' }}>
                            <img src="/images/logo.png" alt="Logo" style={{ alignSelf: 'center', width: '1000px', height: '1000px' }} />
                            <h1 style={{ textAlign: 'center', fontFamily: 'Old English Text MT', fontSize: '100px', marginTop: '125px' }}>Certificate of Attendance</h1>
                            <p style={{ textAlign: 'center', marginTop: '200px',fontSize: '70px' }}>This is to certify that <br /> {userName.toLocaleUpperCase()} <br /> has attended the course <br /><b>{courseName}</b></p>
                            <p style={{ textAlign: 'center',fontSize: '70px' }}><b>Date: {new Date().toLocaleDateString()}</b></p>
                            <div style={{ flex: 5, flexGrow: 5 }} />
                            <p style={{fontSize: '50px'}}>Prof Dr. Eng. Abdul Salam K. Darwish</p>
                            <p style={{fontSize: '50px'}}>Chairman and CEO</p>
                            <div style={{ flex: 1, flexGrow: 1 }} />
                            <p style={{fontSize: '50px',color:'purple'}}>Manchester International Academy Ltd - 12612224 - Manchester - UK</p>
                            <p style={{fontSize: '50px',color:'purple'}}>info@minta.uk, Tel: +44 (0) 1512915596, M: +44 (0) 7791646536</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
};


