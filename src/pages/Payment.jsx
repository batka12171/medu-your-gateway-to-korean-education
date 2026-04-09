import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { createPageUrl } from '../utils';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Check, CreditCard, Building } from 'lucide-react';

export default function Payment() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const packages = [
    {
      id: 'single',
      name: '1 University',
      price: '300,000',
      currency: 'MNT',
      features: ['Application review', 'Document translation support', 'Interview prep'],
    },
    {
      id: 'bundle',
      name: '2+1 Universities',
      price: '600,000',
      currency: 'MNT',
      features: ['Apply to 3 universities for the price of 2', 'Priority processing', 'Dedicated mentor', 'Visa application support'],
      popular: true,
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">Select Your Package</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {packages.map((pkg) => (
            <div 
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg.id)}
              className={`relative bg-white rounded-3xl border-2 p-8 cursor-pointer transition-all duration-200 ${selectedPackage === pkg.id ? 'border-[#ff7300] shadow-xl scale-[1.02]' : 'border-slate-200 hover:border-[#ff7300]/50'}`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ff7300] to-[#cc5c00] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide shadow-sm">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold text-slate-900">{pkg.price}</span>
                <span className="text-slate-500 font-medium">{pkg.currency}</span>
              </div>
              <ul className="space-y-4">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                    <div className="mt-0.5 bg-green-100 rounded-full p-1 text-green-600">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className={`mt-8 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${selectedPackage === pkg.id ? 'border-[#ff7300] bg-[#ff7300] text-white' : 'border-slate-300'}`}>
                {selectedPackage === pkg.id && <Check className="w-5 h-5" />}
              </div>
            </div>
          ))}
        </div>

        {selectedPackage && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-slate-200 p-8 mb-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment Method</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div 
                onClick={() => setPaymentMethod('card')}
                className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-[#0066cc] bg-blue-50/50' : 'border-slate-200 hover:border-[#0066cc]/50'}`}
              >
                <div className={`p-3 rounded-full ${paymentMethod === 'card' ? 'bg-blue-100 text-[#0066cc]' : 'bg-slate-100 text-slate-500'}`}>
                  <CreditCard className="w-6 h-6" />
                </div>
                <span className={`text-lg font-bold ${paymentMethod === 'card' ? 'text-[#0066cc]' : 'text-slate-700'}`}>Credit / Debit Card</span>
              </div>
              <div 
                onClick={() => setPaymentMethod('bank')}
                className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-colors ${paymentMethod === 'bank' ? 'border-[#0066cc] bg-blue-50/50' : 'border-slate-200 hover:border-[#0066cc]/50'}`}
              >
                <div className={`p-3 rounded-full ${paymentMethod === 'bank' ? 'bg-blue-100 text-[#0066cc]' : 'bg-slate-100 text-slate-500'}`}>
                  <Building className="w-6 h-6" />
                </div>
                <span className={`text-lg font-bold ${paymentMethod === 'bank' ? 'text-[#0066cc]' : 'text-slate-700'}`}>Bank Transfer</span>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-200">
          <Link to={createPageUrl("ApplicationGuide")} className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">Back to Application</Button>
          </Link>
          <Button 
            disabled={!selectedPackage || !paymentMethod} 
            size="lg"
            className="w-full sm:w-auto bg-[#0066cc] hover:bg-[#0052a3] text-white px-12 text-lg h-12"
          >
            Pay and Submit
          </Button>
        </div>
      </div>
    </div>
  );
}