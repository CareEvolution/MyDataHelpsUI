import React, { useContext } from "react";
import { ColorDefinition, resolveColor } from "../../../helpers/colors";
import { getDatesForMonth } from "../../../helpers/date-helpers";
import { LayoutContext } from "../Layout";
import "./MonthlyEventMatrix.css"

export interface MonthlyEventMatrixRow {
    label: string;
    data: boolean[];
    color: ColorDefinition;
}

export interface MonthlyEventMatrixProps {
    title?: string;
    rows: MonthlyEventMatrixRow[];
    innerRef?: React.Ref<HTMLTableElement>;
    intervalStart: Date;
}

export default function (props: MonthlyEventMatrixProps) {
    var monthDays = getDatesForMonth(props.intervalStart.getFullYear(), props.intervalStart.getMonth());
    const context = useContext(LayoutContext);

    function rowTotal(row: MonthlyEventMatrixRow) {
        return row.data.filter((m) => m).length;
    }

    return <div ref={props.innerRef} className="mdhui-monthly-event-matrix">
        {props.rows.length > 0 &&
            <table cellPadding="0" cellSpacing="0">
                <thead>
                    {props.title &&
                        <tr>
                            <th colSpan={100}>{props.title}</th>
                        </tr>
                    }
                    <tr>
                        <td className="mdhui-monthly-event-matrix-title"></td>
                        <td></td>
                        {monthDays.map((m) =>
                            <td key={m.toISOString()} style={{ width: (75 / monthDays.length) + '%' }}>
                                <div className="mdhui-monthly-event-matrix-day-number">{m.getDate()}</div>
                            </td>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {props.rows.map((s) =>
                        <tr key={s.label}>
                            <td className="mdhui-monthly-event-matrix-row-label">{s.label} </td>
                            <td className="mdhui-monthly-event-matrix-row-total">
                                <span>{rowTotal(s) > 0 ? rowTotal(s) : <>&nbsp;</>}</span>
                            </td>
                            {monthDays.map((m, i) =>
                                <td key={m.toISOString()} style={{ width: (75 / monthDays.length) + '%' }}>
                                    <div className="mdhui-monthly-event-matrix-circle" style={{ backgroundColor: s.data[i] ? resolveColor(context.colorScheme, s.color) : '#ddd' }}>
                                    </div>
                                </td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        }
    </div>
}