import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import MainTemplate from "@/components/template/MainTemplate.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import OverviewList from "@/pages/dashboard/overview/OverviewList.tsx";
import ActivityList from "@/pages/dashboard/activities/ActivityLlist.tsx";
import FriendContainer from "@/components/friend/FriendContainer.tsx";

export default function DashboardPage() {

    return (
        <MainTemplate>
            <ScrollArea className="h-[calc(100vh-20px)]">
                <div className="p-5 flex flex-col-reverse md:flex-row gap-5">
                    <div className="flex-1 space-y-5">
                        <FriendContainer/>
                        <ActivityList/>
                        <OverviewList/>
                    </div>

                    <div className="w-full h-fit md:w-1/3 sticky top-10">
                        <Card className="p-5">
                            <h2 className="text-xl font-semibold mb-4">Calendar</h2>
                            <div className="flex justify-center items-center">
                                <Calendar
                                    className="shadow-md rounded-lg bg-white dark:bg-red-950/15"
                                    value={new Date()}
                                    tileClassName="text-center"
                                />
                            </div>
                        </Card>

                        <section className="mt-5 bg-white dark:bg-red-950/5 p-5 rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Statistics</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="p-4 shadow-sm bg-red-100 dark:bg-red-950/15">
                                    <CardContent>
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Friends</h3>
                                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">150</p>
                                    </CardContent>
                                </Card>
                                <Card className="p-4 shadow-sm bg-red-100 dark:bg-red-950/15">
                                    <CardContent>
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Completed
                                            Tasks</h3>
                                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">20</p>
                                    </CardContent>
                                </Card>
                                <Card className="p-4 shadow-sm bg-red-100 dark:bg-red-950/15">
                                    <CardContent>
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Ongoing
                                            Tasks</h3>
                                        <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">5</p>
                                    </CardContent>
                                </Card>
                                <Card className="p-4 shadow-sm bg-red-100 dark:bg-red-950/15">
                                    <CardContent>
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Pending
                                            Invites</h3>
                                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">3</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>
                    </div>
                </div>
            </ScrollArea>
        </MainTemplate>
    );
}
