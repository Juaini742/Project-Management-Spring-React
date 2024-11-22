import MainTemplate from "@/components/template/MainTemplate.tsx";
import {useUser} from "@/hooks/useUser";
import {Briefcase, MapPin, User} from "lucide-react";
import ProfileDialog from "./ProfileDialog";
import FriendContainer from "@/components/friend/FriendContainer.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

export default function ProfilePage() {
    const {user} = useUser();
    return (
        <MainTemplate>
            <ScrollArea className="h-[calc(100vh-20px)]">
                <div className="p-5">
                    <div className="p-6 bg-gradient-to-br from-red-500 to-purple-600 text-white rounded-xl shadow-lg">
                        <div className="flex flex-col items-center gap-5">
                            <div className="w-32 h-32 relative">
                                <img
                                    src="https://res.cloudinary.com/dixdqxpza/image/upload/v1727789066/qa9tcpiudu2zlkcwuoaa.png"
                                    alt="profile"
                                    className="w-full h-full rounded-full border-4 border-white shadow-md object-cover"
                                />
                            </div>
                            <div className="text-center">
                                <h2 className="text-2xl font-bold">{user?.profile.full_name}</h2>
                                <p className="text-sm text-gray-200">"Your Personal Tagline"</p>
                            </div>
                            <div className="w-full flex flex-col gap-4 mt-4">
                                <div
                                    className="flex items-center gap-3 bg-white text-black px-4 py-3 rounded-lg shadow">
                                    <User className="w-5 h-5 text-blue-500"/>
                                    <span className="font-medium">Full Name:</span>
                                    <span>{user?.profile.full_name}</span>
                                </div>
                                <div
                                    className="flex items-center gap-3 bg-white text-black px-4 py-3 rounded-lg shadow">
                                    <Briefcase className="w-5 h-5 text-purple-500"/>
                                    <span className="font-medium">Job:</span>
                                    <span>{user?.profile.job}</span>
                                </div>
                                <div
                                    className="flex items-center gap-3 bg-white text-black px-4 py-3 rounded-lg shadow">
                                    <MapPin className="w-5 h-5 text-green-500"/>
                                    <span className="font-medium">Address:</span>
                                    <span>{user?.profile.address}</span>
                                </div>
                                <ProfileDialog id={user?.profile.id}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-5 mb-10">
                    <FriendContainer/>
                </div>
            </ScrollArea>
        </MainTemplate>
    );
}
