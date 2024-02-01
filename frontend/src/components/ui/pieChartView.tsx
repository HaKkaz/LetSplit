import React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { AnchorPosition } from '@mui/x-charts/ChartsLegend/utils';

type PieValueType = {
    value: number;
    label: string;
};

const data: PieValueType[] = [
    { value: 5, label: 'A' },
    { value: 10, label: 'B' },
    { value: 15, label: 'C' },
    { value: 20, label: 'E' },
];

const size = {
    width: 400,
    height: 200,
    margin: { top: 10, bottom: 10, left: 5, right: 5 },
    // legend: { hidden: true },
};

function PieChartView() {
    return (
        <div style={{ position: 'relative' }}>
            <PieChart
                series={[
                    {
                        arcLabel: (item) => `${data[item.index].label} ${item.value}`,
                        // arcLabelMinAngle: 45,
                        data,
                    },
                ]}

                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                        fill: 'white',
                        fontWeight: 'bold',
                    },
                }}
                {...size}
                slotProps={{
                    legend: {
                        direction: 'column',
                        position: { vertical: 'bottom', horizontal: 'right' },
                        padding: 45,
                    },
                }}
            />

        </div>
    )
}

export default PieChartView;