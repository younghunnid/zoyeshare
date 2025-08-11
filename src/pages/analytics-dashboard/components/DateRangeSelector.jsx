import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DateRangeSelector = ({ onDateRangeChange, selectedRange }) => {
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const presetRanges = [
    { key: '7d', label: '7 Days', days: 7 },
    { key: '30d', label: '30 Days', days: 30 },
    { key: '90d', label: '90 Days', days: 90 },
    { key: '1y', label: '1 Year', days: 365 },
    { key: 'custom', label: 'Custom Range', days: null }
  ];

  const handlePresetSelect = (range) => {
    if (range?.key === 'custom') {
      setIsCustomOpen(true);
      return;
    }

    const endDate = new Date();
    const startDate = new Date();
    startDate?.setDate(endDate?.getDate() - range?.days);

    onDateRangeChange({
      startDate: startDate?.toISOString()?.split('T')?.[0],
      endDate: endDate?.toISOString()?.split('T')?.[0],
      preset: range?.key
    });
    setIsCustomOpen(false);
  };

  const handleCustomApply = () => {
    if (customStartDate && customEndDate) {
      onDateRangeChange({
        startDate: customStartDate,
        endDate: customEndDate,
        preset: 'custom'
      });
      setIsCustomOpen(false);
    }
  };

  const formatDateRange = () => {
    if (!selectedRange) return 'Select Date Range';
    
    const start = new Date(selectedRange.startDate);
    const end = new Date(selectedRange.endDate);
    
    return `${start?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsCustomOpen(!isCustomOpen)}
        iconName="Calendar"
        iconPosition="left"
        iconSize={16}
      >
        {formatDateRange()}
        <Icon name="ChevronDown" size={14} className="ml-2" />
      </Button>
      {isCustomOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsCustomOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-20 p-4">
            <h4 className="text-sm font-medium text-popover-foreground mb-3">Select Date Range</h4>
            
            {/* Preset Ranges */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {presetRanges?.filter(range => range?.key !== 'custom')?.map(range => (
                <Button
                  key={range?.key}
                  variant={selectedRange?.preset === range?.key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handlePresetSelect(range)}
                  className="justify-start"
                >
                  {range?.label}
                </Button>
              ))}
            </div>

            {/* Custom Date Inputs */}
            <div className="space-y-3 pt-3 border-t border-border">
              <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Custom Range
              </h5>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Start Date</label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e?.target?.value)}
                    className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">End Date</label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e?.target?.value)}
                    className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCustomOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleCustomApply}
                  disabled={!customStartDate || !customEndDate}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DateRangeSelector;