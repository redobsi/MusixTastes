// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { generateKey } from 'crypto';
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
export type Channels = 'ipc-example'|'get-firebase-data'|'set-firebase-data'|'db-incrementation'|'get-user-musics';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  firebase: {
    getData(ref_path: string) {
      const id = Math.random().toString(16).slice(2)
      ipcRenderer.send('get-firebase-data', {hints:{type:'DB_GET', id:id}, ref_path:ref_path})
    },
    setData(ref_path: string, data: any) {
      const id = Math.random().toString(16).slice(2)
      ipcRenderer.send('set-firebase-data', {hints:{type:'DB_SET', id:id}, ref_path:ref_path,data:data})
    }
  },
  analysis: {
    // Let the renderer side increment values given in arg to values in db
    incrementDB(ref_path: string, key: string, incrementation: number) {
      const id = Math.random().toString(16).slice(2)
      ipcRenderer.send('db-incrementation', {hints:{type:'DB_INCREMENTATION', id:id}, ref_path:ref_path, incrementation:incrementation, key:key})
    },
    
    getUserMusics(userName: string, numberOfMusics: number) {
      const id = Math.random().toString(16).slice(2)
      ipcRenderer.send('get-user-musics', {hints:{type:'USER_MUSICS', id:id}, userName: userName, numberOfMusics: numberOfMusics})
    }
  }
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
