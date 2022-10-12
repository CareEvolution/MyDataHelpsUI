// Allows code splitting / bundle optimization for recharts
import type { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const LineChartImpl: typeof LineChart = require('recharts/es6/chart/LineChart').LineChart
const ResponsiveContainerImpl: typeof ResponsiveContainer = require('recharts/es6/component/ResponsiveContainer').ResponsiveContainer
const XAxisImpl: typeof XAxis = require('recharts/es6/cartesian/XAxis').XAxis
const YAxisImpl: typeof YAxis = require('recharts/es6/cartesian/YAxis').YAxis
const TooltipImpl: typeof Tooltip = require('recharts/es6/component/Tooltip').Tooltip
const CartesianGridImpl: typeof CartesianGrid = require('recharts/es6/cartesian/CartesianGrid').CartesianGrid
const LineImpl: typeof Line = require('recharts/es6/cartesian/Line').Line

XAxisImpl.displayName = "XAxis";
YAxisImpl.displayName = "YAxis";

export {
	ResponsiveContainerImpl as ResponsiveContainer,
	LineChartImpl as LineChart,
	LineImpl as Line,
	XAxisImpl as XAxis,
	YAxisImpl as YAxis,
	TooltipImpl as Tooltip,
	CartesianGridImpl as CartesianGrid
}
