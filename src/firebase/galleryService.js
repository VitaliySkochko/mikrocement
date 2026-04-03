import { db, storage } from "./config";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const GALLERY_COLLECTION = "gallery";

export async function uploadGalleryImage(file, title = "") {
  if (!file) {
    throw new Error("Файл не вибрано");
  }

  const fileName = `${Date.now()}-${file.name}`;
  const storageRef = ref(storage, `gallery/${fileName}`);

  await uploadBytes(storageRef, file);
  const imageUrl = await getDownloadURL(storageRef);

  const docRef = await addDoc(collection(db, GALLERY_COLLECTION), {
    title: title || file.name,
    image: imageUrl,
    createdAt: serverTimestamp(),
  });

  return {
    id: docRef.id,
    title: title || file.name,
    image: imageUrl,
  };
}

export async function getGalleryItems() {
  const q = query(
    collection(db, GALLERY_COLLECTION),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}