import { User } from "../../../../packages/shared/types/game-data";

export type Friend = Pick<User, "id" | "username" | "profile"> & {
	status: "online" | "away" | "offline";
	playing?: string;
};
