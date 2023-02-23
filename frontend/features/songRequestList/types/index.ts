export type SongStatus = "accept" | "reject" | "pending";

export type SongRequest = {
  active: boolean;
  bandName: string;
  id: string;
  note: string;
  requestedAt: string;
  songName: string;
  status: SongStatus;
  userId: string;
};
