console.log("Script loaded");

// Fungsi untuk beralih ke tab rumah sakit (definisi global)
function switchToHospitalTab() {
    console.log("switchToHospitalTab function called");
    
    const hospitalTab = document.querySelector('[data-tab="hospital"]');
    const hospitalTabContent = document.getElementById('hospital-tab');
    
    console.log("Hospital tab found:", hospitalTab);
    console.log("Hospital tab content found:", hospitalTabContent);
    
    if (hospitalTab && hospitalTabContent) {
        // Hapus active dari semua tab
        const allTabs = document.querySelectorAll('.tab');
        const allTabContents = document.querySelectorAll('.tab-content');
        
        allTabs.forEach(tab => tab.classList.remove('active'));
        allTabContents.forEach(content => content.classList.remove('active'));
        
        // Aktifkan tab rumah sakit
        hospitalTab.classList.add('active');
        hospitalTabContent.classList.add('active');
        
        console.log("Tab switched successfully");
        
        // Scroll ke bagian tab
        hospitalTabContent.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    } else {
        console.error("Tab elements not found");
        console.error("Available tabs:", document.querySelectorAll('.tab'));
        console.error("Available tab contents:", document.querySelectorAll('.tab-content'));
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded");
    
    const diagnoseBtn = document.getElementById('diagnose-btn');
    const restartBtn = document.getElementById('restart-btn');
    const printBtn = document.getElementById('print-btn');
    const resultSection = document.getElementById('result-section');
    const diagnosisResult = document.getElementById('diagnosis-result');
    const treatmentRecommendation = document.getElementById('treatment-recommendation');
    const progressBar = document.getElementById('progress');
    const hospitalList = document.getElementById('hospital-list');
    const pharmacyList = document.getElementById('pharmacy-list');
    const loadingIndicator = document.getElementById('loading');
    const formProgressBar = document.getElementById('form-progress-bar');
    const formProgressText = document.getElementById('form-progress');
    const confidenceText = document.getElementById('confidence-text');
    
    console.log("Elements found:", {
        diagnoseBtn, restartBtn, printBtn, resultSection, diagnosisResult, 
        treatmentRecommendation, progressBar, hospitalList, pharmacyList
    });
    
    // Data rumah sakit di Purwokerto
    const hospitals = [
                { 
                    name: "RSUD Prof. Dr. Margono Soekarjo Purwokerto", 
                    address: "Jl. Dr. Gumbreg No. 1, Kebontebu, Berkoh, Kec. Purwokerto Sel., Kabupaten Banyumas, Jawa Tengah 53146", 
                    phone: "(0281) 632708", 
                    distance: "11 km"
                },
                { 
                    name: "Rumah Sakit JIH Purwokerto", 
                    address: "Jl. KH. Ahmad Dahlan, Dusun III, Dukuhwaluh, Kec. Kembaran, Kabupaten Banyumas, Jawa Tengah 53182", 
                    phone: "(0281) 7779888", 
                    distance: "10 km"
                },
                { 
                    name: "Bunda Hospital Purwokerto", 
                    address: "H7C3+9CW, Jl. Pramuka No.249, Pertabatan, Purwokerto Kidul, Kec. Purwokerto Sel., Kabupaten Banyumas, Jawa Tengah 53147", 
                    phone: "(0281) 635424", 
                    distance: "13 km"
                },
                { 
                    name: "RSU Wiradadi Husada", 
                    address: "Jl. Menteri Supeno No. 25, Dusun I, Wiradadi, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah 53181", 
                    phone: "(0281) 6846225", 
                    distance: "9.3 km"
                },
                { 
                    name: "RST Wijayakusuma", 
                    address: "Jl. Prof. Dr. HR Bunyamin, Glempang, Bancarkembar, Kec. Purwokerto Utara, Kabupaten Banyumas, Jawa Tengah 53121", 
                    phone: "(0281) 633062", 
                    distance: "15 km"
                }
            ];
    
    // Data apotek di Purwokerto (dengan koordinat yang lebih akurat)
            const pharmacies = [
                { 
                    name: "Apotek K-24 HR Bunyamin", 
                    address: "Pakembaran, Bancarkembar, Purwokerto Utara, Kabupaten Banyumas, Jawa Tengah 53121", 
                    phone: "0812-2539-2473", 
                    distance: "16 km", 
                    open: "24 Jam"
                },
                { 
                    name: "Apotek Kampus", 
                    address: "Jl. Kampus No.51, Brubahan, Grendeng, Kec. Purwokerto Utara, Kabupaten Banyumas, Jawa Tengah 53122", 
                    phone: "0851-3373-0564", 
                    distance: "16 km", 
                    open: "06.00-00.00"
                },
                { 
                    name: "Apotek Prima Farma", 
                    address: "Jl. Overste Isdiman No.6, Jatiwinangun, Purwokerto Lor, Kec. Purwokerto Tim., Kabupaten Banyumas, Jawa Tengah 53114", 
                    phone: "(0281) 640377", 
                    distance: "15 km", 
                    open: "07.30-21.00"
                },
                { 
                    name: "Apotek Kimia Farma", 
                    address: "Jl. Jend. Sudirman No.435, Pejagalan, Purwokerto kidul, Kec. Purwokerto Sel., Kabupaten Banyumas, Jawa Tengah 53147", 
                    phone: "0811-1067-8231", 
                    distance: "12 km", 
                    open: "24 Jam"
                },
                { 
                    name: "Apotek Karya Sehat Purwokerto", 
                    address: "Jl. Jend. Sudirman No.07, Pesuruhan, Berkoh, Kec. Purwokerto Sel., Kabupaten Banyumas, Jawa Tengah 53146", 
                    phone: "0811-2607-114", 
                    distance: "11 km", 
                    open: "07.00-22.00"
                }
            ];

    // Knowledge Base
    const knowledgeBase = {
        diseases: [
            {
                name: "Dispepsia (Gangguan Pencernaan Ringan)",
                symptoms: { symptom1: 1, symptom2: 1, symptom3: 0, symptom4: 0, duration: 1 },
                severity: "ringan",
                needsHospital: false,
                needsPharmacy: true,
                minThreshold: 60
            },
            {
                name: "Gastroenteritis (Radang Lambung dan Usus)",
                symptoms: { symptom1: 2, symptom2: 2, symptom3: 2, symptom4: 2, duration: 2 },
                severity: "sedang",
                needsHospital: true,
                needsPharmacy: true,
                minThreshold: 70
            },
            {
                name: "Infeksi Saluran Pencernaan Berat",
                symptoms: { symptom1: 3, symptom2: 3, symptom3: 3, symptom4: 3, duration: 3 },
                severity: "berat",
                needsHospital: true,
                needsPharmacy: true,
                minThreshold: 80
            }
        ]
    };

    // Treatment recommendations
    const treatmentRecommendations = {
        ringan: [{
            level: "Penanganan Ringan",
            recommendations: [
                "Istirahat yang cukup",
                "Hindari makanan pedas, asam, dan berlemak",
                "Konsumsi makanan lunak seperti bubur",
                "Minum air putih yang cukup"
            ]
        }],
        sedang: [{
            level: "Penanganan Menengah", 
            recommendations: [
                "Istirahat total",
                "Konsumsi cairan elektrolit",
                "Kompres hangat pada perut",
                "Konsultasi dengan dokter"
            ]
        }],
        berat: [{
            level: "Penanganan Darurat",
            recommendations: [
                "Segera cari pertolongan medis darurat",
                "Mungkin diperlukan rawat inap",
                "Pemberian cairan infus",
                "Pemeriksaan lengkap"
            ]
        }]
    };
    
    // Fungsi untuk memperbarui progress form
    function updateFormProgress() {
        const formElements = ['symptom1', 'symptom2', 'symptom3', 'symptom4', 'duration'];
        let filledCount = 0;
        
        formElements.forEach(id => {
            const element = document.getElementById(id);
            if (element && element.value !== '') {
                filledCount++;
            }
        });
        
        const percentage = (filledCount / formElements.length) * 100;
        if (formProgressBar) formProgressBar.style.width = `${percentage}%`;
        if (formProgressText) formProgressText.textContent = `${filledCount}/5`;
        
        if (diagnoseBtn) diagnoseBtn.disabled = filledCount < 5;
        
        return filledCount === 5;
    }
    
    // Fungsi untuk menampilkan daftar rumah sakit
    function displayHospitals() {
        console.log("Displaying hospitals");
        if (hospitalList) {
            hospitalList.innerHTML = '';
            hospitals.forEach(hospital => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div>
                        <strong>${hospital.name}</strong><br>
                        <small>${hospital.address}</small>
                    </div>
                    <div style="text-align: right;">
                        <span>${hospital.distance}</span><br>
                        <small>${hospital.phone}</small>
                    </div>
                `;
                hospitalList.appendChild(li);
            });
            console.log("Hospitals displayed successfully");
        } else {
            console.error("Hospital list element not found");
        }
    }
    
    // Fungsi untuk menampilkan daftar apotek
    function displayPharmacies() {
        console.log("Displaying pharmacies");
        if (pharmacyList) {
            pharmacyList.innerHTML = '';
            pharmacies.forEach(pharmacy => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div>
                        <strong>${pharmacy.name}</strong><br>
                        <small>${pharmacy.address}</small>
                    </div>
                    <div style="text-align: right;">
                        <span>${pharmacy.distance}</span><br>
                        <small>${pharmacy.open}</small>
                    </div>
                `;
                pharmacyList.appendChild(li);
            });
            console.log("Pharmacies displayed successfully");
        } else {
            console.error("Pharmacy list element not found");
        }
    }

    // Simple scoring function
    function scoreSymptoms(symptoms, additionalSymptoms) {
        let bestMatch = knowledgeBase.diseases[0]; // Default
        let highestScore = 0;

        knowledgeBase.diseases.forEach(disease => {
            let score = 0;
            let totalPossible = 0;

            for (const symptom in disease.symptoms) {
                const expectedLevel = disease.symptoms[symptom];
                const actualLevel = symptoms[symptom] || 0;
                totalPossible += expectedLevel;

                if (actualLevel === expectedLevel) {
                    score += expectedLevel;
                } else if (actualLevel > 0) {
                    score += Math.min(actualLevel, expectedLevel) * 0.7;
                }
            }

            const matchPercentage = totalPossible > 0 ? (score / totalPossible) * 100 : 0;
            
            if (matchPercentage > highestScore) {
                highestScore = matchPercentage;
                bestMatch = disease;
            }
        });

        return {
            disease: bestMatch,
            confidence: Math.min(highestScore, 100)
        };
    }

    // Fungsi untuk menampilkan hasil diagnosis
    function displayDiagnosisResult(disease, confidence, additionalSymptoms) {
        confidence = Math.min(confidence, 100);
        
        if (confidenceText) {
            confidenceText.textContent = `${confidence.toFixed(1)}%`;
        }
        
        let html = `
            <div class="diagnosis-info">
                <h3>Hasil Diagnosa: ${disease.name}</h3>
                <p>Tingkat Kecocokan: <strong>${confidence.toFixed(1)}%</strong></p>
                <p>Tingkat Keparahan: <strong>${disease.severity.toUpperCase()}</strong></p>
        `;
        
        let confidenceCategory = "";
        if (confidence >= 90) {
            confidenceCategory = "Sangat Tinggi";
        } else if (confidence >= 80) {
            confidenceCategory = "Tinggi";
        } else if (confidence >= 70) {
            confidenceCategory = "Sedang";
        } else if (confidence >= 60) {
            confidenceCategory = "Cukup";
        } else {
            confidenceCategory = "Rendah";
        }
        
        html += `<p>Kategori Keyakinan: <strong>${confidenceCategory}</strong></p>`;
        
        html += `</div>`;
        
        if (diagnosisResult) {
            diagnosisResult.innerHTML = html;
        }
        
        // Update progress bar
        const cappedConfidence = Math.min(confidence, 100);
        if (progressBar) {
            progressBar.style.width = `${cappedConfidence}%`;
            
            if (cappedConfidence < 60) {
                progressBar.style.background = 'linear-gradient(to right, #dc3545, #fd7e14)';
            } else if (cappedConfidence < 80) {
                progressBar.style.background = 'linear-gradient(to right, #ffc107, #28a745)';
            } else {
                progressBar.style.background = 'linear-gradient(to right, #28a745, #20c997)';
            }
        }
    }

    // Fungsi untuk menampilkan rekomendasi treatment
    function displayTreatmentRecommendation(severity, needsHospital, needsPharmacy, confidence) {
        if (!treatmentRecommendation) return;
        
        const treatments = treatmentRecommendations[severity] || treatmentRecommendations["ringan"];
        let html = '';
        
        treatments.forEach((treatment, index) => {
            const levelClass = index === treatments.length - 1 ? 'serious' : 
                              index === 0 ? '' : 'moderate';
            
            html += `
                <div class="treatment-level ${levelClass}">
                    <h4>${treatment.level}</h4>
                    <ul>
            `;
            
            treatment.recommendations.forEach(rec => {
                html += `<li>${rec}</li>`;
            });
            
            html += `
                    </ul>
                </div>
            `;
        });
        
        if (needsHospital || confidence >= 80) {
            html += `
                <div class="emergency-alert">
                    <h3>⚠️ Rekomendasi: Segera Ke Rumah Sakit</h3>
                    <p>Berdasarkan tingkat keparahan gejala, disarankan untuk mengunjungi rumah sakit terdekat.</p><br>
                    <button type="button" onclick="switchToHospitalTab()" class="btn btn-danger">Lihat Rekomendasi Rumah Sakit</button>
                </div>
            `;
        }
        
        treatmentRecommendation.innerHTML = html;
        console.log("Treatment recommendation displayed with button");
    }

    // Fungsi diagnosa utama
    function diagnose() {
        console.log("Diagnose function called");
        
        if (loadingIndicator) {
            loadingIndicator.style.display = 'block';
        }
        if (diagnoseBtn) diagnoseBtn.disabled = true;
        
        setTimeout(() => {
            try {
                const symptoms = {
                    symptom1: parseInt(document.getElementById('symptom1').value),
                    symptom2: parseInt(document.getElementById('symptom2').value), 
                    symptom3: parseInt(document.getElementById('symptom3').value),
                    symptom4: parseInt(document.getElementById('symptom4').value),
                    duration: parseInt(document.getElementById('duration').value)
                };
                
                const additionalSymptoms = {
                    fever: document.getElementById('fever')?.checked || false,
                    headache: document.getElementById('headache')?.checked || false,
                    weakness: document.getElementById('weakness')?.checked || false,
                    bloating: document.getElementById('bloating')?.checked || false
                };
                
                console.log("Symptoms:", symptoms);
                console.log("Additional symptoms:", additionalSymptoms);
                
                const result = scoreSymptoms(symptoms, additionalSymptoms);
                
                if (loadingIndicator) {
                    loadingIndicator.style.display = 'none';
                }
                
                displayDiagnosisResult(result.disease, result.confidence, additionalSymptoms);
                displayTreatmentRecommendation(
                    result.disease.severity, 
                    result.disease.needsHospital, 
                    result.disease.needsPharmacy, 
                    result.confidence
                );
                
                if (resultSection) {
                    resultSection.style.display = 'block';
                    resultSection.scrollIntoView({ behavior: 'smooth' });
                }
                
            } catch (error) {
                console.error("Error in diagnosis:", error);
                if (loadingIndicator) {
                    loadingIndicator.style.display = 'none';
                }
            }
            
            if (diagnoseBtn) diagnoseBtn.disabled = false;
        }, 2000);
    }

    // Setup tab functionality
    function setupTabs() {
        const tabs = document.querySelectorAll('.tab');
        console.log("Setting up tabs:", tabs);
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                const container = this.closest('.tab-container');
                
                console.log("Tab clicked:", tabId);
                
                if (container) {
                    const containerTabs = container.querySelectorAll('.tab');
                    const containerContents = container.querySelectorAll('.tab-content');
                    
                    containerTabs.forEach(t => t.classList.remove('active'));
                    containerContents.forEach(tc => tc.classList.remove('active'));
                    
                    this.classList.add('active');
                    
                    const targetContent = container.querySelector(`#${tabId}-tab`);
                    if (targetContent) {
                        targetContent.classList.add('active');
                        console.log("Tab content activated:", targetContent);
                    }
                }
            });
        });
    }

    // Setup form validation
    function setupFormValidation() {
        const formElements = ['symptom1', 'symptom2', 'symptom3', 'symptom4', 'duration'];
        
        formElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', updateFormProgress);
            }
        });
    }

    // Reset function
    function resetForm() {
        const formElements = ['symptom1', 'symptom2', 'symptom3', 'symptom4', 'duration'];
        formElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = '';
        });
        
        const additionalElements = ['fever', 'headache', 'weakness', 'bloating'];
        additionalElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.checked = false;
        });
        
        updateFormProgress();
        if (resultSection) resultSection.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Print function  
    function printResults() {
        window.print();
    }

    // Event listeners
    if (diagnoseBtn) {
        diagnoseBtn.addEventListener('click', diagnose);
        console.log("Diagnose button event listener added");
    }
    
    if (restartBtn) {
        restartBtn.addEventListener('click', resetForm);
    }
    
    if (printBtn) {
        printBtn.addEventListener('click', printResults);
    }
    
    // Initialize
    displayHospitals();
    displayPharmacies();
    setupTabs();
    setupFormValidation();
    updateFormProgress();
    
    console.log("Initialization complete");
});

// Make sure function is globally available
window.switchToHospitalTab = switchToHospitalTab;
console.log("Global function assigned:", window.switchToHospitalTab);