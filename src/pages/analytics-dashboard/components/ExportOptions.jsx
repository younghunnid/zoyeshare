import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportOptions = ({ onExport }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const exportOptions = [
    {
      key: 'pdf',
      label: 'PDF Report',
      description: 'Complete analytics report with charts',
      icon: 'FileText',
      format: 'PDF'
    },
    {
      key: 'csv',
      label: 'CSV Data',
      description: 'Raw data for external analysis',
      icon: 'Database',
      format: 'CSV'
    },
    {
      key: 'excel',
      label: 'Excel Workbook',
      description: 'Formatted spreadsheet with multiple sheets',
      icon: 'FileSpreadsheet',
      format: 'XLSX'
    },
    {
      key: 'json',
      label: 'JSON Data',
      description: 'Structured data for developers',
      icon: 'Code',
      format: 'JSON'
    }
  ];

  const handleExport = async (option) => {
    setIsExporting(true);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onExport) {
        onExport(option);
      }
      
      // Create mock download
      const mockData = {
        exportType: option?.key,
        timestamp: new Date()?.toISOString(),
        filename: `analytics-report-${Date.now()}.${option?.format?.toLowerCase()}`
      };
      
      console.log('Export completed:', mockData);
      
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        iconName="Download"
        iconPosition="left"
        iconSize={16}
        disabled={isExporting}
        loading={isExporting}
      >
        Export
        <Icon name="ChevronDown" size={14} className="ml-2" />
      </Button>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-72 bg-popover border border-border rounded-lg shadow-lg z-20 py-2">
            <div className="px-4 py-2 border-b border-border">
              <h4 className="text-sm font-medium text-popover-foreground">Export Options</h4>
              <p className="text-xs text-muted-foreground">Choose your preferred format</p>
            </div>
            
            <div className="py-2">
              {exportOptions?.map(option => (
                <button
                  key={option?.key}
                  onClick={() => handleExport(option)}
                  disabled={isExporting}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name={option?.icon} size={16} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-popover-foreground">
                      {option?.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {option?.description}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {option?.format}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="px-4 py-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                <Icon name="Info" size={12} className="inline mr-1" />
                Exports include data from selected date range
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExportOptions;