import { useState, useEffect } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { jsPDF } from 'jspdf';
import type { Invoice } from '../types';
import { invoiceApi } from '../services/api';
import InvoiceList from '../components/billing/InvoiceList';

export default function Billing() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const data = await invoiceApi.getInvoices();
        setInvoices(data);
      } catch (err) {
        console.error("Failed to fetch invoices", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchInvoices();
  }, []);

  const totalOutstanding = invoices
    .filter(inv => inv.status !== 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const handleBulkUploadCSV = () => {
    // Mock CSV Upload functionality
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        alert(`Mock Upload: Successfully processed ${file.name}. In a real app, this would parse the CSV and bulk upload to Firestore.`);
      }
    };
    fileInput.click();
  };

  const handleGenerateInvoicesPDF = () => {
    if (invoices.length === 0) {
      alert("No invoices to generate.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Monthly Maintenance Invoices", 20, 20);

    doc.setFontSize(12);
    let yPos = 40;

    invoices.forEach((inv, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(`Invoice #${index + 1}: ${inv.residentName} (Unit: ${inv.unitNumber})`, 20, yPos);
      doc.text(`Amount: $${inv.amount.toFixed(2)} | Due: ${inv.dueDate} | Status: ${inv.status.toUpperCase()}`, 20, yPos + 10);
      doc.line(20, yPos + 15, 190, yPos + 15);
      yPos += 30;
    });

    doc.save("maintenance_invoices.pdf");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Financial Management</h2>
          <p className="mt-1 text-sm text-gray-500">Track paid/unpaid bills and view aging reports. (Stripe/PayPal Integration Pending)</p>
        </div>
        <div className="flex space-x-3">
          <button onClick={handleBulkUploadCSV} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Upload className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
            Bulk Upload CSV
          </button>
          <button onClick={handleGenerateInvoicesPDF} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <FileText className="-ml-1 mr-2 h-5 w-5" />
            Generate Invoices
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-yellow-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Total Outstanding</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">${totalOutstanding.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
           <h3 className="text-lg font-medium text-gray-900">Collection Rate</h3>
           <p className="mt-2 text-3xl font-bold text-gray-900">
              {invoices.length ? Math.round((invoices.filter(i => i.status === 'paid').length / invoices.length) * 100) : 0}%
           </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Invoices (Aging Report)</h3>
        {isLoading ? (
          <div className="text-center py-8">Loading invoices...</div>
        ) : (
          <InvoiceList invoices={invoices} />
        )}
      </div>
    </div>
  );
}
