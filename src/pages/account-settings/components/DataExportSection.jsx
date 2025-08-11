import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const DataExportSection = ({ onDataExport, onAccountDeletion }) => {
  const [exportSettings, setExportSettings] = useState({
    includeContent: true,
    includeAnalytics: true,
    includeSettings: true,
    includeConnections: false,
    format: 'json',
    dateRange: 'all'
  });
  const [isExporting, setIsExporting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const formatOptions = [
    { value: 'json', label: 'JSON Format' },
    { value: 'csv', label: 'CSV Format' },
    { value: 'pdf', label: 'PDF Report' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'last_year', label: 'Last 12 Months' },
    { value: 'last_6_months', label: 'Last 6 Months' },
    { value: 'last_3_months', label: 'Last 3 Months' },
    { value: 'last_month', label: 'Last Month' }
  ];

  const exportHistory = [
    {
      id: 1,
      date: "2025-01-10",
      type: "Full Data Export",
      format: "JSON",
      size: "15.2 MB",
      status: "completed",
      downloadUrl: "#"
    },
    {
      id: 2,
      date: "2024-12-15",
      type: "Analytics Report",
      format: "PDF",
      size: "2.8 MB",
      status: "completed",
      downloadUrl: "#"
    },
    {
      id: 3,
      date: "2024-11-20",
      type: "Content Backup",
      format: "CSV",
      size: "8.5 MB",
      status: "expired",
      downloadUrl: null
    }
  ];

  const handleExportSettingChange = (key, value) => {
    setExportSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleStartExport = async () => {
    setIsExporting(true);
    try {
      await onDataExport(exportSettings);
      // Simulate export process
      setTimeout(() => {
        setIsExporting(false);
        alert('Export started! You will receive an email when it\'s ready for download.');
      }, 2000);
    } catch (error) {
      setIsExporting(false);
      alert('Export failed. Please try again.');
    }
  };

  const handleAccountDeletion = () => {
    if (deleteConfirmText !== 'DELETE MY ACCOUNT') {
      alert('Please type "DELETE MY ACCOUNT" to confirm');
      return;
    }
    
    if (confirm('This action cannot be undone. Are you absolutely sure?')) {
      onAccountDeletion();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'processing':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'expired':
        return 'bg-muted/10 text-muted-foreground border-muted/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Data Export */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Export Your Data</h3>
          <p className="text-sm text-muted-foreground">Download a copy of your data for backup or migration purposes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">What to Include</h4>
            
            <Checkbox
              checked={exportSettings?.includeContent}
              onChange={(e) => handleExportSettingChange('includeContent', e?.target?.checked)}
              label="Content & Posts"
              description="All your posts, captions, and media files"
            />
            
            <Checkbox
              checked={exportSettings?.includeAnalytics}
              onChange={(e) => handleExportSettingChange('includeAnalytics', e?.target?.checked)}
              label="Analytics Data"
              description="Performance metrics and engagement statistics"
            />
            
            <Checkbox
              checked={exportSettings?.includeSettings}
              onChange={(e) => handleExportSettingChange('includeSettings', e?.target?.checked)}
              label="Account Settings"
              description="Your preferences and configuration"
            />
            
            <Checkbox
              checked={exportSettings?.includeConnections}
              onChange={(e) => handleExportSettingChange('includeConnections', e?.target?.checked)}
              label="Connected Accounts"
              description="Social media account connections (without credentials)"
            />
          </div>

          <div className="space-y-4">
            <Select
              label="Export Format"
              options={formatOptions}
              value={exportSettings?.format}
              onChange={(value) => handleExportSettingChange('format', value)}
            />

            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={exportSettings?.dateRange}
              onChange={(value) => handleExportSettingChange('dateRange', value)}
            />

            <div className="p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Info" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Export Information</span>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Exports are processed in the background</li>
                <li>• You'll receive an email when ready</li>
                <li>• Downloads expire after 7 days</li>
                <li>• Large exports may take several hours</li>
              </ul>
            </div>
          </div>
        </div>

        <Button
          variant="default"
          iconName="Download"
          iconPosition="left"
          onClick={handleStartExport}
          loading={isExporting}
          disabled={isExporting}
        >
          {isExporting ? 'Preparing Export...' : 'Start Export'}
        </Button>
      </div>
      {/* Export History */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Export History</h3>
          <p className="text-sm text-muted-foreground">Previous data exports and downloads</p>
        </div>

        <div className="space-y-3">
          {exportHistory?.map((export_item) => (
            <div key={export_item?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="FileText" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{export_item?.type}</p>
                  <p className="text-sm text-muted-foreground">
                    {export_item?.date} • {export_item?.format} • {export_item?.size}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(export_item?.status)}`}>
                  {export_item?.status}
                </span>
                
                {export_item?.status === 'completed' && export_item?.downloadUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Download"
                    onClick={() => window.open(export_item?.downloadUrl)}
                  >
                    Download
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Account Deletion */}
      <div className="bg-card rounded-lg border border-error p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-error">Delete Account</h3>
          <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data</p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-error/5 rounded-lg border border-error/20">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
              <div>
                <p className="font-medium text-error mb-2">This action cannot be undone</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• All your content and posts will be permanently deleted</li>
                  <li>• Your analytics data will be lost forever</li>
                  <li>• Connected social media accounts will be disconnected</li>
                  <li>• Your subscription will be cancelled immediately</li>
                  <li>• You will not be able to recover your account</li>
                </ul>
              </div>
            </div>
          </div>

          {!showDeleteConfirm ? (
            <Button
              variant="destructive"
              iconName="Trash2"
              iconPosition="left"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete My Account
            </Button>
          ) : (
            <div className="space-y-4 p-4 bg-error/5 rounded-lg border border-error/20">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Type "DELETE MY ACCOUNT" to confirm:
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e?.target?.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-error"
                  placeholder="DELETE MY ACCOUNT"
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="destructive"
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={handleAccountDeletion}
                  disabled={deleteConfirmText !== 'DELETE MY ACCOUNT'}
                >
                  Permanently Delete Account
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteConfirmText('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataExportSection;