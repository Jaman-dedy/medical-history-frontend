import React from 'react';
import Image from 'next/image';
import { ClipboardList, Activity, TestTube, Pill, FileText } from 'lucide-react';

const MedicalScene = () => {
    return (
        <div className="w-full h-full bg-primary/95 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0">
                <svg className="w-full h-full opacity-10">
                    <pattern id="medical-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path
                            d="M40,40 h20 v20 h20 v20 h-20 v20 h-20 v-20 h-20 v-20 h20 v-20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                        />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#medical-pattern)" />
                </svg>
            </div>

            {/* Patient trajectory path */}
            <svg className="absolute inset-0 z-10">
                <path
                    d="M200,300 Q280,300 350,290 T500,280"
                    stroke="white"
                    strokeWidth="3"
                    strokeDasharray="8,8"
                    className="opacity-40 animate-dash"
                    fill="none"
                />
                {/* Direction arrows */}
                <path
                    d="M450,275 L460,280 L450,285"
                    stroke="white"
                    strokeWidth="3"
                    className="opacity-60"
                    fill="none"
                />
                <circle cx="280" cy="300" r="3" fill="white" className="opacity-40 animate-pulse" />
                <circle cx="350" cy="290" r="3" fill="white" className="opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </svg>

            {/* Floating info boxes */}
            <div className="absolute inset-0">
                {/* Lab Orders Box */}
                <div className="absolute top-20 right-48 animate-float-box" style={{ animationDelay: "0s" }}>
                    <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg p-3 text-white/90 shadow-lg">
                        <div className="flex items-center gap-2 mb-1">
                            <TestTube className="h-4 w-4 text-blue-300" />
                            <span className="text-blue-200 font-medium">Lab Orders</span>
                        </div>
                        <div className="space-y-1 text-xs text-blue-100/90">
                            <div>• Complete Blood Count</div>
                            <div>• Lipid Panel</div>
                            <div>• Thyroid Function</div>
                        </div>
                    </div>
                </div>

                {/* Lab Results Box */}
                <div className="absolute top-48 right-20 animate-float-box" style={{ animationDelay: "1s" }}>
                    <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-3 text-white/90 shadow-lg">
                        <div className="flex items-center gap-2 mb-1">
                            <FileText className="h-4 w-4 text-green-300" />
                            <span className="text-green-200 font-medium">Lab Results</span>
                        </div>
                        <div className="space-y-1 text-xs text-green-100/90">
                            <div>WBC: Normal</div>
                            <div>Glucose: 95 mg/dL</div>
                            <div>BP: 120/80</div>
                        </div>
                    </div>
                </div>

                {/* Prescription Box */}
                <div className="absolute top-60 right-60 animate-float-box" style={{ animationDelay: "2s" }}>
                    <div className="bg-purple-500/20 backdrop-blur-sm rounded-lg p-3 text-white/90 shadow-lg">
                        <div className="flex items-center gap-2 mb-1">
                            <Pill className="h-4 w-4 text-purple-300" />
                            <span className="text-purple-200 font-medium">Medications</span>
                        </div>
                        <div className="space-y-1 text-xs text-purple-100/90 animate-type-text">
                            <div>• Amoxicillin 500mg</div>
                            <div>• Ibuprofen 400mg</div>
                            <div>• Omeprazole 20mg</div>
                        </div>
                    </div>
                </div>

                {/* Doctor's Notes Box */}
                <div className="absolute top-[28rem]  right-[1rem] animate-float-box" style={{ animationDelay: "3s" }}>
                    <div className="bg-orange-500/20 backdrop-blur-sm rounded-lg p-3 text-white/90 shadow-lg">
                        <div className="flex items-center gap-2 mb-1">
                            <ClipboardList className="h-4 w-4 text-orange-300" />
                            <span className="text-orange-200 font-medium">Doctor's Notes</span>
                        </div>
                        <div className="text-xs text-orange-100/90">
                            Follow-up in 2 weeks<br />
                            Monitor symptoms<br />
                            Rest advised
                        </div>
                    </div>
                </div>
            </div>

            {/* Main scene elements */}
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Doctor with aura */}
                <div className="absolute right-24 top-1/2 -translate-y-1/2">
                    <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse-slow" />
                    <Image
                        src="/assets/medical-login.svg"
                        alt="Doctor"
                        width={320}
                        height={320}
                        className="object-contain opacity-90 relative z-10"
                        priority
                    />
                </div>

                {/* Patient with movement */}
                <div className="absolute left-24 top-1/2 animate-patient-approach">
                    <Image
                        src="/assets/patient.svg"
                        alt="Patient"
                        width={240}
                        height={240}
                        className="object-contain opacity-80"
                        priority
                    />
                </div>

                {/* Connection elements */}
                <svg className="absolute inset-0">
                    {/* Heartbeat line */}
                    <path
                        d="M380,290 l20,0 l10,-20 l10,40 l10,-20 l20,0"
                        stroke="rgb(147,197,253)"
                        strokeWidth="2"
                        className="opacity-30 animate-draw-line"
                        fill="none"
                    />
                </svg>
            </div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-primary/30" />
        </div>
    );
};

export default MedicalScene;