import { PermissionResponse } from 'expo-modules-core';
import ExpoMediaLibraryNext from './ExpoMediaLibraryNext';
import { GranularPermission } from './types/GranularPermission';
import { MediaTypeFilter } from './types/MediaTypeFilter';
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
 * Checks user's permissions for accessing media library.
 * @param writeOnly
 * @param granularPermissions - A list of [`GranularPermission`](#granularpermission) values. This parameter has
 * an effect only on Android 13 and newer. By default, `expo-media-library` will ask for all possible permissions.
 * @return A promise that fulfils with [`PermissionResponse`](#permissionresponse) object.
 */
export declare function getPermissionsAsync(writeOnly?: boolean, granularPermissions?: GranularPermission[]): Promise<PermissionResponse>;
/**
 * Allows the user to update the assets that your app has access to.
 * The system modal is only displayed if the user originally allowed only `limited` access to their
 * media library, otherwise this method is a no-op.
 * @param mediaTypes Limits the type(s) of media that the user will be granting access to. By default, a list that shows both photos and videos is presented.
 *
 * @return A promise that either rejects if the method is unavailable, or resolves to `void`.
 * > __Note:__ This method doesn't inform you if the user changes which assets your app has access to.
 * That information is only exposed by iOS, and to obtain it, you need to subscribe for updates to the user's media library using [`addListener()`](#medialibraryaddlistenerlistener).
 * If `hasIncrementalChanges` is `false`, the user changed their permissions.
 *
 * @platform android 14+
 * @platform ios
 */
export declare function presentPermissionsPicker(mediaTypes?: MediaTypeFilter[]): Promise<void>;
//# sourceMappingURL=index.d.ts.map