// Allows code splitting / bundle optimization for recharts
import type { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const LineChartImpl: typeof LineChart = require('recharts/es6/component/LineChart').default
const ResponsiveContainerImpl: typeof ResponsiveContainer = require('recharts/es6/chart/ResponsiveContainer').default
const XAxisImpl: typeof XAxis = require('recharts/es6/cartesian/XAxis').default
const YAxisImpl: typeof YAxis = require('recharts/es6/cartesian/YAxis').default
const TooltipImpl: typeof Tooltip = require('recharts/es6/component/Tooltip').default
const CartesianGridImpl: typeof CartesianGrid = require('recharts/es6/component/CartesianGrid').default
const LineImpl: typeof Line = require('recharts/es6/component/Line').default

export {
	ResponsiveContainerImpl as ResponsiveContainer,
	LineChartImpl as LineChart,
	LineImpl as Line,
	XAxisImpl as XAxis,
	YAxisImpl as YAxis,
	TooltipImpl as Tooltip,
	CartesianGridImpl as CartesianGrid
}