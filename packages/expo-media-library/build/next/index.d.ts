import { EventSubscription, PermissionResponse } from 'expo-modules-core';
import ExpoMediaLibraryNext from './ExpoMediaLibraryNext';
import { MediaLibraryAssetsChangeEvent } from './MediaLibraryNext.types';
import { GranularPermission } from './types/GranularPermission';
export * from './MediaLibraryNext.types';
export declare class Query extends ExpoMediaLibraryNext.Query {
}
export declare class Asset extends ExpoMediaLibraryNext.Asset {
    static create(filePath: string, album?: Album): Promise<Asset>;
    static delete(assets: Asset[]): Promise<void>;
    getFavorite(): Promise<boolean>;
    setFavorite(isFavorite: boolean): Promise<void>;
}
export declare class Album extends ExpoMediaLibraryNext.Album {
    static create(name: string, assetsRefs: string[] | Asset[], moveAssets?: boolean): Promise<Album>;
    static delete(albums: Album[], deleteAssets?: boolean): Promise<void>;
    static get(title: string): Promise<Album | null>;
}
/**
 * Asks the user to grant permissions for accessing media in user's media library.
 * @param writeOnly
 * @param granularPermissions - A list of [`GranularPermission`](#granularpermission) values. This parameter has an
 * effect only on Android 13 and newer. By default, `expo-media-library` will ask for all possible permissions.
 *
 * > When using granular permissions with a custom config plugin configuration, make sure that all the requested permissions are included in the plugin.
 * @return A promise that fulfils with [`PermissionResponse`](#permissionresponse) object.
 */
export declare function requestPermissionsAsync(writeOnly?: boolean, granularPermissions?: GranularPermission[]): Promise<PermissionResponse>;
/**
 * Subscribes for updates in user's media library.
 * @param listener A callback that is fired when any assets have been inserted or deleted from the
 * library. On Android it's invoked with an empty object. On iOS it's invoked with
 * [`MediaLibraryAssetsChangeEvent`](#medialibraryassetschangeevent) object.
 * @return An [`EventSubscription`](#eventsubscription) object that you can call `remove()` on when
 * you would like to unsubscribe the listener.
 */
export declare function addListener(listener: (event: MediaLibraryAssetsChangeEvent) => void): EventSubscription;
/**
 * Removes all listeners.
 */
export declare function removeAllListeners(): void;
//# sourceMappingURL=index.d.ts.map