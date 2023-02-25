import {Request, Response} from "express";
import {firestore} from "../../../firebase";
import {getCurrentDateTime} from "../../utils/payload";

export const getSongRequests = async (req: Request, res: Response) => {
  const {token, userId, active} = req.query;

  const activeParams =
    active === undefined ? true : JSON.parse(active as string);

  if (token === undefined) {
    return res.status(400).json({error: "token cannot be blank"});
  }

  if (userId === undefined) {
    return res.status(400).json({error: "userId cannot be blank"});
  }

  const band = await firestore
      .collection("Band")
      .doc(token as string)
      .get();

  if (!band.exists || band.data()?.userId !== userId) {
    return res.status(404).json({error: "Band not found"});
  }

  const songRequestList: FirebaseFirestore.DocumentData[] = [];

  await firestore
      .collection("SongRequest")
      .where("bandToken", "==", token)
      .where("active", "==", activeParams)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          songRequestList.push({id: doc.ref.id, ...doc.data()});
        });
      });

  return res.status(200).json({data: songRequestList});
};

export const createSongRequest = async (req: Request, res: Response) => {
  const {token, songName, note, userId, isAnonymous} = req.body;

  if (token === undefined) {
    return res.status(400).json({error: "token cannot be blank"});
  }

  if (songName === undefined) {
    return res.status(400).json({error: "songName cannot be blank"});
  }

  const band = await firestore.collection("Band").doc(token).get();
  if (!band.exists) {
    return res.status(404).json({error: "Band not found"});
  }

  const enableSongRequest = band.data()?.songRequest;

  // TODO: need to check with event first
  if (!enableSongRequest) {
    return res.status(422).json({error: "band not support song request"});
  }

  // TODO: need to check if user can able to request the song or not

  const payload: any = {
    bandToken: token,
    songName: songName,
    note: note || null,
    userId: isAnonymous ? null : userId,
    requestedAt: getCurrentDateTime(),
    status: "pending",
    active: true,
  };

  const songRequest = await firestore
      .collection("SongRequest")
      .doc()
      .set(payload);

  return res.status(201).json({data: songRequest});
};

export const updateSongRequest = async (req: Request, res: Response) => {
  const {status, id} = req.body;

  if (id === undefined) {
    return res.status(400).json({error: "id cannot be blank"});
  }

  if (status === undefined) {
    return res.status(400).json({error: "status cannot be blank"});
  }

  if (!["pending", "accept", "reject"].includes(status)) {
    return res.status(400).json({error: "status is invalid"});
  }

  try {
    const songRequestRef = firestore.collection("SongRequest").doc(id);
    const songRequest = await songRequestRef.get();

    if (!songRequest.exists) {
      return res.status(404).json({error: "songRequest not found"});
    }

    const updatedSongRequest = await songRequestRef.update({
      status: status,
      active: false,
    });

    return res.status(200).json({data: updatedSongRequest});
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const clearAllSongRequest = async (req: Request, res: Response) => {
  const {token, userId} = req.body;

  if (token === undefined) {
    return res.status(400).json({error: "token cannot be blank"});
  }

  if (userId === undefined) {
    return res.status(400).json({error: "userId cannot be blank"});
  }

  const band = await firestore
      .collection("Band")
      .doc(token as string)
      .get();
  if (!band.exists || band.data()?.userId !== userId) {
    return res.status(404).json({error: "Band not found"});
  }

  await firestore
      .collection("SongRequest")
      .where("bandToken", "==", token)
      .get()
      .then((res) => {
        const batch = firestore.batch();
        res.docs.forEach((doc) => {
          const docRef = firestore.collection("SongRequest").doc(doc.id);
          batch.update(docRef, {active: false});
        });
        batch.commit().then(() => {
          console.log("updated all documents inside SongRequest");
        });
      });

  return res.status(200).json({sucess: true})
};
