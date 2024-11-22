import {BarChartIcon, ClockIcon} from "lucide-react";


export default function ProgressOverview() {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Progress Overview</h2>
            <div className="dark:bg-red-950/15 p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                        <BarChartIcon className="text-red-600"/>
                        <h3 className="text-lg font-semibold">Project Completion</h3>
                    </div>
                    <p className="text-sm text-gray-500">Overall project completion status</p>
                </div>

                <div className="relative pt-1 mb-6">
                    <div className="flex mb-2 items-center justify-between">
                        <span className="text-sm font-semibold">Task Progress</span>
                        <span className="text-sm font-semibold text-gray-600">80%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-600 h-2.5 rounded-full" style={{width: '80%'}}></div>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <ClockIcon className="text-gray-500"/>
                    <h3 className="text-lg font-semibold">Upcoming Milestones</h3>
                </div>
                <ul className="list-disc pl-6 text-sm text-gray-600 mt-4">
                    <li>Design Completion - Due in 3 Days</li>
                    <li>Final Presentation - Due in 7 Days</li>
                </ul>
            </div>
        </div>
    )
}