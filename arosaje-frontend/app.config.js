import 'dotenv/config';
import { ExpoConfig, ConfigContext } from '@expo/config';

/**
 * Loads environment-specific settings from .env files based on the NODE_ENV variable.
 * NODE_ENV should be set to either 'development' or 'production'.
 */
const env = process.env.NODE_ENV;
require('dotenv').config({ path: `.env.${env}` });

/**
 * The main configuration function for the Expo app, which sets up environment-specific variables
 * and any additional configurations required for the app to function correctly.
 *
 * @param {ConfigContext} context - The context provided by Expo, containing the current config state.
 * @returns {ExpoConfig} The configuration object that Expo uses to build the app.
 */
export default ({ config }: ConfigContext): ExpoConfig => {
    return {
        ...config, // Merges any existing configuration settings.
        extra: {
            ...config.extra, // Retains any previously set 'extra' config properties.
            apiUrl: process.env.EXPO_PUBLIC_API_URL, // Sets the API URL from the environment variable.
            eas: {
                projectId: "4d3a4675-aeb3-45aa-bd4d-66b241e6ea40", // Specifies the EAS project ID.
            },
        },
    };
};