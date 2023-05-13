import firebase from "firebase/compat/app";
import { getDatabase, ref, onValue, set, increment } from 'firebase/database';
import { listenerCount } from "process";

const firebaseConfig = {
    apiKey: "AIzaSyCTmoff7do6yWqpwjPwGyewyiJ_jz0T9A0",
    authDomain: "musixtastes.firebaseapp.com",
    databaseURL: "https://musixtastes-default-rtdb.firebaseio.com",
    projectId: "musixtastes",
    storageBucket: "musixtastes.appspot.com",
    messagingSenderId: "576353030067",
    appId: "1:576353030067:web:160ad7d07e59b97d8885c6",
    measurementId: "G-4WKCVV26P1"
  };

export async function getData(ref_path: string): Promise<any> {
  return new Promise((resolve, reject) => {
    // Initialize Firebase app

    firebase.initializeApp(firebaseConfig);

    // Get a reference to the database
    const database = getDatabase();

    // Define the path to the data you want to retrieve
    const dataRef = ref(database, ref_path);

    // Retrieve the data
    onValue(dataRef, (snapshot) => {
      // The data is contained in the snapshot parameter
      const data = snapshot.val();
      // Do something with the data
      const new_data = Object.keys(data).map(key => ({
        id:key,
        ...data[key]
      }));
      resolve(new_data);
    }, (error) => {
      reject(error);
    });
  });
}

export async function setData(refPath: string, data: any): Promise<object> {
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const database = getDatabase();
  const dataRef = ref(database, refPath);

  return set(dataRef, data)
    .then(() => {
      console.log('Data set successfully!');
      return {Message: "DATA SET"}
    })
    .catch((error) => {
      console.error('Error setting data:', error);
      return {Message: "ERROR IN SETTING THE DATA"}
    });
}



export async function incrementDB(refPath: any, key: string,  incrementation: number): Promise<object> {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const database = getDatabase();
  const dataRef = ref(database, refPath+key);
  // Use the increment() function to increment the value
  return set(dataRef, increment(incrementation))
    .then(() => {
      return {Message: "INCREMENTED"}
    })
    .catch((error) => {
      console.error('Error incrementing:', error);
      return {Message: "ERROR IN INCREMENTING"}
    });
}

// ---- More functions for getting specific info ----

function genRandomMusics (musics: any, numberOfMusics: number, listMusics: object[]): object[] {
  let doCheck: boolean = listMusics.length != 0
  let randomMusics = []
  const keys = Object.keys(musics);
  for (let i = 0; i < numberOfMusics; i++) {
    let randomMusic = musics[(Math.floor(Math.random() * keys.length)).toString()];
    while(doCheck && ([...listMusics, ...randomMusics].includes(randomMusic))) {
      randomMusic = musics[(Math.floor(Math.random() * keys.length)).toString()];
    }
    randomMusics.push(randomMusic)
  }
  return randomMusics
}
export function getUserMusics(userName: string, numberOfMusics: number): Promise<object> {
  return new Promise(async (resolve, reject) => {

    interface PrefPercentages {
      [key: string]: number;
    }
    interface UserPrefs {
      id: number;
      [key: string]: number;
    }
    interface Music {
      id: string;
      genre: string;
      // add more properties as needed
    }
    interface FinalNumberOfMusics {
      [key: string]: number;
    }

    type MusicEntry = [string, Music];

    const musics: { [key: string]: Music }  = await getData('musics');
    const user: any = await getData('users/'+userName);
    const userPrefs: UserPrefs = user[0]
    let prefProucentage: PrefPercentages = {}
    let totalPrefValue: number = 0;
    let numberAvailableMusicsType: { [key: string]: number }  = {};
    let finalNumberOfMusics: FinalNumberOfMusics = {};
    let musicsToReturn: object[] = [];

    // Get the sum of the preferences values
    Object.entries(userPrefs).forEach(([keyPref, valuePref]:any[]) => {
      if (keyPref !== 'id') { totalPrefValue += Math.max(valuePref, 0) }
    })

    // If the person have 0 preferences just give random musics => Because you can't divide by 0 (pourcentages)
    if (totalPrefValue === 0){
      const randomMusics = genRandomMusics(musics, numberOfMusics, [])
      resolve(randomMusics)
    }
    
    // Get the pourcentages of each preference
    Object.entries(userPrefs).forEach(([keyPref, valuePref]) => {
      if (keyPref !== 'id'){
        prefProucentage[keyPref] = (Math.max(valuePref, 0)/totalPrefValue)*100
      }
    })
    // Get thow much of musics of each genre
    Object.entries(musics).forEach(([keyMusic, valMusic]: MusicEntry) => {
      if (keyMusic !== 'id') {
        if (Object.keys(numberAvailableMusicsType).includes(valMusic.genre)) {
          numberAvailableMusicsType[valMusic.genre]++;
        } else {
          numberAvailableMusicsType[valMusic.genre] = 1;
        }
      }
    });
    
    // Get the  number of musics to put on each genre
    Object.entries(prefProucentage).forEach((pref: [string, number])=>{
      const keyPref = pref[0]
      const lenMusicsToGet = (prefProucentage[keyPref]/100)*numberOfMusics;
      const lenMusicsAvailable = numberAvailableMusicsType[keyPref];
      const finalLenMusicsToGet = Math.trunc(Math.min(lenMusicsToGet, lenMusicsAvailable));
      finalNumberOfMusics[keyPref] = finalLenMusicsToGet;
    })
    // Get the actual recommandation list
    Object.entries(finalNumberOfMusics).forEach(([genre, genreNumberOfMusics]) => {
      let musicCounter = genreNumberOfMusics;
      try{
        Object.entries(musics).forEach((music) => {
          if (musicCounter === 0){ throw new Error('Break') /* Break */ };
          if (music[1].genre === genre) {
            musicsToReturn.push(music[1]);
            musicCounter -= 1;
          } 
        })
      } catch(error){}
    })

    // Add more musics if the number of music to provide isn't enough 
    while (musicsToReturn.length < numberOfMusics) {
      const extendMusicList = genRandomMusics(musics, (numberOfMusics-musicsToReturn.length), musicsToReturn)
      musicsToReturn = [...musicsToReturn, ...extendMusicList]
    }
    resolve(musicsToReturn);

  });
}