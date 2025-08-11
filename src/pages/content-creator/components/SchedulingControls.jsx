import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SchedulingControls = ({ onSchedule, onPostNow, onSaveDraft }) => {
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [timezone, setTimezone] = useState('America/New_York');
  const [isScheduled, setIsScheduled] = useState(false);

  const timezoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'UTC', label: 'UTC' },
    { value: 'Europe/London', label: 'London (GMT)' },
    { value: 'Europe/Paris', label: 'Paris (CET)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
    { value: 'Australia/Sydney', label: 'Sydney (AEDT)' }
  ];

  const handleScheduleToggle = () => {
    setIsScheduled(!isScheduled);
    if (!isScheduled) {
      // Set default to tomorrow at 9 AM
      const tomorrow = new Date();
      tomorrow?.setDate(tomorrow?.getDate() + 1);
      setScheduleDate(tomorrow?.toISOString()?.split('T')?.[0]);
      setScheduleTime('09:00');
    }
  };

  const handleScheduleSubmit = () => {
    if (scheduleDate && scheduleTime) {
      const scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}`);
      onSchedule({
        date: scheduleDate,
        time: scheduleTime,
        timezone,
        datetime: scheduledDateTime
      });
    }
  };

  const getScheduledDateTime = () => {
    if (scheduleDate && scheduleTime) {
      const date = new Date(`${scheduleDate}T${scheduleTime}`);
      return date?.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short'
      });
    }
    return '';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Publishing Options</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {new Date()?.toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit',
              timeZoneName: 'short'
            })}
          </span>
        </div>
      </div>
      {/* Schedule Toggle */}
      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isScheduled ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            <Icon name={isScheduled ? "Calendar" : "Send"} size={20} />
          </div>
          <div>
            <p className="font-medium text-foreground">
              {isScheduled ? 'Schedule for Later' : 'Post Immediately'}
            </p>
            <p className="text-sm text-muted-foreground">
              {isScheduled ? 'Choose when to publish your content' : 'Publish your content right now'}
            </p>
          </div>
        </div>
        <Button
          variant={isScheduled ? "default" : "outline"}
          size="sm"
          onClick={handleScheduleToggle}
        >
          {isScheduled ? 'Scheduled' : 'Schedule'}
        </Button>
      </div>
      {/* Scheduling Controls */}
      {isScheduled && (
        <div className="space-y-4 p-4 border border-border rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e?.target?.value)}
              min={new Date()?.toISOString()?.split('T')?.[0]}
              required
            />
            <Input
              label="Time"
              type="time"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e?.target?.value)}
              required
            />
          </div>
          
          <Select
            label="Timezone"
            options={timezoneOptions}
            value={timezone}
            onChange={setTimezone}
            searchable
          />

          {scheduleDate && scheduleTime && (
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Calendar" size={16} className="text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Scheduled for:</p>
                  <p className="text-sm text-muted-foreground">{getScheduledDateTime()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Campaign Assignment */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Campaign & Tags</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Campaign"
            placeholder="Select campaign (optional)"
            options={[
              { value: 'summer-2024', label: 'Summer Campaign 2024' },
              { value: 'product-launch', label: 'Product Launch' },
              { value: 'brand-awareness', label: 'Brand Awareness' },
              { value: 'holiday-special', label: 'Holiday Special' }
            ]}
            value=""
            onChange={() => {}}
          />
          <Input
            label="Tags"
            placeholder="Add tags (comma separated)"
            description="Help organize your content"
          />
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
        <Button
          variant="ghost"
          onClick={onSaveDraft}
          iconName="Save"
          className="sm:w-auto"
        >
          Save Draft
        </Button>
        
        <div className="flex gap-3 sm:ml-auto">
          {isScheduled ? (
            <Button
              variant="default"
              onClick={handleScheduleSubmit}
              disabled={!scheduleDate || !scheduleTime}
              iconName="Calendar"
              className="flex-1 sm:flex-none"
            >
              Schedule Post
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={onPostNow}
              iconName="Send"
              className="flex-1 sm:flex-none"
            >
              Post Now
            </Button>
          )}
        </div>
      </div>
      {/* Quick Schedule Options */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const date = new Date();
            date?.setHours(date?.getHours() + 1);
            setScheduleDate(date?.toISOString()?.split('T')?.[0]);
            setScheduleTime(date?.toTimeString()?.slice(0, 5));
            setIsScheduled(true);
          }}
        >
          +1 Hour
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const date = new Date();
            date?.setDate(date?.getDate() + 1);
            date?.setHours(9, 0);
            setScheduleDate(date?.toISOString()?.split('T')?.[0]);
            setScheduleTime('09:00');
            setIsScheduled(true);
          }}
        >
          Tomorrow 9AM
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const date = new Date();
            date?.setDate(date?.getDate() + 1);
            date?.setHours(17, 0);
            setScheduleDate(date?.toISOString()?.split('T')?.[0]);
            setScheduleTime('17:00');
            setIsScheduled(true);
          }}
        >
          Tomorrow 5PM
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const date = new Date();
            const dayOfWeek = date?.getDay();
            const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
            date?.setDate(date?.getDate() + daysUntilMonday);
            date?.setHours(9, 0);
            setScheduleDate(date?.toISOString()?.split('T')?.[0]);
            setScheduleTime('09:00');
            setIsScheduled(true);
          }}
        >
          Next Monday
        </Button>
      </div>
    </div>
  );
};

export default SchedulingControls;