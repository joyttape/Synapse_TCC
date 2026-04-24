import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "ID",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const FirebaseService = {
  /**
   * Faz o upload de um arquivo e retorna a URL pública
   * @param arquivo O arquivo vindo do input (File)
   * @param pasta A pasta no storage (ex: 'fotos-catequistas')
   */
  async uploadArquivo(arquivo: File, pasta: string): Promise<string> {
    const nomeUnico = `${Date.now()}-${arquivo.name}`;
    const storageRef = ref(storage, `${pasta}/${nomeUnico}`);

    await uploadBytes(storageRef, arquivo);

    const url = await getDownloadURL(storageRef);
    return url;
  }
};
