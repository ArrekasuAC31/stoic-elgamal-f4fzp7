import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DateRange } from "react-date-range";
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./styles.css"; // Optional if using external CSS

const today = new Date();
const presets = {
  Today: { startDate: today, endDate: today },
  Yesterday: { startDate: subDays(today, 1), endDate: subDays(today, 1) },
  "Last 7 Days": { startDate: subDays(today, 6), endDate: today },
  "Last 30 Days": { startDate: subDays(today, 29), endDate: today },
  "This Month": { startDate: startOfMonth(today), endDate: endOfMonth(today) },
};

const mockData = [
  { date: "Jul 12", spend: 120 },
  { date: "Jul 13", spend: 98 },
  { date: "Jul 14", spend: 140 },
  { date: "Jul 15", spend: 130 },
  { date: "Jul 16", spend: 110 },
  { date: "Jul 17", spend: 160 },
  { date: "Jul 18", spend: 150 },
];

export default function App() {
  const [range, setRange] = useState([
    {
      startDate: subDays(today, 6),
      endDate: today,
      key: "selection",
    },
  ]);
  const [showPicker, setShowPicker] = useState(false);

  const handleSelect = (item) => {
    setRange([item.selection]);
  };

  const handlePresetClick = (preset) => {
    const selected = presets[preset];
    const selection = { ...selected, key: "selection" };
    setRange([selection]);
    setShowPicker(false);
  };

  const formattedRange = `${format(range[0].startDate, "MMM d")} - ${format(
    range[0].endDate,
    "MMM d"
  )}`;

  return (
    <div className="p-6 font-sans space-y-6">
      <h1 className="text-2xl font-bold">📊 ESCASI Dashboard</h1>

      <div className="relative inline-block text-left">
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="px-4 py-2 border rounded-md hover:bg-gray-100 text-sm"
        >
          🗕 {formattedRange}
        </button>

        {showPicker && (
          <div className="absolute z-20 mt-2 bg-white border rounded-md shadow-lg p-4 flex gap-4">
            <div className="flex flex-col gap-1">
              {Object.keys(presets).map((label) => (
                <button
                  key={label}
                  className="text-left text-sm hover:underline"
                  onClick={() => handlePresetClick(label)}
                >
                  {label}
                </button>
              ))}
            </div>
            <DateRange
              editableDateInputs={true}
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              ranges={range}
              rangeColors={["#f97316"]}
            />
          </div>
        )}
      </div>

      <div className="bg-white border rounded p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">Ad Spend Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="spend" stroke="#f97316" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white border rounded p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">Ad Data Table</h2>
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Spend</th>
              <th className="p-2 text-left">Impressions</th>
              <th className="p-2 text-left">Clicks</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{row.date}</td>
                <td className="p-2">₱{row.spend}</td>
                <td className="p-2">{1000 + i * 50}</td>
                <td className="p-2">{200 + i * 10}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
