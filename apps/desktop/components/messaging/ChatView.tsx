import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Phone, Video, Info, SmilePlus, MessageSquare, X } from "lucide-react";
import { Friend } from "../../types/social";

export type Message = {
	id: string;
	senderId: string;
	content: string;
	timestamp: string;
};

interface ChatViewProps {
	friend: Friend | null;
	messages: Message[];
	className?: string;
	onClose?: () => void;
}

const ChatView = ({ friend, messages, className = "", onClose }: ChatViewProps) => {
	if (!friend) {
		return (
			<div className={`flex-1 flex flex-col items-center justify-center bg-black text-zinc-400 ${className}`}>
				<MessageSquare size={48} />
				<p className="mt-4 text-lg">Select a friend to start chatting</p>
			</div>
		);
	}

	return (
		<div className={`flex-1 flex flex-col bg-black ${className}`}>
			{/* Chat Header */}
			<div className="flex items-center justify-between p-3 border-b border-zinc-700">
				<div className="flex items-center space-x-3 min-w-0 flex-1">
					<Avatar className="h-9 w-9 flex-shrink-0">
						<AvatarImage src={friend.profile.avatar} alt={friend.username} />
						<AvatarFallback>{friend.username.charAt(0)}</AvatarFallback>
					</Avatar>
					<div className="min-w-0 flex-1">
						<p className="font-bold text-zinc-50 truncate">{friend.username}</p>
						<p className="text-xs text-zinc-400 truncate">{friend.status === "online" ? `Playing ${friend.playing}` : "Offline"}</p>
					</div>
				</div>
				<div className="flex items-center space-x-2 flex-shrink-0">
					<Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-50 h-8 w-8 lg:h-9 lg:w-9">
						<Phone size={18} />
					</Button>
					<Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-50 h-8 w-8 lg:h-9 lg:w-9">
						<Video size={18} />
					</Button>
					<Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-50 h-8 w-8 lg:h-9 lg:w-9">
						<Info size={18} />
					</Button>
					{onClose && (
						<Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-50 h-8 w-8 lg:h-9 lg:w-9" onClick={onClose}>
							<X size={18} />
						</Button>
					)}
				</div>
			</div>

			{/* Messages */}
			<ScrollArea className="flex-1 p-3 sm:p-4">
				<div className="space-y-3 sm:space-y-4">
					{messages.map((msg) => (
						<div key={msg.id} className={`flex items-start gap-2 sm:gap-3 ${msg.senderId === "me" ? "justify-end" : ""}`}>
							{msg.senderId !== "me" && (
								<Avatar className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
									<AvatarImage src={friend.profile.avatar} />
								</Avatar>
							)}
							<div className={`p-2 sm:p-3 rounded-lg max-w-xs sm:max-w-sm lg:max-w-md ${msg.senderId === "me" ? "bg-cyan-400 text-black" : "bg-zinc-700 text-zinc-50"}`}>
								<p className="text-sm">{msg.content}</p>
								<p className="text-xs text-right mt-1 opacity-70">{new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
							</div>
						</div>
					))}
				</div>
			</ScrollArea>

			{/* Message Input */}
			<div className="p-3 sm:p-4 border-t border-zinc-700">
				<div className="relative">
					<Input placeholder={`Message @${friend.username}`} className="bg-zinc-700 border-zinc-600 pr-10 text-zinc-50 placeholder-zinc-400" />
					<Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-50 h-8 w-8">
						<SmilePlus size={18} />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ChatView;
