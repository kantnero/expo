import { UnavailabilityError } from 'expo-modules-core';
import { Platform } from 'react-native';
import ExpoMediaLibraryNext from './ExpoMediaLibraryNext';
export * from './MediaLibraryNext.types';
export class Query extends ExpoMediaLibraryNext.Query {
}
export class Asset extends ExpoMediaLibraryNext.Asset {
    // @hidden
    static create(filePath, album) {
        return ExpoMediaLibraryNext.createAsset(filePath, album);
    }
    // @hidden
    static delete(assets) {
        return ExpoMediaLibraryNext.deleteAssets(assets);
    }
    // @hidden
    getFavorite() {
        if (Platform.OS !== 'ios') {
            throw new UnavailabilityError('MediaLibrary', 'getFavorite is only available on iOS');
        }
        return super.getFavorite();
    }
    // @hidden
    setFavorite(isFavorite) {
        if (Platform.OS !== 'ios') {
            throw new UnavailabilityError('MediaLibrary', 'setFavorite is only available on iOS');
        }
        return super.setFavorite(isFavorite);
    }
}
export class Album extends ExpoMediaLibraryNext.Album {
    // @hidden
    static create(name, assetsRefs, moveAssets = true) {
        if (Platform.OS === 'ios') {
            return ExpoMediaLibraryNext.createAlbum(name, assetsRefs);
        }
        return ExpoMediaLibraryNext.createAlbum(name, assetsRefs, moveAssets);
    }
    // @hidden
    static delete(albums, deleteAssets = false) {
        if (Platform.OS === 'ios') {
            return ExpoMediaLibraryNext.deleteAlbums(albums, deleteAssets);
        }
        else {
            return ExpoMediaLibraryNext.deleteAlbums(albums);
        }
    }
    // @hidden
    static get(title) {
        return ExpoMediaLibraryNext.getAlbum(title);
    }
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
export async function requestPermissionsAsync(writeOnly = false, granularPermissions) {
    if (!ExpoMediaLibraryNext.requestPermissionsAsync) {
        throw new UnavailabilityError('MediaLibrary', 'requestPermissionsAsync');
    }
    if (Platform.OS === 'android') {
        return await ExpoMediaLibraryNext.requestPermissionsAsync(writeOnly, granularPermissions);
    }
    return await ExpoMediaLibraryNext.requestPermissionsAsync(writeOnly);
}
/**
 * Checks user's permissions for accessing media library.
 * @param writeOnly
 * @param granularPermissions - A list of [`GranularPermission`](#granularpermission) values. This parameter has
 * an effect only on Android 13 and newer. By default, `expo-media-library` will ask for all possible permissions.
 * @return A promise that fulfils with [`PermissionResponse`](#permissionresponse) object.
 */
export async function getPermissionsAsync(writeOnly = false, granularPermissions) {
    if (!ExpoMediaLibraryNext.getPermissionsAsync) {
        throw new UnavailabilityError('MediaLibrary', 'getPermissionsAsync');
    }
    if (Platform.OS === 'android') {
        return await ExpoMediaLibraryNext.getPermissionsAsync(writeOnly, granularPermissions);
    }
    return await ExpoMediaLibraryNext.getPermissionsAsync(writeOnly);
}
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
export async function presentPermissionsPicker(mediaTypes) {
    return await ExpoMediaLibraryNext.presentPermissionsPickerAsync(mediaTypes);
}
//# sourceMappingURL=index.js.map