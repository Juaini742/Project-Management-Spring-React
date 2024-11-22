import {ActivityIcon, UserIcon} from "lucide-react";


export default function ActivityLog() {

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Activity Log</h2>
            <div className="bg-white dark:bg-red-950/15 p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <ActivityIcon className="text-red-600"/>
                        <h3 className="text-lg font-semibold">Recent Activities</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Project activity
                        overview</p>
                </div>

                <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                        <div
                            className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white">
                            <UserIcon/>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold text-gray-600 dark:text-gray-200">John Doe</span>
                                <span
                                    className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Uploaded a new
                                design file: <strong>design-mockup.jpg</strong></p>
                        </div>
                    </li>

                    <li className="flex items-start space-x-3">
                        <div
                            className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                            <UserIcon/>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold text-gray-600 dark:text-gray-200">Jane Smith</span>
                                <span
                                    className="text-sm text-gray-500 dark:text-gray-400">1 day ago</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Created a
                                task: <strong>Review project mockups</strong></p>
                        </div>
                    </li>

                    <li className="flex items-start space-x-3">
                        <div
                            className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white">
                            <UserIcon/>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                                <span
                                                    className="font-semibold text-gray-600 dark:text-gray-200">Admin</span>
                                <span
                                    className="text-sm text-gray-500 dark:text-gray-400">3 days ago</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Marked task <strong>Review
                                project mockups</strong> as complete.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}