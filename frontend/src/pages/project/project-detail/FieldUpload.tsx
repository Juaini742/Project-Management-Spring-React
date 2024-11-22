import {CloudUploadIcon, FileIcon, PaperclipIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Badge} from "@/components/ui/badge.tsx";


export default function FieldUpload() {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Files Upload</h2>
            <div className="bg-white dark:bg-red-950/15 p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <PaperclipIcon className="text-red-600"/>
                        <h3 className="text-lg font-semibold">Upload Files</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Drag and drop your files
                        here</p>
                </div>

                {/* Drop Zone */}
                <div
                    className="flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 rounded-lg">
                    <CloudUploadIcon className="text-red-600 w-10 h-10"/>
                    <p className="text-sm text-gray-600 dark:text-gray-400 ml-4">Drag your files here or
                        click to browse</p>
                </div>

                {/* File List */}
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold">Uploaded Files</span>
                        <Button variant="link" className="text-red-600">View All</Button>
                    </div>
                    <ul className="list-none space-y-3">
                        <li className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <FileIcon className="text-gray-500"/>
                                <span
                                    className="text-sm text-gray-600 dark:text-gray-400">project-plan.pdf</span>
                            </div>
                            <Badge variant="outline" color="green" className="text-sm">Completed</Badge>
                        </li>
                        <li className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <FileIcon className="text-gray-500"/>
                                <span
                                    className="text-sm text-gray-600 dark:text-gray-400">design-mockup.jpg</span>
                            </div>
                            <Badge variant="outline" color="yellow" className="text-sm">In
                                Progress</Badge>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}