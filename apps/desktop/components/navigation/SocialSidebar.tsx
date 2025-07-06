import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Users, Search, Phone, Video, Settings2 } from "lucide-react";
import friendsData from "../../data/friends.json";
import groups from "../../data/groups.json";
import { Friend } from "../../types/social";

const friends: Friend[] = friendsData as Friend[];

interface SocialSidebarProps {
	onFriendSelect: (friend: Friend) => void;
	className?: string;
	isMobile?: boolean;
}

const SocialSidebar = ({ onFriendSelect, className = "", isMobile = false }: SocialSidebarProps) => {
	return (
		<div className={`${isMobile ? "w-80" : "w-64"} bg-zinc-800 h-screen flex flex-col border-l border-zinc-700 ${className}`}>
			{/* Header */}
			<div className="p-3 sm:p-4 border-b border-zinc-700">
				<div className="relative">
					<Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
					<Input placeholder="Search Friends..." className="bg-black border-zinc-700 placeholder-zinc-400 text-sm pl-10" />
				</div>
			</div>

			<ScrollArea className="flex-1">
				{/* Party */}
				<div className="p-3 sm:p-4">
					<h3 className="text-xs font-bold uppercase text-zinc-400 mb-2">Party</h3>
					<div className="bg-zinc-700 p-3 rounded-lg">
						<p className="text-sm text-zinc-400 mb-2">You are not in a party.</p>
						<Button className="w-full bg-zinc-600 hover:bg-zinc-700 text-zinc-50">
							<Plus className="mr-2 h-4 w-4" /> Create Party
						</Button>
					</div>
				</div>

				{/* Groups */}
				<div className="p-3 sm:p-4">
					<div className="flex justify-between items-center mb-2">
						<h3 className="text-xs font-bold uppercase text-zinc-400">Groups</h3>
						<Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-400">
							<Plus size={16} />
						</Button>
					</div>
					<div className="space-y-2">
						{groups.map((group) => (
							<div key={group.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-zinc-700 cursor-pointer">
								<Avatar className="h-8 w-8">
									<AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
								</Avatar>
								<div className="min-w-0 flex-1">
									<p className="text-sm font-semibold text-zinc-50 truncate">{group.name}</p>
									<p className="text-xs text-zinc-400">{group.members.length} Members</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Friends */}
				<div className="p-3 sm:p-4">
					<div className="flex justify-between items-center mb-2">
						<h3 className="text-xs font-bold uppercase text-zinc-400">Friends ({friends.filter((f) => f.status === "online").length} Online)</h3>
						<Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-400">
							<Users size={16} />
						</Button>
					</div>
					<div className="space-y-2">
						{friends.map((friend) => (
							<div key={friend.id} onClick={() => onFriendSelect(friend)} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-zinc-700 cursor-pointer">
								<Avatar className="h-8 w-8 relative">
									<AvatarImage src={friend.profile.avatar} alt={friend.username} />
									<AvatarFallback>{friend.username.charAt(0)}</AvatarFallback>
									{friend.status === "online" && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-zinc-800" />}
								</Avatar>
								<div className="min-w-0 flex-1">
									<p className="text-sm font-semibold text-zinc-50 truncate">{friend.username}</p>
									<p className="text-xs text-zinc-400 truncate">{friend.playing || "Not in-game"}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</ScrollArea>

			{/* User Footer */}
			<div className="p-3 bg-black border-t border-zinc-700 flex items-center justify-between">
				<div className="flex items-center space-x-2 min-w-0 flex-1">
					<Avatar className="h-9 w-9 flex-shrink-0">
						<AvatarImage src="https://i.pravatar.cc/40?u=me" alt="My Avatar" />
						<AvatarFallback>ME</AvatarFallback>
					</Avatar>
					<div className="min-w-0 flex-1">
						<p className="text-sm font-bold text-zinc-50 truncate">MyUsername</p>
						<p className="text-xs text-zinc-400">#1234</p>
					</div>
				</div>
				<div className="flex items-center space-x-1 flex-shrink-0">
					<Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-400">
						<Phone size={16} />
					</Button>
					<Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-400">
						<Video size={16} />
					</Button>
					<Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-400">
						<Settings2 size={16} />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default SocialSidebar;
