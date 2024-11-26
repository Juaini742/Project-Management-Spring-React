import {LayoutList} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";


export default function AssignedTask() {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Assigned Tasks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="dark:bg-red-950/15 p-4 rounded-lg shadow-md flex flex-col space-y-4">
                    <div className="flex items-center space-x-2">
                        <LayoutList className="text-red-600"/>
                        <h3 className="font-semibold text-lg">Design Mockup</h3>
                    </div>
                    <p className="text-sm text-gray-600">Create the initial design mockup for the
                        landing page.</p>
                    <div className="flex justify-between items-center mt-auto">
                        <Badge variant="outline" color="red">In Progress</Badge>
                        <Button variant="link" className="text-red-600">View Details</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}