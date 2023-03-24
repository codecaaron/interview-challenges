import { format } from "date-fns/fp";
import { useMemo, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
} from "recharts";
import { COLORS } from "../constants/colors";
import { Day } from "../constants/day";
import { TimeFrames, TIME_FRAMES } from "../constants/timeframe";
import { useDeferredRender } from "../hooks/useDeferredRender";
import { formatNumber } from "../utils/formatNumber";
import { getSeriesInterval } from "../utils/getSeriesInterval";

export interface BtcAddressChartProps {
  data: Day[];
}

export const BtcAddressChart = ({ data }: BtcAddressChartProps) => {
  const ready = useDeferredRender();
  const [timeframe, setTimeframe] = useState<TimeFrames>("1m");

  const activeFrame = useMemo(() => {
    const firstDay = data[0].time;
    const lastDay = data[data.length - 1].time;
    const { start } = TIME_FRAMES[timeframe];
    if (start) {
      return {
        data: data.filter((day) => day.time > start(lastDay).getTime()),
        domain: [start(lastDay).getTime(), lastDay],
      };
    }
    return {
      data: data,
      domain: [firstDay, lastDay],
    };
  }, [data, timeframe]);

  const lines = useMemo(() => {
    return Object.keys(data[0])
      .filter((key) => key !== "time")
      .map((key, i) => {
        return (
          <Line
            key={key}
            isAnimationActive={false}
            dot={false}
            type="monotone"
            dataKey={key}
            stroke={COLORS[i]}
          />
        );
      });
  }, []);
  return (
    <div className="flex p-4 flex-col content-center justify-center">
      {ready && (
        <ResponsiveContainer width="100%" height={700}>
          <LineChart
            data={activeFrame.data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 0,
            }}
          >
            <Legend />
            <XAxis
              dataKey="time"
              domain={activeFrame.domain}
              interval={getSeriesInterval(activeFrame.data.length)}
              tickFormatter={TIME_FRAMES[timeframe].format}
            />
            <YAxis tickFormatter={formatNumber} />
            <Tooltip
              labelFormatter={format("MMM d yyyy")}
              formatter={formatNumber}
              isAnimationActive={false}
            />
            {lines}
          </LineChart>
        </ResponsiveContainer>
      )}
      <div className="flex gap-2 justify-end">
        {Object.keys(TIME_FRAMES).map((frame) => {
          const classList = ["btn-toggle"];
          if (frame === timeframe) {
            classList.push("btn-toggle__active");
          }
          return (
            <button
              key={frame}
              className={classList.join(" ")}
              onClick={() => setTimeframe(frame as TimeFrames)}
            >
              {frame}
            </button>
          );
        })}
      </div>
    </div>
  );
};
