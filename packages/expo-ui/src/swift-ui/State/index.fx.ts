// Side effect file to load SharedObject support in worklets

import { installOnUIRuntime } from 'expo-modules-core';
import { registerSharedObjectSerializer } from './index';

installOnUIRuntime();
registerSharedObjectSerializer();
