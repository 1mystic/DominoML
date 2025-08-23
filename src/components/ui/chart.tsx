import * as React from 'react';

import { cn } from '@/lib/utils';

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
  };
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }

  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    config: ChartConfig;
    children: React.ReactNode;
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          'flex aspect-video justify-center text-xs',
          className
        )}
        {...props}
      >
        <div className="w-full">
          {children}
        </div>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = 'ChartContainer';

const ChartTooltip = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border bg-background p-2 shadow-md',
        className
      )}
      {...props}
    />
  );
});
ChartTooltip.displayName = 'ChartTooltip';

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    active?: boolean;
    payload?: any[];
    label?: string;
  }
>(({ className, active, payload, label, ...props }, ref) => {
  if (!active || !payload) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn('grid gap-2 rounded-lg border bg-background p-2 shadow-md', className)}
      {...props}
    >
      {label && <div className="font-medium">{label}</div>}
      {payload.map((item: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="h-2 w-2 shrink-0 rounded-[2px]"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-muted-foreground">{item.name}:</span>
          <span className="font-mono font-medium tabular-nums text-foreground">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
});
ChartTooltipContent.displayName = 'ChartTooltipContent';

const ChartLegend = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    payload?: any[];
  }
>(({ className, payload, ...props }, ref) => {
  if (!payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn('flex items-center justify-center gap-4', className)}
      {...props}
    >
      {payload.map((item: any) => (
        <div key={item.value} className="flex items-center gap-1.5">
          <div
            className="h-2 w-2 shrink-0 rounded-[2px]"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-muted-foreground">{item.value}</span>
        </div>
      ))}
    </div>
  );
});
ChartLegend.displayName = 'ChartLegend';

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  useChart,
};
